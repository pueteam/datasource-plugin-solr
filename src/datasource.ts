import defaults from 'lodash/defaults';

import { getBackendSrv } from '@grafana/runtime';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
  dateTimeParse,
  SelectableValue,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions, defaultQuery } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  url?: string;
  solrCloudMode?: boolean;
  collection?: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    // this.url = instanceSettings.jsonData.url || '';
    this.solrCloudMode = instanceSettings.jsonData.solrCloudMode || false;
    this.url = instanceSettings.url || '';
    this.collection = instanceSettings.jsonData.solrCollection || '';
    if (this.url.endsWith('/')) {
      this.url = this.url.substr(0, this.url.length - 1);
    }
  }

  async doRequest(url: string, query?: any): Promise<any> {
    return new Promise(async (resolve) => {
      const result = await getBackendSrv().datasourceRequest({
        method: 'GET',
        url: url,
        params: query,
      });

      return resolve(result);
    });
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const { range, maxDataPoints } = options;
    const from = dateTimeParse(range!.from.valueOf()).format('YYYY-MM-DDTHH:mm:ss[Z]');
    const to = dateTimeParse(range!.to.valueOf()).format('YYYY-MM-DDTHH:mm:ss[Z]');

    // console.log(from, to);

    const promises = options.targets.map(async (target) => {
      const query = defaults(target, defaultQuery);
      const { timestamp, fl, queryText } = query;
      let collection = query.collection || this.collection;
      const url = `${this.url}/solr/${collection}/select`;
      const rows = maxDataPoints || 100000;
      const solrQuery = {
        wt: 'json',
        fq: `${timestamp}:[${from} TO ${to}]`,
        //fq: 'time:[2017-01-07T07:48:54Z TO 2017-02-14T07:48:54Z]',
        q: queryText || '*:*',
        fl: `${timestamp},${fl}`,
        rows: rows,
        sort: `${timestamp} desc`,
      };
      // console.log(solrQuery);

      if (!collection || !timestamp) {
        // duration of the time range, in milliseconds.
        const frame = new MutableDataFrame({
          refId: query.refId,
          fields: [
            { name: 'time', type: FieldType.time },
            { name: 'value', type: FieldType.number },
          ],
        });

        return frame;
      }

      const r = await this.doRequest(url, solrQuery);
      // console.log(r);
      const frame = new MutableDataFrame({
        refId: target.refId,
        fields: [
          { name: 'Time', type: FieldType.time },
          { name: 'Value', type: FieldType.number },
        ],
      });
      r.data.response.docs.forEach((point: any) => {
        const time = dateTimeParse(point[timestamp]).unix() * 1000;
        // const time = dateTime.utc(point[timestamp]).unix() * 1000;
        frame.appendRow([time, point[fl]]);
      });

      return frame;
    });

    return Promise.all(promises).then((data) => ({ data }));
  }

  async testDatasource() {
    // Implement a health check for your data source.
    // console.log(this.url);
    const r = await this.doRequest(this.url + '/');
    if (r.status === 200) {
      return {
        status: 'success',
        message: 'Data source is working',
        title: 'Success',
      };
    } else {
      return {
        status: 'error',
        message: 'Data source is NOT working',
        title: 'Error',
      };
    }
  }
  async listCollections(): Promise<Array<SelectableValue<string>>> {
    // solr/admin/collections?action=LIST&wt=json
    const url = this.url + '/solr/admin/collections?action=LIST&wt=json';
    return this.doRequest(url).then(this.mapToTextValue);
  }

  async listFields(collection?: string) {
    // solr/admin/collections?action=LIST&wt=json
    if (!collection) {
      collection = this.collection;
    }
    const url = this.url + '/solr/' + collection + '/select?q=*:*&wt=csv&rows=1';
    return this.doRequest(url).then(this.mapToTextValue);
  }

  mapToTextValue(result: any) {
    if (result.data.collections) {
      return result.data.collections.map(function (collection: any) {
        return {
          label: collection,
          value: collection,
        };
      });
    }
    if (result.data.facet_counts) {
      var ar = [];
      for (var key in result.data.facet_counts.facet_fields) {
        if (result.data.facet_counts.facet_fields.hasOwnProperty(key)) {
          var array = result.data.facet_counts.facet_fields[key];
          for (var i = 0; i < array.length; i += 2) {
            // take every second element
            ar.push({
              text: array[i],
              expandable: false,
            });
          }
        }
      }
      return ar;
    }
    if (result.data) {
      return result.data
        .split('\n')[0]
        .split(',')
        .map(function (field: any) {
          return {
            label: field,
            value: field,
          };
        });
    }
  }
}

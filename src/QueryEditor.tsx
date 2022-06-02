import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { InlineFormLabel, LegacyForms, Select, AsyncSelect } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from './datasource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

const samples: Array<SelectableValue<string>> = [
  { label: 'Standard', description: 'Perform an standard query', value: 'standard' },
  { label: 'Group', description: 'Group the results by field', value: 'group' },
];

// let collections: Array<SelectableValue<string>> = [];
// let fields: Array<SelectableValue<string>> = [];
let col: SelectableValue<string>;
let time: SelectableValue<string>;
let fl: SelectableValue<string>;

export class QueryEditor extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    // this.listCollections();
    col = { label: props.datasource.collection, value: props.datasource.collection };
  }
  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryText: event.target.value });
  };

  onSampleChange = (event: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, groupEnabled: event.value! });
    onRunQuery();
  };

  onCollectionChange = (event: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, collection: event.value! });
    // this.listFields();
    onRunQuery();
  };

  onTimestampChange = (event: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, timestamp: event.value! });
    onRunQuery();
  };

  onFieldsChange = (event: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, fl: event.value! });
    onRunQuery();
  };

  /*
  listCollections() {
    this.props.datasource.listCollections().then((result) => {
      // console.log(collections);
      collections = result;
    });
  }
  */

  loadAsyncCollections = () => {
    return new Promise<Array<SelectableValue<string>>>((resolve) => {
      this.props.datasource.listCollections().then((result) => {
        // console.log(collections);
        resolve(result);
      });
    });
  };

  loadAsyncFields = () => {
    // const query = defaults(this.props.query, defaultQuery);
    return new Promise<Array<SelectableValue<string>>>((resolve) => {
      this.props.datasource.listFields().then((result) => {
        // console.log(collections);
        resolve(result);
      });
    });
  };

  /*
  listFields() {
    const query = defaults(this.props.query, defaultQuery);
    this.props.datasource.listFields(query.collection).then((result) => {
      console.log(result);
      fields = result;
    });
  }
  */

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { queryText, groupEnabled } = query;
    // this.listCollections();

    return (
      <div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel width={6} tooltip="Choose the query type">
              Type
            </InlineFormLabel>
            <Select
              width={20}
              options={samples}
              placeholder="Query Method"
              onChange={this.onSampleChange}
              value={groupEnabled || 'standard'}
            />
          </div>
          <div className="gf-form">
            <InlineFormLabel width={6} tooltip="Select the collection to query">
              Collection
            </InlineFormLabel>
            <AsyncSelect
              width={20}
              loadOptions={this.loadAsyncCollections}
              defaultOptions
              placeholder="Collection"
              onChange={this.onCollectionChange}
              value={col || ''}
            />
          </div>
          <div className="gf-form">
            <InlineFormLabel width={6} tooltip="Select the timestamp field">
              Timestamp
            </InlineFormLabel>
            <AsyncSelect
              width={20}
              loadOptions={this.loadAsyncFields}
              defaultOptions
              placeholder="Timestamp"
              onChange={this.onTimestampChange}
              value={time || ''}
            />
          </div>
          <div className="gf-form">
            <InlineFormLabel width={6} tooltip="Select the fields to query splitted by comma">
              Fields
            </InlineFormLabel>
            <AsyncSelect
              width={20}
              loadOptions={this.loadAsyncFields}
              defaultOptions
              placeholder="Fields"
              onChange={this.onFieldsChange}
              value={fl || ''}
            />
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              labelWidth={8}
              value={queryText || '*:*'}
              onChange={this.onQueryTextChange}
              label="Query"
              tooltip="Query in Solr format"
            />
          </div>
        </div>
      </div>
    );
  }
}

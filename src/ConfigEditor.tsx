import React, { ChangeEvent, PureComponent } from 'react';
import { InlineFormLabel, LegacyForms, Switch, DataSourceHttpSettings } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions } from './types';

const { FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      path: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      url: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onURLChange = (event: ChangeEvent<any>) => {
    this.props.onOptionsChange({
      ...this.props.options,
      url: event.target.value,
    });
  };

  onCollectionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      solrCollection: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onSolrCloudModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      solrCloudMode: event.target.value === 'true',
    };
    onOptionsChange({ ...options, jsonData });
  };

  // Secure field (only sent to the backend)
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
  };

  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  render() {
    const { options, onOptionsChange } = this.props;
    const { jsonData } = options;
    // const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

    return (
      <div className="gf-form-group">
        <DataSourceHttpSettings
          defaultUrl={'...'}
          dataSourceConfig={options}
          showAccessOptions={false}
          onChange={onOptionsChange}
        />

        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              label="Collection"
              labelWidth={10}
              inputWidth={20}
              tooltip="Solr Collection"
              onChange={this.onCollectionNameChange}
              value={jsonData.solrCollection || ''}
              placeholder="Collection Name"
            />
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel
              className="width-10"
              tooltip="Whether Solr is working in Cloud Mode. Check if it is a Solr cluster or uncheck if it is a single instance."
            >
              Cloud Mode
            </InlineFormLabel>
            <div className="gf-form-switch">
              <Switch
                label="SolrCloud"
                // labelWidth={6}true
                // inputWidth={20}
                onChange={this.onSolrCloudModeChange}
                value={jsonData.solrCloudMode}
                placeholder="SolrCloud Mode"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

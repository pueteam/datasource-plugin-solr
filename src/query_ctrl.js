// Copyright 2018 PUE.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  QueryCtrl
} from 'app/plugins/sdk';

export class SolrQueryCtrl extends QueryCtrl {
  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);

    /*
    if (this.target) {
      this.target.target = this.target.target || '';
    }
    */
    this.scope = $scope;
    this.target.target = this.target.target || '*:*';
    this.target.type = this.target.type || 'timeserie';
    this.target.time = this.target.time || '';
    this.target.fields = this.target.fields || '';
    this.target.groupEnabled = this.target.groupEnabled || 'standard';
    this.target.groupValueField = this.target.groupValueField || '';
    this.target.groupByField = this.target.groupByField || '';
    this.target.groupLimit = this.target.groupLimit || 100000;
    this.target.collection = this.target.collection || this.datasource.solrCollection || '';
    this.target.solrCloudMode = this.target.solrCloudMode || this.datasource.solrCloudMode || true;
  }
  getOptions(query) {
    return this.datasource.listCollections(query || '');
  }

  listCollection(query) {
    return this.datasource.listCollections(query || '');
  }

  listFields(query, collection) {
    return this.datasource.listFields(query || '', collection);
  }

  toggleEditorMode() {
    this.target.rawQuery = !this.target.rawQuery;
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}

SolrQueryCtrl.templateUrl = 'partials/query.editor.html';
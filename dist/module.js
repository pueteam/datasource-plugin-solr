'use strict';

System.register(['./datasource', './query_ctrl'], function (_export, _context) {
  "use strict";

  var SolrDatasource, SolrQueryCtrl, SolrMetricsQueryOptions, SolrConfigView, SolrAnnotationsQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      SolrDatasource = _datasource.SolrDatasource;
    }, function (_query_ctrl) {
      SolrQueryCtrl = _query_ctrl.SolrQueryCtrl;
    }],
    execute: function () {
      _export('QueryOptionsCtrl', SolrMetricsQueryOptions = function SolrMetricsQueryOptions() {
        _classCallCheck(this, SolrMetricsQueryOptions);
      });

      SolrMetricsQueryOptions.templateUrl = 'partials/query.options.html';

      _export('ConfigCtrl', SolrConfigView = function SolrConfigView() {
        _classCallCheck(this, SolrConfigView);
      });

      SolrConfigView.templateUrl = 'partials/config.html';

      _export('AnnotationsQueryCtrl', SolrAnnotationsQueryCtrl = function SolrAnnotationsQueryCtrl() {
        _classCallCheck(this, SolrAnnotationsQueryCtrl);
      });

      SolrAnnotationsQueryCtrl.templateUrl = "partials/annotations.editor.html";

      _export('Datasource', SolrDatasource);

      _export('ConfigCtrl', SolrConfigView);

      _export('QueryCtrl', SolrQueryCtrl);

      _export('QueryOptionsCtrl', SolrMetricsQueryOptions);

      _export('AnnotationsQueryCtrl', SolrAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map

'use strict';

System.register(['app/plugins/sdk'], function (_export, _context) {
  "use strict";

  var QueryCtrl, _createClass, SolrQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      QueryCtrl = _appPluginsSdk.QueryCtrl;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('SolrQueryCtrl', SolrQueryCtrl = function (_QueryCtrl) {
        _inherits(SolrQueryCtrl, _QueryCtrl);

        /** @ngInject **/
        function SolrQueryCtrl($scope, $injector) {
          _classCallCheck(this, SolrQueryCtrl);

          var _this = _possibleConstructorReturn(this, (SolrQueryCtrl.__proto__ || Object.getPrototypeOf(SolrQueryCtrl)).call(this, $scope, $injector));

          /*
          if (this.target) {
            this.target.target = this.target.target || '';
          }
          */
          _this.scope = $scope;
          _this.target.target = _this.target.target || '*:*';
          _this.target.type = _this.target.type || 'timeserie';
          _this.target.time = _this.target.time || '';
          _this.target.fields = _this.target.fields || '';
          _this.target.groupEnabled = _this.target.groupEnabled || 'standard';
          _this.target.groupValueField = _this.target.groupValueField || '';
          _this.target.groupByField = _this.target.groupByField || '';
          _this.target.groupLimit = _this.target.groupLimit || 100000;
          _this.target.collection = _this.target.collection || _this.datasource.solrCollection || '';
          _this.target.solrCloudMode = _this.target.solrCloudMode || _this.datasource.solrCloudMode || true;
          return _this;
        }

        _createClass(SolrQueryCtrl, [{
          key: 'getOptions',
          value: function getOptions(query) {
            return this.datasource.listCollections(query || '');
          }
        }, {
          key: 'listCollection',
          value: function listCollection(query) {
            return this.datasource.listCollections(query || '');
          }
        }, {
          key: 'listFields',
          value: function listFields(query, collection) {
            return this.datasource.listFields(query || '', collection);
          }
        }, {
          key: 'toggleEditorMode',
          value: function toggleEditorMode() {
            this.target.rawQuery = !this.target.rawQuery;
          }
        }, {
          key: 'onChangeInternal',
          value: function onChangeInternal() {
            this.panelCtrl.refresh(); // Asks the panel to refresh data.
          }
        }]);

        return SolrQueryCtrl;
      }(QueryCtrl));

      _export('SolrQueryCtrl', SolrQueryCtrl);

      SolrQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map

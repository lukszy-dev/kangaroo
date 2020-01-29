const ace = require('ace-builds/src-noconflict/ace');
const scss = require('./darkTheme.scss');

ace.define('ace/theme/sm-dark', ['require', 'exports', 'module', 'ace/lib/dom'], function(require, exports) {
  exports.isDark = true;
  exports.cssClass = 'sm-dark';
  exports.cssText = scss;

  var dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});

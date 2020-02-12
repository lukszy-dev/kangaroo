/* eslint-disable @typescript-eslint/no-var-requires */

const ace = require('ace-builds/src-noconflict/ace');
const scss = require('./lightTheme.scss');

ace.define('ace/theme/sm-light', ['require', 'exports', 'module', 'ace/lib/dom'], function(require, exports) {
  exports.isDark = true;
  exports.cssClass = 'sm-light';
  exports.cssText = scss;

  const dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});

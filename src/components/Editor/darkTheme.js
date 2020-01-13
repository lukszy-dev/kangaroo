const ace = require('ace-builds/src-noconflict/ace');
ace.define('ace/theme/sm-dark', ['require', 'exports', 'module', 'ace/lib/dom'], function(require, exports) {
  exports.isDark = true;
  exports.cssClass = 'sm-dark';
  exports.cssText = `
    .sm-dark .ace_gutter {
      background: #30404D;
      color: #AAA;
    }

    .sm-dark {
      background: #30404D;
      color: #fff;
    }

    .sm-dark .ace_keyword {
      font-weight: bold;
    }

    .sm-dark .ace_string {
      color: #D14;
    }

    .sm-dark .ace_variable.ace_class {
      color: teal;
    }

    .sm-dark .ace_constant.ace_numeric {
      color: #099;
    }

    .sm-dark .ace_constant.ace_buildin {
      color: #0086B3;
    }

    .sm-dark .ace_support.ace_function {
      color: #0086B3;
    }
    .sm-dark .ace_comment {
      color: #998;
      font-style: italic;
    }

    .sm-dark .ace_variable.ace_language {
      color: #0086B3;
    }
    
    .sm-dark .ace_paren {
      font-weight: bold;
    }

    .sm-dark .ace_boolean {
      font-weight: bold;
    }

    .sm-dark .ace_string.ace_regexp {
      color: #009926;
      font-weight: normal;
    }

    .sm-dark .ace_variable.ace_instance {
      color: teal;
    }

    .sm-dark .ace_constant.ace_language {
      font-weight: bold;
    }

    .sm-dark .ace_cursor {
      color: white;
    }

    .sm-dark .ace_hidden-cursors .ace_cursor {
      visibility: hidden;
    }

    .sm-dark.ace_focus .ace_marker-layer .ace_active-line {
      background: #394B59;
    }

    // .sm-dark .ace_marker-layer .ace_active-line {
    //   background: #394B59;
    // }

    .sm-dark .ace_marker-layer .ace_selection {
      background: rgb(181, 213, 255);
    }

    .sm-dark.ace_multiselect .ace_selection.ace_start {
      box-shadow: 0 0 3px 0px white;
    }

    .sm-dark.ace_nobold .ace_line > span {
      font-weight: normal !important;
    }

    .sm-dark .ace_marker-layer .ace_step {
      background: rgb(252, 255, 0);
    }

    .sm-dark .ace_marker-layer .ace_stack {
      background: rgb(164, 229, 101);
    }

    .sm-dark .ace_marker-layer .ace_bracket {
      border: 1px solid rgb(192, 192, 192);
    }

    .sm-dark.ace_focus .ace_gutter-active-line {
      background-color : #394B59;
    }

    .sm-dark .ace_gutter-active-line {
      background: none;
    }

    .sm-dark .ace_marker-layer .ace_selected-word {
      background: rgb(250, 250, 255);
      border: 1px solid rgb(200, 200, 250);
    }

    .sm-dark .ace_invisible {
      color: #BFBFBF;
    }

    .sm-dark .ace_print-margin {
      width: 1px;
      background: #e8e8e8;
    }

    .sm-dark .ace_indent-guide {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;
    }
  `;

  var dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});
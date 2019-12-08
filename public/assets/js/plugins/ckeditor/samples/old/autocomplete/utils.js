/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
var autocompleteUtils = {
  generateData: function (a, c) { return Object.keys(a).sort().map(function (a, b) { return { id: b, name: c + a } }) },
  getAsyncDataCallback: function (a) { return function (c, d, b) { setTimeout(function () { b(a.filter(function (a) { return a.name.indexOf(c) === 0 })) }, 500 * Math.random()) } },
  getSyncDataCallback: function (a) { return function (c, d, b) { b(a.filter(function (a) { return a.name.indexOf(c) === 0 })) } },
  getTextTestCallback: function (a, c, d) {
    function b (a, c) {
      var b = a.slice(0, c); var e = a.slice(c); var b = b.match(f); return !b || d && e &&
!e.match(/^\s/) ? null : { start: b.index, end: c }
    } var f = (function () { var b = a + '\\w'; var b = c ? b + ('{' + c + ',}') : b + '*'; return new RegExp(b + '$') }()); return function (a) { return a.collapsed ? CKEDITOR.plugins.textMatch.match(a, b) : null }
  }
}

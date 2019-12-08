/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.add('iframedialog', {
  requires: 'dialog',
  onLoad: function () {
    CKEDITOR.dialog.addIframe = function (e, d, a, l, f, n, g) {
      a = { type: 'iframe', src: a, width: '100%', height: '100%' }; a.onContentLoad = typeof n === 'function' ? n : function () {
        var a = this.getElement().$.contentWindow; if (a.onDialogEvent) {
          var b = this.getDialog(); var c = function (b) { return a.onDialogEvent(b) }; b.on('ok', c); b.on('cancel', c); b.on('resize', c); b.on('hide', function (a) {
            b.removeListener('ok', c); b.removeListener('cancel', c); b.removeListener('resize', c)
            a.removeListener()
          }); a.onDialogEvent({ name: 'load', sender: this, editor: b._.editor })
        }
      }; var h = { title: d, minWidth: l, minHeight: f, contents: [{ id: 'iframe', label: d, expand: !0, elements: [a], style: 'width:' + a.width + ';height:' + a.height }] }; var k; for (k in g)h[k] = g[k]; this.add(e, function () { return h })
    }; (function () {
      var e = function (d, a, l) {
        if (!(arguments.length < 3)) {
          var f = this._ || (this._ = {}); var e = a.onContentLoad && CKEDITOR.tools.bind(a.onContentLoad, this); var g = CKEDITOR.tools.cssLength(a.width); var h = CKEDITOR.tools.cssLength(a.height); f.frameId =
CKEDITOR.tools.getNextId() + '_iframe'; d.on('load', function () { CKEDITOR.document.getById(f.frameId).getParent().setStyles({ width: g, height: h }) }); var k = { src: '%2', id: f.frameId, frameborder: 0, allowtransparency: !0 }; var m = []; typeof a.onContentLoad === 'function' && (k.onload = 'CKEDITOR.tools.callFunction(%1);'); CKEDITOR.ui.dialog.uiElement.call(this, d, a, m, 'iframe', { width: g, height: h }, k, ''); l.push('\x3cdiv style\x3d"width:' + g + ';height:' + h + ';" id\x3d"' + this.domId + '"\x3e\x3c/div\x3e'); m = m.join(''); d.on('show', function () {
            var b =
CKEDITOR.document.getById(f.frameId).getParent(); var c = CKEDITOR.tools.addFunction(e); var c = m.replace('%1', c).replace('%2', CKEDITOR.tools.htmlEncode(a.src)); b.setHtml(c)
          })
        }
      }; e.prototype = new CKEDITOR.ui.dialog.uiElement(); CKEDITOR.dialog.addUIElement('iframe', { build: function (d, a, l) { return new e(d, a, l) } })
    })()
  }
})

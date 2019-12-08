/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add('image2', function (f) {
  function C () { var a = this.getValue().match(D); (a = !(!a || parseInt(a[1], 10) === 0)) || alert(c.invalidLength.replace('%1', c[this.id]).replace('%2', 'px')); return a } function N () {
    function a (a, c) { q.push(b.once(a, function (a) { for (var b; b = q.pop();)b.removeListener(); c(a) })) } var b = r.createElement('img'); var q = []; return function (q, c, e) {
      a('load', function () { var a = E(b); c.call(e, b, a.width, a.height) }); a('error', function () { c(null) }); a('abort', function () { c(null) }); b.setAttribute('src',
        (w.baseHref || '') + q + '?' + Math.random().toString(16).substring(2))
    }
  } function F () { var a = this.getValue(); t(!1); a !== x.data.src ? (G(a, function (a, b, c) { t(!0); if (!a) return m(!1); g.setValue(!1 === f.config.image2_prefillDimensions ? 0 : b); h.setValue(!1 === f.config.image2_prefillDimensions ? 0 : c); u = k = b; v = l = c; m(H.checkHasNaturalRatio(a)) }), n = !0) : n ? (t(!0), g.setValue(k), h.setValue(l), n = !1) : t(!0) } function I () {
    if (e) {
      var a = this.getValue(); if (a && (a.match(D) || m(!1), a !== '0')) {
        var b = this.id == 'width'; var c = k || u; var d = l || v; var a = b ? Math.round(a /
c * d) : Math.round(a / d * c); isNaN(a) || (b ? h : g).setValue(a)
      }
    }
  } function m (a) { if (d) { if (typeof a === 'boolean') { if (y) return; e = a } else a = g.getValue(), y = !0, (e = !e) && a && (a *= l / k, isNaN(a) || h.setValue(Math.round(a))); d[e ? 'removeClass' : 'addClass']('cke_btn_unlocked'); d.setAttribute('aria-checked', e); CKEDITOR.env.hc && d.getChild(0).setHtml(e ? CKEDITOR.env.ie ? '■' : '▣' : CKEDITOR.env.ie ? '□' : '▢') } } function t (a) { a = a ? 'enable' : 'disable'; g[a](); h[a]() } var D = /(^\s*(\d+)(px)?\s*$)|^$/i; var J = CKEDITOR.tools.getNextId(); var K = CKEDITOR.tools.getNextId()
  var b = f.lang.image2; var c = f.lang.common; var O = (new CKEDITOR.template('\x3cdiv\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"' + b.lockRatio + '" class\x3d"cke_btn_locked" id\x3d"{lockButtonId}" role\x3d"checkbox"\x3e\x3cspan class\x3d"cke_icon"\x3e\x3c/span\x3e\x3cspan class\x3d"cke_label"\x3e' + b.lockRatio + '\x3c/span\x3e\x3c/a\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"' + b.resetSize + '" class\x3d"cke_btn_reset" id\x3d"{resetButtonId}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3e' +
b.resetSize + '\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e')).output({ lockButtonId: J, resetButtonId: K }); var H = CKEDITOR.plugins.image2; var w = f.config; var z = !(!w.filebrowserImageBrowseUrl && !w.filebrowserBrowseUrl); var A = f.widgets.registered.image.features; var E = H.getNatural; var r; var x; var L; var G; var k; var l; var u; var v; var n; var e; var y; var d; var p; var g; var h; var B; var M = [{ id: 'src', type: 'text', label: c.url, onKeyup: F, onChange: F, setup: function (a) { this.setValue(a.data.src) }, commit: function (a) { a.setData('src', this.getValue()) }, validate: CKEDITOR.dialog.validate.notEmpty(b.urlMissing) }]; z && M.push({
    type: 'button',
    id: 'browse',
    style: 'display:inline-block;margin-top:14px;',
    align: 'center',
    label: f.lang.common.browseServer,
    hidden: !0,
    filebrowser: 'info:src'
  }); return {
    title: b.title,
    minWidth: 250,
    minHeight: 100,
    onLoad: function () { r = this._.element.getDocument(); G = N() },
    onShow: function () { x = this.widget; L = x.parts.image; n = y = e = !1; B = E(L); u = k = B.width; v = l = B.height },
    contents: [{
      id: 'info',
      label: b.infoTab,
      elements: [{ type: 'vbox', padding: 0, children: [{ type: 'hbox', widths: ['100%'], className: 'cke_dialog_image_url', children: M }] }, {
        id: 'alt',
        type: 'text',
        label: b.alt,
        setup: function (a) { this.setValue(a.data.alt) },
        commit: function (a) { a.setData('alt', this.getValue()) },
        validate: !0 === f.config.image2_altRequired ? CKEDITOR.dialog.validate.notEmpty(b.altMissing) : null
      }, {
        type: 'hbox',
        widths: ['25%', '25%', '50%'],
        requiredContent: A.dimension.requiredContent,
        children: [{ type: 'text', width: '45px', id: 'width', label: c.width, validate: C, onKeyUp: I, onLoad: function () { g = this }, setup: function (a) { this.setValue(a.data.width) }, commit: function (a) { a.setData('width', this.getValue()) } },
          { type: 'text', id: 'height', width: '45px', label: c.height, validate: C, onKeyUp: I, onLoad: function () { h = this }, setup: function (a) { this.setValue(a.data.height) }, commit: function (a) { a.setData('height', this.getValue()) } }, {
            id: 'lock',
            type: 'html',
            style: 'margin-top:18px;width:40px;height:20px;',
            onLoad: function () {
              function a (a) { a.on('mouseover', function () { this.addClass('cke_btn_over') }, a); a.on('mouseout', function () { this.removeClass('cke_btn_over') }, a) } var b = this.getDialog(); d = r.getById(J); p = r.getById(K); d && (b.addFocusable(d,
                4 + z), d.on('click', function (a) { m(); a.data && a.data.preventDefault() }, this.getDialog()), a(d)); p && (b.addFocusable(p, 5 + z), p.on('click', function (a) { n ? (g.setValue(u), h.setValue(v)) : (g.setValue(k), h.setValue(l)); a.data && a.data.preventDefault() }, this), a(p))
            },
            setup: function (a) { m(a.data.lock) },
            commit: function (a) { a.setData('lock', e) },
            html: O
          }]
      }, {
        type: 'hbox',
        id: 'alignment',
        requiredContent: A.align.requiredContent,
        children: [{
          id: 'align',
          type: 'radio',
          items: [[c.alignNone, 'none'], [c.left, 'left'], [c.center, 'center'],
            [c.right, 'right']],
          label: c.align,
          setup: function (a) { this.setValue(a.data.align) },
          commit: function (a) { a.setData('align', this.getValue()) }
        }]
      }, { id: 'hasCaption', type: 'checkbox', label: b.captioned, requiredContent: A.caption.requiredContent, setup: function (a) { this.setValue(a.data.hasCaption) }, commit: function (a) { a.setData('hasCaption', this.getValue()) } }]
    }, {
      id: 'Upload',
      hidden: !0,
      filebrowser: 'uploadButton',
      label: b.uploadTab,
      elements: [{ type: 'file', id: 'upload', label: b.btnUpload, style: 'height:40px' }, {
        type: 'fileButton',
        id: 'uploadButton',
        filebrowser: 'info:src',
        label: b.btnUpload,
        for: ['Upload', 'upload']
      }]
    }]
  }
})

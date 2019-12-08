/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function p (a, g) {
    var b = a.editable().findOne('a[data-cke-autoembed\x3d"' + g + '"]'); var c = a.lang.autoembed; var d; if (b && b.data('cke-saved-href')) {
      var b = b.data('cke-saved-href'); var e = CKEDITOR.plugins.autoEmbed.getWidgetDefinition(a, b); if (e) {
        var f = typeof e.defaults === 'function' ? e.defaults() : e.defaults; var f = CKEDITOR.dom.element.createFromHtml(e.template.output(f)); var h; var m = a.widgets.wrapElement(f, e.name); var n = new CKEDITOR.dom.documentFragment(m.getDocument()); n.append(m); (h = a.widgets.initOn(f, e)) ? (d = a.showNotification(c.embeddingInProgress,
          'info'), h.loadContent(b, {
          noNotifications: !0,
          callback: function () {
            var b = a.editable().findOne('a[data-cke-autoembed\x3d"' + g + '"]'); if (b) {
              var c = a.getSelection(); var e = a.createRange(); var f = a.editable(); a.fire('saveSnapshot'); a.fire('lockSnapshot', { dontUpdate: !0 }); var l = c.createBookmarks(!1)[0]; var k = l.startNode; var h = l.endNode || k; CKEDITOR.env.ie && CKEDITOR.env.version < 9 && !l.endNode && k.equals(b.getNext()) && b.append(k); e.setStartBefore(b); e.setEndAfter(b); f.insertElement(m, e); f.contains(k) && f.contains(h) ? c.selectBookmarks([l])
                : (k.remove(), h.remove()); a.fire('unlockSnapshot')
            }d.hide(); a.widgets.finalizeCreation(n)
          },
          errorCallback: function () { d.hide(); a.widgets.destroy(h, !0); a.showNotification(c.embeddingFailed, 'info') }
        })) : a.widgets.finalizeCreation(n)
      } else CKEDITOR.warn('autoembed-no-widget-def')
    }
  } var q = /^<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>$/i; CKEDITOR.plugins.add('autoembed', {
    requires: 'autolink,undo',
    lang: 'az,bg,ca,cs,da,de,de-ch,el,en,en-au,eo,es,es-mx,et,eu,fr,gl,hr,hu,it,ja,km,ko,ku,lt,lv,mk,nb,nl,oc,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,ug,uk,vi,zh,zh-cn',
    init: function (a) { var g = 1; var b; a.on('paste', function (c) { if (c.data.dataTransfer.getTransferType(a) == CKEDITOR.DATA_TRANSFER_INTERNAL)b = 0; else { var d = c.data.dataValue.match(q); if (b = d != null && decodeURI(d[1]) == decodeURI(d[2]))c.data.dataValue = '\x3ca data-cke-autoembed\x3d"' + ++g + '"' + c.data.dataValue.substr(2) } }, null, null, 20); a.on('afterPaste', function () { b && p(a, g) }) }
  }); CKEDITOR.plugins.autoEmbed = {
    getWidgetDefinition: function (a, g) {
      var b = a.config.autoEmbed_widget || 'embed,embedSemantic'; var c; var d = a.widgets.registered
      if (typeof b === 'string') for (b = b.split(','); c = b.shift();) { if (d[c]) return d[c] } else if (typeof b === 'function') return d[b(g)]; return null
    }
  }
})()

/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.add('panelbutton', {
  requires: 'button',
  onLoad: function () {
    function e (c) { var a = this._; a.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(c), a.on ? a.panel.hide() : a.panel.showBlock(this._.id, this.document.getById(this._.id), 4)) }CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
      base: CKEDITOR.ui.button,
      $: function (c) {
        var a = c.panel || {}; delete c.panel; this.base(c); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.block = { attributes: a.attributes }; a.toolbarRelated = !0; this.hasArrow =
'listbox'; this.click = e; this._ = { panelDefinition: a }
      },
      statics: { handler: { create: function (c) { return new CKEDITOR.ui.panelButton(c) } } },
      proto: {
        createPanel: function (c) {
          var a = this._; if (!a.panel) {
            var f = this._.panelDefinition; var e = this._.panelDefinition.block; var g = f.parent || CKEDITOR.document.getBody(); var d = this._.panel = new CKEDITOR.ui.floatPanel(c, g, f); var f = d.addBlock(a.id, e); var b = this; d.onShow = function () {
              b.className && this.element.addClass(b.className + '_panel'); b.setState(CKEDITOR.TRISTATE_ON); a.on = 1; b.editorFocus && c.focus()
              if (b.onOpen)b.onOpen()
            }; d.onHide = function (d) { b.className && this.element.getFirst().removeClass(b.className + '_panel'); b.setState(b.modes && b.modes[c.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); a.on = 0; if (!d && b.onClose)b.onClose() }; d.onEscape = function () { d.hide(1); b.document.getById(a.id).focus() }; if (this.onBlock) this.onBlock(d, f); f.onHide = function () { a.on = 0; b.setState(CKEDITOR.TRISTATE_OFF) }
          }
        }
      }
    })
  },
  beforeInit: function (e) { e.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
})
CKEDITOR.UI_PANELBUTTON = 'panelbutton'
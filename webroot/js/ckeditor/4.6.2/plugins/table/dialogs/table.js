(function(){function v(a){for(var g,n=0,l=0,p,d=a.$.rows.length;l<d;l++){p=a.$.rows[l];for(var e=g=0,b,c=p.cells.length;e<c;e++)b=p.cells[e],g+=b.colSpan;g>n&&(n=g)}return n}function r(a){return function(){var g=this.getValue();(g=!!(CKEDITOR.dialog.validate.integer()(g)&&0<g))||(alert(a),this.select());return g}}function q(a,g){var n=function(d){return new CKEDITOR.dom.element(d,a.document)},q=a.editable(),p=a.plugins.dialogadvtab;return{title:a.lang.table.title,minWidth:310,minHeight:CKEDITOR.env.ie?
310:280,onLoad:function(){var d=this,a=d.getContentElement("advanced","advStyles");if(a)a.on("change",function(){var a=this.getStyle("width",""),c=d.getContentElement("info","txtWidth");c&&c.setValue(a,!0);a=this.getStyle("height","");(c=d.getContentElement("info","txtHeight"))&&c.setValue(a,!0)})},onShow:function(){var d=a.getSelection(),e=d.getRanges(),b,c=this.getContentElement("info","txtRows"),f=this.getContentElement("info","txtCols"),t=this.getContentElement("info","txtWidth"),m=this.getContentElement("info",
"txtHeight");"tableProperties"==g&&((d=d.getSelectedElement())&&d.is("table")?b=d:0<e.length&&(CKEDITOR.env.webkit&&e[0].shrink(CKEDITOR.NODE_ELEMENT),b=a.elementPath(e[0].getCommonAncestor(!0)).contains("table",1)),this._.selectedElement=b);b?(this.setupContent(b),c&&c.disable(),f&&f.disable()):(c&&c.enable(),f&&f.enable());t&&t.onChange();m&&m.onChange()},onOk:function(){var d=a.getSelection(),e=this._.selectedElement&&d.createBookmarks(),b=this._.selectedElement||n("table"),c={};this.commitContent(c,
b);if(c.info){c=c.info;if(!this._.selectedElement)for(var f=b.append(n("tbody")),g=parseInt(c.txtRows,10)||0,m=parseInt(c.txtCols,10)||0,k=0;k<g;k++)for(var h=f.append(n("tr")),l=0;l<m;l++)h.append(n("td")).appendBogus();g=c.selHeaders;if(!b.$.tHead&&("row"==g||"both"==g)){h=b.getElementsByTag("thead").getItem(0);f=b.getElementsByTag("tbody").getItem(0);m=f.getElementsByTag("tr").getItem(0);h||(h=new CKEDITOR.dom.element("thead"),h.insertBefore(f));for(k=0;k<m.getChildCount();k++)f=m.getChild(k),
f.type!=CKEDITOR.NODE_ELEMENT||f.data("cke-bookmark")||(f.renameNode("th"),f.setAttribute("scope","col"));h.append(m.remove())}if(null!==b.$.tHead&&"row"!=g&&"both"!=g){h=new CKEDITOR.dom.element(b.$.tHead);f=b.getElementsByTag("tbody").getItem(0);for(l=f.getFirst();0<h.getChildCount();){m=h.getFirst();for(k=0;k<m.getChildCount();k++)f=m.getChild(k),f.type==CKEDITOR.NODE_ELEMENT&&(f.renameNode("td"),f.removeAttribute("scope"));m.insertBefore(l)}h.remove()}if(!this.hasColumnHeaders&&("col"==g||"both"==
g))for(h=0;h<b.$.rows.length;h++)f=new CKEDITOR.dom.element(b.$.rows[h].cells[0]),f.renameNode("th"),f.setAttribute("scope","row");if(this.hasColumnHeaders&&"col"!=g&&"both"!=g)for(k=0;k<b.$.rows.length;k++)h=new CKEDITOR.dom.element(b.$.rows[k]),"tbody"==h.getParent().getName()&&(f=new CKEDITOR.dom.element(h.$.cells[0]),f.renameNode("td"),f.removeAttribute("scope"));c.txtHeight?b.setStyle("height",c.txtHeight):b.removeStyle("height");c.txtWidth?b.setStyle("width",c.txtWidth):b.removeStyle("width");
b.getAttribute("style")||b.removeAttribute("style")}if(this._.selectedElement)try{d.selectBookmarks(e)}catch(w){}else a.insertElement(b),setTimeout(function(){var d=new CKEDITOR.dom.element(b.$.rows[0].cells[0]),c=a.createRange();c.moveToPosition(d,CKEDITOR.POSITION_AFTER_START);c.select()},0)},contents:[{id:"info",label:a.lang.table.title,elements:[{type:"hbox",widths:[null,null],styles:["vertical-align:top"],children:[{type:"vbox",padding:0,children:[{type:"text",id:"txtRows","default":3,label:a.lang.table.rows,
required:!0,controlStyle:"width:5em",validate:r(a.lang.table.invalidRows),setup:function(d){this.setValue(d.$.rows.length)},commit:l},{type:"text",id:"txtCols","default":2,label:a.lang.table.columns,required:!0,controlStyle:"width:5em",validate:r(a.lang.table.invalidCols),setup:function(d){this.setValue(v(d))},commit:l},{type:"html",html:"&nbsp;"},{type:"select",id:"selHeaders",requiredContent:"th","default":"",label:a.lang.table.headers,items:[[a.lang.table.headersNone,""],[a.lang.table.headersRow,
"row"],[a.lang.table.headersColumn,"col"],[a.lang.table.headersBoth,"both"]],setup:function(d){var a=this.getDialog();a.hasColumnHeaders=!0;for(var b=0;b<d.$.rows.length;b++){var c=d.$.rows[b].cells[0];if(c&&"th"!=c.nodeName.toLowerCase()){a.hasColumnHeaders=!1;break}}null!==d.$.tHead?this.setValue(a.hasColumnHeaders?"both":"row"):this.setValue(a.hasColumnHeaders?"col":"")},commit:l},{type:"text",id:"txtBorder",requiredContent:"table[border]","default":a.filter.check("table[border]")?1:0,label:a.lang.table.border,
controlStyle:"width:3em",validate:CKEDITOR.dialog.validate.number(a.lang.table.invalidBorder),setup:function(a){this.setValue(a.getAttribute("border")||"")},commit:function(a,e){this.getValue()?e.setAttribute("border",this.getValue()):e.removeAttribute("border")}},{id:"cmbAlign",type:"select",requiredContent:"table[align]","default":"",label:a.lang.common.align,items:[[a.lang.common.notSet,""],[a.lang.common.alignLeft,"left"],[a.lang.common.alignCenter,"center"],[a.lang.common.alignRight,"right"]],
setup:function(a){this.setValue(a.getAttribute("align")||"")},commit:function(a,e){this.getValue()?e.setAttribute("align",this.getValue()):e.removeAttribute("align")}}]},{type:"vbox",padding:0,children:[{type:"hbox",widths:["5em"],children:[{type:"text",id:"txtWidth",requiredContent:"table{width}",controlStyle:"width:5em",label:a.lang.common.width,title:a.lang.common.cssLengthTooltip,"default":a.filter.check("table{width}")?500>q.getSize("width")?"100%":500:0,getValue:u,validate:CKEDITOR.dialog.validate.cssLength(a.lang.common.invalidCssLength.replace("%1",
a.lang.common.width)),onChange:function(){var a=this.getDialog().getContentElement("advanced","advStyles");a&&a.updateStyle("width",this.getValue())},setup:function(a){a=a.getStyle("width");this.setValue(a)},commit:l}]},{type:"hbox",widths:["5em"],children:[{type:"text",id:"txtHeight",requiredContent:"table{height}",controlStyle:"width:5em",label:a.lang.common.height,title:a.lang.common.cssLengthTooltip,"default":"",getValue:u,validate:CKEDITOR.dialog.validate.cssLength(a.lang.common.invalidCssLength.replace("%1",
a.lang.common.height)),onChange:function(){var a=this.getDialog().getContentElement("advanced","advStyles");a&&a.updateStyle("height",this.getValue())},setup:function(a){(a=a.getStyle("height"))&&this.setValue(a)},commit:l}]},{type:"html",html:"&nbsp;"},{type:"text",id:"txtCellSpace",requiredContent:"table[cellspacing]",controlStyle:"width:3em",label:a.lang.table.cellSpace,"default":a.filter.check("table[cellspacing]")?1:0,validate:CKEDITOR.dialog.validate.number(a.lang.table.invalidCellSpacing),
setup:function(a){this.setValue(a.getAttribute("cellSpacing")||"")},commit:function(a,e){this.getValue()?e.setAttribute("cellSpacing",this.getValue()):e.removeAttribute("cellSpacing")}},{type:"text",id:"txtCellPad",requiredContent:"table[cellpadding]",controlStyle:"width:3em",label:a.lang.table.cellPad,"default":a.filter.check("table[cellpadding]")?1:0,validate:CKEDITOR.dialog.validate.number(a.lang.table.invalidCellPadding),setup:function(a){this.setValue(a.getAttribute("cellPadding")||"")},commit:function(a,
e){this.getValue()?e.setAttribute("cellPadding",this.getValue()):e.removeAttribute("cellPadding")}}]}]},{type:"html",align:"right",html:""},{type:"vbox",padding:0,children:[{type:"text",id:"txtCaption",requiredContent:"caption",label:a.lang.table.caption,setup:function(a){this.enable();a=a.getElementsByTag("caption");if(0<a.count()){a=a.getItem(0);var d=a.getFirst(CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT));d&&!d.equals(a.getBogus())?(this.disable(),this.setValue(a.getText())):(a=CKEDITOR.tools.trim(a.getText()),
this.setValue(a))}},commit:function(d,e){if(this.isEnabled()){var b=this.getValue(),c=e.getElementsByTag("caption");if(b)0<c.count()?(c=c.getItem(0),c.setHtml("")):(c=new CKEDITOR.dom.element("caption",a.document),e.append(c,!0)),c.append(new CKEDITOR.dom.text(b,a.document));else if(0<c.count())for(b=c.count()-1;0<=b;b--)c.getItem(b).remove()}}},{type:"text",id:"txtSummary",bidi:!0,requiredContent:"table[summary]",label:a.lang.table.summary,setup:function(a){this.setValue(a.getAttribute("summary")||
"")},commit:function(a,e){this.getValue()?e.setAttribute("summary",this.getValue()):e.removeAttribute("summary")}}]}]},p&&p.createAdvancedTab(a,null,"table")]}}var u=CKEDITOR.tools.cssLength,l=function(a){var g=this.id;a.info||(a.info={});a.info[g]=this.getValue()};CKEDITOR.dialog.add("table",function(a){return q(a,"table")});CKEDITOR.dialog.add("tableProperties",function(a){return q(a,"tableProperties")})})();
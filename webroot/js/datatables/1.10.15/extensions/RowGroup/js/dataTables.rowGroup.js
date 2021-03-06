/*
   Copyright 2017 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 RowGroup 1.0.0
 ?2017 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(d){return c(d,window,document)}):"object"===typeof exports?module.exports=function(d,g){d||(d=window);g&&g.fn.dataTable||(g=require("datatables.net")(d,g).$);return c(g,d,d.document)}:c(jQuery,window,document)})(function(c,d,g,k){var e=c.fn.dataTable,f=function(a,b){if(!e.versionCheck||!e.versionCheck("1.10.8"))throw"RowGroup requires DataTables 1.10.8 or newer";this.c=c.extend(!0,{},e.defaults.rowGroup,
f.defaults,b);this.s={dt:new e.Api(a),dataFn:e.ext.oApi._fnGetObjectDataFn(this.c.dataSrc)};this.dom={};var l=this.s.dt.settings()[0],d=l.rowGroup;if(d)return d;l.rowGroup=this;this._constructor()};c.extend(f.prototype,{dataSrc:function(a){if(a===k)return this.c.dataSrc;var b=this.s.dt;this.c.dataSrc=a;this.s.dataFn=e.ext.oApi._fnGetObjectDataFn(this.c.dataSrc);c(b.table().node()).triggerHandler("rowgroup-datasrc.dt",[b,a]);return this},disable:function(){this.c.enable=!1;return this},enable:function(a){if(!1===
a)return this.disable();this.c.enable=!0;return this},_constructor:function(){var a=this,b=this.s.dt;b.on("draw.dtrg",function(){a.c.enable&&a._draw()});b.on("column-visibility.dtrg",function(){a._adjustColspan()});b.on("destroy",function(){b.off(".dtrg")})},_adjustColspan:function(){c("tr."+this.c.className,this.s.dt.table().body()).attr("colspan",this._colspan())},_colspan:function(){return c(this.s.dt.columns().header()).filter(":visible").length},_draw:function(){var a=this,b=this.s.dt,c=[],d,
e;b.rows({page:"current"}).every(function(){var b=this.data(),b=a.s.dataFn(b);if(d===k||b!==d)c.push([]),d=b;c[c.length-1].push(this.index())});for(var f=0,g=c.length;f<g;f++){var h=c[f],m=b.row(h[0]),n=this.s.dataFn(m.data());this.c.startRender&&(e=this.c.startRender.call(this,b.rows(h),n),this._rowWrap(e,this.c.startClassName).insertBefore(m.node()));this.c.endRender&&(e=this.c.endRender.call(this,b.rows(h),n),this._rowWrap(e,this.c.endClassName).insertAfter(b.row(h[h.length-1]).node()))}},_rowWrap:function(a,
b){return("object"===typeof a&&a.nodeName&&"tr"===a.nodeName.toLowerCase()?c(a):a instanceof c&&a.length&&"tr"===a[0].nodeName.toLowerCase()?a:c("<tr/>").append(c("<td/>").attr("colspan",this._colspan()).append(a))).addClass(this.c.className).addClass(b)}});f.defaults={className:"group",dataSrc:0,enable:!0,endClassName:"group-end",endRender:null,startClassName:"group-start",startRender:function(a,b){return b}};f.version="1.0.0";c.fn.dataTable.RowGroup=f;c.fn.DataTable.RowGroup=f;e.Api.register("rowGroup()",
function(){return this});e.Api.register("rowGroup().disable()",function(){return this.iterator("table",function(a){a.rowGroup&&a.rowGroup.enable(!1)})});e.Api.register("rowGroup().enable()",function(a){return this.iterator("table",function(b){b.rowGroup&&b.rowGroup.enable(a===k?!0:a)})});e.Api.register("rowGroup().dataSrc()",function(a){return a===k?this.context[0].rowGroup.dataSrc():this.iterator("table",function(b){b.rowGroup&&b.rowGroup.dataSrc(a)})});c(g).on("preInit.dt.dtrg",function(a,b,d){"dt"===
a.namespace&&(a=b.oInit.rowGroup,d=e.defaults.rowGroup,a||d)&&(d=c.extend({},d,a),!1!==a&&new f(b,d))});return f});

/*
   Copyright 2014-2015 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
*/
(function(p,q,k){k=function(e,l){var h=function(d,a){if(!l.versionCheck||!l.versionCheck("1.10.1"))throw"DataTables Responsive requires DataTables 1.10.1 or newer";this.s={dt:new l.Api(d),columns:[]};this.s.dt.settings()[0].responsive||(a&&"string"===typeof a.details&&(a.details={type:a.details}),this.c=e.extend(!0,{},h.defaults,l.defaults.responsive,a),d.responsive=this,this._constructor())};h.prototype={_constructor:function(){var d=this,a=this.s.dt;a.settings()[0]._responsive=this;e(p).on("resize.dtr orientationchange.dtr",
a.settings()[0].oApi._fnThrottle(function(){d._resize()}));a.on("destroy.dtr",function(){e(p).off("resize.dtr orientationchange.dtr draw.dtr")});this.c.breakpoints.sort(function(a,d){return a.width<d.width?1:a.width>d.width?-1:0});this._classLogic();this._resizeAuto();var b=this.c.details;b.type&&(d._detailsInit(),this._detailsVis(),a.on("column-visibility.dtr",function(){d._detailsVis()}),a.on("draw.dtr",function(){a.rows({page:"current"}).iterator("row",function(c,b){var f=a.row(b);if(f.child.isShown()){var m=
d.c.details.renderer(a,b);f.child(m,"child").show()}})}),e(a.table().node()).addClass("dtr-"+b.type));this._resize()},_columnsVisiblity:function(d){var a=this.s.dt,b=this.s.columns,c,g,f=e.map(b,function(a){return a.auto&&null===a.minWidth?!1:!0===a.auto?"-":-1!==e.inArray(d,a.includeIn)}),m=0;c=0;for(g=f.length;c<g;c++)!0===f[c]&&(m+=b[c].minWidth);c=a.settings()[0].oScroll;c=c.sY||c.sX?c.iBarWidth:0;a=a.table().container().offsetWidth-c-m;c=0;for(g=f.length;c<g;c++)b[c].control&&(a-=b[c].minWidth);
m=!1;c=0;for(g=f.length;c<g;c++)"-"!==f[c]||b[c].control||(m||0>a-b[c].minWidth?(m=!0,f[c]=!1):f[c]=!0,a-=b[c].minWidth);a=!1;c=0;for(g=b.length;c<g;c++)if(!b[c].control&&!b[c].never&&!f[c]){a=!0;break}c=0;for(g=b.length;c<g;c++)b[c].control&&(f[c]=a);-1===e.inArray(!0,f)&&(f[0]=!0);return f},_classLogic:function(){var d=this,a=this.c.breakpoints,b=this.s.dt.columns().eq(0).map(function(a){a=this.column(a).header().className;return{className:a,includeIn:[],auto:!1,control:!1,never:a.match(/\bnever\b/)?
!0:!1}}),c=function(a,c){var d=b[a].includeIn;-1===e.inArray(c,d)&&d.push(c)},g=function(f,g,e,n){if(!e)b[f].includeIn.push(g);else if("max-"===e)for(n=d._find(g).width,g=0,e=a.length;g<e;g++)a[g].width<=n&&c(f,a[g].name);else if("min-"===e)for(n=d._find(g).width,g=0,e=a.length;g<e;g++)a[g].width>=n&&c(f,a[g].name);else if("not-"===e)for(g=0,e=a.length;g<e;g++)-1===a[g].name.indexOf(n)&&c(f,a[g].name)};b.each(function(c,d){for(var b=c.className.split(" "),n=!1,h=0,k=b.length;h<k;h++){var l=e.trim(b[h]);
if("all"===l){n=!0;c.includeIn=e.map(a,function(a){return a.name});return}if("none"===l||"never"===l){n=!0;return}if("control"===l){n=!0;c.control=!0;return}e.each(a,function(a,c){var b=c.name.split("-"),e=l.match(new RegExp("(min\\-|max\\-|not\\-)?("+b[0]+")(\\-[_a-zA-Z0-9])?"));e&&(n=!0,e[2]===b[0]&&e[3]==="-"+b[1]?g(d,c.name,e[1],e[2]+e[3]):e[2]!==b[0]||e[3]||g(d,c.name,e[1],e[2]))})}n||(c.auto=!0)});this.s.columns=b},_detailsInit:function(){var d=this,a=this.s.dt,b=this.c.details;"inline"===b.type&&
(b.target="td:first-child");var c=b.target,b="string"===typeof c?c:"td";e(a.table().body()).on("click",b,function(b){if(e(a.table().node()).hasClass("collapsed")&&a.row(e(this).closest("tr")).length){if("number"===typeof c&&(b=0>c?a.columns().eq(0).length+c:c,a.cell(this).index().column!==b))return;b=a.row(e(this).closest("tr"));if(b.child.isShown())b.child(!1),e(b.node()).removeClass("parent");else{var f=d.c.details.renderer(a,b[0]);b.child(f,"child").show();e(b.node()).addClass("parent")}}})},_detailsVis:function(){var d=
this,a=this.s.dt,b=a.columns().indexes().filter(function(b){var c=a.column(b);return c.visible()?null:e(c.header()).hasClass("never")?null:b}),c=!0;if(0===b.length||1===b.length&&this.s.columns[b[0]].control)c=!1;c?a.rows({page:"current"}).eq(0).each(function(b){b=a.row(b);if(b.child()){var c=d.c.details.renderer(a,b[0]);!1===c?b.child.hide():b.child(c,"child").show()}}):a.rows({page:"current"}).eq(0).each(function(b){a.row(b).child.hide()})},_find:function(d){for(var a=this.c.breakpoints,b=0,c=a.length;b<
c;b++)if(a[b].name===d)return a[b]},_resize:function(){var d=this.s.dt,a=e(p).width(),b=this.c.breakpoints,c=b[0].name,g=this.s.columns,f;for(f=b.length-1;0<=f;f--)if(a<=b[f].width){c=b[f].name;break}var m=this._columnsVisiblity(c),b=!1;f=0;for(a=g.length;f<a;f++)if(!1===m[f]&&!g[f].never){b=!0;break}e(d.table().node()).toggleClass("collapsed",b);d.columns().eq(0).each(function(a,b){d.column(a).visible(m[b])})},_resizeAuto:function(){var d=this.s.dt,a=this.s.columns;if(this.c.auto&&-1!==e.inArray(!0,
e.map(a,function(a){return a.auto}))){d.table().node();var b=d.table().node().cloneNode(!1),c=e(d.table().header().cloneNode(!1)).appendTo(b),g=e(d.table().body().cloneNode(!1)).appendTo(b);e(d.table().footer()).clone(!1).appendTo(b);d.rows({page:"current"}).indexes().flatten().each(function(a){var b=d.row(a).node().cloneNode(!0);d.columns(":hidden").flatten().length&&e(b).append(d.cells(a,":hidden").nodes().to$().clone());e(b).appendTo(g)});var f=d.columns().header().to$().clone(!1);e("<tr/>").append(f).appendTo(c);
"inline"===this.c.details.type&&e(b).addClass("dtr-inline collapsed");b=e("<div/>").css({width:1,height:1,overflow:"hidden"}).append(b);b.find("th.never, td.never").remove();b.insertBefore(d.table().node());d.columns().eq(0).each(function(b){a[b].minWidth=f[b].offsetWidth||0});b.remove()}}};h.breakpoints=[{name:"desktop",width:Infinity},{name:"tablet-l",width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}];h.defaults={breakpoints:h.breakpoints,auto:!0,details:{renderer:function(d,
a){var b=d.cells(a,":hidden").eq(0).map(function(a){var b=e(d.column(a.column).header());a=d.cell(a).index();if(b.hasClass("control")||b.hasClass("never"))return"";var f=d.settings()[0],f=f.oApi._fnGetCellData(f,a.row,a.column,"display");(b=b.text())&&(b+=":");return'<li data-dtr-index="'+a.column+'"><span class="dtr-title">'+b+'</span> <span class="dtr-data">'+f+"</span></li>"}).toArray().join("");return b?e('<ul data-dtr-index="'+a+'"/>').append(b):!1},target:0,type:"inline"}};var k=e.fn.dataTable.Api;
k.register("responsive()",function(){return this});k.register("responsive.index()",function(d){d=e(d);return{column:d.data("dtr-index"),row:d.parent().data("dtr-index")}});k.register("responsive.rebuild()",function(){return this.iterator("table",function(d){d._responsive&&d._responsive._classLogic()})});k.register("responsive.recalc()",function(){return this.iterator("table",function(d){d._responsive&&(d._responsive._resizeAuto(),d._responsive._resize())})});h.version="1.0.6";e.fn.dataTable.Responsive=
h;e.fn.DataTable.Responsive=h;e(q).on("init.dt.dtr",function(d,a,b){"dt"===d.namespace&&(e(a.nTable).hasClass("responsive")||e(a.nTable).hasClass("dt-responsive")||a.oInit.responsive||l.defaults.responsive)&&(d=a.oInit.responsive,!1!==d&&new h(a,e.isPlainObject(d)?d:{}))});return h};"function"===typeof define&&define.amd?define(["jquery","datatables"],k):"object"===typeof exports?k(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.Responsive&&k(jQuery,jQuery.fn.dataTable)})(window,
document);

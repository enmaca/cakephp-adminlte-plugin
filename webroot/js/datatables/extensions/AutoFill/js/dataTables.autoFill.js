/*
   Copyright 2010-2014 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
*/
(function(r,l,p){var n=function(d,m){var h=function(c,b){if(!(this instanceof h))throw"Warning: AutoFill must be initialised with the keyword 'new'";if(!d.fn.dataTableExt.fnVersionCheck("1.7.0"))throw"Warning: AutoFill requires DataTables 1.7 or greater";this.c={};this.s={filler:{height:0,width:0},border:{width:2},drag:{startX:-1,startY:-1,startTd:null,endTd:null,dragging:!1},screen:{interval:null,y:0,height:0,scrollTop:0},scroller:{top:0,bottom:0},columns:[]};this.dom={table:null,filler:null,borderTop:null,
borderRight:null,borderBottom:null,borderLeft:null,currentTarget:null};this.fnSettings=function(){return this.s};this._fnInit(c,b);return this};h.prototype={_fnInit:function(c,b){var a=this;this.s.dt=m.Api?(new m.Api(c)).settings()[0]:c.fnSettings();this.s.init=b||{};this.dom.table=this.s.dt.nTable;d.extend(!0,this.c,h.defaults,b);this._initColumns();var e=d("<div/>",{"class":"AutoFill_filler"}).appendTo("body");this.dom.filler=e[0];this.s.filler.height=e.height();this.s.filler.width=e.width();e[0].style.display=
"none";var g,f=l.body;""!==a.s.dt.oScroll.sY&&(a.s.dt.nTable.parentNode.style.position="relative",f=a.s.dt.nTable.parentNode);g=d("<div/>",{"class":"AutoFill_border"});this.dom.borderTop=g.clone().appendTo(f)[0];this.dom.borderRight=g.clone().appendTo(f)[0];this.dom.borderBottom=g.clone().appendTo(f)[0];this.dom.borderLeft=g.clone().appendTo(f)[0];e.on("mousedown.DTAF",function(b){this.onselectstart=function(){return!1};a._fnFillerDragStart.call(a,b);return!1});d("tbody",this.dom.table).on("mouseover.DTAF mouseout.DTAF",
">tr>td, >tr>th",function(b){a._fnFillerDisplay.call(a,b)});d(this.dom.table).on("destroy.dt.DTAF",function(){e.off("mousedown.DTAF").remove();d("tbody",this.dom.table).off("mouseover.DTAF mouseout.DTAF")})},_initColumns:function(){var c=this,b,a,e=this.s.dt,g=this.s.init;b=0;for(a=e.aoColumns.length;b<a;b++)this.s.columns[b]=d.extend(!0,{},h.defaults.column);e.oApi._fnApplyColumnDefs(e,g.aoColumnDefs||g.columnDefs,g.aoColumns||g.columns,function(a,b){c._fnColumnOptions(a,b)});b=0;for(a=e.aoColumns.length;b<
a;b++)e=this.s.columns[b],e.read||(e.read=this._fnReadCell),e.write||(e.read=this._fnWriteCell),e.step||(e.read=this._fnStep)},_fnColumnOptions:function(c,b){var a=this.s.columns[c],d=function(c,d){b[d[0]]!==p&&(a[c]=b[d[0]]);b[d[1]]!==p&&(a[c]=b[d[1]])};d("enable",["bEnable","enable"]);d("read",["fnRead","read"]);d("write",["fnWrite","write"]);d("step",["fnStep","step"]);d("increment",["bIncrement","increment"])},_fnTargetCoords:function(c){var b=d(c).parents("tr")[0],a=this.s.dt.oInstance.fnGetPosition(c);
return{x:d("td",b).index(c),y:d("tr",b.parentNode).index(b),row:a[0],column:a[2]}},_fnUpdateBorder:function(c,b){var a=this.s.border.width,e=d(c).offset(),g=d(b).offset(),f=e.left-a,k=g.left+d(b).outerWidth(),q=e.top-a,h=g.top+d(b).outerHeight(),l=g.left+d(b).outerWidth()-e.left+2*a,m=g.top+d(b).outerHeight()-e.top+2*a;e.left>g.left&&(f=g.left-a,k=e.left+d(c).outerWidth(),l=e.left+d(c).outerWidth()-g.left+2*a);""!==this.s.dt.oScroll.sY&&(a=d(this.s.dt.nTable.parentNode).offset(),e=d(this.s.dt.nTable.parentNode).scrollTop(),
g=d(this.s.dt.nTable.parentNode).scrollLeft(),f-=a.left-g,k-=a.left-g,q-=a.top-e,h-=a.top-e);a=this.dom.borderTop.style;a.top=q+"px";a.left=f+"px";a.height=this.s.border.width+"px";a.width=l+"px";a=this.dom.borderBottom.style;a.top=h+"px";a.left=f+"px";a.height=this.s.border.width+"px";a.width=l+"px";a=this.dom.borderLeft.style;a.top=q+"px";a.left=f+"px";a.height=m+"px";a.width=this.s.border.width+"px";a=this.dom.borderRight.style;a.top=q+"px";a.left=k+"px";a.height=m+"px";a.width=this.s.border.width+
"px"},_fnFillerDragStart:function(c){var b=this,a=this.dom.currentTarget;this.s.drag.dragging=!0;b.dom.borderTop.style.display="block";b.dom.borderRight.style.display="block";b.dom.borderBottom.style.display="block";b.dom.borderLeft.style.display="block";var e=this._fnTargetCoords(a);this.s.drag.startX=e.x;this.s.drag.startY=e.y;this.s.drag.startTd=a;this.s.drag.endTd=a;this._fnUpdateBorder(a,a);d(l).bind("mousemove.AutoFill",function(a){b._fnFillerDragMove.call(b,a)});d(l).bind("mouseup.AutoFill",
function(a){b._fnFillerFinish.call(b,a)});this.s.screen.y=c.pageY;this.s.screen.height=d(r).height();this.s.screen.scrollTop=d(l).scrollTop();""!==this.s.dt.oScroll.sY&&(this.s.scroller.top=d(this.s.dt.nTable.parentNode).offset().top,this.s.scroller.bottom=this.s.scroller.top+d(this.s.dt.nTable.parentNode).height());this.s.screen.interval=setInterval(function(){var a=d(l).scrollTop();b.s.screen.y+=a-b.s.screen.scrollTop;50>b.s.screen.height-b.s.screen.y+a?d("html, body").animate({scrollTop:a+50},
240,"linear"):50>b.s.screen.y-a&&d("html, body").animate({scrollTop:a-50},240,"linear");""!==b.s.dt.oScroll.sY&&(b.s.screen.y>b.s.scroller.bottom-50?d(b.s.dt.nTable.parentNode).animate({scrollTop:d(b.s.dt.nTable.parentNode).scrollTop()+50},240,"linear"):b.s.screen.y<b.s.scroller.top+50&&d(b.s.dt.nTable.parentNode).animate({scrollTop:d(b.s.dt.nTable.parentNode).scrollTop()-50},240,"linear"))},250)},_fnFillerDragMove:function(c){if(c.target&&"TD"==c.target.nodeName.toUpperCase()&&c.target!=this.s.drag.endTd){var b=
this._fnTargetCoords(c.target);"y"==this.c.mode&&b.x!=this.s.drag.startX&&(c.target=d("tbody>tr:eq("+b.y+")>td:eq("+this.s.drag.startX+")",this.dom.table)[0]);"x"==this.c.mode&&b.y!=this.s.drag.startY&&(c.target=d("tbody>tr:eq("+this.s.drag.startY+")>td:eq("+b.x+")",this.dom.table)[0]);"either"==this.c.mode&&(b.x!=this.s.drag.startX?c.target=d("tbody>tr:eq("+this.s.drag.startY+")>td:eq("+b.x+")",this.dom.table)[0]:b.y!=this.s.drag.startY&&(c.target=d("tbody>tr:eq("+b.y+")>td:eq("+this.s.drag.startX+
")",this.dom.table)[0]));"both"!==this.c.mode&&(b=this._fnTargetCoords(c.target));var a=this.s.drag;a.endTd=c.target;b.y>=this.s.drag.startY?this._fnUpdateBorder(a.startTd,a.endTd):this._fnUpdateBorder(a.endTd,a.startTd);this._fnFillerPosition(c.target)}this.s.screen.y=c.pageY;this.s.screen.scrollTop=d(l).scrollTop();""!==this.s.dt.oScroll.sY&&(this.s.scroller.scrollTop=d(this.s.dt.nTable.parentNode).scrollTop(),this.s.scroller.top=d(this.s.dt.nTable.parentNode).offset().top,this.s.scroller.bottom=
this.s.scroller.top+d(this.s.dt.nTable.parentNode).height())},_fnFillerFinish:function(c){var b=this,a;d(l).unbind("mousemove.AutoFill mouseup.AutoFill");this.dom.borderTop.style.display="none";this.dom.borderRight.style.display="none";this.dom.borderBottom.style.display="none";this.dom.borderLeft.style.display="none";this.s.drag.dragging=!1;clearInterval(this.s.screen.interval);var e=[],g=this.dom.table,f=this._fnTargetCoords(this.s.drag.startTd),k=this._fnTargetCoords(this.s.drag.endTd),h=function(a){return b.s.dt.oApi._fnVisibleToColumnIndex(b.s.dt,
a)};if(f.y<=k.y)for(c=f.y;c<=k.y;c++)if(f.x<=k.x)for(a=f.x;a<=k.x;a++)e.push({node:d("tbody>tr:eq("+c+")>td:eq("+a+")",g)[0],x:a-f.x,y:c-f.y,colIdx:h(a)});else for(a=f.x;a>=k.x;a--)e.push({node:d("tbody>tr:eq("+c+")>td:eq("+a+")",g)[0],x:a-f.x,y:c-f.y,colIdx:h(a)});else for(c=f.y;c>=k.y;c--)if(f.x<=k.x)for(a=f.x;a<=k.x;a++)e.push({node:d("tbody>tr:eq("+c+")>td:eq("+a+")",g)[0],x:a-f.x,y:c-f.y,colIdx:h(a)});else for(a=f.x;a>=k.x;a--)e.push({node:d("tbody>tr:eq("+c+")>td:eq("+a+")",g)[0],x:f.x-a,y:f.y-
c,colIdx:h(a)});if(!(1>=e.length)){var g=[],p;c=0;for(a=e.length;c<a;c++){var f=e[c],k=this.s.columns[f.colIdx],h=k.read.call(k,f.node),n=k.step.call(k,f.node,h,p,c,f.x,f.y);k.write.call(k,f.node,n);p=n;g.push({cell:f,colIdx:f.colIdx,newValue:n,oldValue:h})}null!==this.c.complete&&this.c.complete.call(this,g);m.Api?(new m.Api(this.s.dt)).draw(!1):this.s.dt.oInstance.fnDraw()}},_fnFillerDisplay:function(c){var b=this.dom.filler;if(!this.s.drag.dragging){var a="td"==c.target.nodeName.toLowerCase()?
c.target:d(c.target).parents("td")[0],e=this._fnTargetCoords(a).column;this.s.columns[e].enable?"mouseover"==c.type?(this.dom.currentTarget=a,this._fnFillerPosition(a),b.style.display="block"):c.relatedTarget&&c.relatedTarget.className.match(/AutoFill/)||(b.style.display="none"):b.style.display="none"}},_fnFillerPosition:function(c){var b=d(c).offset(),a=this.dom.filler;a.style.top=b.top-this.s.filler.height/2-1+d(c).outerHeight()+"px";a.style.left=b.left-this.s.filler.width/2-1+d(c).outerWidth()+
"px"}};m.AutoFill=h;m.AutoFill=h;h.version="1.2.1";h.defaults={mode:"y",complete:null,column:{enable:!0,increment:!0,read:function(c){return d(c).html()},write:function(c,b){var a=d(c).parents("table");if(m.Api)a.DataTable().cell(c).data(b);else{var a=a.dataTable(),e=a.fnGetPosition(c);a.fnUpdate(b,e[0],e[2],!1)}},step:function(c,b,a,d,g,f){c=/(\-?\d+)/;return(d=this.increment&&a?a.match(c):null)?a.replace(c,parseInt(d[1],10)+(0>g||0>f?-1:1)):a===p?b:a}}};return h};"function"===typeof define&&define.amd?
define(["jquery","datatables"],n):"object"===typeof exports?n(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.AutoFill&&n(jQuery,jQuery.fn.dataTable)})(window,document);

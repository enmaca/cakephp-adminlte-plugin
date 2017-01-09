/*
   Copyright 2010-2015 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
*/
(function(l,h,m){l=function(d,l){var e=function(a,c){this.CLASS&&"ColVis"==this.CLASS||alert("Warning: ColVis must be initialised with the keyword 'new'");"undefined"==typeof c&&(c={});var b=d.fn.dataTable.camelToHungarian;b&&(b(e.defaults,e.defaults,!0),b(e.defaults,c));this.s={dt:null,oInit:c,hidden:!0,abOriginal:[]};this.dom={wrapper:null,button:null,collection:null,background:null,catcher:null,buttons:[],groupButtons:[],restore:null};e.aInstances.push(this);this.s.dt=d.fn.dataTable.Api?(new d.fn.dataTable.Api(a)).settings()[0]:
a;this._fnConstruct(c);return this};e.prototype={button:function(){return this.dom.wrapper},fnRebuild:function(){this.rebuild()},rebuild:function(){for(var a=this.dom.buttons.length-1;0<=a;a--)this.dom.collection.removeChild(this.dom.buttons[a]);this.dom.buttons.splice(0,this.dom.buttons.length);this.dom.groupButtons.splice(0,this.dom.groupButtons.length);this.dom.restore&&this.dom.restore.parentNode(this.dom.restore);this._fnAddGroups();this._fnAddButtons();this._fnDrawCallback()},_fnConstruct:function(a){this._fnApplyCustomisation(a);
var c=this,b,f;this.dom.wrapper=h.createElement("div");this.dom.wrapper.className="ColVis";this.dom.button=d("<button />",{"class":this.s.dt.bJUI?"ColVis_Button ColVis_MasterButton ui-button ui-state-default":"ColVis_Button ColVis_MasterButton"}).append("<span>"+this.s.buttonText+"</span>").bind("mouseover"==this.s.activate?"mouseover":"click",function(a){a.preventDefault();c._fnCollectionShow()}).appendTo(this.dom.wrapper)[0];this.dom.catcher=this._fnDomCatcher();this.dom.collection=this._fnDomCollection();
this.dom.background=this._fnDomBackground();this._fnAddGroups();this._fnAddButtons();b=0;for(f=this.s.dt.aoColumns.length;b<f;b++)this.s.abOriginal.push(this.s.dt.aoColumns[b].bVisible);this.s.dt.aoDrawCallback.push({fn:function(){c._fnDrawCallback.call(c)},sName:"ColVis"});d(this.s.dt.oInstance).bind("column-reorder.dt",function(a,d,e){b=0;for(f=c.s.aiExclude.length;b<f;b++)c.s.aiExclude[b]=e.aiInvertMapping[c.s.aiExclude[b]];a=c.s.abOriginal.splice(e.iFrom,1)[0];c.s.abOriginal.splice(e.iTo,0,a);
c.fnRebuild()});d(this.s.dt.oInstance).bind("destroy.dt",function(){d(c.dom.wrapper).remove()});this._fnDrawCallback()},_fnApplyCustomisation:function(a){d.extend(!0,this.s,e.defaults,a);!this.s.showAll&&this.s.bShowAll&&(this.s.showAll=this.s.sShowAll);!this.s.restore&&this.s.bRestore&&(this.s.restore=this.s.sRestore);a=this.s.groups;var c=this.s.aoGroups;if(a)for(var b=0,f=a.length;b<f;b++)a[b].title&&(c[b].sTitle=a[b].title),a[b].columns&&(c[b].aiColumns=a[b].columns)},_fnDrawCallback:function(){for(var a=
this.s.dt.aoColumns,c=this.dom.buttons,b=this.s.aoGroups,f,g=0,e=c.length;g<e;g++)f=c[g],f.__columnIdx!==m&&d("input",f).prop("checked",a[f.__columnIdx].bVisible);c=function(c){for(var b=0,d=c.length;b<d;b++)if(!1===a[c[b]].bVisible)return!1;return!0};f=function(c){for(var b=0,d=c.length;b<d;b++)if(!0===a[c[b]].bVisible)return!1;return!0};g=0;for(e=b.length;g<e;g++)c(b[g].aiColumns)?(d("input",this.dom.groupButtons[g]).prop("checked",!0),d("input",this.dom.groupButtons[g]).prop("indeterminate",!1)):
f(b[g].aiColumns)?(d("input",this.dom.groupButtons[g]).prop("checked",!1),d("input",this.dom.groupButtons[g]).prop("indeterminate",!1)):d("input",this.dom.groupButtons[g]).prop("indeterminate",!0)},_fnAddGroups:function(){var a;if("undefined"!=typeof this.s.aoGroups)for(var c=0,b=this.s.aoGroups.length;c<b;c++)a=this._fnDomGroupButton(c),this.dom.groupButtons.push(a),this.dom.buttons.push(a),this.dom.collection.appendChild(a)},_fnAddButtons:function(){var a,c=this.s.dt.aoColumns;if(-1===d.inArray("all",
this.s.aiExclude))for(var b=0,f=c.length;b<f;b++)-1===d.inArray(b,this.s.aiExclude)&&(a=this._fnDomColumnButton(b),a.__columnIdx=b,this.dom.buttons.push(a));"alpha"===this.s.order&&this.dom.buttons.sort(function(a,b){var d=c[a.__columnIdx].sTitle,f=c[b.__columnIdx].sTitle;return d===f?0:d<f?-1:1});this.s.restore&&(a=this._fnDomRestoreButton(),a.className+=" ColVis_Restore",this.dom.buttons.push(a));this.s.showAll&&(a=this._fnDomShowXButton(this.s.showAll,!0),a.className+=" ColVis_ShowAll",this.dom.buttons.push(a));
this.s.showNone&&(a=this._fnDomShowXButton(this.s.showNone,!1),a.className+=" ColVis_ShowNone",this.dom.buttons.push(a));d(this.dom.collection).append(this.dom.buttons)},_fnDomRestoreButton:function(){var a=this;return d('<li class="ColVis_Special '+(this.s.dt.bJUI?"ui-button ui-state-default":"")+'">'+this.s.restore+"</li>").click(function(c){c=0;for(var b=a.s.abOriginal.length;c<b;c++)a.s.dt.oInstance.fnSetColumnVis(c,a.s.abOriginal[c],!1);a._fnAdjustOpenRows();a.s.dt.oInstance.fnAdjustColumnSizing(!1);
a.s.dt.oInstance.fnDraw(!1)})[0]},_fnDomShowXButton:function(a,c){var b=this;return d('<li class="ColVis_Special '+(this.s.dt.bJUI?"ui-button ui-state-default":"")+'">'+a+"</li>").click(function(a){a=0;for(var d=b.s.abOriginal.length;a<d;a++)-1===b.s.aiExclude.indexOf(a)&&b.s.dt.oInstance.fnSetColumnVis(a,c,!1);b._fnAdjustOpenRows();b.s.dt.oInstance.fnAdjustColumnSizing(!1);b.s.dt.oInstance.fnDraw(!1)})[0]},_fnDomGroupButton:function(a){var c=this,b=this.s.aoGroups[a];return d('<li class="ColVis_Special '+
(this.s.dt.bJUI?"ui-button ui-state-default":"")+'"><label><input type="checkbox" /><span>'+b.sTitle+"</span></label></li>").click(function(a){var g=!d("input",this).is(":checked");"li"!==a.target.nodeName.toLowerCase()&&(g=!g);for(a=0;a<b.aiColumns.length;a++)c.s.dt.oInstance.fnSetColumnVis(b.aiColumns[a],g)})[0]},_fnDomColumnButton:function(a){var c=this,b=this.s.dt.aoColumns[a],f=this.s.dt,b=null===this.s.fnLabel?b.sTitle:this.s.fnLabel(a,b.sTitle,b.nTh);return d("<li "+(f.bJUI?'class="ui-button ui-state-default"':
"")+'><label><input type="checkbox" /><span>'+b+"</span></label></li>").click(function(b){var e=!d("input",this).is(":checked");"li"===b.target.nodeName.toLowerCase()||"input"!=b.target.nodeName.toLowerCase()&&null!==c.s.fnStateChange||(e=!e);var h=d.fn.dataTableExt.iApiIndex;d.fn.dataTableExt.iApiIndex=c._fnDataTablesApiIndex.call(c);f.oFeatures.bServerSide?(c.s.dt.oInstance.fnSetColumnVis(a,e,!1),c.s.dt.oInstance.fnAdjustColumnSizing(!1),""===f.oScroll.sX&&""===f.oScroll.sY||c.s.dt.oInstance.oApi._fnScrollDraw(c.s.dt),
c._fnDrawCallback()):c.s.dt.oInstance.fnSetColumnVis(a,e);d.fn.dataTableExt.iApiIndex=h;null!==c.s.fnStateChange&&("span"==b.target.nodeName.toLowerCase()&&b.preventDefault(),c.s.fnStateChange.call(c,a,e))})[0]},_fnDataTablesApiIndex:function(){for(var a=0,c=this.s.dt.oInstance.length;a<c;a++)if(this.s.dt.oInstance[a]==this.s.dt.nTable)return a;return 0},_fnDomCollection:function(){return d("<ul />",{"class":this.s.dt.bJUI?"ColVis_collection ui-buttonset ui-buttonset-multi":"ColVis_collection"}).css({display:"none",
opacity:0,position:this.s.bCssPosition?"":"absolute"})[0]},_fnDomCatcher:function(){var a=this,c=h.createElement("div");c.className="ColVis_catcher";d(c).click(function(){a._fnCollectionHide.call(a,null,null)});return c},_fnDomBackground:function(){var a=this,c=d("<div></div>").addClass("ColVis_collectionBackground").css("opacity",0).click(function(){a._fnCollectionHide.call(a,null,null)});"mouseover"==this.s.activate&&c.mouseover(function(){a.s.overcollection=!1;a._fnCollectionHide.call(a,null,null)});
return c[0]},_fnCollectionShow:function(){var a=this,c;c=d(this.dom.button).offset();var b=this.dom.collection,f=this.dom.background,e=parseInt(c.left,10),k=parseInt(c.top+d(this.dom.button).outerHeight(),10);this.s.bCssPosition||(b.style.top=k+"px",b.style.left=e+"px");d(b).css({display:"block",opacity:0});f.style.bottom="0px";f.style.right="0px";k=this.dom.catcher.style;k.height=d(this.dom.button).outerHeight()+"px";k.width=d(this.dom.button).outerWidth()+"px";k.top=c.top+"px";k.left=e+"px";h.body.appendChild(f);
h.body.appendChild(b);h.body.appendChild(this.dom.catcher);d(b).animate({opacity:1},a.s.iOverlayFade);d(f).animate({opacity:0.1},a.s.iOverlayFade,"linear",function(){d.browser&&d.browser.msie&&"6.0"==d.browser.version&&a._fnDrawCallback()});this.s.bCssPosition||(c="left"==this.s.sAlign?e:e-d(b).outerWidth()+d(this.dom.button).outerWidth(),b.style.left=c+"px",f=d(b).outerWidth(),d(b).outerHeight(),e=d(h).width(),c+f>e&&(b.style.left=e-f+"px"));this.s.hidden=!1},_fnCollectionHide:function(){var a=this;
this.s.hidden||null===this.dom.collection||(this.s.hidden=!0,d(this.dom.collection).animate({opacity:0},a.s.iOverlayFade,function(a){this.style.display="none"}),d(this.dom.background).animate({opacity:0},a.s.iOverlayFade,function(c){h.body.removeChild(a.dom.background);h.body.removeChild(a.dom.catcher)}))},_fnAdjustOpenRows:function(){for(var a=this.s.dt.aoOpenRows,c=this.s.dt.oApi._fnVisbleColumns(this.s.dt),b=0,d=a.length;b<d;b++)a[b].nTr.getElementsByTagName("td")[0].colSpan=c}};e.fnRebuild=function(a){var c=
null;"undefined"!=typeof a&&(c=d.fn.dataTable.Api?(new d.fn.dataTable.Api(a)).table().node():a.fnSettings().nTable);for(var b=0,f=e.aInstances.length;b<f;b++)"undefined"!=typeof a&&c!=e.aInstances[b].s.dt.nTable||e.aInstances[b].fnRebuild()};e.defaults={active:"click",buttonText:"Show / hide columns",aiExclude:[],bRestore:!1,sRestore:"Restore original",bShowAll:!1,sShowAll:"Show All",sAlign:"left",fnStateChange:null,iOverlayFade:500,fnLabel:null,bCssPosition:!1,aoGroups:[],order:"column"};e.aInstances=
[];e.prototype.CLASS="ColVis";e.VERSION="1.1.2";e.prototype.VERSION=e.VERSION;"function"==typeof d.fn.dataTable&&"function"==typeof d.fn.dataTableExt.fnVersionCheck&&d.fn.dataTableExt.fnVersionCheck("1.7.0")?d.fn.dataTableExt.aoFeatures.push({fnInit:function(a){var c=a.oInit;return(new e(a,c.colVis||c.oColVis||{})).button()},cFeature:"C",sFeature:"ColVis"}):alert("Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download");d.fn.dataTable.ColVis=e;return d.fn.DataTable.ColVis=
e};"function"===typeof define&&define.amd?define(["jquery","datatables"],l):"object"===typeof exports?l(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.ColVis&&l(jQuery,jQuery.fn.dataTable)})(window,document);
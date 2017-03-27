var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(g,m,n){if(n.get||n.set)throw new TypeError("ES3 does not support getters and setters.");g!=Array.prototype&&g!=Object.prototype&&(g[m]=n.value)};$jscomp.getGlobal=function(g){return"undefined"!=typeof window&&window===g?g:"undefined"!=typeof global&&null!=global?global:g};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(g){return $jscomp.SYMBOL_PREFIX+(g||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var g=$jscomp.global.Symbol.iterator;g||(g=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[g]&&$jscomp.defineProperty(Array.prototype,g,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(g){var m=0;return $jscomp.iteratorPrototype(function(){return m<g.length?{done:!1,value:g[m++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(g){$jscomp.initSymbolIterator();g={next:g};g[$jscomp.global.Symbol.iterator]=function(){return this};return g};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(g,m){$jscomp.initSymbolIterator();g instanceof String&&(g+="");var n=0,p={next:function(){if(n<g.length){var w=n++;return{value:m(w,g[w]),done:!1}}p.next=function(){return{done:!0,value:void 0}};return p.next()}};p[Symbol.iterator]=function(){return p};return p};
$jscomp.polyfill=function(g,m,n,p){if(m){n=$jscomp.global;g=g.split(".");for(p=0;p<g.length-1;p++){var w=g[p];w in n||(n[w]={});n=n[w]}g=g[g.length-1];p=n[g];m=m(p);m!=p&&null!=m&&$jscomp.defineProperty(n,g,{configurable:!0,writable:!0,value:m})}};$jscomp.polyfill("Array.prototype.values",function(g){return g?g:function(){return $jscomp.iteratorFromArray(this,function(m,g){return g})}},"es6","es3");
(function(){var g,m,n,p,w=[].slice,t=function(d,b){return function(){return d.apply(b,arguments)}},B={}.hasOwnProperty,y=function(d,b){function a(){this.constructor=d}for(var c in b)B.call(b,c)&&(d[c]=b[c]);a.prototype=b.prototype;d.prototype=new a;d.__super__=b.prototype;return d},C=[].indexOf||function(d){for(var b=0,a=this.length;b<a;b++)if(b in this&&this[b]===d)return b;return-1};m=window.Morris={};g=jQuery;m.EventEmitter=function(){function d(){}d.prototype.on=function(b,a){null==this.handlers&&
(this.handlers={});null==this.handlers[b]&&(this.handlers[b]=[]);this.handlers[b].push(a);return this};d.prototype.fire=function(){var b,a,c,f,h,e;a=arguments[0];b=2<=arguments.length?w.call(arguments,1):[];if(null!=this.handlers&&null!=this.handlers[a]){h=this.handlers[a];e=[];c=0;for(f=h.length;c<f;c++)a=h[c],e.push(a.apply(null,b));return e}};return d}();m.commas=function(d){var b,a;return null!=d?(a=0>d?"-":"",b=Math.abs(d),d=Math.floor(b).toFixed(0),a+=d.replace(/(?=(?:\d{3})+$)(?!^)/g,","),
b=b.toString(),b.length>d.length&&(a+=b.slice(d.length)),a):"-"};m.pad2=function(d){return(10>d?"0":"")+d};m.Grid=function(d){function b(a){this.resizeHandler=t(this.resizeHandler,this);var c=this;this.el="string"===typeof a.element?g(document.getElementById(a.element)):g(a.element);if(null==this.el||0===this.el.length)throw Error("Graph container element not found");"static"===this.el.css("position")&&this.el.css("position","relative");this.options=g.extend({},this.gridDefaults,this.defaults||{},
a);"string"===typeof this.options.units&&(this.options.postUnits=a.units);this.raphael=new Raphael(this.el[0]);this.elementHeight=this.elementWidth=null;this.dirty=!1;this.selectFrom=null;this.init&&this.init();this.setData(this.options.data);this.el.bind("mousemove",function(a){var f,e;f=c.el.offset();e=a.pageX-f.left;return c.selectFrom?(a=c.data[c.hitTest(Math.min(e,c.selectFrom))]._x,e=c.data[c.hitTest(Math.max(e,c.selectFrom))]._x,c.selectionRect.attr({x:a,width:e-a})):c.fire("hovermove",e,a.pageY-
f.top)});this.el.bind("mouseleave",function(a){c.selectFrom&&(c.selectionRect.hide(),c.selectFrom=null);return c.fire("hoverout")});this.el.bind("touchstart touchmove touchend",function(a){var f;f=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];a=c.el.offset();return c.fire("hovermove",f.pageX-a.left,f.pageY-a.top)});this.el.bind("click",function(a){var f;f=c.el.offset();return c.fire("gridclick",a.pageX-f.left,a.pageY-f.top)});this.options.rangeSelect&&(this.selectionRect=this.raphael.rect(0,
0,0,this.el.innerHeight()).attr({fill:this.options.rangeSelectColor,stroke:!1}).toBack().hide(),this.el.bind("mousedown",function(a){var f;f=c.el.offset();return c.startRange(a.pageX-f.left)}),this.el.bind("mouseup",function(a){var f;f=c.el.offset();c.endRange(a.pageX-f.left);return c.fire("hovermove",a.pageX-f.left,a.pageY-f.top)}));this.options.resize&&g(window).bind("resize",function(a){null!=c.timeoutId&&window.clearTimeout(c.timeoutId);return c.timeoutId=window.setTimeout(c.resizeHandler,100)});
this.el.css("-webkit-tap-highlight-color","rgba(0,0,0,0)");this.postInit&&this.postInit()}y(b,d);b.prototype.gridDefaults={dateFormat:null,axes:!0,grid:!0,gridLineColor:"#aaa",gridStrokeWidth:.5,gridTextColor:"#888",gridTextSize:12,gridTextFamily:"sans-serif",gridTextWeight:"normal",hideHover:!1,yLabelFormat:null,xLabelAngle:0,numLines:5,padding:25,parseTime:!0,postUnits:"",preUnits:"",ymax:"auto",ymin:"auto 0",goals:[],goalStrokeWidth:1,goalLineColors:["#666633","#999966","#cc6666","#663333"],events:[],
eventStrokeWidth:1,eventLineColors:["#005a04","#ccffbb","#3a5f0b","#005502"],rangeSelect:null,rangeSelectColor:"#eef",resize:!1};b.prototype.setData=function(a,c){var f,h,e,b,d,l,z,r,q,g,A,v,x,n,p;null==c&&(c=!0);this.options.data=a;if(null==a||0===a.length)this.data=[],this.raphael.clear(),null!=this.hover&&this.hover.hide();else{v=this.cumulative?0:null;x=this.cumulative?0:null;0<this.options.goals.length&&(d=Math.min.apply(Math,this.options.goals),b=Math.max.apply(Math,this.options.goals),x=null!=
x?Math.min(x,d):d,v=null!=v?Math.max(v,b):b);this.data=function(){var c,f,b;b=[];e=c=0;for(f=a.length;c<f;e=++c){z=a[e];l={src:z};l.label=z[this.options.xkey];this.options.parseTime?(l.x=m.parseDate(l.label),this.options.dateFormat?l.label=this.options.dateFormat(l.x):"number"===typeof l.label&&(l.label=(new Date(l.label)).toString())):(l.x=e,this.options.xLabelFormat&&(l.label=this.options.xLabelFormat(l)));q=0;var d=l,k,u,r,g;u=this.options.ykeys;k=[];h=g=0;for(r=u.length;g<r;h=++g)A=u[h],n=z[A],
"string"===typeof n&&(n=parseFloat(n)),null!=n&&"number"!==typeof n&&(n=null),null!=n&&(this.cumulative?q+=n:null!=v?(v=Math.max(n,v),x=Math.min(n,x)):v=x=n),this.cumulative&&null!=q&&(v=Math.max(q,v),x=Math.min(q,x)),k.push(n);d.y=k;b.push(l)}return b}.call(this);this.options.parseTime&&(this.data=this.data.sort(function(a,c){return(a.x>c.x)-(c.x>a.x)}));this.xmin=this.data[0].x;this.xmax=this.data[this.data.length-1].x;this.events=[];0<this.options.events.length&&(this.events=this.options.parseTime?
function(){var a,c,h,b;h=this.options.events;b=[];a=0;for(c=h.length;a<c;a++)f=h[a],b.push(m.parseDate(f));return b}.call(this):this.options.events,this.xmax=Math.max(this.xmax,Math.max.apply(Math,this.events)),this.xmin=Math.min(this.xmin,Math.min.apply(Math,this.events)));this.xmin===this.xmax&&(--this.xmin,this.xmax+=1);this.ymin=this.yboundary("min",x);this.ymax=this.yboundary("max",v);this.ymin===this.ymax&&(x&&--this.ymin,this.ymax+=1);if(!0===(p=this.options.axes)||"both"===p||"y"===p||!0===
this.options.grid)this.options.ymax===this.gridDefaults.ymax&&this.options.ymin===this.gridDefaults.ymin?(this.grid=this.autoGridLines(this.ymin,this.ymax,this.options.numLines),this.ymin=Math.min(this.ymin,this.grid[0]),this.ymax=Math.max(this.ymax,this.grid[this.grid.length-1])):(r=(this.ymax-this.ymin)/(this.options.numLines-1),this.grid=function(){var a,c,f;f=[];g=a=this.ymin;for(c=this.ymax;0<r?a<=c:a>=c;g=a+=r)f.push(g);return f}.call(this));this.dirty=!0;if(c)return this.redraw()}};b.prototype.yboundary=
function(a,c){var f;f=this.options["y"+a];return"string"===typeof f?"auto"===f.slice(0,4)?5<f.length?(f=parseInt(f.slice(5),10),null==c?f:Math[a](c,f)):null!=c?c:0:parseInt(f,10):f};b.prototype.autoGridLines=function(a,c,f){var h,b,d,k,l,m;l=Math.pow(10,Math.floor(Math.log(c-a)/Math.log(10)));b=Math.floor(a/l)*l;h=Math.ceil(c/l)*l;k=(h-b)/(f-1);1===l&&1<k&&Math.ceil(k)!==k&&(k=Math.ceil(k),h=b+k*(f-1));0>b&&0<h&&(b=Math.floor(a/k)*k,h=Math.ceil(c/k)*k);1>k?(d=Math.floor(Math.log(k)/Math.log(10)),
a=function(){var a,c;c=[];for(m=a=b;0<k?a<=h:a>=h;m=a+=k)c.push(parseFloat(m.toFixed(1-d)));return c}()):a=function(){var a,c;c=[];for(m=a=b;0<k?a<=h:a>=h;m=a+=k)c.push(m);return c}();return a};b.prototype._calc=function(){var a,c,f,h,b,d;b=this.el.width();f=this.el.height();if(this.elementWidth!==b||this.elementHeight!==f||this.dirty){this.elementWidth=b;this.elementHeight=f;this.dirty=!1;this.left=this.options.padding;this.right=this.elementWidth-this.options.padding;this.top=this.options.padding;
this.bottom=this.elementHeight-this.options.padding;if(!0===(d=this.options.axes)||"both"===d||"y"===d)f=function(){var a,f,h,b;h=this.grid;b=[];a=0;for(f=h.length;a<f;a++)c=h[a],b.push(this.measureText(this.yAxisFormat(c)).width);return b}.call(this),this.left+=Math.max.apply(Math,f);if(!0===(a=this.options.axes)||"both"===a||"x"===a)a=function(){var a,c,f;f=[];h=a=0;for(c=this.data.length;0<=c?a<c:a>c;h=0<=c?++a:--a)f.push(this.measureText(this.data[h].text,-this.options.xLabelAngle).height);return f}.call(this),
this.bottom-=Math.max.apply(Math,a);this.width=Math.max(1,this.right-this.left);this.height=Math.max(1,this.bottom-this.top);this.dx=this.width/(this.xmax-this.xmin);this.dy=this.height/(this.ymax-this.ymin);if(this.calc)return this.calc()}};b.prototype.transY=function(a){return this.bottom-(a-this.ymin)*this.dy};b.prototype.transX=function(a){return 1===this.data.length?(this.left+this.right)/2:this.left+(a-this.xmin)*this.dx};b.prototype.redraw=function(){this.raphael.clear();this._calc();this.drawGrid();
this.drawGoals();this.drawEvents();if(this.draw)return this.draw()};b.prototype.measureText=function(a,c){var f,h;null==c&&(c=0);h=this.raphael.text(100,100,a).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).rotate(c);f=h.getBBox();h.remove();return f};b.prototype.yAxisFormat=function(a){return this.yLabelFormat(a)};b.prototype.yLabelFormat=function(a){return"function"===typeof this.options.yLabelFormat?this.options.yLabelFormat(a):
""+this.options.preUnits+m.commas(a)+this.options.postUnits};b.prototype.drawGrid=function(){var a,c,f,h,b,d,k;if(!1!==this.options.grid||!0===(a=this.options.axes)||"both"===a||"y"===a){b=this.grid;k=[];f=0;for(h=b.length;f<h;f++)a=b[f],c=this.transY(a),!0!==(d=this.options.axes)&&"both"!==d&&"y"!==d||this.drawYAxisLabel(this.left-this.options.padding/2,c,this.yAxisFormat(a)),this.options.grid?k.push(this.drawGridLine("M"+this.left+","+c+"H"+(this.left+this.width))):k.push(void 0);return k}};b.prototype.drawGoals=
function(){var a,c,f,h,b,d;b=this.options.goals;d=[];a=f=0;for(h=b.length;f<h;a=++f)c=b[a],a=this.options.goalLineColors[a%this.options.goalLineColors.length],d.push(this.drawGoal(c,a));return d};b.prototype.drawEvents=function(){var a,c,f,b,e,d;e=this.events;d=[];a=f=0;for(b=e.length;f<b;a=++f)c=e[a],a=this.options.eventLineColors[a%this.options.eventLineColors.length],d.push(this.drawEvent(c,a));return d};b.prototype.drawGoal=function(a,c){return this.raphael.path("M"+this.left+","+this.transY(a)+
"H"+this.right).attr("stroke",c).attr("stroke-width",this.options.goalStrokeWidth)};b.prototype.drawEvent=function(a,c){return this.raphael.path("M"+this.transX(a)+","+this.bottom+"V"+this.top).attr("stroke",c).attr("stroke-width",this.options.eventStrokeWidth)};b.prototype.drawYAxisLabel=function(a,c,f){return this.raphael.text(a,c,f).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor).attr("text-anchor",
"end")};b.prototype.drawGridLine=function(a){return this.raphael.path(a).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)};b.prototype.startRange=function(a){this.hover.hide();this.selectFrom=a;return this.selectionRect.attr({x:a,width:0}).show()};b.prototype.endRange=function(a){var c;if(this.selectFrom)return c=Math.min(this.selectFrom,a),a=Math.max(this.selectFrom,a),this.options.rangeSelect.call(this.el,{start:this.data[this.hitTest(c)].x,end:this.data[this.hitTest(a)].x}),
this.selectFrom=null};b.prototype.resizeHandler=function(){this.timeoutId=null;this.raphael.setSize(this.el.width(),this.el.height());return this.redraw()};return b}(m.EventEmitter);m.parseDate=function(d){var b,a,c,f,h,e;if("number"===typeof d)return d;a=d.match(/^(\d+) Q(\d)$/);f=d.match(/^(\d+)-(\d+)$/);h=d.match(/^(\d+)-(\d+)-(\d+)$/);b=d.match(/^(\d+) W(\d+)$/);c=d.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/);e=d.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/);
return a?(new Date(parseInt(a[1],10),3*parseInt(a[2],10)-1,1)).getTime():f?(new Date(parseInt(f[1],10),parseInt(f[2],10)-1,1)).getTime():h?(new Date(parseInt(h[1],10),parseInt(h[2],10)-1,parseInt(h[3],10))).getTime():b?(e=new Date(parseInt(b[1],10),0,1),4!==e.getDay()&&e.setMonth(0,1+(4-e.getDay()+7)%7),e.getTime()+6048E5*parseInt(b[2],10)):c?c[6]?(d=0,"Z"!==c[6]&&(d=60*parseInt(c[8],10)+parseInt(c[9],10),"+"===c[7]&&(d=0-d)),Date.UTC(parseInt(c[1],10),parseInt(c[2],10)-1,parseInt(c[3],10),parseInt(c[4],
10),parseInt(c[5],10)+d)):(new Date(parseInt(c[1],10),parseInt(c[2],10)-1,parseInt(c[3],10),parseInt(c[4],10),parseInt(c[5],10))).getTime():e?(c=parseFloat(e[6]),b=Math.floor(c),c=Math.round(1E3*(c-b)),e[8]?(d=0,"Z"!==e[8]&&(d=60*parseInt(e[10],10)+parseInt(e[11],10),"+"===e[9]&&(d=0-d)),Date.UTC(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10),parseInt(e[4],10),parseInt(e[5],10)+d,b,c)):(new Date(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10),parseInt(e[4],10),parseInt(e[5],10),b,
c)).getTime()):(new Date(parseInt(d,10),0,1)).getTime()};m.Hover=function(){function d(b){null==b&&(b={});this.options=g.extend({},m.Hover.defaults,b);this.el=g("<div class='"+this.options["class"]+"'></div>");this.el.hide();this.options.parent.append(this.el)}d.defaults={"class":"morris-hover morris-default-style"};d.prototype.update=function(b,a,c){return b?(this.html(b),this.show(),this.moveTo(a,c)):this.hide()};d.prototype.html=function(b){return this.el.html(b)};d.prototype.moveTo=function(b,
a){var c,f,h,e;e=this.options.parent.innerWidth();h=this.options.parent.innerHeight();f=this.el.outerWidth();c=this.el.outerHeight();f=Math.min(Math.max(0,b-f/2),e-f);null!=a?(e=a-c-10,0>e&&(e=a+10,e+c>h&&(e=h/2-c/2))):e=h/2-c/2;return this.el.css({left:f+"px",top:parseInt(e)+"px"})};d.prototype.show=function(){return this.el.show()};d.prototype.hide=function(){return this.el.hide()};return d}();m.Line=function(d){function b(a){this.hilight=t(this.hilight,this);this.onHoverOut=t(this.onHoverOut,this);
this.onHoverMove=t(this.onHoverMove,this);this.onGridClick=t(this.onGridClick,this);if(!(this instanceof m.Line))return new m.Line(a);b.__super__.constructor.call(this,a)}y(b,d);b.prototype.init=function(){if("always"!==this.options.hideHover)return this.hover=new m.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)};b.prototype.defaults={lineWidth:3,pointSize:4,lineColors:"#0b62a4 #7A92A3 #4da74d #afd8f8 #edc240 #cb4b4b #9440ed".split(" "),
pointStrokeWidths:[1],pointStrokeColors:["#ffffff"],pointFillColors:[],smooth:!0,xLabels:"auto",xLabelFormat:null,xLabelMargin:24,hideHover:!1};b.prototype.calc=function(){this.calcPoints();return this.generatePaths()};b.prototype.calcPoints=function(){var a,c,f,b,e,d;e=this.data;d=[];f=0;for(b=e.length;f<b;f++)a=e[f],a._x=this.transX(a.x),a._y=function(){var f,b,h,e;h=a.y;e=[];f=0;for(b=h.length;f<b;f++)c=h[f],null!=c?e.push(this.transY(c)):e.push(c);return e}.call(this),d.push(a._ymax=Math.min.apply(Math,
[this.bottom].concat(function(){var f,b,h,e;h=a._y;e=[];f=0;for(b=h.length;f<b;f++)c=h[f],null!=c&&e.push(c);return e}())));return d};b.prototype.hitTest=function(a){var c,f,b,e,d;if(0===this.data.length)return null;d=this.data.slice(1);c=b=0;for(e=d.length;b<e&&!(f=d[c],a<(f._x+this.data[c]._x)/2);c=++b);return c};b.prototype.onGridClick=function(a,c){var f;f=this.hitTest(a);return this.fire("click",f,this.data[f].src,a,c)};b.prototype.onHoverMove=function(a,c){var f;f=this.hitTest(a);return this.displayHoverForRow(f)};
b.prototype.onHoverOut=function(){if(!1!==this.options.hideHover)return this.displayHoverForRow(null)};b.prototype.displayHoverForRow=function(a){var c;if(null!=a)return(c=this.hover).update.apply(c,this.hoverContentForRow(a)),this.hilight(a);this.hover.hide();return this.hilight()};b.prototype.hoverContentForRow=function(a){var c,f,b,e,d,k,l;b=this.data[a];c="<div class='morris-hover-row-label'>"+b.label+"</div>";l=b.y;f=d=0;for(k=l.length;d<k;f=++d)e=l[f],c+="<div class='morris-hover-point' style='color: "+
this.colorFor(b,f,"label")+"'>\n  "+this.options.labels[f]+":\n  "+this.yLabelFormat(e)+"\n</div>";"function"===typeof this.options.hoverCallback&&(c=this.options.hoverCallback(a,this.options,c,b.src));return[c,b._x,b._ymax]};b.prototype.generatePaths=function(){var a,c,f,b,e,d,k;k=[];a=b=0;for(e=this.options.ykeys.length;0<=e?b<e:b>e;a=0<=e?++b:--b){f="boolean"===typeof this.options.smooth?this.options.smooth:(d=this.options.ykeys[a],0<=C.call(this.options.smooth,d));var l,g,r,q;g=this.data;l=[];
q=0;for(r=g.length;q<r;q++)c=g[q],void 0!==c._y[a]&&l.push({x:c._x,y:c._y[a]});a=l;1<a.length?k.push(m.Line.createPath(a,f,this.bottom)):k.push(null)}return this.paths=k};b.prototype.draw=function(){var a;!0!==(a=this.options.axes)&&"both"!==a&&"x"!==a||this.drawXAxis();this.drawSeries();if(!1===this.options.hideHover)return this.displayHoverForRow(this.data.length-1)};b.prototype.drawXAxis=function(){var a,c,f,b,e,d,k,l,g,r,q=this;k=this.bottom+this.options.padding/2;b=e=null;a=function(a,c){var f,
h,d;f=q.drawXAxisLabel(q.transX(c),k,a);d=f.getBBox();f.transform("r"+-q.options.xLabelAngle);h=f.getBBox();f.transform("t0,"+h.height/2+"...");0!==q.options.xLabelAngle&&(h=-.5*d.width*Math.cos(q.options.xLabelAngle*Math.PI/180),f.transform("t"+h+",0..."));h=f.getBBox();return(null==e||e>=h.x+h.width||null!=b&&b>=h.x)&&0<=h.x&&h.x+h.width<q.el.width()?(0!==q.options.xLabelAngle&&(f=1.25*q.options.gridTextSize/Math.sin(q.options.xLabelAngle*Math.PI/180),b=h.x-f),e=h.x-q.options.xLabelMargin):f.remove()};
f=this.options.parseTime?1===this.data.length&&"auto"===this.options.xLabels?[[this.data[0].label,this.data[0].x]]:m.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat):function(){var a,c,f,b;f=this.data;b=[];a=0;for(c=f.length;a<c;a++)d=f[a],b.push([d.label,d.x]);return b}.call(this);f.reverse();r=[];l=0;for(g=f.length;l<g;l++)c=f[l],r.push(a(c[0],c[1]));return r};b.prototype.drawSeries=function(){var a,c,f,b;this.seriesPoints=[];for(a=c=f=this.options.ykeys.length-
1;0>=f?0>=c:0<=c;a=0>=f?++c:--c)this._drawLineFor(a);b=[];for(a=c=f=this.options.ykeys.length-1;0>=f?0>=c:0<=c;a=0>=f?++c:--c)b.push(this._drawPointFor(a));return b};b.prototype._drawPointFor=function(a){var c,f,b,e,d,k;this.seriesPoints[a]=[];d=this.data;k=[];b=0;for(e=d.length;b<e;b++)f=d[b],c=null,null!=f._y[a]&&(c=this.drawLinePoint(f._x,f._y[a],this.colorFor(f,a,"point"),a)),k.push(this.seriesPoints[a].push(c));return k};b.prototype._drawLineFor=function(a){var c;c=this.paths[a];if(null!==c)return this.drawLinePath(c,
this.colorFor(null,a,"line"),a)};b.createPath=function(a,c,f){var b,e,d,k,l,g,r,q,n,p;r="";c&&(d=m.Line.gradients(a));q={y:null};k=n=0;for(p=a.length;n<p;k=++n)b=a[k],null!=b.y&&(null!=q.y?c?(e=d[k],g=d[k-1],l=(b.x-q.x)/4,k=q.x+l,g=Math.min(f,q.y+l*g),q=b.x-l,e=Math.min(f,b.y-l*e),r+="C"+k+","+g+","+q+","+e+","+b.x+","+b.y):r+="L"+b.x+","+b.y:c&&null==d[k]||(r+="M"+b.x+","+b.y)),q=b;return r};b.gradients=function(a){var c,f,b,e,d,k,l;f=function(a,c){return(a.y-c.y)/(a.x-c.x)};l=[];b=d=0;for(k=a.length;d<
k;b=++d)c=a[b],null!=c.y?(e=a[b+1]||{y:null},b=a[b-1]||{y:null},null!=b.y&&null!=e.y?l.push(f(b,e)):null!=b.y?l.push(f(b,c)):null!=e.y?l.push(f(c,e)):l.push(null)):l.push(null);return l};b.prototype.hilight=function(a){var c,b,d;if(null!==this.prevHilight&&this.prevHilight!==a)for(c=b=0,d=this.seriesPoints.length-1;0<=d?b<=d:b>=d;c=0<=d?++b:--b)this.seriesPoints[c][this.prevHilight]&&this.seriesPoints[c][this.prevHilight].animate(this.pointShrinkSeries(c));if(null!==a&&this.prevHilight!==a)for(c=
b=0,d=this.seriesPoints.length-1;0<=d?b<=d:b>=d;c=0<=d?++b:--b)this.seriesPoints[c][a]&&this.seriesPoints[c][a].animate(this.pointGrowSeries(c));return this.prevHilight=a};b.prototype.colorFor=function(a,c,b){return"function"===typeof this.options.lineColors?this.options.lineColors.call(this,a,c,b):"point"===b?this.options.pointFillColors[c%this.options.pointFillColors.length]||this.options.lineColors[c%this.options.lineColors.length]:this.options.lineColors[c%this.options.lineColors.length]};b.prototype.drawXAxisLabel=
function(a,c,b){return this.raphael.text(a,c,b).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)};b.prototype.drawLinePath=function(a,c,b){return this.raphael.path(a).attr("stroke",c).attr("stroke-width",this.lineWidthForSeries(b))};b.prototype.drawLinePoint=function(a,c,b,d){return this.raphael.circle(a,c,this.pointSizeForSeries(d)).attr("fill",b).attr("stroke-width",
this.pointStrokeWidthForSeries(d)).attr("stroke",this.pointStrokeColorForSeries(d))};b.prototype.pointStrokeWidthForSeries=function(a){return this.options.pointStrokeWidths[a%this.options.pointStrokeWidths.length]};b.prototype.pointStrokeColorForSeries=function(a){return this.options.pointStrokeColors[a%this.options.pointStrokeColors.length]};b.prototype.lineWidthForSeries=function(a){return this.options.lineWidth instanceof Array?this.options.lineWidth[a%this.options.lineWidth.length]:this.options.lineWidth};
b.prototype.pointSizeForSeries=function(a){return this.options.pointSize instanceof Array?this.options.pointSize[a%this.options.pointSize.length]:this.options.pointSize};b.prototype.pointGrowSeries=function(a){return Raphael.animation({r:this.pointSizeForSeries(a)+3},25,"linear")};b.prototype.pointShrinkSeries=function(a){return Raphael.animation({r:this.pointSizeForSeries(a)},25,"linear")};return b}(m.Grid);m.labelSeries=function(d,b,a,c,f){var h,e,u,k,l;h=200*(b-d)/a;a=new Date(d);c=m.LABEL_SPECS[c];
if(void 0===c)for(l=m.AUTO_LABEL_ORDER,u=0,k=l.length;u<k;u++)if(e=l[u],e=m.LABEL_SPECS[e],h>=e.span){c=e;break}void 0===c&&(c=m.LABEL_SPECS.second);f&&(c=g.extend({},c,{fmt:f}));f=c.start(a);for(a=[];(h=f.getTime())<=b;)h>=d&&a.push([c.fmt(f),h]),c.incr(f);return a};n=function(d){return{span:6E4*d,start:function(b){return new Date(b.getFullYear(),b.getMonth(),b.getDate(),b.getHours())},fmt:function(b){return""+m.pad2(b.getHours())+":"+m.pad2(b.getMinutes())},incr:function(b){return b.setUTCMinutes(b.getUTCMinutes()+
d)}}};p=function(d){return{span:1E3*d,start:function(b){return new Date(b.getFullYear(),b.getMonth(),b.getDate(),b.getHours(),b.getMinutes())},fmt:function(b){return""+m.pad2(b.getHours())+":"+m.pad2(b.getMinutes())+":"+m.pad2(b.getSeconds())},incr:function(b){return b.setUTCSeconds(b.getUTCSeconds()+d)}}};m.LABEL_SPECS={decade:{span:1728E8,start:function(d){return new Date(d.getFullYear()-d.getFullYear()%10,0,1)},fmt:function(d){return""+d.getFullYear()},incr:function(d){return d.setFullYear(d.getFullYear()+
10)}},year:{span:1728E7,start:function(d){return new Date(d.getFullYear(),0,1)},fmt:function(d){return""+d.getFullYear()},incr:function(d){return d.setFullYear(d.getFullYear()+1)}},month:{span:24192E5,start:function(d){return new Date(d.getFullYear(),d.getMonth(),1)},fmt:function(d){return""+d.getFullYear()+"-"+m.pad2(d.getMonth()+1)},incr:function(d){return d.setMonth(d.getMonth()+1)}},week:{span:6048E5,start:function(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate())},fmt:function(d){return""+
d.getFullYear()+"-"+m.pad2(d.getMonth()+1)+"-"+m.pad2(d.getDate())},incr:function(d){return d.setDate(d.getDate()+7)}},day:{span:864E5,start:function(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate())},fmt:function(d){return""+d.getFullYear()+"-"+m.pad2(d.getMonth()+1)+"-"+m.pad2(d.getDate())},incr:function(d){return d.setDate(d.getDate()+1)}},hour:n(60),"30min":n(30),"15min":n(15),"10min":n(10),"5min":n(5),minute:n(1),"30sec":p(30),"15sec":p(15),"10sec":p(10),"5sec":p(5),second:p(1)};m.AUTO_LABEL_ORDER=
"decade year month week day hour 30min 15min 10min 5min minute 30sec 15sec 10sec 5sec second".split(" ");m.Area=function(d){function b(c){if(!(this instanceof m.Area))return new m.Area(c);c=g.extend({},a,c);this.cumulative=!c.behaveLikeLine;"auto"===c.fillOpacity&&(c.fillOpacity=c.behaveLikeLine?.8:1);b.__super__.constructor.call(this,c)}var a;y(b,d);a={fillOpacity:"auto",behaveLikeLine:!1};b.prototype.calcPoints=function(){var a,b,d,e,g,k,l;k=this.data;l=[];e=0;for(g=k.length;e<g;e++){a=k[e];a._x=
this.transX(a.x);b=0;var m=a,r,q,n,p;q=a.y;r=[];p=0;for(n=q.length;p<n;p++)d=q[p],this.options.behaveLikeLine?r.push(this.transY(d)):(b+=d||0,r.push(this.transY(b)));m._y=r;l.push(a._ymax=Math.max.apply(Math,a._y))}return l};b.prototype.drawSeries=function(){var a,b,d,e,g,k,l,m;this.seriesPoints=[];b=this.options.behaveLikeLine?function(){k=[];for(var a=0,c=this.options.ykeys.length-1;0<=c?a<=c:a>=c;0<=c?a++:a--)k.push(a);return k}.apply(this):function(){l=[];for(var a=g=this.options.ykeys.length-
1;0>=g?0>=a:0<=a;0>=g?a++:a--)l.push(a);return l}.apply(this);m=[];d=0;for(e=b.length;d<e;d++)a=b[d],this._drawFillFor(a),this._drawLineFor(a),m.push(this._drawPointFor(a));return m};b.prototype._drawFillFor=function(a){var c;c=this.paths[a];if(null!==c)return c+="L"+this.transX(this.xmax)+","+this.bottom+"L"+this.transX(this.xmin)+","+this.bottom+"Z",this.drawFilledPath(c,this.fillForSeries(a))};b.prototype.fillForSeries=function(a){a=Raphael.rgb2hsl(this.colorFor(this.data[a],a,"line"));return Raphael.hsl(a.h,
this.options.behaveLikeLine?.9*a.s:.75*a.s,Math.min(.98,this.options.behaveLikeLine?1.2*a.l:1.25*a.l))};b.prototype.drawFilledPath=function(a,b){return this.raphael.path(a).attr("fill",b).attr("fill-opacity",this.options.fillOpacity).attr("stroke","none")};return b}(m.Line);m.Bar=function(d){function b(a){this.onHoverOut=t(this.onHoverOut,this);this.onHoverMove=t(this.onHoverMove,this);this.onGridClick=t(this.onGridClick,this);if(!(this instanceof m.Bar))return new m.Bar(a);b.__super__.constructor.call(this,
g.extend({},a,{parseTime:!1}))}y(b,d);b.prototype.init=function(){this.cumulative=this.options.stacked;if("always"!==this.options.hideHover)return this.hover=new m.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)};b.prototype.defaults={barSizeRatio:.75,barGap:3,barColors:"#0b62a4 #7a92a3 #4da74d #afd8f8 #edc240 #cb4b4b #9440ed".split(" "),barOpacity:1,barRadius:[0,0,0,0],xLabelMargin:50};b.prototype.calc=function(){var a;
this.calcBars();if(!1===this.options.hideHover)return(a=this.hover).update.apply(a,this.hoverContentForRow(this.data.length-1))};b.prototype.calcBars=function(){var a,c,b,d,e,g,k;g=this.data;k=[];a=d=0;for(e=g.length;d<e;a=++d)c=g[a],c._x=this.left+this.width*(a+.5)/this.data.length,k.push(c._y=function(){var a,f,d,e;d=c.y;e=[];a=0;for(f=d.length;a<f;a++)b=d[a],null!=b?e.push(this.transY(b)):e.push(null);return e}.call(this));return k};b.prototype.draw=function(){var a;!0!==(a=this.options.axes)&&
"both"!==a&&"x"!==a||this.drawXAxis();return this.drawSeries()};b.prototype.drawXAxis=function(){var a,c,b,d,e,g,k,l,m;g=this.bottom+(this.options.xAxisLabelTopPadding||this.options.padding/2);b=e=null;m=[];a=k=0;for(l=this.data.length;0<=l?k<l:k>l;a=0<=l?++k:--k)a=this.data[this.data.length-1-a],c=this.drawXAxisLabel(a._x,g,a.label),d=c.getBBox(),c.transform("r"+-this.options.xLabelAngle),a=c.getBBox(),c.transform("t0,"+a.height/2+"..."),0!==this.options.xLabelAngle&&(d=-.5*d.width*Math.cos(this.options.xLabelAngle*
Math.PI/180),c.transform("t"+d+",0...")),(null==e||e>=a.x+a.width||null!=b&&b>=a.x)&&0<=a.x&&a.x+a.width<this.el.width()?(0!==this.options.xLabelAngle&&(b=1.25*this.options.gridTextSize/Math.sin(this.options.xLabelAngle*Math.PI/180),b=a.x-b),m.push(e=a.x-this.options.xLabelMargin)):m.push(c.remove());return m};b.prototype.drawSeries=function(){var a,c,b,d,e,g,k,l,m,n,q,p,t,v;b=this.width/this.options.data.length;l=this.options.stacked?1:this.options.ykeys.length;a=(b*this.options.barSizeRatio-this.options.barGap*
(l-1))/l;this.options.barSize&&(a=Math.min(a,this.options.barSize));k=(b-a*l-this.options.barGap*(l-1))/2;v=0>=this.ymin&&0<=this.ymax?this.transY(0):null;return this.bars=function(){var f,h,l,u;l=this.data;u=[];d=f=0;for(h=l.length;f<h;d=++f)m=l[d],e=0,u.push(function(){var f,h,l,u;l=m._y;u=[];n=f=0;for(h=l.length;f<h;n=++f)t=l[n],null!==t?(v?(p=Math.min(t,v),c=Math.max(t,v)):(p=t,c=this.bottom),g=this.left+d*b+k,this.options.stacked||(g+=n*(a+this.options.barGap)),q=c-p,this.options.verticalGridCondition&&
this.options.verticalGridCondition(m.x)&&this.drawBar(this.left+d*b,this.top,b,Math.abs(this.top-this.bottom),this.options.verticalGridColor,this.options.verticalGridOpacity,this.options.barRadius),this.options.stacked&&(p-=e),this.drawBar(g,p,a,q,this.colorFor(m,n,"bar"),this.options.barOpacity,this.options.barRadius),u.push(e+=q)):u.push(null);return u}.call(this));return u}.call(this)};b.prototype.colorFor=function(a,c,b){return"function"===typeof this.options.barColors?(a={x:a.x,y:a.y[c],label:a.label},
c={index:c,key:this.options.ykeys[c],label:this.options.labels[c]},this.options.barColors.call(this,a,c,b)):this.options.barColors[c%this.options.barColors.length]};b.prototype.hitTest=function(a){if(0===this.data.length)return null;a=Math.max(Math.min(a,this.right),this.left);return Math.min(this.data.length-1,Math.floor((a-this.left)/(this.width/this.data.length)))};b.prototype.onGridClick=function(a,c){var b;b=this.hitTest(a);return this.fire("click",b,this.data[b].src,a,c)};b.prototype.onHoverMove=
function(a,c){var b,d;b=this.hitTest(a);return(d=this.hover).update.apply(d,this.hoverContentForRow(b))};b.prototype.onHoverOut=function(){if(!1!==this.options.hideHover)return this.hover.hide()};b.prototype.hoverContentForRow=function(a){var c,b,d,e,g,k,l;d=this.data[a];c="<div class='morris-hover-row-label'>"+d.label+"</div>";l=d.y;b=g=0;for(k=l.length;g<k;b=++g)e=l[b],c+="<div class='morris-hover-point' style='color: "+this.colorFor(d,b,"label")+"'>\n  "+this.options.labels[b]+":\n  "+this.yLabelFormat(e)+
"\n</div>";"function"===typeof this.options.hoverCallback&&(c=this.options.hoverCallback(a,this.options,c,d.src));return[c,this.left+(a+.5)*this.width/this.data.length]};b.prototype.drawXAxisLabel=function(a,b,d){return this.raphael.text(a,b,d).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)};b.prototype.drawBar=function(a,b,d,h,e,g,k){var c;c=Math.max.apply(Math,k);
return(0===c||c>h?this.raphael.rect(a,b,d,h):this.raphael.path(this.roundedRect(a,b,d,h,k))).attr("fill",e).attr("fill-opacity",g).attr("stroke","none")};b.prototype.roundedRect=function(a,b,d,h,e){null==e&&(e=[0,0,0,0]);return["M",a,e[0]+b,"Q",a,b,a+e[0],b,"L",a+d-e[1],b,"Q",a+d,b,a+d,b+e[1],"L",a+d,b+h-e[2],"Q",a+d,b+h,a+d-e[2],b+h,"L",a+e[3],b+h,"Q",a,b+h,a,b+h-e[3],"Z"]};return b}(m.Grid);m.Donut=function(d){function b(a){this.resizeHandler=t(this.resizeHandler,this);this.select=t(this.select,
this);this.click=t(this.click,this);var b=this;if(!(this instanceof m.Donut))return new m.Donut(a);this.options=g.extend({},this.defaults,a);this.el="string"===typeof a.element?g(document.getElementById(a.element)):g(a.element);if(null===this.el||0===this.el.length)throw Error("Graph placeholder not found.");void 0!==a.data&&0!==a.data.length&&(this.raphael=new Raphael(this.el[0]),this.options.resize&&g(window).bind("resize",function(a){null!=b.timeoutId&&window.clearTimeout(b.timeoutId);return b.timeoutId=
window.setTimeout(b.resizeHandler,100)}),this.setData(a.data))}y(b,d);b.prototype.defaults={colors:"#0B62A4 #3980B5 #679DC6 #95BBD7 #B0CCE1 #095791 #095085 #083E67 #052C48 #042135".split(" "),backgroundColor:"#FFFFFF",labelColor:"#000000",formatter:m.commas,resize:!1};b.prototype.redraw=function(){var a,b,d,h,e,g,k,l,n,p,q,t,w;this.raphael.clear();b=this.el.width()/2;d=this.el.height()/2;p=(Math.min(b,d)-10)/3;n=0;k=this.values;e=0;for(a=k.length;e<a;e++)l=k[e],n+=l;k=5/(2*p);a=1.9999*Math.PI-k*this.data.length;
e=g=0;this.segments=[];w=this.values;h=q=0;for(t=w.length;q<t;h=++q)l=w[h],l=g+k+l/n*a,h=new m.DonutSegment(b,d,2*p,p,g,l,this.data[h].color||this.options.colors[e%this.options.colors.length],this.options.backgroundColor,e,this.raphael),h.render(),this.segments.push(h),h.on("hover",this.select),h.on("click",this.click),g=l,e+=1;this.text1=this.drawEmptyDonutLabel(b,d-10,this.options.labelColor,15,800);this.text2=this.drawEmptyDonutLabel(b,d+10,this.options.labelColor,14);b=Math.max.apply(Math,this.values);
e=0;p=this.values;a=[];d=0;for(n=p.length;d<n;d++){l=p[d];if(l===b){this.select(e);break}a.push(e+=1)}return a};b.prototype.setData=function(a){this.data=a;var b,d,h,e;h=this.data;e=[];b=0;for(d=h.length;b<d;b++)a=h[b],e.push(parseFloat(a.value));this.values=e;return this.redraw()};b.prototype.click=function(a){return this.fire("click",a,this.data[a])};b.prototype.select=function(a){var b,d,h,e;e=this.segments;d=0;for(h=e.length;d<h;d++)b=e[d],b.deselect();this.segments[a].select();a=this.data[a];
return this.setLabels(a.label,this.options.formatter(a.value,a))};b.prototype.setLabels=function(a,b){var c,d,e,g;c=2*(Math.min(this.el.width()/2,this.el.height()/2)-10)/3;e=1.8*c;d=c/2;c/=3;this.text1.attr({text:a,transform:""});g=this.text1.getBBox();d=Math.min(e/g.width,d/g.height);this.text1.attr({transform:"S"+d+","+d+","+(g.x+g.width/2)+","+(g.y+g.height)});this.text2.attr({text:b,transform:""});d=this.text2.getBBox();e=Math.min(e/d.width,c/d.height);return this.text2.attr({transform:"S"+e+
","+e+","+(d.x+d.width/2)+","+d.y})};b.prototype.drawEmptyDonutLabel=function(a,b,d,h,e){a=this.raphael.text(a,b,"").attr("font-size",h).attr("fill",d);null!=e&&a.attr("font-weight",e);return a};b.prototype.resizeHandler=function(){this.timeoutId=null;this.raphael.setSize(this.el.width(),this.el.height());return this.redraw()};return b}(m.EventEmitter);m.DonutSegment=function(d){function b(a,b,d,h,e,g,k,l,m,n){this.cx=a;this.cy=b;this.inner=d;this.outer=h;this.color=k;this.backgroundColor=l;this.index=
m;this.raphael=n;this.deselect=t(this.deselect,this);this.select=t(this.select,this);this.sin_p0=Math.sin(e);this.cos_p0=Math.cos(e);this.sin_p1=Math.sin(g);this.cos_p1=Math.cos(g);this.is_long=g-e>Math.PI?1:0;this.path=this.calcSegment(this.inner+3,this.inner+this.outer-5);this.selectedPath=this.calcSegment(this.inner+3,this.inner+this.outer);this.hilight=this.calcArc(this.inner)}y(b,d);b.prototype.calcArcPoints=function(a){return[this.cx+a*this.sin_p0,this.cy+a*this.cos_p0,this.cx+a*this.sin_p1,
this.cy+a*this.cos_p1]};b.prototype.calcSegment=function(a,b){var c,d,e,g,k;g=this.calcArcPoints(a);c=g[0];e=g[1];d=g[2];g=g[3];k=this.calcArcPoints(b);return"M"+c+","+e+("A"+a+","+a+",0,"+this.is_long+",0,"+d+","+g)+("L"+k[2]+","+k[3])+("A"+b+","+b+",0,"+this.is_long+",1,"+k[0]+","+k[1])+"Z"};b.prototype.calcArc=function(a){var b;b=this.calcArcPoints(a);return"M"+b[0]+","+b[1]+("A"+a+","+a+",0,"+this.is_long+",0,"+b[2]+","+b[3])};b.prototype.render=function(){var a=this;this.arc=this.drawDonutArc(this.hilight,
this.color);return this.seg=this.drawDonutSegment(this.path,this.color,this.backgroundColor,function(){return a.fire("hover",a.index)},function(){return a.fire("click",a.index)})};b.prototype.drawDonutArc=function(a,b){return this.raphael.path(a).attr({stroke:b,"stroke-width":2,opacity:0})};b.prototype.drawDonutSegment=function(a,b,d,g,e){return this.raphael.path(a).attr({fill:b,stroke:d,"stroke-width":3}).hover(g).click(e)};b.prototype.select=function(){if(!this.selected)return this.seg.animate({path:this.selectedPath},
150,"<>"),this.arc.animate({opacity:1},150,"<>"),this.selected=!0};b.prototype.deselect=function(){if(this.selected)return this.seg.animate({path:this.path},150,"<>"),this.arc.animate({opacity:0},150,"<>"),this.selected=!1};return b}(m.EventEmitter)}).call(this);

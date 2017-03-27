(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){function g(a,b,h){function e(a){var b=c.wheelEventPixels(a)["horizontal"==d.orientation?"x":"y"],h=d.pos;d.moveTo(d.pos+b);d.pos!=h&&c.e_preventDefault(a)}this.orientation=b;this.scroll=h;this.screen=this.total=this.size=1;this.pos=0;this.node=document.createElement("div");this.node.className=a+"-"+b;
this.inner=this.node.appendChild(document.createElement("div"));var d=this;c.on(this.inner,"mousedown",function(a){function b(){c.off(document,"mousemove",h);c.off(document,"mouseup",b)}function h(a){if(1!=a.which)return b();d.moveTo(g+d.total/d.size*(a[e]-f))}if(1==a.which){c.e_preventDefault(a);var e="horizontal"==d.orientation?"pageX":"pageY",f=a[e],g=d.pos;c.on(document,"mousemove",h);c.on(document,"mouseup",b)}});c.on(this.node,"click",function(a){c.e_preventDefault(a);var b=d.inner.getBoundingClientRect();
d.moveTo(d.pos+("horizontal"==d.orientation?a.clientX<b.left?-1:a.clientX>b.right?1:0:a.clientY<b.top?-1:a.clientY>b.bottom?1:0)*d.screen)});c.on(this.node,"mousewheel",e);c.on(this.node,"DOMMouseScroll",e)}function f(a,b,c){this.addClass=a;this.horiz=new g(a,"horizontal",c);b(this.horiz.node);this.vert=new g(a,"vertical",c);b(this.vert.node);this.width=null}g.prototype.setPos=function(a,b){0>a&&(a=0);a>this.total-this.screen&&(a=this.total-this.screen);if(!b&&a==this.pos)return!1;this.pos=a;this.inner.style["horizontal"==
this.orientation?"left":"top"]=this.size/this.total*a+"px";return!0};g.prototype.moveTo=function(a){this.setPos(a)&&this.scroll(a,this.orientation)};g.prototype.update=function(a,b,c){var e=this.screen!=b||this.total!=a||this.size!=c;e&&(this.screen=b,this.total=a,this.size=c);a=this.size/this.total*this.screen;10>a&&(this.size-=10-a,a=10);this.inner.style["horizontal"==this.orientation?"width":"height"]=a+"px";this.setPos(this.pos,e)};f.prototype.update=function(a){if(null==this.width){var b=window.getComputedStyle?
window.getComputedStyle(this.horiz.node):this.horiz.node.currentStyle;b&&(this.width=parseInt(b.height))}var b=this.width||0,c=a.scrollWidth>a.clientWidth+1,e=a.scrollHeight>a.clientHeight+1;this.vert.node.style.display=e?"block":"none";this.horiz.node.style.display=c?"block":"none";e&&(this.vert.update(a.scrollHeight,a.clientHeight,a.viewHeight-(c?b:0)),this.vert.node.style.bottom=c?b+"px":"0");c&&(this.horiz.update(a.scrollWidth,a.clientWidth,a.viewWidth-(e?b:0)-a.barLeft),this.horiz.node.style.right=
e?b+"px":"0",this.horiz.node.style.left=a.barLeft+"px");return{right:e?b:0,bottom:c?b:0}};f.prototype.setScrollTop=function(a){this.vert.setPos(a)};f.prototype.setScrollLeft=function(a){this.horiz.setPos(a)};f.prototype.clear=function(){var a=this.horiz.node.parentNode;a.removeChild(this.horiz.node);a.removeChild(this.vert.node)};c.scrollbarModel.simple=function(a,b){return new f("CodeMirror-simplescroll",a,b)};c.scrollbarModel.overlay=function(a,b){return new f("CodeMirror-overlayscroll",a,b)}});

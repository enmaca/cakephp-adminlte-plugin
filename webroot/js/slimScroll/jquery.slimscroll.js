/*
 Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

 Version: 1.3.3

*/
var $jscomp={scope:{},findInternal:function(b,d,a){b instanceof String&&(b=String(b));for(var h=b.length,f=0;f<h;f++){var n=b[f];if(d.call(a,n,f,b))return{i:f,v:n}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(b,d,a){if(a.get||a.set)throw new TypeError("ES3 does not support getters and setters.");b!=Array.prototype&&b!=Object.prototype&&(b[d]=a.value)};
$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(b,d,a,h){if(d){a=$jscomp.global;b=b.split(".");for(h=0;h<b.length-1;h++){var f=b[h];f in a||(a[f]={});a=a[f]}b=b[b.length-1];h=a[b];d=d(h);d!=h&&null!=d&&$jscomp.defineProperty(a,b,{configurable:!0,writable:!0,value:d})}};
$jscomp.polyfill("Array.prototype.find",function(b){return b?b:function(b,a){return $jscomp.findInternal(this,b,a).v}},"es6-impl","es3");
(function(b){b.fn.extend({slimScroll:function(d){var a=b.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},d);this.each(function(){function h(g){if(v){g=g||window.event;
var e=0;g.wheelDelta&&(e=-g.wheelDelta/120);g.detail&&(e=g.detail/3);b(g.target||g.srcTarget||g.srcElement).closest("."+a.wrapperClass).is(c.parent())&&f(e,!0);g.preventDefault&&!k&&g.preventDefault();k||(g.returnValue=!1)}}function f(b,d,f){k=!1;var g=c.outerHeight()-e.outerHeight();d&&(d=parseInt(e.css("top"))+b*parseInt(a.wheelStep)/100*e.outerHeight(),d=Math.min(Math.max(d,0),g),d=0<b?Math.ceil(d):Math.floor(d),e.css({top:d+"px"}));l=parseInt(e.css("top"))/(c.outerHeight()-e.outerHeight());d=
l*(c[0].scrollHeight-c.outerHeight());f&&(d=b,b=d/c[0].scrollHeight*c.outerHeight(),b=Math.min(Math.max(b,0),g),e.css({top:b+"px"}));c.scrollTop(d);c.trigger("slimscrolling",~~d);x();q()}function n(){w=Math.max(c.outerHeight()/c[0].scrollHeight*c.outerHeight(),30);e.css({height:w+"px"});var a=w==c.outerHeight()?"none":"block";e.css({display:a})}function x(){n();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&c.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;w>=c.outerHeight()?k=!0:(e.stop(!0,
!0).fadeIn("fast"),a.railVisible&&m.stop(!0,!0).fadeIn("fast"))}function q(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&v||y||z||(e.fadeOut("slow"),m.fadeOut("slow"))},1E3))}var v,y,z,A,p,w,l,B,k=!1,c=b(this);if(c.parent().hasClass(a.wrapperClass)){var r=c.scrollTop(),e=c.parent().find("."+a.barClass),m=c.parent().find("."+a.railClass);n();if(b.isPlainObject(d)){if("height"in d&&"auto"==d.height){c.parent().css("height","auto");c.css("height","auto");var u=c.parent().parent().height();
c.parent().css("height",u);c.css("height",u)}if("scrollTo"in d)r=parseInt(a.scrollTo);else if("scrollBy"in d)r+=parseInt(a.scrollBy);else if("destroy"in d){e.remove();m.remove();c.unwrap();return}f(r,!1,!0)}}else if(!(b.isPlainObject(d)&&"destroy"in d)){a.height="auto"==a.height?c.parent().height():a.height;r=b("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});c.css({overflow:"hidden",width:a.width,height:a.height,"-ms-touch-action":"none"});
var m=b("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),e=b("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,
zIndex:99}),u="right"==a.position?{right:a.distance}:{left:a.distance};m.css(u);e.css(u);c.wrap(r);c.parent().append(e);c.parent().append(m);a.railDraggable&&e.bind("mousedown",function(a){var c=b(document);z=!0;t=parseFloat(e.css("top"));pageY=a.pageY;c.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;e.css("top",currTop);f(0,e.position().top,!1)});c.bind("mouseup.slimscroll",function(a){z=!1;q();c.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();
a.preventDefault();return!1});m.hover(function(){x()},function(){q()});e.hover(function(){y=!0},function(){y=!1});c.hover(function(){v=!0;x();q()},function(){v=!1;q()});window.navigator.msPointerEnabled?(c.bind("MSPointerDown",function(a,b){a.originalEvent.targetTouches.length&&(p=a.originalEvent.targetTouches[0].pageY)}),c.bind("MSPointerMove",function(b){b.originalEvent.preventDefault();b.originalEvent.targetTouches.length&&(f((p-b.originalEvent.targetTouches[0].pageY)/a.touchScrollStep,!0),p=b.originalEvent.targetTouches[0].pageY)})):
(c.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(p=a.originalEvent.touches[0].pageY)}),c.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(f((p-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),p=b.originalEvent.touches[0].pageY)}));n();"bottom"===a.start?(e.css({top:c.outerHeight()-e.outerHeight()}),f(0,!0)):"top"!==a.start&&(f(b(a.start).position().top,null,!0),a.alwaysVisible||e.hide());(function(){window.addEventListener?
(this.addEventListener("DOMMouseScroll",h,!1),this.addEventListener("mousewheel",h,!1)):document.attachEvent("onmousewheel",h)})()}});return this}});b.fn.extend({slimscroll:b.fn.slimScroll})})(jQuery);

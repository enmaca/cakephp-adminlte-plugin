/*
 =========================================================
 bootstrap-slider.js

 Maintainers: 
  Kyle Kemp 
   - Twitter: @seiyria
   - Github:  seiyria
  Rohit Kalkur
   - Twitter: @Rovolutionary
   - Github:  rovolution

 =========================================================

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ========================================================= */
var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(b,d,g){if(g.get||g.set)throw new TypeError("ES3 does not support getters and setters.");b!=Array.prototype&&b!=Object.prototype&&(b[d]=g.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(b){var d=0;return $jscomp.iteratorPrototype(function(){return d<b.length?{done:!1,value:b[d++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(b,d){$jscomp.initSymbolIterator();b instanceof String&&(b+="");var g=0,f={next:function(){if(g<b.length){var h=g++;return{value:d(h,b[h]),done:!1}}f.next=function(){return{done:!0,value:void 0}};return f.next()}};f[Symbol.iterator]=function(){return f};return f};
$jscomp.polyfill=function(b,d,g,f){if(d){g=$jscomp.global;b=b.split(".");for(f=0;f<b.length-1;f++){var h=b[f];h in g||(g[h]={});g=g[h]}b=b[b.length-1];f=g[b];d=d(f);d!=f&&null!=d&&$jscomp.defineProperty(g,b,{configurable:!0,writable:!0,value:d})}};$jscomp.polyfill("Array.prototype.keys",function(b){return b?b:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6-impl","es3");
(function(b){(function(b){function d(){}var f=Array.prototype.slice;(function(b){function a(a){a.prototype.option||(a.prototype.option=function(a){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))})}function e(a,e){b.fn[a]=function(d){if("string"===typeof d){for(var n=f.call(arguments,1),g=0,u=this.length;g<u;g++){var k=b.data(this[g],a);if(k)if(b.isFunction(k[d])&&"_"!==d.charAt(0)){var l=k[d].apply(k,n);if(void 0!==l&&l!==k)return l}else c("no such method '"+d+"' for "+a+" instance");
else c("cannot call methods on "+a+" prior to initialization; attempted to call '"+d+"'")}return this}n=this.map(function(){var c=b.data(this,a);c?(c.option(d),c._init()):(c=new e(this,d),b.data(this,a,c));return b(this)});return!n||1<n.length?n:n[0]}}if(b){var c="undefined"===typeof console?d:function(a){console.error(a)};b.bridget=function(c,b){a(b);e(c,b)};return b.bridget}})(b)})(b);(function(b){function d(a,e){function c(a,e){var b=a.getAttribute("data-slider-"+e);try{return JSON.parse(b)}catch(v){return b}}
"string"===typeof a?this.element=document.querySelector(a):a instanceof HTMLElement&&(this.element=a);var d=this.element.style.width,g=!1,f=this.element.parentNode,h,p,q;if(this.sliderElem)g=!0;else{this.sliderElem=document.createElement("div");this.sliderElem.className="slider";var k=document.createElement("div");k.className="slider-track";h=document.createElement("div");h.className="slider-selection";p=document.createElement("div");p.className="slider-handle min-slider-handle";q=document.createElement("div");
q.className="slider-handle max-slider-handle";k.appendChild(h);k.appendChild(p);k.appendChild(q);var l=function(a){var e=document.createElement("div");e.className="tooltip-arrow";var b=document.createElement("div");b.className="tooltip-inner";a.appendChild(e);a.appendChild(b)},m=document.createElement("div");m.className="tooltip tooltip-main";l(m);var r=document.createElement("div");r.className="tooltip tooltip-min";l(r);var t=document.createElement("div");t.className="tooltip tooltip-max";l(t);this.sliderElem.appendChild(k);
this.sliderElem.appendChild(m);this.sliderElem.appendChild(r);this.sliderElem.appendChild(t);f.insertBefore(this.sliderElem,this.element);this.element.style.display="none"}b&&(this.$element=b(this.element),this.$sliderElem=b(this.sliderElem));e=e?e:{};f=Object.keys(this.defaultOptions);for(k=0;k<f.length;k++)l=f[k],m=e[l],m="undefined"!==typeof m?m:c(this.element,l),m=null!==m?m:this.defaultOptions[l],this.options||(this.options={}),this.options[l]=m;this.eventToCallbackMap={};this.sliderElem.id=
this.options.id;this.touchCapable="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch;this.tooltip=this.sliderElem.querySelector(".tooltip-main");this.tooltipInner=this.tooltip.querySelector(".tooltip-inner");this.tooltip_min=this.sliderElem.querySelector(".tooltip-min");this.tooltipInner_min=this.tooltip_min.querySelector(".tooltip-inner");this.tooltip_max=this.sliderElem.querySelector(".tooltip-max");this.tooltipInner_max=this.tooltip_max.querySelector(".tooltip-inner");
!0===g&&(this._removeClass(this.sliderElem,"slider-horizontal"),this._removeClass(this.sliderElem,"slider-vertical"),this._removeClass(this.tooltip,"hide"),this._removeClass(this.tooltip_min,"hide"),this._removeClass(this.tooltip_max,"hide"),["left","top","width","height"].forEach(function(a){this._removeProperty(this.trackSelection,a)},this),[this.handle1,this.handle2].forEach(function(a){this._removeProperty(a,"left");this._removeProperty(a,"top")},this),[this.tooltip,this.tooltip_min,this.tooltip_max].forEach(function(a){this._removeProperty(a,
"left");this._removeProperty(a,"top");this._removeProperty(a,"margin-left");this._removeProperty(a,"margin-top");this._removeClass(a,"right");this._removeClass(a,"top")},this));"vertical"===this.options.orientation?(this._addClass(this.sliderElem,"slider-vertical"),this.stylePos="top",this.mousePos="pageY",this.sizePos="offsetHeight",this._addClass(this.tooltip,"right"),this.tooltip.style.left="100%",this._addClass(this.tooltip_min,"right"),this.tooltip_min.style.left="100%",this._addClass(this.tooltip_max,
"right"),this.tooltip_max.style.left="100%"):(this._addClass(this.sliderElem,"slider-horizontal"),this.sliderElem.style.width=d,this.options.orientation="horizontal",this.stylePos="left",this.mousePos="pageX",this.sizePos="offsetWidth",this._addClass(this.tooltip,"top"),this.tooltip.style.top=-this.tooltip.outerHeight-14+"px",this._addClass(this.tooltip_min,"top"),this.tooltip_min.style.top=-this.tooltip_min.outerHeight-14+"px",this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top=-this.tooltip_max.outerHeight-
14+"px");this.options.value instanceof Array?this.options.range=!0:this.options.range&&(this.options.value=[this.options.value,this.options.max]);this.trackSelection=h||this.trackSelection;"none"===this.options.selection&&this._addClass(this.trackSelection,"hide");this.handle1=p||this.handle1;this.handle2=q||this.handle2;!0===g&&(this._removeClass(this.handle1,"round triangle"),this._removeClass(this.handle2,"round triangle hide"));-1!==["round","triangle","custom"].indexOf(this.options.handle)&&
(this._addClass(this.handle1,this.options.handle),this._addClass(this.handle2,this.options.handle));this.offset=this._offset(this.sliderElem);this.size=this.sliderElem[this.sizePos];this.setValue(this.options.value);this.handle1Keydown=this._keydown.bind(this,0);this.handle1.addEventListener("keydown",this.handle1Keydown,!1);this.handle2Keydown=this._keydown.bind(this,0);this.handle2.addEventListener("keydown",this.handle2Keydown,!1);this.touchCapable?(this.mousedown=this._mousedown.bind(this),this.sliderElem.addEventListener("touchstart",
this.mousedown,!1)):(this.mousedown=this._mousedown.bind(this),this.sliderElem.addEventListener("mousedown",this.mousedown,!1));"hide"===this.options.tooltip?(this._addClass(this.tooltip,"hide"),this._addClass(this.tooltip_min,"hide"),this._addClass(this.tooltip_max,"hide")):"always"===this.options.tooltip?(this._showTooltip(),this._alwaysShowTooltip=!0):(this.showTooltip=this._showTooltip.bind(this),this.hideTooltip=this._hideTooltip.bind(this),this.sliderElem.addEventListener("mouseenter",this.showTooltip,
!1),this.sliderElem.addEventListener("mouseleave",this.hideTooltip,!1),this.handle1.addEventListener("focus",this.showTooltip,!1),this.handle1.addEventListener("blur",this.hideTooltip,!1),this.handle2.addEventListener("focus",this.showTooltip,!1),this.handle2.addEventListener("blur",this.hideTooltip,!1));this.options.enabled?this.enable():this.disable()}var f={formatInvalidInputErrorMsg:function(a){return"Invalid input value '"+a+"' passed in"},callingContextNotSliderInstance:"Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"},
h=function(a,e){d.call(this,a,e);return this};h.prototype={_init:function(){},constructor:h,defaultOptions:{id:"",min:0,max:10,step:1,precision:0,orientation:"horizontal",value:5,range:!1,selection:"before",tooltip:"show",tooltip_split:!1,handle:"round",reversed:!1,enabled:!0,formatter:function(a){return a instanceof Array?a[0]+" : "+a[1]:a},natural_arrow_keys:!1},over:!1,inDrag:!1,getValue:function(){return this.options.range?this.options.value:this.options.value[0]},setValue:function(a,e){a||(a=
0);this.options.value=this._validateInputValue(a);var b=this._applyPrecision.bind(this);this.options.range?(this.options.value[0]=b(this.options.value[0]),this.options.value[1]=b(this.options.value[1]),this.options.value[0]=Math.max(this.options.min,Math.min(this.options.max,this.options.value[0])),this.options.value[1]=Math.max(this.options.min,Math.min(this.options.max,this.options.value[1]))):(this.options.value=b(this.options.value),this.options.value=[Math.max(this.options.min,Math.min(this.options.max,
this.options.value))],this._addClass(this.handle2,"hide"),this.options.value[1]="after"===this.options.selection?this.options.max:this.options.min);this.diff=this.options.max-this.options.min;this.percentage=0<this.diff?[100*(this.options.value[0]-this.options.min)/this.diff,100*(this.options.value[1]-this.options.min)/this.diff,100*this.options.step/this.diff]:[0,0,100];this._layout();b=this.options.range?this.options.value:this.options.value[0];this._setDataVal(b);!0===e&&this._trigger("slide",
b);return this},destroy:function(){this._removeSliderEventHandlers();this.sliderElem.parentNode.removeChild(this.sliderElem);this.element.style.display="";this._cleanUpEventCallbacksMap();this.element.removeAttribute("data");b&&(this._unbindJQueryEventHandlers(),this.$element.removeData("slider"))},disable:function(){this.options.enabled=!1;this.handle1.removeAttribute("tabindex");this.handle2.removeAttribute("tabindex");this._addClass(this.sliderElem,"slider-disabled");this._trigger("slideDisabled");
return this},enable:function(){this.options.enabled=!0;this.handle1.setAttribute("tabindex",0);this.handle2.setAttribute("tabindex",0);this._removeClass(this.sliderElem,"slider-disabled");this._trigger("slideEnabled");return this},toggle:function(){this.options.enabled?this.disable():this.enable();return this},isEnabled:function(){return this.options.enabled},on:function(a,e){b?(this.$element.on(a,e),this.$sliderElem.on(a,e)):this._bindNonQueryEventHandler(a,e);return this},getAttribute:function(a){return a?
this.options[a]:this.options},setAttribute:function(a,b){this.options[a]=b;return this},refresh:function(){this._removeSliderEventHandlers();d.call(this,this.element,this.options);b&&b.data(this.element,"slider",this);return this},_removeSliderEventHandlers:function(){this.handle1.removeEventListener("keydown",this.handle1Keydown,!1);this.handle1.removeEventListener("focus",this.showTooltip,!1);this.handle1.removeEventListener("blur",this.hideTooltip,!1);this.handle2.removeEventListener("keydown",
this.handle2Keydown,!1);this.handle2.removeEventListener("focus",this.handle2Keydown,!1);this.handle2.removeEventListener("blur",this.handle2Keydown,!1);this.sliderElem.removeEventListener("mouseenter",this.showTooltip,!1);this.sliderElem.removeEventListener("mouseleave",this.hideTooltip,!1);this.sliderElem.removeEventListener("touchstart",this.mousedown,!1);this.sliderElem.removeEventListener("mousedown",this.mousedown,!1)},_bindNonQueryEventHandler:function(a,b){void 0===this.eventToCallbackMap[a]&&
(this.eventToCallbackMap[a]=[]);this.eventToCallbackMap[a].push(b)},_cleanUpEventCallbacksMap:function(){for(var a=Object.keys(this.eventToCallbackMap),b=0;b<a.length;b++)this.eventToCallbackMap[a[b]]=null},_showTooltip:function(){!1===this.options.tooltip_split?this._addClass(this.tooltip,"in"):(this._addClass(this.tooltip_min,"in"),this._addClass(this.tooltip_max,"in"));this.over=!0},_hideTooltip:function(){!1===this.inDrag&&!0!==this.alwaysShowTooltip&&(this._removeClass(this.tooltip,"in"),this._removeClass(this.tooltip_min,
"in"),this._removeClass(this.tooltip_max,"in"));this.over=!1},_layout:function(){var a;a=this.options.reversed?[100-this.percentage[0],this.percentage[1]]:[this.percentage[0],this.percentage[1]];this.handle1.style[this.stylePos]=a[0]+"%";this.handle2.style[this.stylePos]=a[1]+"%";if("vertical"===this.options.orientation)this.trackSelection.style.top=Math.min(a[0],a[1])+"%",this.trackSelection.style.height=Math.abs(a[0]-a[1])+"%";else{this.trackSelection.style.left=Math.min(a[0],a[1])+"%";this.trackSelection.style.width=
Math.abs(a[0]-a[1])+"%";var b=this.tooltip_min.getBoundingClientRect(),c=this.tooltip_max.getBoundingClientRect();b.right>c.left?(this._removeClass(this.tooltip_max,"top"),this._addClass(this.tooltip_max,"bottom"),this.tooltip_max.style.top="18px"):(this._removeClass(this.tooltip_max,"bottom"),this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top="-30px")}this.options.range?(b=this.options.formatter(this.options.value),this._setText(this.tooltipInner,b),this.tooltip.style[this.stylePos]=
(a[1]+a[0])/2+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px"),"vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px"),b=this.options.formatter(this.options.value[0]),this._setText(this.tooltipInner_min,b),b=this.options.formatter(this.options.value[1]),
this._setText(this.tooltipInner_max,b),this.tooltip_min.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip_min,"margin-top",-this.tooltip_min.offsetHeight/2+"px"):this._css(this.tooltip_min,"margin-left",-this.tooltip_min.offsetWidth/2+"px"),this.tooltip_max.style[this.stylePos]=a[1]+"%","vertical"===this.options.orientation?this._css(this.tooltip_max,"margin-top",-this.tooltip_max.offsetHeight/2+"px"):this._css(this.tooltip_max,"margin-left",-this.tooltip_max.offsetWidth/
2+"px")):(b=this.options.formatter(this.options.value[0]),this._setText(this.tooltipInner,b),this.tooltip.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px"))},_removeProperty:function(a,b){a.style.removeProperty?a.style.removeProperty(b):a.style.removeAttribute(b)},_mousedown:function(a){if(!this.options.enabled)return!1;this._triggerFocusOnHandle();
this.offset=this._offset(this.sliderElem);this.size=this.sliderElem[this.sizePos];var b=this._getPercentage(a);this.dragged=this.options.range?Math.abs(this.percentage[0]-b)<Math.abs(this.percentage[1]-b)?0:1:0;this.percentage[this.dragged]=this.options.reversed?100-b:b;this._layout();this.mousemove=this._mousemove.bind(this);this.mouseup=this._mouseup.bind(this);this.touchCapable?(document.addEventListener("touchmove",this.mousemove,!1),document.addEventListener("touchend",this.mouseup,!1)):(document.addEventListener("mousemove",
this.mousemove,!1),document.addEventListener("mouseup",this.mouseup,!1));this.inDrag=!0;b=this._calculateValue();this._trigger("slideStart",b);this._setDataVal(b);this.setValue(b);this._pauseEvent(a);return!0},_triggerFocusOnHandle:function(a){0===a&&this.handle1.focus();1===a&&this.handle2.focus()},_keydown:function(a,b){if(!this.options.enabled)return!1;var c;switch(b.keyCode){case 37:case 40:c=-1;break;case 39:case 38:c=1}if(c){if(this.options.natural_arrow_keys){var e="horizontal"===this.options.orientation&&
this.options.reversed;if("vertical"===this.options.orientation&&!this.options.reversed||e)c*=-1}c=this.percentage[a]+c*this.percentage[2];100<c?c=100:0>c&&(c=0);this.dragged=a;this._adjustPercentageForRangeSliders(c);this.percentage[this.dragged]=c;this._layout();c=this._calculateValue();this._trigger("slideStart",c);this._setDataVal(c);this.setValue(c,!0);this._trigger("slideStop",c);this._setDataVal(c);this._pauseEvent(b);return!1}},_pauseEvent:function(a){a.stopPropagation&&a.stopPropagation();
a.preventDefault&&a.preventDefault();a.cancelBubble=!0;a.returnValue=!1},_mousemove:function(a){if(!this.options.enabled)return!1;a=this._getPercentage(a);this._adjustPercentageForRangeSliders(a);this.percentage[this.dragged]=this.options.reversed?100-a:a;this._layout();a=this._calculateValue();this.setValue(a,!0);return!1},_adjustPercentageForRangeSliders:function(a){this.options.range&&(0===this.dragged&&this.percentage[1]<a?(this.percentage[0]=this.percentage[1],this.dragged=1):1===this.dragged&&
this.percentage[0]>a&&(this.percentage[1]=this.percentage[0],this.dragged=0))},_mouseup:function(){if(!this.options.enabled)return!1;this.touchCapable?(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)):(document.removeEventListener("mousemove",this.mousemove,!1),document.removeEventListener("mouseup",this.mouseup,!1));this.inDrag=!1;!1===this.over&&this._hideTooltip();var a=this._calculateValue();this._layout();this._setDataVal(a);
this._trigger("slideStop",a);return!1},_calculateValue:function(){var a;this.options.range?(a=[this.options.min,this.options.max],0!==this.percentage[0]&&(a[0]=Math.max(this.options.min,this.options.min+Math.round(this.diff*this.percentage[0]/100/this.options.step)*this.options.step),a[0]=this._applyPrecision(a[0])),100!==this.percentage[1]&&(a[1]=Math.min(this.options.max,this.options.min+Math.round(this.diff*this.percentage[1]/100/this.options.step)*this.options.step),a[1]=this._applyPrecision(a[1])),
this.options.value=a):(a=this.options.min+Math.round(this.diff*this.percentage[0]/100/this.options.step)*this.options.step,a<this.options.min?a=this.options.min:a>this.options.max&&(a=this.options.max),a=parseFloat(a),a=this._applyPrecision(a),this.options.value=[a,this.options.value[1]]);return a},_applyPrecision:function(a){var b=this.options.precision||this._getNumDigitsAfterDecimalPlace(this.step);return this._applyToFixedAndParseFloat(a,b)},_getNumDigitsAfterDecimalPlace:function(a){return(a=
(""+a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/))?Math.max(0,(a[1]?a[1].length:0)-(a[2]?+a[2]:0)):0},_applyToFixedAndParseFloat:function(a,b){var c=a.toFixed(b);return parseFloat(c)},_getPercentage:function(a){!this.touchCapable||"touchstart"!==a.type&&"touchmove"!==a.type||(a=a.touches[0]);a=100*(a[this.mousePos]-this.offset[this.stylePos])/this.size;a=Math.round(a/this.percentage[2])*this.percentage[2];return Math.max(0,Math.min(100,a))},_validateInputValue:function(a){if("number"===typeof a)return a;
if(a instanceof Array)return this._validateArray(a),a;throw Error(f.formatInvalidInputErrorMsg(a));},_validateArray:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("number"!==typeof c)throw Error(f.formatInvalidInputErrorMsg(c));}},_setDataVal:function(a){this.element.setAttribute("data","value: '"+a+"'");this.element.setAttribute("value",a)},_trigger:function(a,e){e=e||void 0;var c=this.eventToCallbackMap[a];if(c&&c.length)for(var d=0;d<c.length;d++)(0,c[d])(e);b&&this._triggerJQueryEvent(a,
e)},_triggerJQueryEvent:function(a,b){var c={type:a,value:b};this.$element.trigger(c);this.$sliderElem.trigger(c)},_unbindJQueryEventHandlers:function(){this.$element.off();this.$sliderElem.off()},_setText:function(a,b){"undefined"!==typeof a.innerText?a.innerText=b:"undefined"!==typeof a.textContent&&(a.textContent=b)},_removeClass:function(a,b){for(var c=b.split(" "),e=a.className,d=0;d<c.length;d++)e=e.replace(new RegExp("(?:\\s|^)"+c[d]+"(?:\\s|$)")," ");a.className=e.trim()},_addClass:function(a,
b){for(var c=b.split(" "),d=a.className,e=0;e<c.length;e++){var f=c[e];(new RegExp("(?:\\s|^)"+f+"(?:\\s|$)")).test(d)||(d+=" "+f)}a.className=d.trim()},_offset:function(a){var b=0,c=0;if(a.offsetParent){do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent)}return{left:b,top:c}},_css:function(a,b,c){a.style[b]=c}};b?b.bridget(b.fn.slider?"bootstrapSlider":"slider",h):window.Slider=h})(b)})(window.jQuery);

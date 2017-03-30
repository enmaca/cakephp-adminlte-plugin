(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){function v(a,b){function c(a){if(!d.parentNode)return e.off(document,"mousemove",c);d.style.top=Math.max(0,a.clientY-d.offsetHeight-5)+"px";d.style.left=a.clientX+5+"px"}var d=document.createElement("div");d.className="CodeMirror-lint-tooltip";d.appendChild(b.cloneNode(!0));document.body.appendChild(d);
e.on(document,"mousemove",c);c(a);null!=d.style.opacity&&(d.style.opacity=1);return d}function w(a){a.parentNode&&(null==a.style.opacity&&a.parentNode&&a.parentNode.removeChild(a),a.style.opacity=0,setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a)},600))}function q(a,b,c){function d(){e.off(c,"mouseout",d);g&&(w(g),g=null)}var g=v(a,b),f=setInterval(function(){if(g)for(var a=c;;a=a.parentNode){a&&11==a.nodeType&&(a=a.host);if(a==document.body)return;if(!a){d();break}}if(!g)return clearInterval(f)},
400);e.on(c,"mouseout",d)}function x(a,b,c){this.marked=[];this.options=b;this.timeout=null;this.hasGutter=c;this.onMouseOver=function(b){var c=b.target||b.srcElement;if(/\bCodeMirror-lint-mark-/.test(c.className)){for(var c=c.getBoundingClientRect(),d=a.findMarksAt(a.coordsChar({left:(c.left+c.right)/2,top:(c.top+c.bottom)/2},"client")),c=[],h=0;h<d.length;++h){var e=d[h].__annotation;e&&c.push(e)}if(c.length){d=b.target||b.srcElement;h=document.createDocumentFragment();for(e=0;e<c.length;e++)h.appendChild(r(c[e]));
q(b,h,d)}}};this.waitingFor=0}function t(a){var b=a.state.lint;b.hasGutter&&a.clearGutter("CodeMirror-lint-markers");for(a=0;a<b.marked.length;++a)b.marked[a].clear();b.marked.length=0}function y(a,b,c,d){var g=document.createElement("div"),f=g;g.className="CodeMirror-lint-marker-"+b;c&&(f=g.appendChild(document.createElement("div")),f.className="CodeMirror-lint-marker-multiple");if(0!=d)e.on(f,"mouseover",function(b){q(b,a,f)});return g}function r(a){var b=a.severity;b||(b="error");var c=document.createElement("div");
c.className="CodeMirror-lint-message-"+b;c.appendChild(document.createTextNode(a.message));return c}function z(a,b,c){function d(){f=-1;a.off("change",d)}var g=a.state.lint,f=++g.waitingFor;a.on("change",d);b(a.getValue(),function(b,c){a.off("change",d);g.waitingFor==f&&(c&&b instanceof e&&(b=c),n(a,b))},c,a)}function l(a){var b=a.state.lint.options,c=b.options||b,d=b.getAnnotations||a.getHelper(e.Pos(0,0),"lint");d&&(b.async||d.async?z(a,d,c):(b=d(a.getValue(),c,a),b.then?b.then(function(b){n(a,
b)}):n(a,b)))}function n(a,b){t(a);for(var c=a.state.lint,d=c.options,e=[],f=0;f<b.length;++f){var h=b[f],m=h.from.line;(e[m]||(e[m]=[])).push(h)}for(f=0;f<e.length;++f)if(h=e[f]){for(var m=null,n=c.hasGutter&&document.createDocumentFragment(),l=0;l<h.length;++l){var k=h[l],p=k.severity;p||(p="error");"error"!=m&&(m=p);d.formatAnnotation&&(k=d.formatAnnotation(k));c.hasGutter&&n.appendChild(r(k));k.to&&c.marked.push(a.markText(k.from,k.to,{className:"CodeMirror-lint-mark-"+p,__annotation:k}))}c.hasGutter&&
a.setGutterMarker(f,"CodeMirror-lint-markers",y(n,m,1<h.length,c.options.tooltips))}if(d.onUpdateLinting)d.onUpdateLinting(b,e,a)}function u(a){var b=a.state.lint;b&&(clearTimeout(b.timeout),b.timeout=setTimeout(function(){l(a)},b.options.delay||500))}e.defineOption("lint",!1,function(a,b,c){c&&c!=e.Init&&(t(a),!1!==a.state.lint.options.lintOnChange&&a.off("change",u),e.off(a.getWrapperElement(),"mouseover",a.state.lint.onMouseOver),clearTimeout(a.state.lint.timeout),delete a.state.lint);if(b){var d=
a.getOption("gutters");c=!1;for(var g=0;g<d.length;++g)"CodeMirror-lint-markers"==d[g]&&(c=!0);d=a.state;b instanceof Function?b={getAnnotations:b}:b&&!0!==b||(b={});c=d.lint=new x(a,b,c);if(!1!==c.options.lintOnChange)a.on("change",u);if(0!=c.options.tooltips&&"gutter"!=c.options.tooltips)e.on(a.getWrapperElement(),"mouseover",c.onMouseOver);l(a)}});e.defineExtension("performLint",function(){this.state.lint&&l(this)})});
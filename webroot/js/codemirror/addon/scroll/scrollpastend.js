(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){function e(a,b){c.changeEnd(b).line==a.lastLine()&&d(a)}function d(a){var b="";if(1<a.lineCount())var b=a.display.scroller.clientHeight-30,c=a.getLineHandle(a.lastLine()).height,b=b-c+"px";a.state.scrollPastEndPadding!=b&&(a.state.scrollPastEndPadding=b,a.display.lineSpace.parentNode.style.paddingBottom=
b,a.off("refresh",d),a.setSize(),a.on("refresh",d))}c.defineOption("scrollPastEnd",!1,function(a,b,f){f&&f!=c.Init&&(a.off("change",e),a.off("refresh",d),a.display.lineSpace.parentNode.style.paddingBottom="",a.state.scrollPastEndPadding=null);b&&(a.on("change",e),a.on("refresh",d),d(a))})});

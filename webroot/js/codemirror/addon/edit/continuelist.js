(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){var l=/^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,m=/^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,n=/[*+-]\s/;d.commands.newlineAndIndentContinueMarkdownList=function(b){if(b.getOption("disableInput"))return d.Pass;for(var f=b.listSelections(),g=[],e=0;e<f.length;e++){var c=f[e].head,
a=b.getStateAfter(c.line),h=!1!==a.list,p=0!==a.quote,k=b.getLine(c.line),a=l.exec(k);if(!f[e].empty()||!h&&!p||!a){b.execCommand("newlineAndIndent");return}m.test(k)?(/>\s*$/.test(k)||b.replaceRange("",{line:c.line,ch:0},{line:c.line,ch:c.ch+1}),g[e]="\n"):(c=a[1],h=a[5],a=n.test(a[2])||0<=a[2].indexOf(">")?a[2].replace("x"," "):parseInt(a[3],10)+1+a[4],g[e]="\n"+c+a+h)}b.replaceSelections(g)}});

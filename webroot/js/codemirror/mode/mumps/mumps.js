(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){d.defineMode("mumps",function(){function d(a){return new RegExp("^(("+a.join(")|(")+"))\\b","i")}function e(a,b){a.sol()&&(b.label=!0,b.commandMode=0);var c=a.peek();if(" "==c||"\t"==c)if(b.label=!1,0==b.commandMode)b.commandMode=1;else{if(0>b.commandMode||2==b.commandMode)b.commandMode=0}else"."!=c&&
0<b.commandMode&&(b.commandMode=":"==c?-1:2);if("("===c||"\t"===c)b.label=!1;if(";"===c)return a.skipToEnd(),"comment";if(a.match(/^[-+]?\d+(\.\d+)?([eE][-+]?\d+)?/))return"number";if('"'==c){if(a.skipTo('"'))return a.next(),"string";a.skipToEnd();return"error"}if(a.match(f)||a.match(g))return"operator";if(a.match(h))return null;if(k.test(c))return a.next(),"bracket";if(0<b.commandMode&&a.match(l))return"variable-2";if(a.match(m))return"builtin";if(a.match(n))return"variable";if("$"===c||"^"===c)return a.next(),
"builtin";if("@"===c)return a.next(),"string-2";if(/[\w%]/.test(c))return a.eatWhile(/[\w%]/),"variable";a.next();return"error"}var g=/^[\+\-\*/&#!_?\\<>=\'\[\]]/,f=/^(('=)|(<=)|(>=)|('>)|('<)|([[)|(]])|(^$))/,h=/^[\.,:]/,k=/[()]/,n=/^[%A-Za-z][A-Za-z0-9]*/,m=d("\\$ascii \\$char \\$data \\$ecode \\$estack \\$etrap \\$extract \\$find \\$fnumber \\$get \\$horolog \\$io \\$increment \\$job \\$justify \\$length \\$name \\$next \\$order \\$piece \\$qlength \\$qsubscript \\$query \\$quit \\$random \\$reverse \\$select \\$stack \\$test \\$text \\$translate \\$view \\$x \\$y \\$a \\$c \\$d \\$e \\$ec \\$es \\$et \\$f \\$fn \\$g \\$h \\$i \\$j \\$l \\$n \\$na \\$o \\$p \\$q \\$ql \\$qs \\$r \\$re \\$s \\$st \\$t \\$tr \\$v \\$z".split(" ")),
l=d("break close do else for goto halt hang if job kill lock merge new open quit read set tcommit trollback tstart use view write xecute b c d e f g h i j k l m n o q r s tc tro ts u v w x".split(" "));return{startState:function(){return{label:!1,commandMode:0}},token:function(a,b){var c=e(a,b);return b.label?"tag":c}}});d.defineMIME("text/x-mumps","mumps")});

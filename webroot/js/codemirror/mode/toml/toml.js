(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){c.defineMode("toml",function(){return{startState:function(){return{inString:!1,stringType:"",lhs:!0,inArray:0}},token:function(a,b){b.inString||'"'!=a.peek()&&"'"!=a.peek()||(b.stringType=a.peek(),a.next(),b.inString=!0);a.sol()&&0===b.inArray&&(b.lhs=!0);if(b.inString){for(;b.inString&&!a.eol();)a.peek()===
b.stringType?(a.next(),b.inString=!1):"\\"===a.peek()?(a.next(),a.next()):a.match(/^.[^\\\"\']*/);return b.lhs?"property string":"string"}if(b.inArray&&"]"===a.peek())return a.next(),b.inArray--,"bracket";if(b.lhs&&"["===a.peek()&&a.skipTo("]"))return a.next(),"]"===a.peek()&&a.next(),"atom";if("#"===a.peek())return a.skipToEnd(),"comment";if(!a.eatSpace()){if(b.lhs&&a.eatWhile(function(a){return"="!=a&&" "!=a}))return"property";if(b.lhs&&"="===a.peek())a.next(),b.lhs=!1;else{if(!b.lhs&&a.match(/^\d\d\d\d[\d\-\:\.T]*Z/)||
!b.lhs&&(a.match("true")||a.match("false")))return"atom";if(b.lhs||"["!==a.peek()){if(!b.lhs&&a.match(/^\-?\d+(?:\.\d+)?/))return"number";a.eatSpace()||a.next()}else return b.inArray++,a.next(),"bracket"}}return null}}});c.defineMIME("text/x-toml","toml")});

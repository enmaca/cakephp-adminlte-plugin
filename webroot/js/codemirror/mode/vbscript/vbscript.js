(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("vbscript",function(e,n){function d(a){return new RegExp("^(("+a.join(")|(")+"))\\b","i")}function h(a,c){if(a.eatSpace())return"space";if("'"===a.peek()||a.match(p))return a.skipToEnd(),"comment";if(a.match(/^((&H)|(&O))?[0-9\.]/i,!1)&&!a.match(/^((&H)|(&O))?[0-9\.]+[a-z_]/i,!1)){var b=!1;
a.match(/^\d*\.\d+/i)?b=!0:a.match(/^\d+\.\d*/)?b=!0:a.match(/^\.\d+/)&&(b=!0);if(b)return a.eat(/J/i),"number";b=!1;a.match(/^&H[0-9a-f]+/i)?b=!0:a.match(/^&O[0-7]+/i)?b=!0:a.match(/^[1-9]\d*F?/)?(a.eat(/J/i),b=!0):a.match(/^0(?![\dx])/i)&&(b=!0);if(b)return a.eat(/L/i),"number"}if(a.match('"'))return c.tokenize=q(a.current()),c.tokenize(a,c);if(a.match(r)||a.match(t)||a.match(u))return"operator";if(a.match(v))return null;if(a.match(w))return"bracket";if(a.match(x))return c.doInCurrentLine=!0,"keyword";
if(a.match(y))return c.currentIndent++,c.doInCurrentLine=!0,"keyword";if(a.match(z))return c.doInCurrentLine?c.doInCurrentLine=!1:c.currentIndent++,"keyword";if(a.match(k))return"keyword";if(a.match(l))return c.currentIndent--,c.currentIndent--,"keyword";if(a.match(m))return c.doInCurrentLine?c.doInCurrentLine=!1:c.currentIndent--,"keyword";if(a.match(A))return"keyword";if(a.match(B))return"atom";if(a.match(C))return"variable-2";if(a.match(D))return"builtin";if(a.match(E))return"variable-2";if(a.match(F))return"variable";
a.next();return"error"}function q(a){var c=1==a.length;return function(b,d){for(;!b.eol();){b.eatWhile(/[^'"]/);if(b.match(a))return d.tokenize=h,"string";b.eat(/['"]/)}if(c){if(n.singleLineStringErrors)return"error";d.tokenize=h}return"string"}}var t=/^[\+\-\*/&\\\^<>=]/,r=/^((<>)|(<=)|(>=))/,v=/^[\.,]/,w=/^[\(\)]/,F=/^[A-Za-z][_A-Za-z0-9]*/,u=d("and or not xor is mod eqv imp".split(" ")),f=["WScript","err","debug","RegExp"],G=["server","response","request","session","application"],H="buffer cachecontrol charset contenttype expires expiresabsolute isclientconnected pics status clientcertificate cookies form querystring servervariables totalbytes contents staticobjects codepage lcid sessionid timeout scripttimeout".split(" "),
I="addheader appendtolog binarywrite end flush redirect binaryread remove removeall lock unlock abandon getlasterror htmlencode mappath transfer urlencode".split(" "),g="clear execute raise replace test write writeline close open state eof update addnew end createobject quit".split(" ").concat("description firstindex global helpcontext helpfile ignorecase length number pattern source value count".split(" ")),f=f.concat("vbBlack vbRed vbGreen vbYellow vbBlue vbMagenta vbCyan vbWhite vbBinaryCompare vbTextCompare vbSunday vbMonday vbTuesday vbWednesday vbThursday vbFriday vbSaturday vbUseSystemDayOfWeek vbFirstJan1 vbFirstFourDays vbFirstFullWeek vbGeneralDate vbLongDate vbShortDate vbLongTime vbShortTime vbObjectError vbOKOnly vbOKCancel vbAbortRetryIgnore vbYesNoCancel vbYesNo vbRetryCancel vbCritical vbQuestion vbExclamation vbInformation vbDefaultButton1 vbDefaultButton2 vbDefaultButton3 vbDefaultButton4 vbApplicationModal vbSystemModal vbOK vbCancel vbAbort vbRetry vbIgnore vbYes vbNo vbCr VbCrLf vbFormFeed vbLf vbNewLine vbNullChar vbNullString vbTab vbVerticalTab vbUseDefault vbTrue vbFalse vbEmpty vbNull vbInteger vbLong vbSingle vbDouble vbCurrency vbDate vbString vbObject vbError vbBoolean vbVariant vbDataObject vbDecimal vbByte vbArray".split(" "));
e.isASP&&(f=f.concat(G),g=g.concat(I,H));var A=d("dim;redim;then;until;randomize;byval;byref;new;property;exit;in;const;private;public;get;set;let;stop;on error resume next;on error goto 0;option explicit;call;me".split(";")),B=d(["true","false","nothing","empty","null"]),D=d("abs array asc atn cbool cbyte ccur cdate cdbl chr cint clng cos csng cstr date dateadd datediff datepart dateserial datevalue day escape eval execute exp filter formatcurrency formatdatetime formatnumber formatpercent getlocale getobject getref hex hour inputbox instr instrrev int fix isarray isdate isempty isnull isnumeric isobject join lbound lcase left len loadpicture log ltrim rtrim trim maths mid minute month monthname msgbox now oct replace rgb right rnd round scriptengine scriptenginebuildversion scriptenginemajorversion scriptengineminorversion second setlocale sgn sin space split sqr strcomp string strreverse tan time timer timeserial timevalue typename ubound ucase unescape vartype weekday weekdayname year".split(" ")),
E=d(f),C=d(g),z=d("class sub select while if function property with for".split(" ")),k=d(["else","elseif","case"]),m=d(["next","loop","wend"]),l=d(["end"]),y=d(["do"]),x=d(["on error resume next","exit"]),p=d(["rem"]);return{electricChars:"dDpPtTfFeE ",startState:function(){return{tokenize:h,lastToken:null,currentIndent:0,nextLineIndent:0,doInCurrentLine:!1,ignoreKeyword:!1}},token:function(a,c){a.sol()&&(c.currentIndent+=c.nextLineIndent,c.nextLineIndent=0,c.doInCurrentLine=0);var b;b=c.tokenize(a,
c);var d=a.current();if("."===d)if(b=c.tokenize(a,c),d=a.current(),!b||"variable"!==b.substr(0,8)&&"builtin"!==b&&"keyword"!==b)b="error";else{if("builtin"===b||"keyword"===b)b="variable";-1<g.indexOf(d.substr(1))&&(b="variable-2")}c.lastToken={style:b,content:a.current()};"space"===b&&(b=null);return b},indent:function(a,c){var b=c.replace(/^\s+|\s+$/g,"");return b.match(m)||b.match(l)||b.match(k)?e.indentUnit*(a.currentIndent-1):0>a.currentIndent?0:a.currentIndent*e.indentUnit}}});e.defineMIME("text/vbscript",
"vbscript")});

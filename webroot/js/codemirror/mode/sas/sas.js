(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("sas",function(){function d(a,c,b){if(b){c=c.split(" ");for(var d=0;d<c.length;d++)e[c[d]]={style:a,state:b}}}function f(a,c){var b=a.next();if("/"===b&&a.eat("*"))return c.continueComment=!0,"comment";if(!0===c.continueComment)return"*"===b&&"/"===a.peek()?(a.next(),c.continueComment=!1):
a.skipTo("*")?(a.skipTo("*"),a.next(),a.eat("/")&&(c.continueComment=!1)):a.skipToEnd(),"comment";var d=b+a.peek(),f=/(?:^\s*|[;]\s*)(\*.*?);/ig.exec(a.string);if(null!==f){if(0===f.index&&a.column()!==f.index+f[0].length-1)return a.backUp(a.column()),a.skipTo(";"),a.next(),"comment";if(f.index+1<a.column()&&a.column()<f.index+f[0].length-1)return a.backUp(a.column()-f.index-1),a.skipTo(";"),a.next(),"comment"}else if('"'!==b&&"'"!==b||c.continueString){if(c.continueString)return c.continueString==
b?c.continueString=null:a.skipTo(c.continueString)?(a.next(),c.continueString=null):a.skipToEnd(),"string";if(null!==c.continueString&&a.eol())return a.skipTo(c.continueString)||a.skipToEnd(),"string";if(/[\d\.]/.test(b))return"."===b?a.match(/^[0-9]+([eE][\-+]?[0-9]+)?/):"0"===b?a.match(/^[xX][0-9a-fA-F]+/)||a.match(/^0[0-7]+/):a.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/),"number";if(h.test(b+a.peek()))return a.next(),"operator";if(g.hasOwnProperty(d)){if(a.next()," "===a.peek())return g[d.toLowerCase()]}else if(k.test(b))return"operator"}else return c.continueString=
b,"string";if(null!=a.match(/[%&;\w]+/,!1)&&(b+=a.match(/[%&;\w]+/,!0),/&/.test(b)))return"variable";if(c.nextword)return a.match(/[\w]+/),"."===a.peek()&&a.skipTo(" "),c.nextword=!1,"variable-2";b=b.toLowerCase();if(c.inDataStep){if("run;"===b||a.match(/run\s;/))return c.inDataStep=!1,"builtin";if(b&&"."===a.next())return/\w/.test(a.peek())?"variable-2":"variable";if(b&&e.hasOwnProperty(b)&&(-1!==e[b].state.indexOf("inDataStep")||-1!==e[b].state.indexOf("ALL"))){a.start<a.pos&&a.backUp(a.pos-a.start);
for(d=0;d<b.length;++d)a.next();return e[b].style}}if(c.inProc){if("run;"===b||"quit;"===b)return c.inProc=!1,"builtin";if(b&&e.hasOwnProperty(b)&&(-1!==e[b].state.indexOf("inProc")||-1!==e[b].state.indexOf("ALL")))return a.match(/[\w]+/),e[b].style}if(c.inMacro)return"%mend"===b?(";"===a.peek()&&a.next(),c.inMacro=!1,"builtin"):b&&e.hasOwnProperty(b)&&(-1!==e[b].state.indexOf("inMacro")||-1!==e[b].state.indexOf("ALL"))?(a.match(/[\w]+/),e[b].style):"atom";if(b&&e.hasOwnProperty(b)){a.backUp(1);a.match(/[\w]+/);
if("data"===b&&!1===/=/.test(a.peek()))return c.inDataStep=!0,c.nextword=!0,"builtin";if("proc"===b)return c.inProc=!0,c.nextword=!0,"builtin";if("%macro"===b)return c.inMacro=!0,c.nextword=!0,"builtin";if(/title[1-9]/.test(b))return"def";if("footnote"===b)return a.eat(/[1-9]/),"def";if(!0===c.inDataStep&&-1!==e[b].state.indexOf("inDataStep")||!0===c.inProc&&-1!==e[b].state.indexOf("inProc")||!0===c.inMacro&&-1!==e[b].state.indexOf("inMacro")||-1!==e[b].state.indexOf("ALL"))return e[b].style}return null}
var e={},g={eq:"operator",lt:"operator",le:"operator",gt:"operator",ge:"operator","in":"operator",ne:"operator",or:"operator"},h=/(<=|>=|!=|<>)/,k=/[=\(:\),{}.*<>+\-\/^\[\]]/;d("def","stack pgm view source debug nesting nolist",["inDataStep"]);d("def","if while until for do do; end end; then else cancel",["inDataStep"]);d("def","label format _n_ _error_",["inDataStep"]);d("def","ALTER BUFNO BUFSIZE CNTLLEV COMPRESS DLDMGACTION ENCRYPT ENCRYPTKEY EXTENDOBSCOUNTER GENMAX GENNUM INDEX LABEL OBSBUF OUTREP PW PWREQ READ REPEMPTY REPLACE REUSE ROLE SORTEDBY SPILL TOBSNO TYPE WRITE FILECLOSE FIRSTOBS IN OBS POINTOBS WHERE WHEREUP IDXNAME IDXWHERE DROP KEEP RENAME",
["inDataStep"]);d("def","filevar finfo finv fipname fipnamel fipstate first firstobs floor",["inDataStep"]);d("def","varfmt varinfmt varlabel varlen varname varnum varray varrayx vartype verify vformat vformatd vformatdx vformatn vformatnx vformatw vformatwx vformatx vinarray vinarrayx vinformat vinformatd vinformatdx vinformatn vinformatnx vinformatw vinformatwx vinformatx vlabel vlabelx vlength vlengthx vname vnamex vnferr vtype vtypex weekday",["inDataStep"]);d("def","zipfips zipname zipnamel zipstate",
["inDataStep"]);d("def","put putc putn",["inDataStep"]);d("builtin","data run",["inDataStep"]);d("def","data",["inProc"]);d("def","%if %end %end; %else %else; %do %do; %then",["inMacro"]);d("builtin","proc run; quit; libname filename %macro %mend option options",["ALL"]);d("def","footnote title libname ods",["ALL"]);d("def","%let %put %global %sysfunc %eval ",["ALL"]);d("variable","&sysbuffr &syscc &syscharwidth &syscmd &sysdate &sysdate9 &sysday &sysdevic &sysdmg &sysdsn &sysencoding &sysenv &syserr &syserrortext &sysfilrc &syshostname &sysindex &sysinfo &sysjobid &syslast &syslckrc &syslibrc &syslogapplname &sysmacroname &sysmenv &sysmsg &sysncpu &sysodspath &sysparm &syspbuff &sysprocessid &sysprocessname &sysprocname &sysrc &sysscp &sysscpl &sysscpl &syssite &sysstartid &sysstartname &systcpiphostname &systime &sysuserid &sysver &sysvlong &sysvlong4 &syswarningtext",
["ALL"]);d("def","source2 nosource2 page pageno pagesize",["ALL"]);d("def","_all_ _character_ _cmd_ _freq_ _i_ _infile_ _last_ _msg_ _null_ _numeric_ _temporary_ _type_ abort abs addr adjrsq airy alpha alter altlog altprint and arcos array arsin as atan attrc attrib attrn authserver autoexec awscontrol awsdef awsmenu awsmenumerge awstitle backward band base betainv between blocksize blshift bnot bor brshift bufno bufsize bxor by byerr byline byte calculated call cards cards4 catcache cbufno cdf ceil center cexist change chisq cinv class cleanup close cnonct cntllev coalesce codegen col collate collin column comamid comaux1 comaux2 comdef compbl compound compress config continue convert cos cosh cpuid create cross crosstab css curobs cv daccdb daccdbsl daccsl daccsyd dacctab dairy datalines datalines4 datejul datepart datetime day dbcslang dbcstype dclose ddm delete delimiter depdb depdbsl depsl depsyd deptab dequote descending descript design= device dflang dhms dif digamma dim dinfo display distinct dkricond dkrocond dlm dnum do dopen doptname doptnum dread drop dropnote dsname dsnferr echo else emaildlg emailid emailpw emailserver emailsys encrypt end endsas engine eof eov erf erfc error errorcheck errors exist exp fappend fclose fcol fdelete feedback fetch fetchobs fexist fget file fileclose fileexist filefmt filename fileref  fmterr fmtsearch fnonct fnote font fontalias  fopen foptname foptnum force formatted formchar formdelim formdlim forward fpoint fpos fput fread frewind frlen from fsep fuzz fwrite gaminv gamma getoption getvarc getvarn go goto group gwindow hbar hbound helpenv helploc hms honorappearance hosthelp hostprint hour hpct html hvar ibessel ibr id if index indexc indexw initcmd initstmt inner input inputc inputn inr insert int intck intnx into intrr invaliddata irr is jbessel join juldate keep kentb kurtosis label lag last lbound leave left length levels lgamma lib  library libref line linesize link list log log10 log2 logpdf logpmf logsdf lostcard lowcase lrecl ls macro macrogen maps mautosource max maxdec maxr mdy mean measures median memtype merge merror min minute missing missover mlogic mod mode model modify month mopen mort mprint mrecall msglevel msymtabmax mvarsize myy n nest netpv new news nmiss no nobatch nobs nocaps nocardimage nocenter nocharcode nocmdmac nocol nocum nodate nodbcs nodetails nodmr nodms nodmsbatch nodup nodupkey noduplicates noechoauto noequals noerrorabend noexitwindows nofullstimer noicon noimplmac noint nolist noloadlist nomiss nomlogic nomprint nomrecall nomsgcase nomstored nomultenvappl nonotes nonumber noobs noovp nopad nopercent noprint noprintinit normal norow norsasuser nosetinit  nosplash nosymbolgen note notes notitle notitles notsorted noverbose noxsync noxwait npv null number numkeys nummousekeys nway obs  on open     order ordinal otherwise out outer outp= output over ovp p(1 5 10 25 50 75 90 95 99) pad pad2  paired parm parmcards path pathdll pathname pdf peek peekc pfkey pmf point poisson poke position printer probbeta probbnml probchi probf probgam probhypr probit probnegb probnorm probsig probt procleave prt ps  pw pwreq qtr quote r ranbin rancau ranexp rangam range ranks rannor ranpoi rantbl rantri ranuni read recfm register regr remote remove rename repeat replace resolve retain return reuse reverse rewind right round rsquare rtf rtrace rtraceloc s s2 samploc sasautos sascontrol sasfrscr sasmsg sasmstore sasscript sasuser saving scan sdf second select selection separated seq serror set setcomm setot sign simple sin sinh siteinfo skewness skip sle sls sortedby sortpgm sortseq sortsize soundex  spedis splashlocation split spool sqrt start std stderr stdin stfips stimer stname stnamel stop stopover subgroup subpopn substr sum sumwgt symbol symbolgen symget symput sysget sysin sysleave sysmsg sysparm sysprint sysprintfont sysprod sysrc system t table tables tan tanh tapeclose tbufsize terminal test then timepart tinv  tnonct to today tol tooldef totper transformout translate trantab tranwrd trigamma trim trimn trunc truncover type unformatted uniform union until upcase update user usericon uss validate value var  weight when where while wincharset window work workinit workterm write wsum xsync xwait yearcutoff yes yyq  min max",
["inDataStep","inProc"]);d("operator","and not ",["inDataStep","inProc"]);return{startState:function(){return{inDataStep:!1,inProc:!1,inMacro:!1,nextword:!1,continueString:null,continueComment:!1}},token:function(a,c){return a.eatSpace()?null:f(a,c)},blockCommentStart:"/*",blockCommentEnd:"*/"}});f.defineMIME("text/x-sas","sas")});

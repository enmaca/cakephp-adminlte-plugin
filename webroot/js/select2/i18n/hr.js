/*
 Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
(function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var b=jQuery.fn.select2.amd;return b.define("select2/i18n/hr",[],function(){function b(a){var b=" "+a+" znak";return 5>a%10&&0<a%10&&(5>a%100||19<a%100)?1<a%10&&(b+="a"):b+="ova",b}return{inputTooLong:function(a){return"Unesite "+b(a.input.length-a.maximum)},inputTooShort:function(a){return"Unesite jo\u0161 "+b(a.minimum-a.input.length)},loadingMore:function(){return"U\u010ditavanje rezultata\u2026"},maximumSelected:function(a){return"Maksimalan broj odabranih stavki je "+
a.maximum},noResults:function(){return"Nema rezultata"},searching:function(){return"Pretraga\u2026"}}}),{define:b.define,require:b.require}})();

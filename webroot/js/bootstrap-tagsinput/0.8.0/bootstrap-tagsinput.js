(function(d){function l(a,b){this.isInit=!0;this.itemsArray=[];this.$element=d(a);this.$element.hide();this.multiple=(this.isSelect="SELECT"===a.tagName)&&a.hasAttribute("multiple");this.objectItems=b&&b.itemValue;this.placeholderText=a.hasAttribute("placeholder")?this.$element.attr("placeholder"):"";this.inputSize=Math.max(1,this.placeholderText.length);this.$container=d('<div class="bootstrap-tagsinput"></div>');this.$input=d('<input type="text" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container);
a.hasAttribute("disabled")&&this.$container.addClass("disabled");this.$element.before(this.$container);this.build(b);this.isInit=!1}function n(a,b){if("function"!==typeof a[b]){var d=a[b];a[b]=function(a){return a[d]}}}function p(a,b){if("function"!==typeof a[b]){var d=a[b];a[b]=function(){return d}}}function k(a){return a?v.text(a).html():""}function q(a){var b=0;if(document.selection)a.focus(),b=document.selection.createRange(),b.moveStart("character",-a.value.length),b=b.text.length;else if(a.selectionStart||
"0"==a.selectionStart)b=a.selectionStart;return b}function w(a,b){var f=!1;d.each(b,function(b,d){if("number"===typeof d&&a.which===d)return f=!0,!1;if(a.which===d.which){var c=!d.hasOwnProperty("altKey")||a.altKey===d.altKey,e=!d.hasOwnProperty("shiftKey")||a.shiftKey===d.shiftKey,m=!d.hasOwnProperty("ctrlKey")||a.ctrlKey===d.ctrlKey;if(c&&e&&m)return f=!0,!1}});return f}var r={tagClass:function(a){return"label label-primary label-tagsinput"},focusClass:"focus",itemValue:function(a){return a?a.toString():
a},itemText:function(a){return this.itemValue(a)},itemTitle:function(a){return null},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],delimiter:",",delimiterRegex:null,cancelConfirmKeysOnEmpty:!1,onTagExists:function(a,b){b.hide().fadeIn()},trimValue:!1,allowDuplicates:!1,triggerChange:!0};l.prototype={constructor:l,add:function(a,b,f){var c=this;if(!(c.options.maxTags&&c.itemsArray.length>=c.options.maxTags||!1!==a&&!a)){"string"===typeof a&&c.options.trimValue&&(a=d.trim(a));
if("object"===typeof a&&!c.objectItems)throw"Can't add objects when itemValue option is not set";if(!a.toString().match(/^\s*$/)){c.isSelect&&!c.multiple&&0<c.itemsArray.length&&c.remove(c.itemsArray[0]);if("string"===typeof a&&"INPUT"===this.$element[0].tagName){var e=a.split(c.options.delimiterRegex?c.options.delimiterRegex:c.options.delimiter);if(1<e.length){for(a=0;a<e.length;a++)this.add(e[a],!0);b||c.pushVal(c.options.triggerChange);return}}var h=c.options.itemValue(a),e=c.options.itemText(a),
g=c.options.tagClass(a),m=c.options.itemTitle(a),t=d.grep(c.itemsArray,function(a){return c.options.itemValue(a)===h})[0];if(t&&!c.options.allowDuplicates)c.options.onTagExists&&(b=d(".tag",c.$container).filter(function(){return d(this).data("item")===t}),c.options.onTagExists(a,b));else if(!(c.items().toString().length+a.length+1>c.options.maxInputLength)){var u=d.Event("beforeItemAdd",{item:a,cancel:!1,options:f});c.$element.trigger(u);u.cancel||(c.itemsArray.push(a),g=d('<span class="tag '+k(g)+
(null!==m?'" title="'+m:"")+'">'+k(e)+'<span data-role="remove"></span></span>'),g.data("item",a),c.findInputWrapper().before(g),g.after(" "),g=d('option[value="'+encodeURIComponent(h)+'"]',c.$element).length||d('option[value="'+k(h)+'"]',c.$element).length,c.isSelect&&!g&&(e=d("<option selected>"+k(e)+"</option>"),e.data("item",a),e.attr("value",h),c.$element.append(e)),b||c.pushVal(c.options.triggerChange),c.options.maxTags!==c.itemsArray.length&&c.items().toString().length!==c.options.maxInputLength||
c.$container.addClass("bootstrap-tagsinput-max"),d(".typeahead, .twitter-typeahead",c.$container).length&&c.$input.typeahead("val",""),this.isInit?c.$element.trigger(d.Event("itemAddedOnInit",{item:a,options:f})):c.$element.trigger(d.Event("itemAdded",{item:a,options:f})))}}}},remove:function(a,b,f){var c=this;c.objectItems&&(a="object"===typeof a?d.grep(c.itemsArray,function(b){return c.options.itemValue(b)==c.options.itemValue(a)}):d.grep(c.itemsArray,function(b){return c.options.itemValue(b)==
a}),a=a[a.length-1]);if(a){var e=d.Event("beforeItemRemove",{item:a,cancel:!1,options:f});c.$element.trigger(e);if(e.cancel)return;d(".tag",c.$container).filter(function(){return d(this).data("item")===a}).remove();d("option",c.$element).filter(function(){return d(this).data("item")===a}).remove();-1!==d.inArray(a,c.itemsArray)&&c.itemsArray.splice(d.inArray(a,c.itemsArray),1)}b||c.pushVal(c.options.triggerChange);c.options.maxTags>c.itemsArray.length&&c.$container.removeClass("bootstrap-tagsinput-max");
c.$element.trigger(d.Event("itemRemoved",{item:a,options:f}))},removeAll:function(){d(".tag",this.$container).remove();for(d("option",this.$element).remove();0<this.itemsArray.length;)this.itemsArray.pop();this.pushVal(this.options.triggerChange)},refresh:function(){var a=this;d(".tag",a.$container).each(function(){var b=d(this),f=b.data("item"),c=a.options.itemValue(f),e=a.options.itemText(f),h=a.options.tagClass(f);b.attr("class",null);b.addClass("tag "+k(h));b.contents().filter(function(){return 3==
this.nodeType})[0].nodeValue=k(e);a.isSelect&&d("option",a.$element).filter(function(){return d(this).data("item")===f}).attr("value",c)})},items:function(){return this.itemsArray},pushVal:function(){var a=this,b=d.map(a.items(),function(b){return a.options.itemValue(b).toString()});a.$element.val(b,!0);a.options.triggerChange&&a.$element.trigger("change")},build:function(a){var b=this;b.options=d.extend({},r,a);b.objectItems&&(b.options.freeInput=!1);n(b.options,"itemValue");n(b.options,"itemText");
p(b.options,"tagClass");if(b.options.typeahead){var f=b.options.typeahead||{};p(f,"source");b.$input.typeahead(d.extend({},f,{source:function(a,c){function e(a){for(var d=[],e=0;e<a.length;e++){var g=b.options.itemText(a[e]);h[g]=a[e];d.push(g)}c(d)}var h=this.map={},g=f.source(a);d.isFunction(g.success)?g.success(e):d.isFunction(g.then)?g.then(e):d.when(g).then(e)},updater:function(a){b.add(this.map[a]);return this.map[a]},matcher:function(a){return-1!==a.toLowerCase().indexOf(this.query.trim().toLowerCase())},
sorter:function(a){return a.sort()},highlighter:function(a){return a.replace(new RegExp("("+this.query+")","gi"),"<strong>$1</strong>")}}))}if(b.options.typeaheadjs){a=null;var c={},e=b.options.typeaheadjs;d.isArray(e)?(a=e[0],c=e[1]):c=e;b.$input.typeahead(a,c).on("typeahead:selected",d.proxy(function(a,d){c.valueKey?b.add(d[c.valueKey]):b.add(d);b.$input.typeahead("val","")},b))}b.$container.on("click",d.proxy(function(a){b.$element.attr("disabled")||b.$input.removeAttr("disabled");b.$input.focus()},
b));if(b.options.addOnBlur&&b.options.freeInput)b.$input.on("focusout",d.proxy(function(a){0===d(".typeahead, .twitter-typeahead",b.$container).length&&(b.add(b.$input.val()),b.$input.val(""))},b));b.$container.on({focusin:function(){b.$container.addClass(b.options.focusClass)},focusout:function(){b.$container.removeClass(b.options.focusClass)}});b.$container.on("keydown","input",d.proxy(function(a){var c=d(a.target),e=b.findInputWrapper();if(b.$element.attr("disabled"))b.$input.attr("disabled","disabled");
else{switch(a.which){case 8:0===q(c[0])&&(e=e.prev(),e.length&&b.remove(e.data("item")));break;case 46:0===q(c[0])&&(e=e.next(),e.length&&b.remove(e.data("item")));break;case 37:a=e.prev();0===c.val().length&&a[0]&&(a.before(e),c.focus());break;case 39:a=e.next(),0===c.val().length&&a[0]&&(a.after(e),c.focus())}c.val();c.attr("size",Math.max(this.inputSize,c.val().length))}},b));b.$container.on("keypress","input",d.proxy(function(a){var c=d(a.target);if(b.$element.attr("disabled"))b.$input.attr("disabled",
"disabled");else{var e=c.val(),f=b.options.maxChars&&e.length>=b.options.maxChars;b.options.freeInput&&(w(a,b.options.confirmKeys)||f)&&(0!==e.length&&(b.add(f?e.substr(0,b.options.maxChars):e),c.val("")),!1===b.options.cancelConfirmKeysOnEmpty&&a.preventDefault());c.val();c.attr("size",Math.max(this.inputSize,c.val().length))}},b));b.$container.on("click","[data-role=remove]",d.proxy(function(a){b.$element.attr("disabled")||b.remove(d(a.target).closest(".tag").data("item"))},b));b.options.itemValue===
r.itemValue&&("INPUT"===b.$element[0].tagName?b.add(b.$element.val()):d("option",b.$element).each(function(){b.add(d(this).attr("value"),!0)}))},destroy:function(){this.$container.off("keypress","input");this.$container.off("click","[role=remove]");this.$container.remove();this.$element.removeData("tagsinput");this.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var a=this.$input[0],b=this.$container[0];a&&a.parentNode!==
b;)a=a.parentNode;return d(a)}};d.fn.tagsinput=function(a,b,f){var c=[];this.each(function(){var e=d(this).data("tagsinput");e?a||b?void 0!==e[a]&&(e=3===e[a].length&&void 0!==f?e[a](b,null,f):e[a](b),void 0!==e&&c.push(e)):c.push(e):(e=new l(this,a),d(this).data("tagsinput",e),c.push(e),"SELECT"===this.tagName&&d("option",d(this)).attr("selected","selected"),d(this).val(d(this).val()))});return"string"==typeof a?1<c.length?c:c[0]:c};d.fn.tagsinput.Constructor=l;var v=d("<div />");d(function(){d("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})})(window.jQuery);

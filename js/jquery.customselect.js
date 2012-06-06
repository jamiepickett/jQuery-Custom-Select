(function($){
 	$.fn.extend({ 
 		
		//pass the options variable to the function
		customSelect: function(options) {
		//Set the default values, use comma to separate the settings, example:
			var defaults = {
				resetAfterSelection: false,
				focusClass : 'focus',
				consoleSelection : false,
				omitIE:false
			}
			
			var that = this;
				
			var options =  $.extend(defaults, options);

			function excludeIE(){
				var browser = $.browser;
				if(options.ieGreaterThan && browser.version > options.ieGreaterThan){
					selectify();
				}
			}

			function init(){
				if(options.omitIE === true){
					excludeIE();
				}else{
					selectify()
				}
			}
			
			function selectify(){
				that.each(function() {
					var o = options;
					//code to be inserted here
					var item = $(this).addClass('jq-custom');
					var itemData = $.parseJSON(item.data('customselect').replace(/([(A-Za-z0-9\$]+) *:/g, "\"$1\":").replace(/'/g, '"'));
					var itemKlass = "";
					itemData.klass ? itemKlass = " "+itemData.klass : itemKlass = "";
					var selectWrap = item.wrap("<span class='jq-customselect"+itemKlass+"'></span>")
					var itemSelect = $("<span class='jq-selectchoice'>Select</span>")
					item.before(itemSelect)
					itemSelect[0].innerHTML = this.options[this.options.selectedIndex].text
				
					item.change(function(){
						itemSelect[0].innerHTML = this.options[this.options.selectedIndex].text;
						if((itemData.consoleSelection || o.consoleSelection) && console && typeof console.info != "undefined"){
							var me = this.options[this.options.selectedIndex];
							console.info("my selection was: '" + me.text + "' and my value is: '" + me.value + "'")
						}
						if(itemData.resetAfterSelection || o.resetAfterSelection){
							this.selectedIndex = 0;
							item.trigger('reset');
						}
					}).bind('keyup',function(){
						itemSelect[0].innerHTML = this.options[this.options.selectedIndex].text
					}).bind('focus',function(){
						item.parents('.jq-customselect').addClass(o.focusClass)
					}).bind('blur',function(){
						item.parents('.jq-customselect').removeClass(o.focusClass)
					}).bind('reset',function(){
						itemSelect[0].innerHTML = this.options[this.options.selectedIndex].text
					})	
					//trigger the reset to revert the cached page selection
					item.trigger('reset')
	   		});
			}
			
			init();
   	}
	});
})(jQuery);
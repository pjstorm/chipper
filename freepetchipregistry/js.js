$(document).ready(function(e) {
    $(".select-box").selectbox();

    // login popup
    $('#overlay').height($(document).height());

    $('.login').click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#overlay').show();
		$('#overlay').find("input[name=username]").focus();
    });

    $('#modal-close, #overlay').click(function(e) {
        $('#overlay').hide();
    });

    $('#overlay .fancy-box').click(function(e) {
        e.stopPropagation();
    });

    // create-account popup
    $('#overlay-create-account').height($(document).height());
    
    $('.create-account').click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#overlay-create-account').show();
    });

    $('#modal-close, #overlay-create-account').click(function(e) {
        $('#overlay-create-account').hide();
    });

    $('#overlay-create-account .fancy-box').click(function(e) {
        e.stopPropagation();
    });

    // found-pet popup
    $('#overlay-found-pet').height($(document).height());
    
    $('.found-pet').click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#overlay-found-pet').show();
    });

    $('#modal-close, #overlay-found-pet').click(function(e) {
        $('#overlay-found-pet').hide();
    });

    $('#overlay-found-pet .fancy-box').click(function(e) {
        e.stopPropagation();
    });

    // forgot popup
    $('#overlay-forgot').height($(document).height());
    
    $('.forgot').click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#overlay-forgot').show();
		$('#overlay-forgot').find("input[name=username]").focus();
    });

    $('#modal-close, #overlay-forgot').click(function(e) {
        $('#overlay-forgot').hide();
    });

    $('#overlay-forgot .fancy-box').click(function(e) {
        e.stopPropagation();
    });
    
	/*
	$('input[type=text], textarea').not('#register-your-pet input').focus(function(e) {
        if( $(this).val().trim() == this.defaultValue) $(this).val('').addClass('selectedInput');
    }).blur(function(e) {
		if( $(this).val().trim() == '' ) $(this).val(this.defaultValue).removeClass('selectedInput')
    });
	*/
	$('#step-1-next, #step-1-back').click(function(e) {
        $('#reg-step-1').toggle();
		$('#reg-step-2').toggle();
		$('.step-msg').text(($('.step-msg').text() == 'Create Your Account.' ) ? 'How can you be contacted?' : 'Create Your Account.');
    });
	
	$('#noEmail').click(function(e) {
        $('.email').toggle();
    });
	
	//$('#phone, #secondaryPhone, #vet_phone').mask("(999) 999-9999");
	
	$('#chip').blur(function(e) {
		$('#chip-msg').text('');
		if( $(this).val().trim() == '' ) return;
		$('#chip-ajx').show();
        $.get(baseURL+'checkit/', { chip: $(this).val() }, function(data) {
			obj = $.parseJSON(data);
			
			if( !obj['error'] ) {
				if( obj['code'] == 50 ) {
					$('.org-info').hide();
					$('#submit-pet').removeAttr('disabled');
					$('#chip-add .sbOptions a[rel="'+obj['keeper']+'"]').click();
					$('#record_keeper').selectbox("disable");
					$('#preReg').val('true');
				} else {
					$('#submit-pet').removeAttr('disabled');
				}
			} else {
				$('#record_keeper').selectbox("enable");
				$('#submit-pet').attr('disabled', 'disabled');
			}
			
			$('#chip-msg').text(obj['msg']);
			$('#chip-ajx').hide();
		});
    });
	
	//$('#chip').clearTxt();
	
	$('#pet-add-next').click(function(e) {
		$('#msg-title').text('Tell us about your pet.');
        $('#chip-add').hide();
		$('#pet-add').show();
    });
	
	$('#chip-add-prev').click(function(e) {
		$('#msg-title').text('Tell us about your micro chip.');
        $('#chip-add').show();
		$('#pet-add').hide();
    });
	
	///$('#edit-settings').click(function(e) {
    ///    e.preventDefault();
	///	$(this).text( $(this).text() == 'Edit' ? 'Cancel' : 'Edit' );
	///	$('#p-info, #p-info-edit').toggle();
    ///});
	
});

/* trim prototype for IE */
String.prototype.trim = function() {return $.trim(this)};

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3
*/
(function(a){var b=(a.browser.msie?"paste":"input")+".mask",c=window.orientation!=undefined;a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn"},a.fn.extend({caret:function(a,b){if(this.length!=0){if(typeof a=="number"){b=typeof b=="number"?b:a;return this.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}})}if(this[0].setSelectionRange)a=this[0].selectionStart,b=this[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},unmask:function(){return this.trigger("unmask")},mask:function(d,e){if(!d&&this.length>0){var f=a(this[0]);return f.data(a.mask.dataName)()}e=a.extend({placeholder:"_",completed:null},e);var g=a.mask.definitions,h=[],i=d.length,j=null,k=d.length;a.each(d.split(""),function(a,b){b=="?"?(k--,i=a):g[b]?(h.push(new RegExp(g[b])),j==null&&(j=h.length-1)):h.push(null)});return this.trigger("unmask").each(function(){function v(a){var b=f.val(),c=-1;for(var d=0,g=0;d<k;d++)if(h[d]){l[d]=e.placeholder;while(g++<b.length){var m=b.charAt(g-1);if(h[d].test(m)){l[d]=m,c=d;break}}if(g>b.length)break}else l[d]==b.charAt(g)&&d!=i&&(g++,c=d);if(!a&&c+1<i)f.val(""),t(0,k);else if(a||c+1>=i)u(),a||f.val(f.val().substring(0,c+1));return i?d:j}function u(){return f.val(l.join("")).val()}function t(a,b){for(var c=a;c<b&&c<k;c++)h[c]&&(l[c]=e.placeholder)}function s(a){var b=a.which,c=f.caret();if(a.ctrlKey||a.altKey||a.metaKey||b<32)return!0;if(b){c.end-c.begin!=0&&(t(c.begin,c.end),p(c.begin,c.end-1));var d=n(c.begin-1);if(d<k){var g=String.fromCharCode(b);if(h[d].test(g)){q(d),l[d]=g,u();var i=n(d);f.caret(i),e.completed&&i>=k&&e.completed.call(f)}}return!1}}function r(a){var b=a.which;if(b==8||b==46||c&&b==127){var d=f.caret(),e=d.begin,g=d.end;g-e==0&&(e=b!=46?o(e):g=n(e-1),g=b==46?n(g):g),t(e,g),p(e,g-1);return!1}if(b==27){f.val(m),f.caret(0,v());return!1}}function q(a){for(var b=a,c=e.placeholder;b<k;b++)if(h[b]){var d=n(b),f=l[b];l[b]=c;if(d<k&&h[d].test(f))c=f;else break}}function p(a,b){if(!(a<0)){for(var c=a,d=n(b);c<k;c++)if(h[c]){if(d<k&&h[c].test(l[d]))l[c]=l[d],l[d]=e.placeholder;else break;d=n(d)}u(),f.caret(Math.max(j,a))}}function o(a){while(--a>=0&&!h[a]);return a}function n(a){while(++a<=k&&!h[a]);return a}var f=a(this),l=a.map(d.split(""),function(a,b){if(a!="?")return g[a]?e.placeholder:a}),m=f.val();f.data(a.mask.dataName,function(){return a.map(l,function(a,b){return h[b]&&a!=e.placeholder?a:null}).join("")}),f.attr("readonly")||f.one("unmask",function(){f.unbind(".mask").removeData(a.mask.dataName)}).bind("focus.mask",function(){m=f.val();var b=v();u();var c=function(){b==d.length?f.caret(0,b):f.caret(b)};(a.browser.msie?c:function(){setTimeout(c,0)})()}).bind("blur.mask",function(){v(),f.val()!=m&&f.change()}).bind("keydown.mask",r).bind("keypress.mask",s).bind(b,function(){setTimeout(function(){f.caret(v(!0))},0)}),v()})}})})(jQuery);


(function(e){e.fn.clearTxt=function(){return this.each(function(){if(e(this).attr("type")=="text"){e(this).focus(function(t){var n=e(this).val().trim();if(n==this.defaultValue){e(this).val("")}});e(this).blur(function(t){var n=e(this).val().trim();if(n==this.defaultValue||n==""){e(this).val(this.defaultValue)}})}})}})(jQuery)

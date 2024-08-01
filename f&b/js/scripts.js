var AG = {
	init: function() {
		this.Main.init();
		if(template.indexOf('index') != -1){
			this.Index.init();
		}
		if(template == 'page.order'){
			this.PageOrder.init();
		}
		if(template == 'collection'){
			this.Collection.init();
		}
		if(template == 'page.about'){
			this.PageAbout.init();
		}
	}
}
$(document).ready(function() {
	AG.init();
});
AG.Main = {
	init: function(){
		this.scrollHeader();
		this.menuMobile();
		this.toggleTitle();
		this.toggleSidebar();
		this.footerAccordion();
		this.addListSharing();
	},
	fixHeightProduct(data_parent, data_target, data_image) {
		var box_height = 0;
		var box_image = 0;
		var boxtarget = data_parent + ' ' + data_target;
		var boximg = data_parent + ' ' + data_target + ' ' + data_image;
		jQuery(boximg).css('height', 'auto');
		jQuery($(boxtarget)).css('height', 'auto');
		jQuery($(boxtarget)).removeClass('fixheight');
		jQuery($(boxtarget)).each(function() {
			if (jQuery(this).find(data_image + ' .lazyloaded').height() > box_image) {
				box_image = jQuery(this).find($(data_image)).height();
			}
		});
		if (box_image > 0) {
			jQuery(boximg).height(box_image);
		}
		jQuery($(boxtarget)).each(function() {
			if (jQuery(this).height() > box_height) {
				box_height = jQuery(this).height();
			}
		});
		jQuery($(boxtarget)).addClass('fixheight');
		if (box_height > 0) {
			jQuery($(boxtarget)).height(box_height);
		}
		try {
			fixheightcallback();
		} catch (ex) {}
	},
	toggleTitle: function(){
		jQuery('.title_block').click(function(){
			$(this).next().slideToggle('medium');
		});    
		$(document).on("click",".dropdown-filter", function(){
			if ( $(this).parent().attr('aria-expanded') == 'false' ) {
				$(this).parent().attr('aria-expanded','true');
			} else {
				$(this).parent().attr('aria-expanded','false');
			}
		});
	},
	scrollHeader: function(){
		$(document).on("click", ".back-to-top", function(){
			$(this).removeClass('show');
			$('html, body').animate({
				scrollTop: 0			
			}, 800);
		});
		var $parentHeader = $('.mainHeader--height');
		var parentHeight = $parentHeader.find('.main-header').outerHeight();
		var $header = $('#main-header');
		var $body = $('body');
		var offset_sticky_header = $header.outerHeight() + 100;
		var offset_sticky_down = 0;
		$parentHeader.css('min-height', parentHeight );	
		var resizeTimer = false,
				resizeWindow = $(window).prop("innerWidth");
		$(window).on("resize", function() {
			if (resizeTimer) {clearTimeout(resizeTimer)	}
			resizeTimer = setTimeout(function() {
				var newWidth = $(window).prop("innerWidth");
				if (resizeWindow != newWidth) {
					$header.removeClass('hSticky-up').removeClass('hSticky-nav').removeClass('hSticky');
					$parentHeader.css('min-height', '' );	
					parentHeight = $parentHeader.find('.main-header').outerHeight();
					$parentHeader.css('min-height', parentHeight );	
					resizeWindow = newWidth
				}
			}, 200)
		});
		setTimeout(function() {
			$parentHeader.css('min-height', '' );		
			parentHeight = $parentHeader.find('.main-header').outerHeight();
			$parentHeader.css('min-height', parentHeight );	
			jQuery(window).scroll(function() {	
				if(jQuery(window).scrollTop() > offset_sticky_header && jQuery(window).scrollTop() > offset_sticky_down) {		
					$header.addClass('hSticky');	
					$body.addClass('scroll-body');
					if(jQuery(window).scrollTop() > offset_sticky_header + 150){
						$header.removeClass('hSticky-up').addClass('hSticky-nav');	
						$body.removeClass('scroll-body-up').addClass('scroll-body-nav');
					}
				} 
				else {
					if(jQuery(window).scrollTop() > offset_sticky_header + 150 && (jQuery(window).scrollTop() - 150) + jQuery(window).height()  < $(document).height()) {
						$header.addClass('hSticky-up');	
						$body.addClass('scroll-body-up');
					}
				}
				if (jQuery(window).scrollTop() <= offset_sticky_down && jQuery(window).scrollTop() <= offset_sticky_header ) {
					$header.removeClass('hSticky-up').removeClass('hSticky-nav').removeClass('hSticky');
					$body.removeClass('scroll-body-up').removeClass('scroll-body-nav').removeClass('scroll-body');
				}
				offset_sticky_down = $(window).scrollTop();
				if ($('.back-to-top').length > 0 && $(window).scrollTop() > 500 ) {
					$('.back-to-top').removeClass('d-none');
				} else {
					$('.back-to-top').addClass('d-none');
				}
			});
		}, 300);
		
		$('#booking-header a').click(function(e){
			e.preventDefault();
			$('#modal-order').modal('show');
		})
	},
	menuMobile: function(){
		$('.btn-menu-mobile').click(function(){
			$('body').addClass('show-menu-mobile');
			$('.cart-mobile').parent('.sticky-right').addClass('modal-quickview-show')
		});
		$('#overlay-menu-mobile').click(function(){
			$('body').removeClass('show-menu-mobile');
			$('.cart-mobile').parent('.sticky-right').removeClass('modal-quickview-show')
		});
		$('.toggle-sub-menu').click(function(){
			$(this).next().slideToggle();
			$(this).find('i').toggleClass('fa-minus');
		});
	},
	footerAccordion: function(){
		$('.footer-title h3').on('click', function(){
			jQuery(this).parents('.footer-accordion-item').toggleClass('active-toggle').find('.footer-content').stop().slideToggle(400);
		});
	},
	toggleSidebar: function(){
		$(document).on('click','.tree-menu .tree-menu-lv1',function(){
			$this = $(this).find('.tree-menu-sub');
			$('.tree-menu .has-child .tree-menu-sub').not($this).slideUp('fast');
			$(this).find('.tree-menu-sub').slideToggle('fast');
			$(this).toggleClass('menu-collapsed');
			$(this).toggleClass('menu-uncollapsed');
			var $this1 = $(this);
			$('.tree-menu .has-child').not($this1).removeClass('menu-uncollapsed');
		});
	},
	addListSharing: function(){
		if ($('.addThis_listSharing').length > 0){
			$(window).scroll(function(){
				if($(window).scrollTop() > 100 ) {
					$('.addThis_listSharing').addClass('is-show');
				} else {
					$('.addThis_listSharing').removeClass('is-show');
				}
			});
			$('.body-popupform form.contact-form').submit(function(e){
				var self = $(this);
				if($(this)[0].checkValidity() == true){
					e.preventDefault();
					grecaptcha.ready(function() {
						grecaptcha.execute('6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-', {action: 'submit'}).then(function(token) {
							self.find('input[name="g-recaptcha-response"]').val(token);
							$.ajax({
								type: 'POST',
								url:'/contact',
								data: $('.body-popupform form.contact-form').serialize(),			 
								success:function(data){		
									$('.modal-contactform.fade.show').modal('hide');
									setTimeout(function(){ 				
										$('.modal-succesform').modal('show');					
										setTimeout(function(){	
											$('.modal-succesform.fade.show').modal('hide');							
										}, 5000);
									},300);
								},				
							})
						}); 
					});
				}
			});
			$(".modal-succesform").on('hidden.bs.modal', function(){
				location.reload();
			});
		}
		if ($(window).width() < 768 && $('.layoutProduct_scroll').length > 0 ) {
			var curScrollTop = 0;
			$(window).scroll(function(){	
				var scrollTop = $(window).scrollTop();
				if(scrollTop > curScrollTop  && scrollTop > 200 ) {
					$('.layoutProduct_scroll').removeClass('scroll-down').addClass('scroll-up');
				}
				else {
					if (scrollTop > 200 && scrollTop + $(window).height() + 150 < $(document).height()) {
						$('.layoutProduct_scroll').removeClass('scroll-up').addClass('scroll-down');	
					}
				}
				if(scrollTop < curScrollTop  && scrollTop < 200 ) {
					$('.layoutProduct_scroll').removeClass('scroll-up').removeClass('scroll-down');
				}
				curScrollTop = scrollTop;
			});
		}	
	}
}
AG.Index = {
	init: function(){
		this.sliderCustomer();
	},
	sliderCustomer: function(){
		$('.slider-customer').owlCarousel({
			items:1,
			nav: true,
			navText: [
				'<div class="prev-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#2196F3;" d="M511.189,259.954c1.649-3.989,0.731-8.579-2.325-11.627l-192-192c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82l173.803,173.803H10.667C4.776,245.213,0,249.989,0,255.88c0,5.891,4.776,10.667,10.667,10.667h464.917L301.803,440.328c-4.237,4.093-4.355,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262l192-192C509.872,262.42,510.655,261.246,511.189,259.954z"/><path d="M309.333,458.546c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571L486.251,255.88L301.781,71.432c-4.093-4.237-3.975-10.99,0.262-15.083c4.134-3.992,10.687-3.992,14.82,0l192,192c4.164,4.165,4.164,10.917,0,15.083l-192,192C314.865,457.426,312.157,458.546,309.333,458.546z"/><path d="M501.333,266.546H10.667C4.776,266.546,0,261.771,0,255.88c0-5.891,4.776-10.667,10.667-10.667h490.667c5.891,0,10.667,4.776,10.667,10.667C512,261.771,507.224,266.546,501.333,266.546z"/></svg></div>',
				'<div class="next-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#2196F3;" d="M511.189,259.954c1.649-3.989,0.731-8.579-2.325-11.627l-192-192c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82l173.803,173.803H10.667C4.776,245.213,0,249.989,0,255.88c0,5.891,4.776,10.667,10.667,10.667h464.917L301.803,440.328c-4.237,4.093-4.355,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262l192-192C509.872,262.42,510.655,261.246,511.189,259.954z"/><path d="M309.333,458.546c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571L486.251,255.88L301.781,71.432c-4.093-4.237-3.975-10.99,0.262-15.083c4.134-3.992,10.687-3.992,14.82,0l192,192c4.164,4.165,4.164,10.917,0,15.083l-192,192C314.865,457.426,312.157,458.546,309.333,458.546z"/><path d="M501.333,266.546H10.667C4.776,266.546,0,261.771,0,255.88c0-5.891,4.776-10.667,10.667-10.667h490.667c5.891,0,10.667,4.776,10.667,10.667C512,261.771,507.224,266.546,501.333,266.546z"/></svg></div>'
			],
			dots: true,		
			touchDrag: true,
			loop: true
		});
	}
}
AG.Collection = {
	init: function (){
		this.fixHeight();
		this.menuSidebar();
	},
	fixHeight: function(){
		$(document).on('lazyloaded', function(e){
			AG.Main.fixHeightProduct('.section-content-list--inner', '.product-resize', '.image-resize');
			$(window).resize(function() {
				AG.Main.fixHeightProduct('.section-content-list--inner', '.product-resize', '.image-resize');
			});
		});
	},
	menuSidebar: function(){
		$('.plus-nClick1').click(function(e){
			e.preventDefault();
			$(this).parents('.level0').toggleClass('opened');
			$(this).parents('.level0').children('ul').slideToggle(200);
		});
		$('.plus-nClick2').click(function(e){
			e.preventDefault();
			$(this).parents('.level1').toggleClass('opened');
			$(this).parents('.level1').children('ul').slideToggle(200);
		});
	},
}
AG.PageOrder = {
	init: function(){
		this.triggerQuickview();
		this.functionOrder();
	},
	triggerQuickview: function(){
		if (window.location.href.indexOf("?p=") != -1){
			var handle = window.location.href.split("?p=")[1];
			$.ajax({
				url: '/products/'+ handle +'?view=quickview',
				success:function(e){
					$('#quick-view-modal').html(e);									
					$('#quick-view-modal').modal("show");
					$('#quick-view-modal').on('shown.bs.modal', function () {
						if($('#quickview-des__toggle').height() > 150){ 
							$('#quickview-des__toggle').addClass('opened'); 
							$('.quickview-des__trigger .btn-toggle').addClass('btn-viewmore').find('span').html('Xem thêm chi tiết sản phẩm +');
						}						
					});
				}
			})
		}
	},
	functionOrder: function(){
		$('a[href^="#"]').bind('click.smoothscroll',function(e){
			e.preventDefault();
			var target = this.hash,
					$target = $(target);
			$('html, body').stop().animate( {
				'scrollTop': $target.offset().top - 40
			}, 900, 'swing', function () {});
		});
		function check_time(){
			var hstart = parseInt(19);
			var mstart = parseInt(45);
			var hend = parseInt(6);
			var check_time = new Date();
			var hours = check_time.getHours();
			var minute = check_time.getMinutes();
			if(hours == hstart){
				if(minute >= mstart ){
					$('.top-bar').removeClass('hide');
					$('.btn-check a').addClass('over-time').html('Đã ngưng nhận đơn hôm nay');
					$('.action-cart a').addClass('over-time');
				}else{
					$('.top-bar').addClass('hide');
					$('.btn-check a').removeClass('over-time').html('Thanh toán');
					$('.action-cart a').removeClass('over-time');
				}
			}else{
				if (hours < hend || hours > hstart){
					$('.top-bar').removeClass('hide');
					$('.btn-check a').addClass('over-time').html('Đã ngưng nhận đơn hôm nay');
					$('.action-cart a').addClass('over-time');
				}else{
					$('.top-bar').addClass('hide');
					$('.btn-check a').removeClass('over-time').html('Thanh toán');
					$('.action-cart a').removeClass('over-time');
				}
			}
			if($('#header-pick-time').length > 0){
				var text_delivery = parseInt($('.btn-choise-time').text());
				if(!isNaN(text_delivery)){
					$('.btn-check a').removeClass('over-time').html('Thanh toán');
					$('.action-cart a').removeClass('over-time');
				}
			}
		}
		check_time();
		$(".btn-choise-time").click(function(){
			$(this).parent().toggleClass("active");
		});
		var fix_d = new Date(), choise_day = '';
		var dayf = fix_d.getTime();
		var check_hours = fix_d.getHours();
		var one = dayf + 86400000;
		var two = dayf + (86400000*2);
		one = new Date(one);
		two = new Date(two);
		choise_day += '<option data-check="oke" value="'+ fix_d.getFullYear() +'-'+ format_date(fix_d.getDate()) +'-'+ format_date(fix_d.getMonth() + 1) +'" >Hôm nay</option>';
		choise_day += '<option data-check="" value="'+ fix_d.getFullYear() +'-'+ format_date(one.getDate()) +'-'+ format_date(one.getMonth() + 1) +'" >Ngày '+ format_date(one.getDate()) +'-'+ format_date(one.getMonth() + 1) +'</option>';
		choise_day += '<option data-check="" value="'+ fix_d.getFullYear() +'-'+ format_date(two.getDate())+'-'+ format_date(two.getMonth() + 1) +'" >Ngày '+ format_date(two.getDate()) +'-'+ format_date(two.getMonth() + 1) +'</option>';
		$('.choise-day').html(choise_day);
		function format_date(num){
			if( num < 10 )
				return '0'+num;
			else
				return num;
		}
		$('.sub-choise-now').click(function(){
			var _this = $(this);
			var time = 'Giao ngay';
			$('.btn-choise-time span').html(time);
			$.ajax({
				type: "POST",
				url: "/cart/update.js",
				data: "note=Giao ngay",
				dataType: "json",
				success: function(a) {
					_this.parents('.action-acc').toggleClass('active');
					check_time();
				},
			});
		});
		$('.sub-choise-time').click(function(){
			$(this).next().toggleClass("active");
		});
		$('.choise-day').change(function(){
			var check = $(this).find('option:checked').data('check');
			if(check == 'oke'){
				$('.choise-time option').each(function(){
					var hourse = $(this).data('hours');
					if(hourse <= check_hours) $(this).attr('disabled','disabled').removeAttr('selected');
				});
				$('.choise-time option:not([disabled])').eq(0).trigger('click').attr('selected', true).prop('selected',true);
			}else{
				$('.choise-time option').removeAttr('disabled').removeAttr('selected');
				$('.choise-time option').eq(0).attr('selected', true).prop('selected',true);
			}
			if($('.choise-time option:not([disabled])').length == 0){
				$('.btn-choise-submit, .sub-choise-now').addClass('disabled');
			}else{
				$('.btn-choise-submit, .sub-choise-now').removeClass('disabled');
			}
			if(check_hours >= 20){
				$('.sub-choise-now').addClass('disabled');
			}else{
				$('.sub-choise-now').removeClass('disabled');
			}
		});
		$('.choise-day option:first-child').trigger('change');
		$('.btn-choise-submit').click(function(e){
			e.preventDefault();
			var time = $('.choise-day').val() + ' ' + $('.choise-time').val();
			$('.btn-choise-time span').html(time);
			var _this = $(this);
			$.ajax({
				type: "POST",
				url: "/cart/update.js",
				data: "note=" + time,
				dataType: "json",
				success: function(a) {
					_this.parents('.action-acc').toggleClass('active');
					check_time();
				},
			});
		});
		$('.cart-mobile').click(function(){
			if($(this).parent('.sticky-right').hasClass('active')){
				$(this).parent('.sticky-right').removeClass('active');
				$(this).find('.flex-box span').eq(1).html('Xem chi tiết');
				$('body').removeClass('cart-open');
			}else{
				$('body').addClass('cart-open');
				$(this).parent('.sticky-right').addClass('active');
				$(this).find('.flex-box span').eq(1).html('Đóng');
			}
		});
		$('.overlay-order').click(function(){
			$('.cart-mobile').parent('.sticky-right').removeClass('active');
			$('.cart-mobile').find('.flex-box span').eq(1).html('Xem chi tiết');
			$('body').removeClass('cart-open');
		});
		$('.order-item .quickview').click(function(e){
			e.preventDefault();
			var link = $(this).data('link');
			$.ajax({
				url:link +'?view=quickview',
				success:function(e){
					$('#quick-view-modal').html(e);		
					$('#quick-view-modal').modal("show");
					$('#quick-view-modal').on('shown.bs.modal', function () {
						if($('#quickview-des__toggle').height() > 150){ 
							$('#quickview-des__toggle').addClass('opened'); 
							$('.quickview-des__trigger .btn-toggle').addClass('btn-viewmore').find('span').html('Xem thêm chi tiết sản phẩm +');
						}		
					});
				}
			})
		});
		$('#quick-view-modal').on('show.bs.modal', function () {
			$('.cart-mobile').parent('.sticky-right').addClass('modal-quickview-show')
		});
		$('#quick-view-modal').on('hide.bs.modal', function() {
			$('.cart-mobile').parent('.sticky-right').removeClass('modal-quickview-show')
		});
		$('.orders-cart').on('click','.cart-item-remove',function(e){
			e.preventDefault();
			var id = $(this).data('id');
			$.ajax({
				type:'POST',
				url: "/cart/change.js",
				data: "quantity=0&id=" + id,
				success: function(datas){
					$.ajax({
						type:'GET',
						url: '/cart?view=update',
						success: function(data){
							$('.ajax-here').html(data);
						}
					});
					$.getJSON('/cart.js', function(data){
						if (data.item_count == 0){
							$(".btn-check a").addClass("disabled");
						}else{
							$(".btn-check a").removeClass("disabled");
						}
						$('.count-holder').html(data.item_count);
						if($('.sticky-right').hasClass('active')){
							$('.cart-mobile .flex-box').html('<span>'+data.items.length+' Món</span><span>Đóng</span><span>'+Haravan.formatMoney(data.total_price, formatMoney)+'</span>');
						}else{
							$('.cart-mobile .flex-box').html('<span>'+data.items.length+' Món</span><span>Xem chi tiết</span><span>'+Haravan.formatMoney(data.total_price, formatMoney)+'</span>');
						}
					});
				}
			});
		});
		$('.orders-cart').on('click','.btn-plus', function(e){
			e.preventDefault();
			var val = parseInt($(this).parent().find('input').val());
			var id = $(this).parents('.select-quantity').data('id');
			if ( val != undefined ) {
				$(this).prev().val(val + 1);
				$(this).parent().find('.btn-sub').removeClass('disabled');
				update_cart(id,val+1);
			}else {
				console.log('error: Not see elemnt ' + jQuery('input[name="quantity"]').val());
			}
			var $input = $(this).parent().find('input[name="quantity"]').eq(0);
			if($input.attr('data-limit') == '' || $input.attr('data-limit') == null)
				return false;
			var qty = $input.val(), limit = parseInt($input.attr('data-limit'));
			if(isNaN(limit))
				return false;
			if(qty > limit){
				$input.val(limit);
			}
		});
		$('.orders-cart').on('click','.btn-sub', function(e){
			e.preventDefault();
			var val = parseInt($(this).parent().find('input').val());
			var id = $(this).parents('.select-quantity').data('id');
			if ( val != undefined ) {
				if (val > 1) {
					$(this).next().val(val - 1);
					if(val == 2) $(this).addClass('disabled');
				}
				var math = val - 1;
				if (math == 0){
					$(this).parents('.cart-item').find('.cart-item-remove').click();
				}else{
					update_cart(id,val-1);
				}
			}else {
				console.log('error: Not see elemnt ' + jQuery('input[name="quantity"]').val());
			}
			var $input = $(this).parent().find('input[name="quantity"]').eq(0);
			if($input.attr('data-limit') == '' || $input.attr('data-limit') == null)
				return false;
			var qty = $input.val(), limit = parseInt($input.attr('data-limit'));
			if(isNaN(limit))
				return false;
			if(qty > limit){
				$input.val(limit);
			}
		});
		function update_cart(id,quantity){
			var line = {line: id, quantity: quantity};
			$.ajax({
				type:'POST',
				url: "/cart/change.js",
				data: line,
				dataType: "json",
				success: function(datas){
					$('.count-holder').html(datas.item_count);
					$('.orders-cart .orders-cart-bottom .subtotal .orders-total').html(Haravan.formatMoney(datas.total_price, formatMoney));
					$('.orders-cart .orders-cart-bottom .tax .orders-total').html(Haravan.formatMoney(datas.total_price, formatMoney));
					$('.orders-cart .orders-cart-bottom .amount .orders-total').html(Haravan.formatMoney(datas.total_price, formatMoney));
					if($('.sticky-right').hasClass('active')){
						$('.cart-mobile .flex-box').html('<span>'+datas.items.length+' Món</span><span>Đóng</span><span>'+Haravan.formatMoney(datas.total_price, formatMoney)+'</span>');
					}else{
						$('.cart-mobile .flex-box').html('<span>'+datas.items.length+' Món</span><span>Xem chi tiết</span><span>'+Haravan.formatMoney(datas.total_price, formatMoney)+'</span>');
					}
					for(i = 0;i< datas.items.length;i++){
						var id = datas.items[i].variant_id;
						var price = Haravan.formatMoney(datas.items[i].line_price, formatMoney);
						$('.orders-cart .cart-item[data-id="'+id+'"] .quantity-selector').val(datas.items[i].quantity);
						$('.orders-cart .cart-item[data-id="'+id+'"] .cart-item-price span').html(price);
					}
				}
			});
		}
		$('.sticky-right').click(function(e){
			var target = e.target;
			if (!$(target).closest('.cart-mobile').length && !$(target).closest('.orders-cart').length ) {
				$('.sticky-right').removeClass('active');
				$('body').removeClass('cart-open');
				$('.cart-mobile .flex-box span').eq(1).html('Xem chi tiết');
			}
		})
		$('#quick-view-modal').on('click','.product-title img',function(){
			var item = $('#quick-view-modal .list-img').html();
			if($('.slider-img .product-img-owl').hasClass('owl-loaded')){
				$('.slider-img .product-img-owl').html('').owlCarousel('destroy');
			}
			$('.slider-img .product-img-owl').html(item).owlCarousel({
				items:1,
				nav: false,
				dots: true,
				loop:false
			});
			$('.slider-img').removeClass('hide');
		});
		$('.slider-img-close').click(function(){
			$('.slider-img').addClass('hide');
		});
		var lastId,
				topMenu = $(".orders-cate ul"),
				menuItems = topMenu.find("a"),
				scrollItems = menuItems.map(function () {
					if (0 === $(this).attr("href").indexOf("#")) {
						var e = $($(this).attr("href"));
						if (e.length) return e;
					}
				});
		$(window).scroll(function () {
			if (($(".main-header").length > 0 && $(window).scrollTop() > 0 ? $(".main-header").addClass("fixed") : $(".main-header").removeClass("fixed"), $(window).width() < 768)) {
				$(window).scrollTop() > 0 ? $(".orders-cate").addClass("top") : $(".orders-cate").removeClass("top");
				var e = 0,
						t = !0;
				if (
					($(".orders-cate li").each(function () {
						t && (e += $(this).outerWidth()), $(this).hasClass("active") && (t = !1);
					}),
					 e > $(window).width() && $(".orders-cate li.active").length > 0)
				) {
					var a = e - $(window).width() + 20;
					$(".orders-cate ul").css("transform", "translateX(-" + a + "px)");
				} else $(".orders-cate ul").css("transform", "translateX(0)");
			}
			var i = $(this).scrollTop() + 80,
					n = scrollItems.map(function () {
						if ($(this).offset().top < i) return this;
					}),
					s = (n = n[n.length - 1]) && n.length ? n[0].id : "";
			lastId !== s &&
				((lastId = s),
				 menuItems
				 .parent()
				 .removeClass("active")
				 .end()
				 .filter("[href='#" + s + "']")
				 .parent()
				 .addClass("active"));
		});
		$(".orders-cate ul li a").click(function (e) {
			e.preventDefault();
			var t = $(this).attr("href"),
					a = $(t).offset().top - 70;
			$(window).width() < 768 && (a = $(t).offset().top - 75), $("body,html").animate({ scrollTop: a + "px" }, 500);
		});
		var slug = function (e) {
			return (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.toLowerCase()).replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")).replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")).replace(/ì|í|ị|ỉ|ĩ/g, "i")).replace(
				/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
				"o"
			)).replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")).replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")).replace(/đ/g, "d")).replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-")).replace(/-+-/g, "-")).replace(/^\-+|\-+$/g, ""));
		}
		var $filter = $('.search-product input[type="text"]');
		$filter.bind("keyup change paste propertychange", function () {
			var e = $(this).val();
			e.length > 0
				? ((e = slug(e)),
					 $(this).attr("data-history", e),
					 $(".orders-cate li").removeClass("active"),
					 $(".orders-block, .order-item li").addClass("d-none"),
					 $(".orders-block").each(function () {
				var t = $(this);
				t.find(".order-item li").each(function () {
					-1 != $(this).data("value").indexOf(e) && ($(this).removeClass("d-none"), t.removeClass("d-none"));
				});
			}))
			: $(".orders-block, .order-item li").removeClass("d-none");
		});
	}
}
AG.PageAbout = {
	init: function(){
		this.sliderAbout();
	},
	sliderAbout: function(){
		$('.slider-about--owl').owlCarousel({
			items:1,
			nav: true,
			navText: [
				'<div class="prev-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#2196F3;" d="M511.189,259.954c1.649-3.989,0.731-8.579-2.325-11.627l-192-192c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82l173.803,173.803H10.667C4.776,245.213,0,249.989,0,255.88c0,5.891,4.776,10.667,10.667,10.667h464.917L301.803,440.328c-4.237,4.093-4.355,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262l192-192C509.872,262.42,510.655,261.246,511.189,259.954z"/><path d="M309.333,458.546c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571L486.251,255.88L301.781,71.432c-4.093-4.237-3.975-10.99,0.262-15.083c4.134-3.992,10.687-3.992,14.82,0l192,192c4.164,4.165,4.164,10.917,0,15.083l-192,192C314.865,457.426,312.157,458.546,309.333,458.546z"/><path d="M501.333,266.546H10.667C4.776,266.546,0,261.771,0,255.88c0-5.891,4.776-10.667,10.667-10.667h490.667c5.891,0,10.667,4.776,10.667,10.667C512,261.771,507.224,266.546,501.333,266.546z"/></svg></div>',
				'<div class="next-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#2196F3;" d="M511.189,259.954c1.649-3.989,0.731-8.579-2.325-11.627l-192-192c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82l173.803,173.803H10.667C4.776,245.213,0,249.989,0,255.88c0,5.891,4.776,10.667,10.667,10.667h464.917L301.803,440.328c-4.237,4.093-4.355,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262l192-192C509.872,262.42,510.655,261.246,511.189,259.954z"/><path d="M309.333,458.546c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571L486.251,255.88L301.781,71.432c-4.093-4.237-3.975-10.99,0.262-15.083c4.134-3.992,10.687-3.992,14.82,0l192,192c4.164,4.165,4.164,10.917,0,15.083l-192,192C314.865,457.426,312.157,458.546,309.333,458.546z"/><path d="M501.333,266.546H10.667C4.776,266.546,0,261.771,0,255.88c0-5.891,4.776-10.667,10.667-10.667h490.667c5.891,0,10.667,4.776,10.667,10.667C512,261.771,507.224,266.546,501.333,266.546z"/></svg></div>'
			],
			dots: true,		
			touchDrag: true,
			loop: true
		});
	}
}
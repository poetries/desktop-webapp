	// 公共属性
	var oPublic = {
			zIndex : 1,
			iPage  : 0
	};

	function drag(obj,parent) { 	
		obj.mousedown(function(ev){
			var iLeft = ev.pageX - parent.position().left;
			var iTop = ev.pageY - parent.position().top;
			
			if(parent.get(0).setCapture) {
				parent.get(0).setCapture();	
			}

			parent.css('z-index',++oPublic.zIndex);

			$(document).mousemove(function(ev) {
				var iWidth = parent.outerWidth();
				var iHeight = parent.outerHeight();
				var L = ev.pageX - iLeft;
				var T = ev.pageY - iTop;
				
				if($('.cells')){
					$('.cells').css('display','none');
				}

				if(L<-100){
					L = -100;
				}
				else if(L>=$(window).width()-iWidth-90){
					L = $(window).width()-iWidth-90;
				}

				if(T<-70){
					T = -70;
				}
				else if(T>=$(window).height()-iHeight-60){
					T = $(window).height()-iHeight-60;
				}

				parent.css('left', L);
				parent.css('top', T);
			});

			$(document).mouseup(function() {
				$(document).off('mousemove');
				$(document).off('mouseup');

				if(parent.get(0).releaseCapture) {
					parent.get(0).releaseCapture();
				};
			});

			return false;
		});
		
	};

	
	 function pzs(obj1,obj2){
			var L1 = obj1.offset().left;
			var R1 = obj1.offset().left + obj1.outerWidth();
			var T1 = obj1.offset().top;
			var B1 = obj1.offset().top + obj1.outerHeight();
			
			var L2 = obj2.offset().left;
			var R2 = obj2.offset().left + obj2.outerWidth();
			var T2 = obj2.offset().top;
			var B2 = obj2.offset().top + obj2.outerHeight();

			if( L1 > R2 || R1<L2 || T1 > B2 || B1<T2){
				return false;
			}
			else {

				return true;
			}	
	 };

	 function pz(obj1,obj2){
			
			var L1 = obj1.position().left;
			var R1 = obj1.position().left + obj1.outerWidth();
			var T1 = obj1.position().top;
			var B1 = obj1.position().top + obj1.outerHeight();
			
			var L2 = obj2.position().left;
			var R2 = obj2.position().left + obj2.outerWidth();
			var T2 = obj2.position().top;
			var B2 = obj2.position().top + obj2.outerHeight();

			if( L1 > R2 || R1<L2 || T1 > B2 || B1<T2){
				return false;
			}
			else {
				return true;
			}	
	 };


	 function getSortLi() {
		var aLi = $('.desk-bg').find('li');
		var obj = aLi.eq(0);
		var _index = 0;

		for (var i=1; i<aLi.length; i++) {
			if (aLi.eq(i).outerHeight() < obj.outerHeight()) {
				obj = aLi.eq(i);
				_index = i;
			}
		}

		return _index;
	}
	
	(function($){
		$.fn.drag = function(options){
			var defaults = {
				drags   :   'undefined',
				parent  :   'undefined'
			}
			
			var options = $.extend(defaults, options);

			var drags  = $(options.drags),
				parent = $(options.parent);

			drags.mousedown(function(ev){
				var iLeft = ev.pageX - parent.position().left;
				var iTop = ev.pageY - parent.position().top;
				
				if(parent.get(0).setCapture) {
					parent.get(0).setCapture();	
				}

				parent.css('z-index',oPublic.zIndex+=2);


				$(document).mousemove(function(ev) {
					var iWidth = parent.outerWidth();
					var iHeight = parent.outerHeight();
					var L = ev.pageX - iLeft;
					var T = ev.pageY - iTop;
					
					if(L<0){
						L=0;
					}
					else if(L>=$(window).width()-iWidth){
						L = $(window).width()-iWidth;
					}

					if(T<0){
						T = 0;
					}
					else if(T>=$(window).height()-iHeight){
						T = $(window).height()-iHeight;
					}

					parent.css('left', L);
					parent.css('top', T);
				});

				$(document).mouseup(function() {
					$(document).off('mousemove');
					$(document).off('mouseup');

					if(parent.get(0).releaseCapture) {
						parent.get(0).releaseCapture();
					};
				});
			});
		};

	})(jQuery);


	(function($){
		$.fn.scoll = function(options){

			var defaults = {
				scrollT : 'undefined',
				scroll  : 'undefined',
				oPos    : 'undefined',
				oUl     : 'undefined',
				childs  : 'undefined',
				downs   : false
			};		

		 var options = $.extend(defaults, options);
		
		 var scrollT = $(options.scrollT),
			 scroll  = $(options.scroll),
			 oPos    = $(options.oPos),
			 oUl     = $(options.oUl),
			 aLi     = $(options.childs),
			 iPage   = 0,
			 oBtn    = true;
			 iNow    = 40;
			
			scrollT.bind('mousedown',function(ev){
				var iTop = ev.pageY-$(this).position().top;
		
				$(document).mousemove(function(ev){
					var T = ev.pageY-iTop;

					if(options.downs){
						var _index = getSortLi();
						var ih = aLi.eq(_index).offset().top + aLi.eq(_index).outerHeight();

						if(ih<oPos.outerHeight()+T){
							if(oBtn){
								oBtn = false;
								oPublic.iPage++;
								
								for(var i=0;i<ajImg[oPublic.iPage].length;i++){
									var aDiv = $('<div>');
									var aImg = $('<img>');
									var aP = $('<p>');
									var aA = $('<a>');
									var aEm = $('<em>');
									var aSpan = $('<span>');

									var _index = getSortLi();
									
									aImg.attr('src',ajImg[oPublic.iPage][i]);
									aEm.attr('title','设为壁纸');
									aSpan.attr('title','加入收藏');

									aP.append(aA);
									aP.append(aEm);
									aP.append(aSpan);
									aDiv.append(aP);
									aDiv.append(aImg);

									$('.desk-bg').find('li').eq(_index).append(aDiv);
									aImg.animate({width : 248 , height : 155 , left:0 ,top:0 , opacity : 100});
								}

								if(oPublic.iPage<ajImg.length-1){
									oBtn = true;		
								}
							}
						}
					}

					if(T<0)
					{
						T=0;
					}
					else if(T>scroll.outerHeight()-scrollT.outerHeight()){
						T = scroll.outerHeight()-scrollT.outerHeight();
					}
			
					scrollT.css('top',T);

					var scall = T/(scroll.outerHeight()-scrollT.outerHeight());

					var iY = oPos.outerHeight()-oUl.outerHeight();

					oUl.css('top',iY*scall);
				});
				
				$(document).mouseup(function(){
					$(document).off('mousemove');
					$(document).off('mouseup');
				});

				return false;
			});

			
	
				if(oPos.get(0).addEventListener){
					oPos.get(0).addEventListener('DOMMouseScroll',show,false);
				}
				
			
				oPos.get(0).onmousewheel = show;


				function show(ev){
					var ev = ev || window.event;

					if(ev.detail){
						bBtn = ev.detail>0 ? true : false;
					}
					else{
						bBtn = ev.wheelDelta<0 ? true : false;
					}
					
					var iY = oPos.outerHeight()-oUl.outerHeight();

					if(bBtn)
					{
						
						var T = scrollT.position().top+10;
						
						if(T>scroll.outerHeight()-scrollT.outerHeight()){
							T = scroll.outerHeight()-scrollT.outerHeight();
						}

						var scall = T/(scroll.outerHeight()-scrollT.outerHeight());

						scrollT.css('top',T);
						oUl.css('top',iY*scall-iNow);


						if(options.downs){
							var _index = getSortLi();
							var ih = aLi.eq(_index).offset().top + aLi.eq(_index).outerHeight();

							if(ih<oPos.outerHeight()+T){
								
								if(oBtn){
									oBtn = false;
									oPublic.iPage++;
									
									for(var i=0;i<ajImg[oPublic.iPage].length;i++){
										var aDiv = $('<div>');
										var aImg = $('<img>');
										var aP = $('<p>');
										var aA = $('<a>');
										var aEm = $('<em>');
										var aSpan = $('<span>');
										var _index = getSortLi();

										aP.append(aA);
										aP.append(aEm);
										aP.append(aSpan);
										aDiv.append(aP);
										aDiv.append(aImg);

										aImg.attr('src',ajImg[oPublic.iPage][i]);
										aEm.attr('title','设为壁纸');
										aSpan.attr('title','加入收藏');

										aDiv.append(aImg);

										$('.desk-bg').find('li').eq(_index).append(aDiv);
										aImg.animate({width : 248 , height : 155 , left:0 ,top:0 , opacity : 100});
									}

									if(oPublic.iPage<ajImg.length-1){
										oBtn = true;		
									}
								}
							}
						}
					}
					else
					{

						var T = scrollT.position().top-10;
						if(T<0)
						{
							T=0;
						}
						var scall = T/(scroll.outerHeight()-scrollT.outerHeight());

						scrollT.css('top',T);
						oUl.css('top',iY*scall);
					}
				
				
			}
		};
	})(jQuery);


	$.extend(jQuery.easing,{
	
	easeIn: function(x,t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(x,t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(x,t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(x,t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(x,t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(x,t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(x,t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(x,t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(x,t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(x,t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(x,t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(x,t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(x,t, b, c, d){    //弹球减振（弹球渐出）
		return c - this['bounceOut'](x,d-t, 0, c, d) + b;
	},       
	bounceOut: function(x,t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(x,t, b, c, d){
		if (t < d/2) {
			return this['bounceIn'](x,t*2, 0, c, d) * 0.5 + b;
		}
		return this['bounceOut'](x,t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
	
});

	 

	 
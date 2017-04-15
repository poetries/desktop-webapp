  function Show3d(){
	 this.timer = null;
	 this.timers = null;
	 this.iNow = 0;
	 this.iNum = 0;
	 this.num = 1;
	 this.aIndex = 0;
	 this.navLi = $('.work-nav').find('li');
	 this.aBut = $('.zm-btn a');
	 this.aBox = $('.cMContentBox');
	 this.aCont = $('.cMContent');
	 this.oClose = $('.works-close');
	 this.focus = $('span.active');
	 this.preBut = $('.work-prev-btn');
	 this.nextBut = $('.work-next-btn');
	 this.workBut = $('#photo-but');
	 this.str = window.navigator.userAgent.toLowerCase();
	 this.movePlace = {
		  beWidth    :	 196,
		  beHeight   :   42,
		  nowWidth   :   848,
		  nowHeight  :   442,
		  beLeft     :   180,
		  beTop      :   250,
		  nowLeft    :   848
	 }
  };

  Show3d.prototype = {
		init   :  function(){
			var This = this;

			$('.cMContent').scoll({
				scrollT  :  $('.alertBoxScroll span'),
				scroll   :  $('.alertBoxScroll'),
				oPos     :	 $('.alertBoxWindow'),
				oUl      :  $('.alertBoxWindowC')
			});

			for(var i=0;i<this.navLi.length;i++){
				this.navLi.eq(i).css('left',25*i+'%')
			}
			 
			 $('.works-closes').click(function(){
				$('.works-main').stop().animate({
						opacity : 0
				},1200,function(){
					$('.works-main').css('z-index','1');
					$('.works-main').css('display','none');
				});
			 });

			 this.workBut.click(function(){
				$('.works-main').css('z-index','1000');
				$('.works-main').css('display','block');
				$('.works-main').stop().animate({
						opacity : 1
				},1200);
			 });

			if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
				this.aBox.eq(0).addClass('show');
			}
			else{
				this.aBox.eq(0).css({left : '420px'});
			}

			this.aBut.mousemove(function(ev){
				This.fnMove($(this),ev);
			});

			this.aBut.mouseout(function(){
				This.fnOut($(this));
			});

			this.aBut.click(function(){
				This.fnCk($(this));
			});

			this.oClose.click(function(){
				This.fnClose();
			});

			this.setCut();
		},

		fnMove  :  function(obj,ev){
			if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
				var iL = ev.pageX - obj.offset().left-95;
				obj.css({backgroundPosition :iL +'px -16px, 0 0'})
			}
		},

		fnOut   :  function(obj){
			if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
				obj.css({backgroundPosition :'18px -16px, 0 0'})
			}
		},

		fnCk    :  function(obj){
			clearTimeout(this.timers);
			var This = this;

			this.aIndex = obj.parent().parent().index();

			if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
				this.aCont.eq(obj.parent().parent().index()).css('visibility','visible');
				this.aCont.eq(obj.parent().parent().index()).find('table').css('display','block');
				this.aCont.eq(obj.parent().parent().index()).css({
					WebkitTransform : 'translate3d(0,0,0) scale(1) rotateX(0deg)',
					MozTransform : 'translate3d(0,0,0) scale(1) rotateX(0deg)',
					opacity : 1
				});
			}
			else{
				this.aCont = $('.cMContent').eq(this.aIndex);

				this.aCont.find('h3').css({ opacity : 0});

				this.aCont.css({
					 visibility : 'visible',
					 width      : This.movePlace.beWidth,
					 height     : This.movePlace.beHeight,
					 opacity    : 0,
					 marginLeft : 0,
					 left       : This.movePlace.beLeft,
					 top        : This.movePlace.beTop
				});
				
				$('.cMContent').eq(this.aIndex).find('table').css({
					opacity    : 0
				});
				

				this.aCon =  $('.cMContent').eq(this.aIndex);
				
				this.aCont.stop().animate({
					width   : This.movePlace.nowWidth,
					height  : This.movePlace.nowHeight,
					opacity : 1,
					top     : This.movePlace.beTop-((This.movePlace.nowHeight-This.movePlace.beHeight)/2),
					left    : This.movePlace.beLeft-((This.movePlace.nowWidth-This.movePlace.beWidth)/2)
				},500,function(){
					
					This.aCont.find('h3').stop().animate({
						opacity    : 1
					});
					
					This.aCont.find('table').css('display','block');
					This.aCont.find('table').stop().animate({
						opacity    : 1
					});
				});

			}

			$('.work-wrap').css('z-index',4);
		},

		fnClose  :  function(){
			var This = this;

			if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
				this.aCont.eq(this.aIndex).css({
					WebkitTransform : 'translate3d(0,400px,-100px) scale(0.1) rotateX(180deg)',
					MozTransform : 'translate3d(0,400px,-100px) scale(0.1) rotateX(180deg)',
					opacity : 0
				});
			}
			else{
				this.aBox.eq(this.aIndex).find('h3').stop().animate({
					opacity    : 0
				});
				
				
				this.aBox.eq(this.aIndex).find('table').stop().animate({
					opacity    : 0

				},500,function(){
					This.aBox.eq(This.aIndex).find('.cMContent').stop().animate({
						width   : This.movePlace.beWidth,
						height  : This.movePlace.beHeight,
						opacity : 0,
						top     : This.movePlace.beTop,
						left    : This.movePlace.beLeft
					},500)
				});
		
			}

			this.timers = setTimeout(function(){
				$('.work-wrap').css('z-index',1);
			},1000)
		},

		setCut   :  function(){
			var This = this;

			this.navLi.mouseover(function(){
				clearTimeout(This.timer);
				This.focus.stop().animate({ left : $(this).position().left-8},250)
			});

			this.navLi.mouseout(function(){
				This.timer = setTimeout(function(){
					This.focus.stop().animate({ left : This.navLi.eq(This.iNow).position().left-8},200)
				},600)	
			});
			
			this.navLi.prop('att','right');
			this.navLi.eq(0).prop('att','center');

			this.nextBut.click(function(){
				This.startBox(1);
			});

			this.preBut.click(function(){
				This.startBox(-1);		
			});
			
				
			this.navLi.click(function(){
				if($(this).prop('att') == 'right'){	
					if(This.str.indexOf('chrome')!=-1 || This.str.indexOf('firefox')!=-1){
						This.aBox.eq($(this).index()).addClass('show');	
						
						for(var i=0;i<This.navLi.length;i++){
							if(This.navLi.eq(i).prop('att') == 'center'){
								This.navLi.eq(i).prop('att','left');
								This.aBox.eq(i).removeClass('show');
								This.aBox.eq(i).addClass('hide');
							}
						}
					}
					else{

						This.aBox.eq($(this).index()).stop().animate({ left : 420});

						for(var i=0;i<This.navLi.length;i++){
							if(This.navLi.eq(i).prop('att') == 'center'){
								This.navLi.eq(i).prop('att','left');
								This.aBox.eq(i).stop().animate({left : -600})
							}
						}
					}
				}

				if	($(this).prop('att') == 'left'){
					if(This.str.indexOf('chrome')!=-1 || This.str.indexOf('firefox')!=-1){
						This.aBox.eq($(this).index()).removeClass('hide');
						This.aBox.eq($(this).index()).addClass('show');

						for(var i=0;i<This.navLi.length;i++){
							if(This.navLi.eq(i).prop('att') == 'center'){
								This.navLi.eq(i).prop('att','right');
								This.aBox.eq(i).removeClass('show');
								This.aBox.eq(i).removeClass('hide');
							}
						}
					}
					else{

						This.aBox.eq($(this).index()).stop().animate({ left : 420});

						for(var i=0;i<This.navLi.length;i++){
							if(This.navLi.eq(i).prop('att') == 'center'){
								This.navLi.eq(i).prop('att','right');
								This.aBox.eq(i).stop().animate({left : 1450})
							}
						}
					}
				}
				

				if($(this).index()== This.aBox.length-1){
					This.nextBut.removeClass('active');
					This.preBut.addClass('active');
				}
				else if($(this).index() == 0){
					This.nextBut.addClass('active');
					This.preBut.removeClass('active');
				}
				
				This.iNow = $(this).index();
				This.navLi.eq($(this).index()).prop('att','center');
			});
		},
			
		startBox   :  function(num){
				this.iNow += num;
				
				if(this.iNow >= this.aBox.length-1){
					this.iNow = this.aBox.length-1;
					this.nextBut.removeClass('active');
					this.preBut.addClass('active');
				}
				else if(this.iNow <= 0){
					this.iNow = 0;
					this.nextBut.addClass('active');
					this.preBut.removeClass('active');
				}

				if(this.navLi.eq(this.iNow).prop('att') == 'right'){	
					if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
						this.aBox.eq(this.iNow).addClass('show');	
						
						for(var i=0;i<this.navLi.length;i++){
							if(this.navLi.eq(i).prop('att') == 'center'){
								this.navLi.eq(i).prop('att','left');
								this.aBox.eq(i).removeClass('show');
								this.aBox.eq(i).addClass('hide');
							}
						}
					}
					else{

						this.aBox.eq(this.iNow).stop().animate({ left : 420});

						for(var i=0;i<this.navLi.length;i++){
							if(this.navLi.eq(i).prop('att') == 'center'){
								this.navLi.eq(i).prop('att','left');
								this.aBox.eq(i).stop().animate({left : -600})
							}
						}
					}
				}

				if	(this.navLi.eq(this.iNow).prop('att') == 'left'){
					if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
						this.aBox.eq(this.iNow).removeClass('hide');
						this.aBox.eq(this.iNow).addClass('show');

						for(var i=0;i<this.navLi.length;i++){
							if(this.navLi.eq(i).prop('att') == 'center'){
								this.navLi.eq(i).prop('att','right');
								this.aBox.eq(i).removeClass('show');
								this.aBox.eq(i).removeClass('hide');
							}
						}
					}
					else{

						this.aBox.eq(this.iNow).stop().animate({ left : 420});

						for(var i=0;i<this.navLi.length;i++){
							if(this.navLi.eq(i).prop('att') == 'center'){
								this.navLi.eq(i).prop('att','right');
								this.aBox.eq(i).stop().animate({left : 1450})
							}
						}
					}
				}
				
				var dis = this.navLi.eq(this.iNow).position().left-8;

				this.focus.stop().animate({ left : dis},350)

				this.navLi.eq(this.iNow).prop('att','center');
		}
  };
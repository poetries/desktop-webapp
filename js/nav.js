  function Clearbg(){
		this.walls = $('.wall');
		this.wallBg = $('.wall-bg');
		this.deskcok = $('.desk-cok');
		this.wallUl = this.walls.find('ul');
		this.trade = $('.trade');
		this.move = $('.move-bg');
		this.oAlert =$('.q-alert');
		this.oSwitch = $('.q-switch');
		this.oClose = $('.q-close');
		this.oTile = $('.q-title').find('a'); 
		this.aA = $('.desk-cok-title').find('a');
		this.nav = $('.web_top_focus').find('li');
		this.str = window.navigator.userAgent.toLowerCase();
		this.num = 0;
		
		/* 定义图片宽高 */
		this.olocation = {
				iHeight  : 80 ,
				iWidth   : 124,
				ajImg    : 248
		}
  }; 

  Clearbg.prototype = {

		init  :  function(){
			var This = this;
			var timer = null;
			this.addBut = true;
			var iNow = 0;
			

			$('.gather').css('left','-1700px');
			$('.gather').eq(0).css('left','100px');

			$('.nav').find('li').click(function(){
				$('.nav').find('li a').removeClass('active');
				$(this).find('a').addClass('active');

				if($(this).index()>iNow){
					$('.gather').eq(iNow).stop().animate({left : '1700px'});
					$('.gather').eq($(this).index()).css('left','-1700px');
				}
				else if($(this).index()<iNow){
					$('.gather').eq(iNow).stop().animate({left : '-1700px'});
					$('.gather').eq($(this).index()).css('left','1700px');
				}

				if($(this).index() == 0){
					$('.gather').eq($(this).index()).stop().animate({left : '100px'});
				}
				else{
					$('.gather').eq($(this).index()).stop().animate({left : 0});
				}

				iNow = $(this).index();

				if($(this).attr('class') == 'nav3'){
					search.column();
				}
			});

			/* nav显示壁纸 */
			this.walls.mouseover(function(){
				$('.account-info').css('display','none');

				clearTimeout(timer);
				This.fnMove($(this));
			});
			
			this.walls.mouseout(function(){
				var aThis = $(this);
				clearTimeout(timer);
				timer = setTimeout(function(){
					This.fnMout(aThis);
				},500)
				
			});
            
			/* 切换壁纸 */
			this.trade.click(function(){
				
				This.fnTrade($(this));
			});
			
			/* 桌面壁纸弹窗 */
			this.move.click(function(){
				This.moveBg();
				This.getImage();
				This.getBg();
			});
			
			/* 缩小壁纸弹窗 */
			this.oSwitch.click(function(){
				This.fnSwitch($(this).siblings('span').html());
			});

			/* 关闭壁纸弹窗 */
			this.oClose.click(function(){
				This.fnClose();
			});
			
			/* 鼠标滚轮控制滚动条 */
			$('.q-scroll span').scoll({
				 scrollT : '.q-scroll span',
				 scroll  : '.q-scroll',
				 oPos    : '.desk-bg',
				 oUl     : '.desk-bg ul',
				 childs  : '.desk-bg ul li',
				 downs	 : true
			});
			
			/* 拖拽弹窗 */
			$('.q-alert h4').drag({
				drags   :   '.q-alert h4',
				parent  :   '.q-alert'
			});
			
			/* 更换壁纸 */
			$('#setbg').click(function(){
				if(This.str.indexOf('chrome')!=-1 || This.str.indexOf('firefox')!=-1){
					var booking = JSON.parse(localStorage.getItem(login_name));
					if(booking != null){
						if(booking.coll || booking.bg){
							This.getImage();
							This.getBg();
						}
					}
				}

				This.moveBg();
				
			});
			
			this.collect();
		},

		fnMove  : function(obj){
			var This = this;
			obj.addClass('active');
			this.wallBg.css('display','block');

			var aImg = '';
			var iNow = 0;
			var timer = null;
			
			if(this.wallBg.find('img').length<natureBg.length){
				for(var i=0;i<natureBg.length;i++){
					aImg += '<li><img src="'+natureBg[i].pic+'" title="'+natureBg[i].name+'"></li>';
				}
					This.wallUl.append(aImg);
			}

			this.wallBg.stop().stop().animate({height  : 363 , opacity : 1},100,function(){
				This.wallUl.css('background','#fff')
				timer = setInterval(function(){
					if(iNow == This.wallBg.find('img').length){
						clearInterval(timer);
						iNow = 0;
					}

					This.wallBg.find('img').eq(iNow).stop().animate({
						left    : 0,
						top     : 0,
						height  : This.olocation.iHeight,
						width   : This.olocation.iWidth,
						opacity : 100

					},150);

					iNow++;

				},50)
				
			});	
			
			this.wallBg.undelegate();
			this.wallBg.delegate('li','click',function(ev){
				This.fnaBg($(this));
				
			});

		},

		fnMout  : function(obj){
			var This = this;
		
			this.wallBg.stop().animate({height  : 0 , opacity : 0},150,function(){
				This.wallBg.css('display','none');
				obj.removeClass('active');
				This.wallUl.html('');
				This.wallUl.css('background','none')
			});
		},

		fnTrade : function(obj){
			var arr = [natureBg , belleBg , wmBg];
			var This = this;
		
			var aImg = '';
			var iNow = 0;
			var timer = null;

			this.wallUl.html('');

			this.num++;
			this.num %= arr.length;
			
			if(this.wallBg.find('img').length<arr[this.num].length){
				for(var i=0;i<arr[0].length;i++){

					aImg += '<li><img style="opacity:0,width:62px;height:41px" src="'+arr[this.num][i].pic+'" title="'+arr[this.num][i].name+'"></li>';
				}
					This.wallUl.append(aImg);
			}


			this.wallBg.stop().animate({height  : 363 , opacity : 1},150,function(){
				This.wallUl.css('background','#fff')
				timer = setInterval(function(){
					if(iNow == This.wallBg.find('img').length){
						clearInterval(timer);
						iNow = 0;
					}
			
					This.wallBg.find('img').eq(iNow).stop().animate({
						left    : 0,
						top     : 0,
						height  : This.olocation.iHeight,
						width   : This.olocation.iWidth,
						opacity : 100
					},150);

					iNow++;
				},50)
			});
	
		},

		fnaBg  :  function(obj){
			var aImg = obj.find('img').attr('src');

			var arr = aImg.split('');
			var strs = '';
			
			for(var i=0;i<arr.length;i++){
				if(arr[i] != 's'){
					strs += arr[i];
				}
			}
	
			if(this.str.indexOf('msie 7.0') != -1){
				$('#bgs').find('.bg').attr('src',strs.substring(aImg.indexOf('Q+')+1));	
			}
			else{
				$('#bgs').find('.bg').attr('src',strs);
			}
			
			$('#bgs').css('display','block');
			
			this.clearBg(aImg);
		},

		moveBg  : function(){
			var This = this;
			this.oAlert.css('display' , 'block')

			this.oAlert.stop().animate({
					left	: ($(window).width()-This.oAlert.outerWidth())/2,
					top		: ($(window).height()-This.oAlert.outerHeight())/2,
					opacity : 100
			},400,'easeIn',function(){
						
				This.getImg();		
				This.setImg();
			});
		},
		
		fnSwitch : function(title){
			
			for(var i=0;i<$('.task_menu_cn').length;i++){
				if($('.task_menu_cn').eq(i).find('h4').text() == title){
					$('.task_menu_cn').eq(i).remove();
				}
			}

			$('#task_main').append(
				'<div class="task_menu_cn">'+
					'<div class="task_menu">'+
						'<h4 class="task_title">'+title+'</h4>'+
						'<a class="task_max"></a>'+
						'<a class="task_close"></a>'+
					'</div>'+
				'</div>'
			)
			
			for(var i=0;i<$('.task_menu_cn').length;i++){
				var taskMenu = $('.task_menu_cn').eq(i);
				if(taskMenu.find('h4').text() == title){
					taskMenu.css({
						width   : 0,
						opacity : 0
					})

					taskMenu.animate({
							width   : '100px',
							opacity : 1
					})

					taskMenu.mouseover(function(){
						$(this).find('.task_menu').stop().animate({
							top : '-30px'
						},400)
					});

					taskMenu.mouseout(function(){
						$(this).find('.task_menu').stop().animate({
							top : 0
						},400)
					});

					taskMenu.find('.task_max').click(function(){
						$('#qs-alert').css('display' , 'block');

						$('#qs-alert').stop().animate({
							height  : '456px',
							opacity : 1,
							top     : '100px'
						});

						taskMenu.stop().animate({
							width    :  0,
							opacity  :  0
						},function(){
							taskMenu.remove();
						});
					});

					taskMenu.find('.task_close').click(function(){
						taskMenu.stop().animate({
							width    :  0,
							opacity  :  0
						},function(){
							taskMenu.remove();
						});

						$('#qs-alert').css({
							height  : '456px',
							opacity : 1,
							display : 'none'
						}) 
					});
				}
			}

			$('#qs-alert').animate({
				 height   : 0,
				 opacity  : 0,
				 top      : $('#qs-alert').outerHeight()
			},function(){
				$('#qs-alert').css({
					height  : '456px',
					opacity : 1,
					display : 'none'
				}) 
			});

			
		},

		fnClose : function(){
			var This = this;

			this.oAlert.stop().animate({
					left	: 2000,
					top		: -600,
					opacity : 0
			},400,'easeIn',function(){

					This.oAlert.css({				
						'left'  : -600,
						'top'	: -600
					});		
			})
		},
		
		getImg    :  function(){
				if(ajImg[1]){
					for(var i=0;i<ajImg[0].length;i++){
						var aDiv = $('<div>');
						var aImg = $('<img>');

						var aP = $('<p>');
						var aA = $('<a>');
						var aEm = $('<em>');
						var aSpan = $('<span>');

						var _index = getSortLi();
						aImg.attr('src',ajImg[0][i]);
						aEm.attr('title','设为壁纸');
						aSpan.attr('title','加入收藏');

						aImg.css({width : this.olocation.ajImg , height : 'auto' , left:0 , top:0 , opacity:100});
						
						aP.append(aA);
						aP.append(aEm);
						aP.append(aSpan);
						aDiv.append(aP);
						aDiv.append(aImg);

						$('.desk-bg').find('li').eq(_index).append(aDiv);
					}
				}	
		},
		
		setImg    :   function(){
			var This = this;

			$('.desk-bg').delegate('em','click',function(){
				$('#bgs').css('display','block');

				var arr = $(this).parent().parent().find('img').attr("src").split('');
				var str = $(this).parent().parent().find('img').attr("src");
				var strs = '';

				for(var i=0;i<arr.length;i++){
					if(arr[i] != 's'){
						strs += arr[i];
					}
				}
				
				$('#bgs').find('.bg').attr('src',strs);

				This.clearBg(str);
			});
			
			
			$('.desk-bg').delegate('span','click',function(){

				$('.cok-bg').css('display','none');

				var aImg = $(this).parent().parent().find('img').attr('src');

				$('.cok-bg').css('display','none');
				
				$('.my-pic').css('display','block');

				$('.my-pic').stop().animate({ opacity : 1}).delay(1000).animate({opacity : 0},function(){
					$('.my-pic').css('display','none');
				});

				This.clearImg(aImg);			
			});

			$('.desk-bg').delegate('div','mouseover',function(){
				$(this).find('p').stop().animate({ 'bottom' : 0},200);
			});

			$('.desk-bg').delegate('div','mouseout',function(){
				$(this).find('p').stop().animate({ 'bottom' : -20},200);
			});
		},

		showImg   :  function(){
			this.fntile();
			this.aMove();		
		},

		fntile  :  function(){
			var This = this;
			this.oTile.eq(0).click(function(){
				$(this).attr('class','active');
				This.oTile.eq(1).attr('class','');
				$('.desk-bg').css('display','block');
				This.deskcok.css('display','none');
			});

			this.oTile.eq(1).click(function(){
				//This.getImage();
				//This.getBg();
				This.oTile.eq(0).attr('class','');
				$(this).attr('class','active');
				$('.desk-bg').css('display','none');
				This.deskcok.css('display','block');
				
				for(var i=0;i<$('.desk-cok-cont').find('ul').length;i++){
					if($('.desk-cok-cont').find('ul').eq(i).css('display') == 'block'){
						var aUl = $('.desk-cok-cont').find('ul').eq(i);
						var aImg = $('.desk-cok-cont').find('ul').eq(i).find('img');
						var arr = [];
						
						for(var i=0;i<aImg.length;i++){
							arr.push(i);
						}

						arr.sort(function(num1,num2){
							return Math.random()-0.5; 
						});

						if(aUl.find('.cok-bg').css('display') == 'block'){
							aUl.find('.cok-bg').css({
									'width' : 506 , 'height' : 301
							});

							aUl.find('.cok-bg').find('img').css({
									opacity : 1
							});

							return false;
						}

						$('.desk-cok-cont').find('ul').find('img').css({
								width : 62 , height : 40 ,
								left  : 29 , top : 22,
								opacity : 0.6
						});

						var iNow = 0;
						var timer = null;
						
						setInterval(function(){

							if(iNow == arr.length){
								clearInterval(timer);
							}

							aImg.eq(arr[iNow]).stop().animate({ 
								width : 122 , height : 85 ,
								left  : 0   , top :0 ,
								opacity : 1
							});

							iNow++;
						},50)
					}
				}
			});
		},
		
		aMove   :  function(){
			var move = $('.cok-move');
			var This = this;
			
			this.aA.click(function(){
	
				var arr = [];
				var aImg = $('.desk-cok-cont').find('ul').eq($(this).index()).find('img');
				var aUl = $('.desk-cok-cont').find('ul').eq($(this).index());
				$('.desk-cok-cont').find('ul').css('display','none');
				$('.desk-cok-cont').find('ul').eq($(this).index()).css('display','block');
				
				move.stop().animate({ left : $(this).position().left});

				for(var i=0;i<aImg.length;i++){
					arr.push(i);
				}

				arr.sort(function(num1,num2){
					return Math.random()-0.5; 
				});
				

				if(aUl.find('.cok-bg').css('display') == 'block'){
					aUl.find('.cok-bg').find('img').css({
							'width' : 506 , 'height' : 301
					});

					aUl.find('.cok-bg').find('img').css({
							opacity : 1
					});

					return false;
				}

				$('.desk-cok-cont').find('ul').find('img').css({
						width : 62 , height : 40 ,
						left  : 29 , top : 22,
						opacity : 0.6
				});

				var iNow = 0;
				var timer = null;
				
				timer = setInterval(function(){

					if(iNow == arr.length){
						
						clearInterval(timer);
					}
					else{
						aImg.eq(arr[iNow]).stop().animate({ 
							width : 122 , height : 85 ,
							left  : 0   , top :0,
							opacity : 1
						});
						
						iNow++;
					}
				},50)
			});
		},
		
		/* 显示图片介绍 */
		collect   :  function(){
			var that = this;

			$('.desk-cok-cont').delegate('li','mouseover',function(){
				var This = $(this);

				$(this).find('p').stop().animate({'bottom' : 0},200);
				This.find('i').css('display','block');

			});

			$('.desk-cok-cont').delegate('li','mouseout',function(){
				var This = $(this);
				
				$(this).find('p').stop().animate({'bottom' : -20},200);
				$(this).find('i').css('display','none');
			});
			
			// 删除收藏壁纸
			$('.desk-coll').delegate('i','click',function(){
				that.removeImage($(this).parent().index());

				$(this).parent().remove();
			});
			
			// 删除使用壁纸
			$('.clear-img').delegate('i','click',function(){
				that.removeBg($(this).parent().index());

				$(this).parent().remove();
			});

			$('.desk-cok-cont').delegate('em','click',function(){

				var This = $(this);
				var aImg = $(this).parent().parent().find('img').attr('src');

				var arr = aImg.split('');
				var strs = '';

				for(var i=0;i<arr.length;i++){
					if(arr[i] != 's'){
						strs += arr[i];
					}
				}

				$('#bgs').css('display','block');
				$('#bgs').find('.bg').attr('src',strs);

				that.clearBg(aImg);
			});

			$('.desk-cok-cont').delegate('span','click',function(){
				var aImg = $(this).parent().parent().find('img').attr('src');
				$('.cok-bg').css('display','none');
				
				$('.my-pic').css('display','block')
				$('.my-pic').stop().animate({ opacity : 1}).delay(1000).animate({opacity : 0},function(){
					$('.my-pic').css('display','none');
				});

				for(var i=0;i<$('.desk-coll').find('img').length;i++){
					if($('.desk-coll').find('img').eq(i).attr('src') == aImg){
						return false;
					}
				}	
				
				
				
				that.clearImg(aImg);
			});
			
		},
		
		//  获取用户使用壁纸
		getBg    :  function(){
				if(this.str.indexOf('chrome') != -1 || this.str.indexOf('firefox') != -1){
					var collect = JSON.parse(localStorage.getItem(login_name));
					if(collect != null){
						if(collect.bg){
							$('.cok-bg').css('display','none');
							$('.clear-img').html('');

							for(var i=0;i<collect.bg.length;i++){
								$('.clear-img').append(
									'<li>'+
										'<div>'+
											'<img src="'+collect.bg[i]+'" />'+
											'<p><a href="#"></a><em title="设为壁纸"></em><span title="加入收藏"></span></p>'+
										'</div>'+
										'<i></i>'+
									'</li>'
								)	
							}
						}
					}
				}
		},
		
		// 保存用户使用壁纸
		clearBg  :  function(aImg){
			if(this.str.indexOf('chrome')!=-1 || this.str.indexOf('firefox')!=-1){
				var collect = JSON.parse(localStorage.getItem(login_name));
				var oSrc = [];
				
				if(collect != null){
					if(collect.bg){
						$('.clear-img').html('');

						if(collect.bg.length>1){
							for(var i=0;i<collect.bg.length;i++){
								if(collect.bg[i] == aImg){
									collect.bg.splice(i,1);
								}
							}
						}

						if(collect.bg.length<12){
							collect.bg.push(aImg)
						}
						else{
							collect.bg.pop();
							collect.bg.unshift(aImg);
						}
					}
					else{
						oSrc.push(aImg);
						collect.bg = oSrc;
					}
					
					localStorage.setItem(login_name,JSON.stringify(collect));

					if(collect.bg){
						for(var i=0;i<collect.bg.length;i++){
							$('.clear-img').append(
								'<li>'+
									'<div>'+
										'<img src="'+collect.bg[i]+'" />'+
										'<p><a href="#"></a><em title="设为壁纸"></em><span title="加入收藏"></span></p>'+
									'</div>'+
									'<i></i>'+
								'</li>'
							)	
						}
					}
				}
			}
			else{

				for(var i=0;i<$('.clear-img').find('img').length;i++){
					if($('.clear-img').find('img').eq(i).attr('src') == aImg){
						return false;
					}
				}

				$('.clear-img').append(
					'<li>'+
						'<div>'+
							'<img src="'+aImg+'" />'+
							'<p><a href="#"></a><em title="设为壁纸"></em><span title="加入收藏"></span></p>'+
						'</div>'+
						'<i></i>'+
					'</li>'
				)	
			}
		},

		// 删除用户使用壁纸
		removeBg   :   function(ind){
			    var collect = JSON.parse(localStorage.getItem(login_name));
				
				if(collect.bg){
					for(var i=0;i<collect.bg.length;i++){
						if(ind == i){
							collect.bg.splice(i,1);
						}
					}
				}

				localStorage.setItem(login_name,JSON.stringify(collect));
		},

		//  获取用户收藏壁纸
		getImage    :  function(){
				if(this.str.indexOf('chrome') != -1 || this.str.indexOf('firefox') != -1){
					var collect = JSON.parse(localStorage.getItem(login_name));
					if(collect != null){
						if(collect.coll){
							$('.cok-bg').css('display','none');
							$('.desk-coll').html('');

							for(var i=0;i<collect.coll.length;i++){
								$('.desk-coll').append(
									'<li>'+
										'<div>'+
											'<img src="'+collect.coll[i]+'" />'+
											'<p><a href="#"></a><em title="设为壁纸"></em><span title="加入收藏"></span></p>'+
										'</div>'+
										'<i></i>'+
									'</li>'
								)	
							}
						}
					}
				}
		},

		// 保存用户收藏壁纸
		clearImg  :  function(aImg){
				var aSrc = [];

				if(this.str.indexOf('chrome') != -1 || this.str.indexOf('firefox') != -1){
					var collect = JSON.parse(localStorage.getItem(login_name));
					
					if(!Modernizr.csstransforms3d){
						alert('此功能只支持高版本的浏览器');
						return false;	
					}

					if(login_name == null){
						alert('收藏背景，请先登录账号');
						talk.openAlert();
						return false;
					}
					else{
						if(collect != null){
							if(collect.coll){
								$('.desk-coll').html('');

								if(collect.coll.length>1){
									for(var i=0;i<collect.coll.length;i++){
										if(collect.coll[i] == aImg){
											collect.coll.splice(i,1);
										}
									}
								}

								if(collect.coll.length<12){
									collect.coll.push(aImg)
								}
								else{
									collect.coll.pop();
									collect.coll.unshift(aImg);
								}
							}
							else{
								aSrc.push(aImg);
								collect.coll = aSrc;
							}
						}
					}
					
					localStorage.setItem(login_name,JSON.stringify(collect));

					if(collect.coll){
						for(var i=0;i<collect.coll.length;i++){
							$('.desk-coll').append(
								'<li>'+
									'<div>'+
										'<img src="'+collect.coll[i]+'" />'+
										'<p><a href="#"></a><em title="设为壁纸"></em><span title="加入收藏"></span></p>'+
									'</div>'+
									'<i></i>'+
								'</li>'
							)	
						}
					}
			    }
				else{
					for(var i=0;i<$('.desk-coll').find('img').length;i++){
						if($('.desk-coll').find('img').eq(i).attr('src') == aImg){
							return false;
						}
					}

					$('.desk-coll').append(
						'<li>'+
							'<div>'+
								'<img src="'+aImg+'" />'+
								'<p><a href="#"></a><em title="设为壁纸"></em><span title="加入收藏"></span></p>'+
							'</div>'+
							'<i></i>'+
						'</li>'
					)	
				}

		},

		// 删除用户收藏壁纸
		removeImage   :   function(ind){
			    var collect = JSON.parse(localStorage.getItem(login_name));
				
				if(collect.coll){
					for(var i=0;i<collect.coll.length;i++){
						if(ind == i){
							collect.coll.splice(i,1);
						}
					}
				}

				localStorage.setItem(login_name,JSON.stringify(collect));
		},
        
		//桌面3d切换
		setNav   :  function(){
				var navUl = $('.desk-cx');
				var iNow = 0;
				var This = this;
				
				this.nav.prop('att','right');
				this.nav.eq(0).prop('att','center');

				this.nav.click(function(){
					var str = window.navigator.userAgent.toLowerCase();
	
					$('.deskX1').addClass('active');
					navUl.removeClass('active');

					This.nav.prop('class','');
					This.nav.eq($(this).index()).prop('class','active');
								
						if($(this).prop('att') == 'right'){

							if(str.indexOf('chrome')!=-1 || str.indexOf('firefox')!=-1){
								navUl.eq($(this).index()).addClass('show');

								for(var i=0;i<This.nav.length;i++){
									if(This.nav.eq(i).prop('att') == 'center'){
										navUl.eq(i).addClass('hide');
										This.nav.eq(i).prop('att','left');
									}
								}
							}
							else{
								navUl.eq($(this).index()).css({ visibility : 'visible'});
								navUl.eq($(this).index()).stop().animate({ left : 0 , opacity : 1});

								for(var i=0;i<This.nav.length;i++){
									if(This.nav.eq(i).prop('att') == 'center'){
										This.nav.eq(i).prop('att','left');
	
										navUl.eq(i).css({ visibility : 'visible'});
										navUl.eq(i).stop().animate({ left : -1500 , opacity : 0});
									}
								}
					
							}
						}
						
						if($(this).prop('att') == 'left'){
							if(str.indexOf('chrome')!=-1 || str.indexOf('firefox')!=-1){
								navUl.eq($(this).index()).removeClass('hide');
								navUl.eq($(this).index()).addClass('show');

								for(var i=0;i<This.nav.length;i++){
									if(This.nav.eq(i).prop('att') == 'center'){
										navUl.eq(i).removeClass('hide');
										navUl.eq(i).removeClass('show');

										This.nav.eq(i).prop('att','right');
									}
								}
							}
							else{
								
								navUl.eq($(this).index()).css({ visibility : 'visible'});
								navUl.eq($(this).index()).stop().animate({ left : 0 , opacity : 1});
								
								for(var i=0;i<This.nav.length;i++){
									if(This.nav.eq(i).prop('att') == 'center'){
										navUl.eq(i).css({ visibility : 'visible'});
										navUl.eq(i).stop().animate({ left : 1500 , opacity : 0});

										This.nav.eq(i).prop('att','right');
									}
								}
							}
						}

						$(this).prop('att','center');
				});
		}
  };
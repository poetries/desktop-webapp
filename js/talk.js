var aBut = true;
var login_name;
var login_password;
var login_icon;
var login_src;

function Talk(){
	this.pub = $('#publish');
	this.oBox = $('.login-box');
	this.oMan = $('.login-main');
	this.confirm = $('#qs-confirm');
	this.iMoveDeg = 360;
	this.timer = null;
	this.attBut = true;
	this.speed = 2;
	this.num = 0;
	this.timer = null;
};

Talk.prototype = {
		init   :  function(){
			this.setPage(0*3,(0*3)+4);
			this.login();       //账号登录
			this.setContss();   //添加说说
			this.talks();       //Q+说说
			this.mytalk();      //我的说说
		},
		
		setContss  :  function(){
			var This = this;
			/* 表情 */

			$('.mod-quick-comment').find('li').off();
			$('.mod-quick-comment').find('li').click(function(){
				if(login_name == null){
					alert('请先登录账号');
					This.openAlert();

					return false;
				}

				var parent = $(this).parents('.mod_comment').find('.mod_comments').find('ul');
				This.comment(parent,login_name,$(this).find('a').html());
			});
			
			/* 赞 */
			$('.praise').prop('aBut',true);
			$('.praise').click(function(){
				var parent = $(this).parents('.wsy-box');
				if($(this).prop('aBut')){
					parent.find('.feed_like').css('display','block');
					$(this).prop('aBut',false);
				}
				else{
					parent.find('.feed_like').css('display','none');
					$(this).prop('aBut',true);
				}
		   });

		   /* 评论 */
			$('.comment').click(function(){
				var parent = $(this).parents('.wsy-boxct');
				var aText =  parent.find('.mod_comments ul');
				var This = this;

				parent.find('.mod_commnets_poster_trigger').css('display','none');
				parent.find('.commentBox').css('display','block');
				
				parent.find('.commentBox').find('.comments_box_cont').html('');

				parent.find('.comments_box').css({
					left   : '0',
					width  : '502px'
				});

				parent.find('.qzaddons').css('left','0');
				
				$('.gb_bt').off();
				$('.gb_bt').click(function(){
					if(login_name == null){
						alert('请先登录账号');
						This.openAlert();
						return false;
					}
					
					This.comment(aText,login_name,$('.comments_box_cont').html());
				});
				
				return false;
			});	

			/* 发表说说 */
			$('.comments_box_cont').on('input',function(){ 
				if($.trim($(this).html()).split('').length>500){
					$(this).html($.trim($(this).html()).substring(0,500));
				}
				
				var parent = $(this).parents('.wsy-boxct');
				var number = parent.find('.number_now');
				var num = $.trim($(this).html()).length;

				if($(this).html()== "<br>"){
					num = 0;
				}

				number.html(num);
				
			   return false;
		   });

			/* 选择表情  */
		   $('.qzaddons').mouseover(function(){
			$(this).find('ul').css('display','block');
		   });

		   $('.qzaddons').mouseout(function(){
				$(this).find('ul').css('display','none');
		   });


		   $('.comments_box_cont').click(function(){
			  return false;
		   });
			
			/* 点击表情  */
			$('.qzaddons').find('li').off();
			$('.qzaddons').find('li').click(function(){
				var oBox = $(this).parents('.commentBox').find('.comments_box_cont');
				oBox.append($(this).find('a').html());
				
				$('.qzaddons').find('ul').css('display','none');
				return false;
			});

			$('.mod_commnets_poster_trigger').click(function(){
				var parent = $(this).parents('.wsy-boxct');
				parent.find('.mod_commnets_poster_trigger').css('display','none');
				parent.find('.commentBox').css('display','block');

				parent.find('.comments_box').css({
					 left   : '0',
					 width  : '502px'
				});

				parent.find('.qzaddons').css('left','0');
				var num = $(this).parents('.wsy-boxct').find('.number_now');
				var man = $(this).parent('.comments_item_bd').find('.comments_content').find('a').html()
				
				$('.gb_bt').off();
				$('.gb_bt').click(function(){
					var oBox = $(this).parents('.wsy-boxct').find('.comments_box_cont');
					var cont = $(this).parents('.wsy-boxct').find('.mod_comments ul');

					if($.trim(oBox.html())!== ''){
						if(login_name == null){
							alert('请先登录账号');
							This.openAlert();
							return false;
						}

						This.comment(cont,'<span>'+login_name+'</span>',oBox.html());
						oBox.html('');
						num.html('0');

					}
					else{
						alert('先随便说两句吧!')
					}

				});

				return false;
			});
			
			$('.wsy-box').undelegate();
			$('.wsy-box').delegate('.c_tx','click',function(){
				var parent = $(this).parents('.wsy-boxct');
				var aName = $(this).parent().siblings('.comments_content').find('a span').html();

				parent.find('.mod_commnets_poster_trigger').css('display','none');
				parent.find('.commentBox').css('display','block');
				parent.find('.comments_box').css({
					left   : '40px',
					width  : '460px'
				})
				
				parent.find('.qzaddons').css('left','40px');
				
				var oOl = $(this).parents('.comments_item_bd').find('ol');
				var oItem = $(this).parents('.comments_item_bd');
				var num = $(this).parents('.wsy-boxct').find('.number_now');

				$('.gb_bt').off();
				$('.gb_bt').click(function(){
					var oBox = $(this).parents('.commentBox').find('.comments_box_cont');
					
					var oDate = new Date();
					var iY = oDate.getFullYear();
					var iM = oDate.getMonth()+1;
					var iD = oDate.getDate();
					var iH = oDate.getHours();
					var iMin = oDate.getMinutes();
					var iS = oDate.getSeconds();

					if(login_name == null){
						alert('请先登录账号');
						This.openAlert();
						return false;
					}
					if(oItem.find('ol').html() == undefined){
						oItem.append(
							'<div class="mod_comments_sub">'+
									'<ol>'+
										'<li class="comments_item">'+
											'<div class="comments_item_bd">'+
												'<div>'+
													'<div class="ui_avatar">'+
														'<a href="#"><img src="'+login_src+'" /></a>'+
													'</div>'+
													'<div class="comments_content">'+
														'<a href="#"><span> '+login_name+'</span></a>：'+
														'<span>'+oBox.html()+'</span>'+
													'</div>'+
													'<div class="comments_op">'+
														'<span class="c_tx3 ">'+(iY+'-'+This.setTime(iM)+'-'+This.setTime(iD)+' '+This.setTime(iH)+':'+This.setTime(iMin)+':'+This.setTime(iS))+'</span>'+' </span>'+
														'<a href="javascript:;" class="c_tx">回复</a>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</li>'+
									'</ol>'+
								'</div>'+
							'</div>'
						)
					}
					else{
						if(login_name !== aName){
							This.comment(oOl,'<span>'+login_name+'</span>'+' 回复 '+aName,oBox.html());
						}
						else{
							This.comment(oOl,'<span>'+login_name+'</span>',oBox.html());
						}
					}
					oBox.html('');
					num.html('0');
				});

				return false;
			});
			
			

			$(document).click(function(ev){
				var parent = $('.wsy-boxct');
				parent.find('.mod_commnets_poster_trigger').css('display','block');
				parent.find('.commentBox').css('display','none');
			});

		},
		
		talks  :  function(){
			var This = this;

			/* 评论 */
			$('#publish').click(function(){
				if(login_name == null){
					alert('请先登录账号');
					This.openAlert();
					return false;
				}
				if($('.wsy-soso').val()!== ''){	
				   This.clearCont(login_name,$('.wsy-soso').val());
				   $('.wsy-soso').val('');
				   This.setContss();
				}
				else{
					alert('先随便说两句吧!');
				}
				
				return false;
			});

			$('.talk-alert').scoll({
				 scrollT  :  $('.talk-scroll span'),
				 scroll   :  $('.talk-scroll'),
				 oPos     :  $('.talk-cont'),
				 oUl      :  $('.wsy_wrap_inner')
			});
			
			$('.talk-alert').drag({
				drags   :  $('.talk-title h2'),
				parent  :  $('.talk-alert')
			});
			
			$('.q-page').find('a').click(function(){
				$('.lists').html('');
				$('.q-page').find('a').attr('class','');
				$(this).attr('class','active');

				$('.wsy_wrap_inner').css('top',0);
				$('.talk-scroll span').css('top',0);
				
				This.setPage(($(this).index()-1)*3,(($(this).index()-1)*3)+4);
				This.num = $(this).index()-1;
				This.setContss();
			});
	
			$('.prev-page').click(function(){
				This.num == This.num<0 ? 0 : This.num--;

				$('.q-page').find('a').attr('class','');
				$('.q-page').find('a').eq(This.num).attr('class','active');
				
				$('.wsy_wrap_inner').css('top',0);
				$('.talk-scroll span').css('top',0);
				$('.lists').html('');
				This.setPage(This.num*3,(This.num*3)+4);
				This.setContss();
			});

			$('.next-page').click(function(){
				This.num++;
				if(This.num>$('.q-page').find('a').length-1){
					This.num = $('.q-page').find('a').length-1;
				}

				$('.q-page').find('a').attr('class','');
				$('.q-page').find('a').eq(This.num).attr('class','active');
				
				$('.wsy_wrap_inner').css('top',0);
				$('.talk-scroll span').css('top',0);
				$('.lists').html('');
				This.setPage(This.num*3,(This.num*3)+4);
				This.setContss();
			});
		},
		
		// 登入页面
		login  :  function(){
			var This = this;
			var str = window.navigator.userAgent.toLowerCase();
			
			if(str.indexOf('chrome') != -1 || str.indexOf('firefox') != -1){

				$('.login-box').css('display','block');

				if(typeof (localStorage.getItem('login_name')) == 'undefined' || 
				   localStorage.getItem('login_name') == null){

				   $('.q-text').val('');
				   $('.q-pass').val('');
					$('#passd').attr('class','');
				}
				else{
				   $('.q-text').val(localStorage.getItem('login_name'));
				   $('.q-pass').val(localStorage.getItem('login_password'));
	
				   $('#passd').attr('class','active');
					

				   if(localStorage.getItem('login_icon') == '男'){
						login_src = 'image/talk/port1.png';
					}
					else{
						login_src = 'image/talk/woman.png';
					}
				}

				if(typeof (localStorage.getItem('login_auto')) != 'undefined' && 
				   localStorage.getItem('login_auto') == 'yes'){
				   login_name = localStorage.getItem("login_name");
				   login_password = localStorage.getItem("login_password");

					$('#logind').attr('class','active');
				    $('#passd').attr('class','active');

				    //this.closeAlert();
					$('.login-box').css('display','none');
					
					$('.info-name').html(login_name);
					
					setTimeout(function(){
						$('.account-info').css('display','block');
						$('.account-info').stop().animate({
							height   :  '260px',	
							opacity  :  1
						},function(){
							This.timer = setTimeout(function(){
								$('.account-info').stop().animate({
									height   :  0,	
									opacity  :  0
								},function(){
									$('.account-info').css('display','none');	
								});
							},3000)
						});
					},800)

					This.Weather();
					

					$('.login-number').css('display','block');
					$('.login-icon').find('img').attr('src',login_src);
					$('.login-number').find('em').html(login_name);
				}
		
				$('.logind-ct').click(function(){
					if(!$('#logind').hasClass('active')){
						$('#passd').attr('class','active');
						$('#logind').attr('class','active');
					}
					else{
						$('#logind').attr('class','');
					}
				});

				$('.pass-ct').click(function(){
					if($('#passd').hasClass('active')){
						$('#passd').attr('class','');
						$('#logind').attr('class','');
					}
					else{
						$('#passd').attr('class','active');
					}
				});
				
				/* 注销账号 */;
				$('.login-end').click(function(){
					login_name = null;
					$('.login-number').css('display','none');

					if(login_name == null){
						alert('请重新登录');
						This.openAlert();
						return false;
					}
				});

				$('.q-sub').click(function(){
					login_name = $('.q-text').val();
					login_password = $('.q-pass').val();

					if($.trim(login_name) == ''){
						alert('请输入用户名');
						$('.q-text').val('');
						$('.q-text').focus();
						return;
					}
					
					if(login_password == ''){
						alert('请输入密码');
						$('.q-pass').val('');
						$('.q-pass').focus();
						return;
					}

					sessionStorage.setItem('login_name',login_name);
					sessionStorage.setItem('login_password',login_password);
						
					if(localStorage.getItem(login_name) != null){
						var talk = JSON.parse(localStorage.getItem(login_name));
						
						if(talk.user['password'] !== login_password){
						   alert('密码不正确')
						}
						else{
							if(talk.user['sex'] == '男'){
								login_icon = '男';
								login_src = 'image/talk/port1.png';
							}
							else{
								login_icon = '女';
								login_src = 'image/talk/woman.png';
							}
							alert('登录成功');
							
							$('.login-number').css('display','block');
							$('.login-icon').find('img').attr('src',login_src);
							$('.login-number').find('em').html(login_name);

							sessionStorage.setItem('login_icon',login_icon);

							setTimeout(function(){
								This.closeAlert();
							},500)

							$('.info-name').html(login_name);
							$('.info-icon img').attr('src',login_src);

							setTimeout(function(){
								$('.account-info').css('display','block');
								$('.account-info').stop().animate({
									height   :  '260px',	
									opacity  :  1
								},function(){
									This.timer = setTimeout(function(){
										$('.account-info').stop().animate({
											height   :  0,	
											opacity  :  0
										},function(){
											$('.account-info').css('display','none');	
										});
									},3000)
								});
							},800)
							
							This.Weather();
							

							if($('#qs-alert').css('opacity') == 1){
								clearBg.getImage();
								clearBg.getBg();
							}

							if($('.talk-alert').css('opacity') == 1){
								if(login_name != null){
									var booking = JSON.parse(localStorage.getItem(login_name));
									
									$('.my-list-ul').html('');
									if(booking.talk){							
										for(var i=booking.talk.length-1;i>=0;i--){
											This.myCont(booking.talk[i]['content'],booking.talk[i]['date']);
										}			
									}
								}
							}
						}
					}
					else{
						alert('用户不存在,请先注册');
					}
					if($('#passd').attr('class')== 'active'){
						localStorage.setItem('login_name',login_name);
						localStorage.setItem('login_password',login_password);
						localStorage.setItem('login_icon',login_icon);
					}
					else{
						localStorage.removeItem('login_name');
						localStorage.removeItem('login_password');
						localStorage.removeItem('login_icon');
					}

					if($('#logind').attr('class')== 'active'){
						localStorage.setItem("login_auto", "yes");
					}
					else{
						localStorage.removeItem("login_auto");
					}
				});
				
				/* 登录关闭 */
				$('.qt-close').click(function(){
					This.closeAlert();
				});

				/* 用户注册 */	
				this.confirm.click(function(){
					This.confirms();
				});

				/* 注册 */
				$('.qs-sex').find('span').click(function(){
					$('.qs-sex').find('span').removeClass('active');
					$(this).addClass('active');
				});	
				/* 注册end */
				
				/* 注册成功 */
				$('#qs-cancel').click(function(){
					This.login3d();
				});
				
				/* 打开登录 */
				$('#nav-logins').click(function(){
					var str = window.navigator.userAgent.toLowerCase();
					if(!Modernizr.csstransforms3d){
						alert('此功能只支持高版本的浏览器');
						return false;	
					}

					clearTimeout(This.timer);
					$('.wall-bg').css('display','none');
					
					if(str.indexOf('chrome') != -1 || str.indexOf('firefox') != -1){
						if(login_name == null){
							This.openAlert();
						}
						else{
							$('.account-info').css('display','block');
							$('.account-info').stop().animate({
								height   :  '260px',	
								opacity  :  1				
							});
						}
					}
					else{
						alert('此功能只支持高版本的浏览器');
					}
				});

				$('#nav-logins').mouseout(function(){
					clearTimeout(This.timer);
					This.timer = setTimeout(function(){
						$('.account-info').stop().animate({
							height   :  0,	
							opacity  :  0
						},function(){
							$('.account-info').css('display','none');	
						});
					},1200)
				});


				$('.account-info').mouseover(function(){
					clearTimeout(This.timer);
				});

				$('.account-info').mouseout(function(){
					clearTimeout(This.timer);
					This.timer = setTimeout(function(){
						$('.account-info').stop().animate({
							height   :  0,	
							opacity  :  0
						},function(){
							$('.account-info').css('display','none');	
						});
					},1200)
				});

				$('.mod_userinfo_mark a').click(function(){
					$('.login-number').css('display','none');
					$('.account-info').css('display','none');
					$('.pass-login').css('display','none');

					login_name = null;

					if(login_name == null){
						alert('请重新登录');
						This.openAlert();
						return false;
					}
				});
				
				/* 会员登录 Q+说说*/
				$('.privilege').find('a').eq(0).click(function(){
					var booking = JSON.parse(localStorage.getItem(login_name));

					if(booking != null){			
						if(booking.talk){				
							$('.my-list-ul').html('');
							for(var i=booking.talk.length-1;i>=0;i--){
								This.myCont(booking.talk[i].content,booking.talk[i].date);
							}			
						}
					}

					$('.talk-alert').css('display','block');
					$('.talk-alert').animate({
							height  :  560,
							opacity :  1
					});
				});

				$('.privilege').find('a').eq(1).click(function(){
					clearBg.moveBg();
					clearBg.getImage();
					clearBg.getBg();
				});

				$('.change-pass').click(function(){
					$('.pass-login').css('display','block');
					$('.pass-login').animate({
							height   :  '344px',
							opacity  :  1
					});	
				});
				
				
				$('.pass-btn').click(function(){
					var pass = $('.now-text');
					var passd = $('.new-pass');

					if(pass.val() == ''){
						alert('密码不能为空');
						pass.focus();
						return;
					}
					
					if(passd.val() == ''){
						alert('新密码不能为空');
						passd.focus();
						return;
					}

					if(pass.val() == passd.val()){
						alert('密码不能相同');
						return;
					}
					
					if(login_name != null){
						var booking = JSON.parse(localStorage.getItem(login_name));
						if(pass.val() == booking.user.password){
							booking.user.password = passd.val();

							localStorage.setItem(login_name,JSON.stringify(booking));
							alert('密码修改成功');
							
							$('.pass-login').animate({
									height   :  0,
									opacity  :  0
							},function(){
								$('.pass-login').css('display','none');		
							});

							login_name = null;

							if(login_name == null){
								$('.login-number').css('display','none');
								This.openAlert();
								return false;
							}
						}
						else{
							alert('密码输入错误');
						}		
					}
				});

				$('.pass-close').click(function(){
					$('.pass-login').animate({
							height   :  0,
							opacity  :  0
					},function(){
						$('.pass-login').css('display','none');		
					});
				});

				this.register();
			}
		},
		
		/* 用户注册 */
		confirms   :  function(){
			var use = $('.qs-user');
			var pass = $('.qs-pass');
			var passd = $('.qs-passd');
			var sex = '男';

			if($.trim(use.val()) == ''){
				alert('请输入昵称');
				use.val('');
				use.focus();
				return;
			}
			
			if(pass.val() == ''){
				alert('请输入密码');
				pass.val('');
				pass.focus();
				return;
			}

			if(passd.val() == ''){
				alert('请输入确认密码');
				passd.val('');
				passd.focus();
				return;
			}
			
			if(pass.val() !== passd.val()){
				alert('两次密码不一致');
				pass.val('');
				passd.val('');
				pass.focus();
				return;
			}
			
			var man = false;

			if($('.man-ct').hasClass('active')){
				man = true;
			}
			
			if(man){
				sex = '男';
			}
			else{
				sex = '女';
			}


			var loginsName = localStorage.getItem(use.val());

			if(loginsName == null){
				var users = {};
				users.user = {
					"username"  :  use.val(),
					"password"  :  passd.val(),
					"sex"       :  sex
				}
				

				localStorage.setItem(use.val(),JSON.stringify(users));
				alert('注册成功');

				pass.val('');
				passd.val('');
				use.val('');

				this.login3d();
			}
			else{
				alert('用户已存在');
			}
		},
		
		register   :  function(){
			var This = this;
			$('.q-register').click(function(){
				if(This.attBut){
					$('.login-main').addClass('active');
					This.attBut = false;
				}
			});
		},

		openAlert  :  function(){
			this.oBox.css('display','block');
			this.oBox.stop().animate({height : '415px' , opacity : 100});
		},

		closeAlert  :  function(){
			var This = this;
			this.oBox.stop().animate({height : 0 , opacity : 0},function(){
				This.oBox.css('display','none');
			});
		},

		login3d  :  function(){
			if(!this.attBut){
				$('.login-main').removeClass('active');
				this.attBut = true;

				$('.qs-user').val('');
				$('.qs-pass').val('');
				$('.qs-passd').val('');
			}
		},
		
		setPage    :  function(now,all){
			for(var i=now;i<all;i++){
				$('.lists').append(
						'<li class="wsy-box">'+
							'<div class="avatar">'+
								'<a href="#">'+talks[i].icon+'</a>'+
							'</div>'+
							'<div class="wsy-boxct">'+
								'<div class="wsy-bd">'+
									'<a href="#" class="s-author "><span>'+talks[i].name+'</span></a> : '+
									'<div class="arr-main">'+
										'<div class="arr"></div>'+
									'</div>'+
									'<pre class="wsy-content">'+talks[i].content+'</pre>'+
								'</div>'+
								'<div class="wsy-ft">'+				
									'<div class="info">'+   
										'<span class="c_tx3">'+talks[i].date+
										'</span>'+
									'</div>'+
									'<div class="op">'+
										'<a href="javascript:;" class="praise">赞</a>'+
										'<a href="javascript:;" class="comment">评论</a>'+
									'</div>'+
								'</div>'+
								'<div class="box_extra">'+
									'<div class="box_arrs">'+
										'<div class="boxs-arr"></div>'+
									'</div>'+
									'<div class="feed_like" style="display:none">'+
										'<i></i>我觉得很赞'+
									'</div>'+
									'<div class="mod_comment">'+
										'<div class="mod_comments">'+
											'<ul class="mod'+i+'">'+
											'</ul>'+
										'</div>'+
										'<div class="mod_comment_poster_wrapper">'+
											'<div>'+
												'<div class="commentBox">'+
													'<div class="comments_poster_bd">'+
														'<div class="comments_box has_char_count">'+
															'<div class="comments_box_cont" placeholder="我说一句" contenteditable="true">'+
															'</div>'+
															'<span class="number_left">'+
																'<span class="number_now">0</span>/'+
																'<span class="number_main">500</span>'+
															'</span>'+
														'</div>'+
													'</div>'+
													'<div class="comments_poster_ft">'+
														'<div class="qzaddons">'+
															'<a href="javascript:;"><i></i>表情</a>'+
															'<ul>'+
																'<li>'+
																	'<a href="javascript:;"><img src="image/talk/ve100.gif" /></a>'+
																'</li>'+
																'<li>'+
																	'<a href="javascript:;"><img src="image/talk/ve120.gif" /></a>'+
																'</li>'+
																'<li>'+
																	'<a href="javascript:;"><img src="image/talk/ve163.gif" /></a>'+
																'</li>'+
																'<li>'+
																	'<a href="javascript:;"><img src="image/talk/ve144.gif" /></a>'+
																'</li>'+
																'<li>'+
																	'<a href="javascript:;"><img src="image/talk/ve151.gif" /></a>'+
																'</li>'+
																'<li>'+
																	'<a href="javascript:;"><img src="image/talk/ve105.gif" /></a>'+
																'</li>'+
															'</ul>'+
														'</div>'+
														'<div class="comments_poster_op">'+
															'<input type="button" class="gb_bt" value="发表" />'+
														'</div>'+
													'</div>'+
												'</div>'+
											'</div>'+
											'<div class="mod_commnets_poster_trigger">'+
												'<div class="textinput" placeholder="我也说一句">'+
													'<a href="javascript:;" class="c_txt3">我也说一句</a>'+
												'</div>'+
												'<div class="mod-quick-comment">'+
													'<a href="#">'+
														'<i class="icon-flash"></i>'+
														'<span>快评</span>'+
													'</a>'+
													'<div class="line-list">'+
														'<ul class="quick-comment-list">'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/e1000007.gif"></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/e1000008.gif"></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/e1000013.gif"></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/e1000013.gif"></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/e1000018.gif"></a>'+
															'</li>'+
														'</ul>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</li>'
				  )

				for(var j=0;j<talks[i].page.length;j++){
						$('.mod'+i).append(
							'<li class="comments_item">'+
								'<div class="comments_item_bd items'+i+j+'">'+
									'<div>'+
										'<div class="ui_avatar">'+
											'<a href="javascript:;">'+talks[i].page[j].icon+'</a>'+
										'</div>'+
										'<div class="comments_content">'+
											'<a href="javascript:;"><span>'+talks[i].page[j].name+'</span> </a>：'+
											'<span>'+talks[i].page[j].content+'</span>'+
										'</div>'+
										'<div class="comments_op">'+
											'<span class="c_tx3 ">'+talks[i].page[j].date+'</span>'+
											' <a href="javascript:;" class="c_tx"> 回复</a>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</li>'
					)
					for(var k=0;k<talks[i].page[j].childs.length;k++){
						  if(k == 0){
							$('.items'+i+j).append(
								'<div class="mod_comments_sub">'+
										'<ol>'+
											'<li class="comments_item">'+
												'<div class="comments_item_bd">'+
													'<div>'+
														'<div class="ui_avatar">'+
															'<a href="#">'+talks[i].page[j].childs[k].icon+'</a>'+
														'</div>'+
														'<div class="comments_content">'+
															'<a href="#">'+talks[i].page[j].childs[k].names+'</a>：'+
															'<span>'+talks[i].page[j].childs[k].contents+'</span>'+
														'</div>'+
														'<div class="comments_op">'+
															'<span class="c_tx3 ">2013-9-24</span>'+
															'<a href="javascript:;" class="c_tx"> 回复</a>'+
														'</div>'+
													'</div>'+
												'</div>'+
											'</li>'+
										'</ol>'+
									'</div>'+
								'</div>'
							)	
						  }
						  else{
							$('.items'+i+j).find('ol').append(
								'<li class="comments_item">'+
									'<div class="comments_item_bd">'+
										'<div>'+
											'<div class="ui_avatar">'+
												'<a href="#">'+talks[i].page[j].childs[k].icon+'</a>'+
											'</div>'+
											'<div class="comments_content">'+
												'<a href="#"><span> '+talks[i].page[j].childs[k].names+'</span></a>：'+
												'<span>'+talks[i].page[j].childs[k].contents+'</span>'+
											'</div>'+
											'<div class="comments_op">'+
												'<span class="c_tx3 ">2013-9-24</span>'+
												'<a href="javascript:;" class="c_tx"> 回复</a>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</li>'
							)
						  }
						  
					}
				}
			}		
		},

		clearCont  :  function(name,value){
			var oDate = new Date();
			var iY = oDate.getFullYear();
			var iM = oDate.getMonth()+1;
			var iD = oDate.getDate();
			var iH = oDate.getHours();
			var iMin = oDate.getMinutes();
			var iS = oDate.getSeconds();
			
			var This = this;
				$('.lists').prepend(
					'<li class="wsy-box">'+
						'<div class="avatar">'+
							'<a href="#"><img src="'+login_src+'" /></a>'+
						'</div>'+
						'<div class="wsy-boxct">'+
							'<div class="wsy-bd">'+
								'<a href="#" class="s-author "><span>'+name+'</span></a> : '+
								'<div class="arr-main">'+
									'<div class="arr"></div>'+
								'</div>'+
								'<pre class="wsy-content">'+value+'</pre>'+
							'</div>'+
							'<div class="wsy-ft">'+				
								'<div class="info">'+   
									'<span class="c_tx3">'+(iY+'-'+This.setTime(iM)+'-'+This.setTime(iD)+' '+This.setTime(iH)+':'+This.setTime(iMin)+':'+This.setTime(iS))+
									'</span>'+
								'</div>'+
								'<div class="op">'+
									'<a href="javascript:;" class="praise">赞</a>'+
									'<a href="javascript:;" class="comment">评论</a>'+
								'</div>'+
							'</div>'+
							'<div class="box_extra">'+
								'<div class="box_arrs">'+
									'<div class="boxs-arr"></div>'+
								'</div>'+
								'<div class="feed_like" style="display:none">'+
									'<i></i>我觉得很赞'+
								'</div>'+
								'<div class="mod_comment">'+
									'<div class="mod_comments">'+
										'<ul>'+
										'</ul>'+
									'</div>'+
									'<div class="mod_comment_poster_wrapper">'+
										'<div>'+
											'<div class="commentBox">'+
												'<div class="comments_poster_bd">'+
													'<div class="comments_box has_char_count">'+
														'<div class="comments_box_cont" placeholder="我说一句" contenteditable="true">'+
														'</div>'+
														'<span class="number_left">'+
															'<span class="number_now">0</span>/'+
															'<span class="number_main">500</span>'+
														'</span>'+
													'</div>'+
												'</div>'+
												'<div class="comments_poster_ft">'+
													'<div class="qzaddons">'+
														'<a href="javascript:;"><i></i>表情</a>'+
														'<ul>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/ve100.gif" /></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/ve120.gif" /></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/ve163.gif" /></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/ve144.gif" /></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/ve151.gif" /></a>'+
															'</li>'+
															'<li>'+
																'<a href="javascript:;"><img src="image/talk/ve105.gif" /></a>'+
															'</li>'+
														'</ul>'+
													'</div>'+
													'<div class="comments_poster_op">'+
														'<input type="button" class="gb_bt" value="发表" />'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</div>'+
										'<div class="mod_commnets_poster_trigger">'+
											'<div class="textinput" placeholder="我也说一句">'+
												'<a href="javascript:;" class="c_txt3">我也说一句</a>'+
											'</div>'+
											'<div class="mod-quick-comment">'+
												'<a href="#">'+
													'<i class="icon-flash"></i>'+
													'<span>快评</span>'+
												'</a>'+
												'<div class="line-list">'+
													'<ul class="quick-comment-list">'+
														'<li>'+
															'<a href="javascript:;"><img src="image/talk/e1000007.gif"></a>'+
														'</li>'+
														'<li>'+
															'<a href="javascript:;"><img src="image/talk/e1000008.gif"></a>'+
														'</li>'+
														'<li>'+
															'<a href="javascript:;"><img src="image/talk/e1000013.gif"></a>'+
														'</li>'+
														'<li>'+
															'<a href="javascript:;"><img src="image/talk/e1000013.gif"></a>'+
														'</li>'+
														'<li>'+
															'<a href="javascript:;"><img src="image/talk/e1000018.gif"></a>'+
														'</li>'+
													'</ul>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</li>'
			  )
		},

		comment    :  function(parent,name,value){
			var oDate = new Date();
			var iY = oDate.getFullYear();
			var iM = oDate.getMonth()+1;
			var iD = oDate.getDate();
			var iH = oDate.getHours();
			var iMin = oDate.getMinutes();
			var iS = oDate.getSeconds();
			
			var This = this;

			parent.append(
				'<li class="comments_item">'+
					'<div class="comments_item_bd">'+
						'<div>'+
							'<div class="ui_avatar">'+
								'<a href="javascript:;"><img src="'+login_src+'" /></a>'+
							'</div>'+
							'<div class="comments_content">'+
								'<a href="javascript:;">'+name+' </a>：'+
								'<span>'+value+'</span>'+
							'</div>'+
							'<div class="comments_op">'+
								'<span class="c_tx3 ">'+(iY+'-'+This.setTime(iM)+'-'+This.setTime(iD)+' '+This.setTime(iH)+':'+This.setTime(iMin)+':'+This.setTime(iS))+'</span>'+
								' <a href="javascript:;" class="c_tx">回复</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</li>'
			)
		},
		
		mytalk   :  function(){
			var This = this;
			
			/* 我的说说 */
			$('#talk-menu').click(function(){             //打开
				var str = window.navigator.userAgent.toLowerCase();

				if(!Modernizr.csstransforms3d){
					alert('此功能只支持高版本的浏览器');
					return false;	
				}

				if(str.indexOf('chrome') != -1 || str.indexOf('firefox') != -1){
					if(login_name != null){
						var booking = JSON.parse(localStorage.getItem(login_name));

						if(booking.talk){				
							$('.my-list-ul').html('');
							for(var i=booking.talk.length-1;i>=0;i--){
								This.myCont(booking.talk[i]['content'],booking.talk[i]['date']);
							}			
						}
					}

					$('.talk-alert').css('display','block');
					$('.talk-alert').animate({
							height  :  560,
							opacity :  1
					});
				}
				else{
					alert('此功能只支持高本版浏览器');
				}
			});


			$('.talk-close').click(function(){            //关闭说说
				$('.talk-alert').animate({
						height  :  0,
						opacity :  0
				},function(){
					$('.talk-alert').css({display : 'none'});
				});
			}) 

			$('.wsy-title').find('li').eq(1).click(function(){
				
				var booking = JSON.parse(localStorage.getItem(login_name));
				if(login_name == null){
					alert('请先登录账号');
					This.openAlert();
					return false;
				}
				else{
					$('.wsy-title').find('li').attr('class','');
					$(this).attr('class','active');

					$('.talkp').css('display','none');
					$('.talkp').eq($(this).index()).css('display','block');

					if(booking.talk){				
						$('.my-list-ul').html('');
						for(var i=booking.talk.length-1;i>=0;i--){
							This.myCont(booking.talk[i]['content'],booking.talk[i]['date']);
						}			
					}
				}
			});
			

			$('.wsy-title').find('li').eq(0).click(function(){
				$('.wsy-title').find('li').attr('class','');
				$(this).attr('class','active');

				$('.talkp').css('display','none');
				$('.talkp').eq($(this).index()).css('display','block');
			});

			$('#my-talk-btn').click(function(){
				var oDate = new Date();
				var iY = oDate.getFullYear();
				var iM = oDate.getMonth()+1;
				var iD = oDate.getDate();
				var iH = oDate.getHours();
				var iMin = oDate.getMinutes();
				var iS = oDate.getSeconds();
				
				var time = iY+'-'+This.setTime(iM)+'-'+This.setTime(iD)+' '+This.setTime(iH)+':'+This.setTime(iMin)+':'+This.setTime(iS)
				var json = [];
				var booking = JSON.parse(localStorage.getItem(login_name));
				
				if(login_name == null){
					alert('请先登录账号');
					This.openAlert();

					return false;
				}

				if($('.my-soso').val() == ''){
					alert('先随便说两句吧!')
					return false;
				}
				

				if(booking.talk){
					booking.talk.unshift({
						content  : $('.my-soso').val(),
						date     : time
					})

					localStorage.setItem(login_name,JSON.stringify(booking));
				}
				else{
					json.push({
						"content"  : $('.my-soso').val(),
						"date"     : time	
					})
						
					booking.talk = json;

					localStorage.setItem(login_name,JSON.stringify(booking));
				}
		
				This.myCont($('.my-soso').val(),time);
				$('.my-soso').val('');
			});
			
			$('.my-list-ul').undelegate();
			$('.my-list-ul').delegate('.my-remove','click',function(){
				var book = JSON.parse(localStorage.getItem(login_name));
				var ind = -1;

				if(book.talk){

					for(var i=0;i<book.talk.length;i++){
						if(i == $(this).parents('.wsy-box').index()){
							ind = i;
						}		
					}
					
					if(ind >= 0){
						book.talk.splice(ind,1);
					}

				}
				
				$(this).parents('.wsy-box').remove();
				localStorage.setItem(login_name,JSON.stringify(book));
			});

		},

		myCont   :  function(content,time){
			$('.my-list-ul').prepend(
				'<li class="wsy-box">'+
							'<div class="avatar">'+
								'<a href="#"><img src="'+login_src+'"></a>'+
							'</div>'+
							'<div class="wsy-boxct">'+
								'<div class="wsy-bd">'+
									'<a href="#" class="s-author "><span>'+login_name+'</span></a> : '+
									'<div class="arr-main">'+
										'<div class="arr"></div>'+
									'</div>'+
									'<pre class="wsy-content">'+content+'</pre>'+
								'</div>'+
								'<div class="wsy-ft">'+				
									'<div class="info">'+   
										'<span class="c_tx3">'+time+
										'</span>'+
									'</div>'+
									'<div class="op">'+
										'<a href="javascript:;" class="my-remove">删除</a>'+
									'</div>'+
								'</div>'+
								'<div class="box_extra">'+
									'<div class="box_arrs">'+
										'<div class="boxs-arr"></div>'+
									'</div>'+
									'<div class="feed_like" style="display:none">'+
										'<i></i>我觉得很赞'+
									'</div>'+
								'</div>'+
							'</div>'+
					'</li>'
			  )
		}, 

		setTime  :  function(num){
			if(num < 10){
				return '0'+num;
			}
			else{
				return num;
			}
		},

		Weather   :  function(){
			var This = this;
			this.getTime();
			setInterval(function(){This.getTime()},1000);

			$('#weather').delegate('.region','click',function(){
				
				if($('#weather').hasClass('active')){
					$('.weather_menu').css('display','none');
					$('.weather_time').css('display','block');
					$('#weather').removeClass('active');
				}
				else{
					$('.weather_menu').css('display','block');
					$('.weather_time').css('display','none');
					$('#weather').addClass('active');
				}
			});

			var aBut = $('.weather_menu').find('input');

			aBut.eq(0).click(function(){
				$('.weather_menu').css('display','none');
				$('.weather_time').css('display','block');
				$('#weather').removeClass('active');
				This.getWeather($('#city2').val());
			});

			aBut.eq(1).click(function(){
				$('.weather_menu').css('display','none');
				$('.weather_time').css('display','block');
				$('#weather').removeClass('active');	
			});

			for(var j in citymap)
			{
				var Ooption=$('<option>');
				Ooption.html(j);
				Ooption.val(j);
				$('#city1').append(Ooption);
			}

			$('#city1').change(function(){
				$('#city2').html('');
				var citymap2=citymap[$(this).val()];
				var Ooption=$('<option>');
				Ooption.html('请选择城市');
				$('#city2').append(Ooption);

				for(var j in citymap2)
				{
					Ooption=$('<option>');
					Ooption.html(j);
					Ooption.val(citymap2[j]);
					$('#city2').append(Ooption);
				}
			});

			this.getWeather('100005');
		},

		showWeather  :  function(){
			$('#region_but span').html(city.name);
			var str='<strong>今天 : </strong>';

			if(city.tianqi[0] == city.tianqi[1])
			{
				str+=city.tianqi[0];
			}
			else
			{
				str+=city.tianqi[0]+'转'+city.tianqi[1];
			}
			str += ' ' + city.wendu[0] + '℃~' + city.wendu[1] + '℃';

			$('#weather_s').html(str);

			var str1='<strong>明天 : </strong>';
			if(city.tianqim[0] == city.tianqim[1])
			{
				str1+=city.tianqim[0];
			}
			else
			{
				str1+=city.tianqim[0]+city.tianqim[1];
			}
			str1 +=' '+city.wendum[0] + '℃~' + city.wendum[1] + '℃';

			$('#weather_t').html(str1);
		},

		getWeather   :  function(code){
			var url = 'http://mimg.127.net/weather/';
			url += this.getD()+'/';
			url += code.substring(0,2) + '/' + code.substring(2,4) + '/' + code.substring(4) + '.js?t='+Math.random(); 
			var oScript=document.createElement('script');
			oScript.src=url;
			oScript.charset='gbk';
			document.body.appendChild(oScript);
			oScript.onload = this.showWeather;
		},

		getTime   :  function(){
			var oDate=new Date();			
			var iYear=oDate.getFullYear();		
			var iMonth=oDate.getMonth()+1;	
			var iDay=oDate.getDate();			
			var iWeek=oDate.getDay();		
			var iHour=oDate.getHours();		
			var iMin=oDate.getMinutes();		
			var iSec=oDate.getSeconds();
			$('#weather_time').html('当前时间为 '+this.setTime(iHour)+':'+this.setTime(iMin));
		},

		getD   :   function(){
			var oDate = new Date();
			var y = oDate.getFullYear();
			var m = oDate.getMonth() + 1;
			m = m < 10 ? '0' + m : '' + m;
			var d = oDate.getDate();
			d = d < 10 ? '0' + d : '' + d;
			return y+m+d;
		}
};
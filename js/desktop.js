function Destopc(){
	this.webBox = $('.web_box');
};

Destopc.prototype = {
		init  :  function(){
			var This = this;		
			
			$('.deskX1').find('li').prop('addBut',true);

			$('.deskX1').delegate('li','click',function(){
				if(desktop.olocation.add){
					if($(this).attr('title')){
						if($(this).prop('addBut') == true || $(this).prop('addBut')== undefined){
							This.deskLi($(this));	
							$(this).prop('addBut',false);
						}
					}
				}
			});
		
			$('body').delegate('.close','click',function(){
				var title = $(this).parents('.web_box_top').text();
				This.deskRomove($(this).parents('.web_box'),title);
			});

			$('body').delegate('.magnify','click',function(){
				This.deskMax($(this).parents('.web_box'),$(this));
			});
			
			$('body').delegate('.reduce','click',function(){
				var title = $(this).parents('.web_box_top').text();
				This.deskMin($(this).parents('.web_box'),title);
			});

			$('#task_main').delegate('.task_menu_cn','mouseover',function(){
				$(this).find('.task_menu').stop().animate({
					top : '-30px'
				},400)
			});

			$('#task_main').delegate('.task_menu_cn','mouseout',function(){
				$(this).find('.task_menu').stop().animate({
					top : 0
				},400)
			});

			$('#task_main').delegate('.task_max','click',function(){
				var title = $(this).siblings('.task_title').html();
				for(var i=0;i<$('.web_box').length;i++){
					var webtitle = $('.web_box').eq(i).find('.web_box_top').text();
					if(webtitle == title){
						$('.web_box').eq(i).css('display','block');
						if($('.web_box').eq(i).find('.magnify').hasClass('active')){
							$('.web_box').eq(i).stop().animate({
								top     :  0,
								height  :   $(window).height(),
								opacity :   1
							})
						}
						else{
							$('.web_box').eq(i).stop().animate({
								top     :  ($(window).height()-450)/2,
								height  :   450,
								opacity :   1
							});
						}

						$(this).parents('.task_menu_cn').animate({
							width    :  0,
							opacity  :  0
						});
					}
				}
		   });
			
		   $('#task_main').delegate('.task_close','click',function(){
				var title = $(this).siblings('.task_title').html();
				for(var i=0;i<$('.web_box').length;i++){
					var webtitle = $('.web_box').eq(i).find('.web_box_top').text();
					if(webtitle == title){
						$('.web_box').eq(i).remove();
					}

					$(this).parents('.task_menu_cn').animate({
							width    :  0,
							opacity  :  0
					});
					
					for(var i=0;i<$('#desktop').find('li').length;i++){
						if($('#desktop').find('li').eq(i).attr('title') == title){
							$('#desktop').find('li').eq(i).prop('addBut',true);
						}
					}
				}
		  });
			
		},

		deskLi     :  function(obj){
			if($('.task_menu_cn')){
				for(var i=0;i<$('.task_menu_cn').length;i++){
					var taskTitle = $('.task_menu_cn').eq(i).find('.task_title');
					if(taskTitle.html() == obj.attr('title')){
						$('.task_menu_cn').eq(i).stop().animate({
							width    :   0,
							opacity  :   0
						},function(){
							$('.task_menu_cn').eq(i).remove();	
						})
					}
				}
			}

			$('body').append(
				'<div class="web_box" style="display:block">'+
					'<div class="web_box_top">'+
						'<p>'+obj.attr('title')+'</p>'+
						'<div class="web_box_wiw" id="web_box_wiw">'+
							'<a href="javascript:;" class="reduce"></a>'+
							'<a href="javascript:;" class="magnify"></a>'+
							'<a href="javascript:;" class="close"></a>'+
						'</div>'+
					'</div>'+
					'<div class="web_box_content" id="box_content">'+
						'<iframe src="'+iHttp[obj.attr('title')]+'" frameborder="no">'+
						'</iframe>'+
					'</div>'+
				'</div>'
			)


			$('#task_main').append(
				'<div class="task_menu_cn">'+
					'<div class="task_menu">'+
						'<h4 class="task_title">'+obj.attr('title')+'</h4>'+
						'<a class="task_max"></a>'+
						'<a class="task_close"></a>'+
					'</div>'+
				'</div>'
			);

			this.setAlert();
		},

		setAlert   :  function(){
			var This = this;
			var aBox = $('.web_box').eq($('.web_box').length-1);
			aBox.css({
				left  :  ($(window).width()-aBox.outerWidth())/2,
				top   :  ($(window).height()-aBox.outerHeight())/2
			});

			aBox.drag({
				drags   :  aBox.find(('.web_box_top')),
				parent  :  aBox
			})

			$(window).resize(function(){
				aBox.css({
					left  :  ($(window).width()-aBox.outerWidth())/2,
					top   :  ($(window).height()-aBox.outerHeight())/2
				});
			});
		},

		deskRomove  :  function(obj,title){
			obj.stop().animate({
				height   :  0,		
				opacity  :  0
			},function(){
				obj.remove();		
			});

			for(var i=0;i<$('.task_menu_cn').length;i++){
				var taskTitle = $('.task_menu_cn').eq(i).find('.task_title');
				if(taskTitle.html() == title){
					$('.task_menu_cn').eq(i).remove();

					for(var i=0;i<$('#desktop').find('li').length;i++){
						if($('#desktop').find('li').eq(i).attr('title') == title){
							$('#desktop').find('li').eq(i).prop('addBut',true);
						}
					}
				}
			}
		},

		deskMax  :  function(obj,that){
			if(that.hasClass('active')){
				that.removeClass('active');

				obj.stop().animate({
					width   :  700,
					height  :  450,
					left    :  ($(window).width()-700)/2,
					top     :  ($(window).height()-450)/2
				})
			}
			else{
				that.addClass('active');

				obj.stop().animate({
					width   :  $(window).width(),
					height  :  $(window).height(),
					left    :  0,
					top     :  0
				})
			}		
		},

		deskMin   :  function(obj,title){
			
			for(var i=0;i<$('.task_menu_cn').length;i++){
				var taskTitle = $('.task_menu_cn').eq(i).find('.task_title');
				if(taskTitle.html() == title){
					$('.task_menu_cn').eq(i).css({
						width    :  0,
						opacity  :  0
					});

					$('.task_menu_cn').eq(i).stop().animate({
							width    :  100,
							opacity  :  1
					});
				}
			}

			obj.stop().stop().animate({
				height   :  0,		
				opacity  :  0,
				top      :  obj.outerHeight()
			},function(){
				obj.css('display','none');		
			});
		}
};
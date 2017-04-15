	function Search(){
		this.aFocus = $('.search-cat').find('a');
		this.oSearch = $('.url-search');
		this.oText = $('.search-kw');
		this.oBut = $('.url-btn');
		this.title = 'so';
		this.cat = 'webpage';
		this.oLi = $('.q-link-list').find('li');
	};

	Search.prototype = {
			init    :  function(){
				var This = this;
				
				/* 栏目 */
				this.aFocus.click(function(){					
					This.setFocus($(this));
				});
				
				/* 浏览器菜单下拉 */
				$('.search-switch').click(function(){
					This.switchs();	
					return false;
				});
				
				/* 选择浏览器 */
				$('.search-menu').find('li').click(function(){
					This.searMenu($(this));
				});
				
				/* 搜索 */
				this.oBut.click(function(){
					if($('#search-kw').val() == ''){
						alert('内容不能为空');
					}
					else{
						$('#search-form').submit();
					}
				});
				
				/* 选择栏目 */
				$('.q-linkbox').find('li').click(function(){
					This.column($(this));
				});

				$(document).click(function(){
					$('.search-menu').css('display','none');
					$('.search-arr span').removeClass('active');
				});

				$('.q-link-list').delegate('li','mouseover',function(){
					$(this).attr('class','active');
					$(this).find('.link-cont').stop().animate({top : 0},200)
				});

				$('.q-link-list').delegate('li','mouseout',function(){
					$(this).attr('class','');
					$(this).find('.link-cont').stop().animate({top : '-27px'},200)
				});
				
				$('.q-link-list').delegate('.link-close','click',function(){
					var f = confirm('您确定删除? 删除后将不可还原');
					if(f){
						$(this).parents('li').remove();
						This.setSort();
					}
				});
			},
			column   :  function(obj){
				
				if(obj == undefined){
					obj = $('.q-linkbox').find('li');
				}

				var link = linkImg['url'];
				
				$('.q-linkbox').find('li').attr('class','');
				obj.attr('class','active');

				link = linkImg[obj.attr('catname')];

				$('.q-link-list ul').html('');
				for(var i=0;i<link.length;i++){
					$('.q-link-list ul').append(
						'<li style="background:url('+link[i].src+')" no-repeat>'+
							'<span class="link-bg"></span>'+
							'<div class="link-cont">'+
								'<em>'+link[i].title+'</em>'+
								'<a href="javascript:;" class="link-close"></a>'+
								'<a href="'+link[i].url+'" target="_blank" class="link-enter"></a>'+
							'</div>'+
						'</li>'
						
					)
				}
				

				this.att = [];
				this.aLi = $('.q-link-list').find('li');
				
				for(var i=0;i<this.aLi.length;i++){
				  this.att.push([this.aLi.eq(i).position().left,this.aLi.eq(i).position().top]);
				}
				
				//alert(this.aLi.eq(2).position().left)
				this.setSort();
			},
			setSort  :  function(){
				this.aLi = $('.q-link-list').find('li');
				//this.arr = [];

				for(var i=0;i<this.aLi.length;i++){
					
					this.aLi.eq(i).css('position','absolute');
					this.aLi.eq(i).animate({left : this.att[i][0]},'300','easeOut');
					this.aLi.eq(i).animate({top : this.att[i][1]},'300','easeOut');
				}
			},
			setFocus :  function(obj){
				this.aFocus.attr('class','');
				obj.attr('class','active');
				
				if(obj.attr('catname') == 'wenda'){
					$('.google').parents('li').css('display','none');
				}
				else{
					$('.google').parents('li').css('display','block');
				}

				if(obj.attr('catname') == 'music'){
					$('.sogou').parents('li').css('display','block');
					$('.google').parents('li').css('display','none');
				}
				else{
					$('.sogou').parents('li').css('display','none');
				}
				
				if(this.title == 'sogou'){
					this.title = 'so';
				}
				$('#search-form').attr('action',searchs[this.title][obj.attr('catname')]['url']);
				$('#search-kw').attr('name',searchs[this.title][obj.attr('catname')]['name']);
				$('#sear-icons').attr('class',searchs[this.title][obj.attr('catname')]['icon']);
				$('#search-kw').attr('placeholder',searchs[this.title][obj.attr('catname')]['plac']);
				
				
				this.cat = obj.attr('catname');
			},

			switchs  :  function(){
				if($('.search-arr span').hasClass('active')){
					$('.search-arr span').removeClass('active');
					$('.search-menu').css('display','none');
				}
				else{
					$('.search-arr span').addClass('active');
					$('.search-menu').css('display','block');
				}	
			},

			searMenu  :  function(obj){
				$('#search-kw').attr('placeholder',obj.text());
				$('#sear-icons').attr('class',obj.find('a').attr('class'));
				this.title = $('#sear-icons').attr('class');
				
				$('#search-form').attr('action',searchs[this.cat][this.title]['url']);
				$('#search-kw').attr('name',searchs[this.cat][this.title]['name']);
				$('#sear-icons').attr('class',searchs[this.cat][this.title]['icon']);
				$('#search-kw').attr('placeholder',searchs[this.cat][this.title]['plac']);
			}
	};
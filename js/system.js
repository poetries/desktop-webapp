
function Desktop(id) {
	this.oDesk = $('.deskX1');
	this.aDesks = this.oDesk.find('ul');
	this.aDesksLi = this.aDesks.find('li');
	this.oMenu = $('#right-menu');
	this.oMenuUl = this.oMenu.find('ul');
	this.oMenuLi = this.oMenu.find('li');
	this.oMenuUl = $('.menu-ul').find('ul');
	this.timer = null;
	this.aLi = null;
	this.size = 1;
	//  桌面自定义属性
	this.olocation={
			iTop    :   140 ,
			iLeft   :   137 ,
			cord    :   false,
			add     :   true,
			size1	:   47	,
			size2   :   27  ,
			size3   :   55  
	};
	this.bBtn = true;      // 拖拽开关
	this.tc = false;      // 新建文件夹
	this.iCeil = false;	  // 格子打开
	this.newCell = false; // 新建格子
	this.newCells = true;
	this.selects = false;
	this.izIndex =1;
};

Desktop.prototype={
	
	 deskmove  : function() {	
		for(var i=0;i<this.aDesks.length;i++) {
			this.getMove(this.aDesks.eq(i),this.olocation.cord);
		}
	 },
	
	 getMove   :  function(oParent,aBut){
		this.aLi = oParent.find('li');
	
		var L = this.olocation.iLeft;
		var T = this.olocation.iTop
		
		this.arr = [];
		var This = this;
		
		this.aLi.each(function(i,value){
			$(this).attr('attr',i);
		});

		if(this.size == 1) {
			this.oDesk.find('li').removeClass('active');
			this.size = this.olocation.size1;
	
		}
		else if(this.size == 2) {
			this.oDesk.find('li').removeClass('active');
			this.size = this.olocation.size2;

		}
		else if(this.size == 3) {
			this.size = this.olocation.size3;
			this.oDesk.find('li').addClass('active');

		}
		
		this.oDesk.find('li').each(function(){
			$(this).find('img').css('width',This.size).
								css('height',This.size);

		});
		
		if(this.newCells){
			for(var i=0;i<$('.new-folder').length;i++) {
				$('.newCellc').eq(i).attr('index',i);
				$('.cells').eq(i).attr('index',i);
			}
			this.newCells = false;
		}
		
		var iCellCountX = Math.floor( ($(window).width()-50)/L );
		var iCellCountY = Math.floor( $(window).height()/T );
	
		if(aBut) {
			for(var i=0;i<this.aLi.length;i++) {			
				this.Index = this.aLi.eq(i).attr('attr');
				this.aLi.eq(i).stop().animate({left:L*(this.Index%iCellCountX) , top:T*Math.floor(this.Index/iCellCountX)},600);
				this.arr.push([L*(this.Index%iCellCountX),T*Math.floor(this.Index/iCellCountX)]);
			}
		}
		else {
			for(var i=0;i<this.aLi.length;i++) {

				this.Index = this.aLi.eq(i).attr('attr');
				this.aLi.eq(i).stop().animate({left:L*Math.floor(this.Index/iCellCountY),top:T*(this.Index%iCellCountY)},600);
				this.arr.push([L*Math.floor(this.Index/iCellCountY),T*(this.Index%iCellCountY)]);
			}
		}

		if(this.tc) {
			var iLength = this.aLi.length-1;
			var aImg = this.aLi.find('img');
			this.drag(this.aLi.eq(iLength));
			this.tc = false;
			
			if(this.size == this.olocation.size3)
			{
				this.aLi.eq(iLength).addClass('active');
			}

			aImg.css('width',this.size).
				 css('height',this.size);
		}	
		else
		{
			var iLength = this.aLi.length-1;
			var aImg = this.aLi.find('img');

			aImg.css('width',this.size).
				 css('height',this.size);
		}
		
		
			for(var i=0;i<this.aLi.length;i++) {
				this.drag(this.aLi.eq(i),this.aLi,this.arr);
			}
				
		
	 },

	 drag   : function(obj,aLi,arr){
			var This=this;
				
			obj.off();

			obj.mousedown(function(ev) {

				obj.parents('.desk-cx').removeClass('show');
				
				$('.deskX1').removeClass('active');
				
				obj.parents('.desk-cx').addClass('active');
	

				var iBut = false;
	
				This.arr = arr;
				This.aLi = aLi;
				
				This.olocation.add = true;

				var disX = ev.pageX-obj.position().left;
				var disY = ev.pageY-obj.position().top;


				var iX = ev.pageX;
				var iY = ev.pageY;
				
				
				obj.css('z-index',This.izIndex++);

				
				if(obj.get(0).setCapture)
				{
					obj.get(0).setCapture();
				}

				This.olocation.add = true;

				$(document).mousemove(function(ev) {
					if(Math.abs(ev.pageX-iX)>4||Math.abs(ev.pageY-iY)>4) {
						This.olocation.add = false;
					}
					
					if(This.olocation.add == false){
						if(This.iCeil||This.newCell){
							//$('.deskX1').css('zIndex',999);
							obj.css('zIndex',399);
						}
					}

					obj.css('left',ev.pageX-disX);
					obj.css('top',ev.pageY-disY);
				});
				
				$(document).mouseup(function(ev) {
					$(document).off('mousemove');
					$(document).off('mouseup');
					
					var tmp = '';
					
					var nL = This.nearLi(obj,This.aLi);				
					var nlLeft = This.arr[obj.attr('attr')];
				
					var nIndex = '';
					
					var selBut = false;

					if(obj.css('z-index') == 399){
						// 判断桌面方格子是否打开
						if(This.iCeil){
							if(pzs(obj,$('.folder '))){
								if(!obj.attr('code')){
									var newStr = '';

									newStr += '<li title="'+obj.attr('title')+'">';
									newStr += '<span>';
									newStr += '</span>';
									newStr += obj.find('input').val();
									newStr += '</li>';
									
									$('.pos-ul ul').prepend(newStr);

									obj.remove();
									This.deskmove();
									$('.scroll span').css('height',$('.pos-ul').outerHeight()/$('.pos-ul ul').outerHeight()*$('.scroll').outerHeight());
								}
							}
						}
						
						// 判断新建方格子是否打开
						if(This.newCell){
							var iNow = 0;
							if(!obj.attr('work')){
								var cell = '';
								cell += '<li title="'+obj.attr('title')+'">';
								cell += '<a href="#">';
								cell += '<span>';
								cell += '<img src="'+obj.find('img').attr('src')+'" class="imgs" alt="" />';
								cell += '</span>';
								cell += '<em>'+obj.find('input').val()+'</em>';
								cell += '</a>';
								cell += '</li>';
							}
								

							var arr = [];
							var oSut = false;

							for(var i=0;i<$('.new-folder').length;i++){
						
								if(pzs(obj,$('.new-folder').eq(i))){								
									oSut = true;
								
									if($('.new-folder').eq(i).find($('.scrolls span').css('display')=='block')){
										$('.new-folder').eq(i).find($('.scrolls span')).css('height',215);
									}

									arr.push($('.new-folder').eq(i).css('z-index'));
									
											
									if($('.new-folder').eq(i).find($('li')).length>5){
										$('.new-folder').eq(i).find($('.scrolls')).css('display','block');
										$('.new-folder').eq(i).find($('.scrolls')).find('span').css('display','block');
								
									}
					
								}	
							
							}
									
						}
						
						if(oSut&&!obj.attr('work')){
			
							arr.sort(function(num1,num2){
								return num2 - num1;
							})
									
									
							for(var i=0;i<$('.new-folder').length;i++){
				
								if($('.new-folder').eq(i).css('z-index') == arr[0])
								{
											
									var posts = $('.new-folder').eq(i).find($('.post-pare'));
									var scrolls = $('.new-folder').eq(i).find($('.scrolls span'));
									var fol = $('.new-folder').eq(i);
									scrolls.css('height',fol.find($('.post-ul')).outerHeight()/fol.find($('.post-ul ul')).outerHeight()*scrolls.outerHeight());
								}
							}

									
							posts.prepend(cell);
							obj.remove();
							This.deskmove();
							oSut = false;
							
							return false;
						}
						
						obj.css('z-index',2);
					}
					
					if(nL) {
						var bjLeft = This.arr[nL.attr('attr')];

						nL.stop().animate({left : nlLeft[0],top : nlLeft[1]});
						obj.stop().animate({left: bjLeft[0],top: bjLeft[1]});
						
						tmp = nL.attr('attr');
						nL.attr('attr',obj.attr('attr'));
						obj.attr('attr',tmp);	
						
					}
					else
					{
						obj.stop().animate({left : nlLeft[0],top : nlLeft[1]});
						obj.css('zIndex',1);
					}
					
					This.oDesk.css('z-index',2);
						
					if(obj.get(0).releaseCapture) {
						obj.get(0).releaseCapture();
					}
				
				});
				
				ev.stopPropagation();
				return false;
			});			
	 },

	 nearLi : function(obj,aLi){
			var value = 9999;
			var index = -1;

			for(var i=0;i<aLi.length;i++){			
				if( this.pz(obj,aLi.eq(i)) && aLi.eq(i).attr('attr') != obj.attr('attr')){
					var c = this.jl(obj,aLi.eq(i));

					if( c < value){
						value = c;
						index = i;
					}
				}
			}
	
			if(index==-1){
				return false;
			}
			else{
				return aLi.eq(index);
			}
	 },	

	 jl  :  function(obj1,obj2){
			  var a = obj1.position().left - obj2.position().left;
			  var b = obj1.position().top - obj2.position().top;
			  return Math.sqrt(a*a + b*b);
	 },

	 pz  :  function(obj1,obj2){
			var L1 = obj1.position().left;
			var R1 = obj1.position().left + obj1.outerWidth();
			var T1 = obj1.position().top;
			var B1 = obj1.position().top + obj1.outerHeight();
			
			var L2 = obj2.position().left;
			var R2 = obj2.position().left + obj2.outerWidth();
			var T2 = obj2.position().top;
			var B2 = obj2.position().top + obj2.outerHeight();

			if( L1 > R2 || R1<L2 || T1 > B2 || B1<T2 ){
				return false;
			}
			else{
				return true;
			}	
	 },

	 fnsize : function(){
			var This = this;
			$(window).bind('resize',function(){
				for(var i=0;i<This.aDesks.length;i++) {
					This.getMove(This.aDesks.eq(i),This.olocation.cord);
				
				}
			});
	 }
};

 function Zmenu(){
		Desktop.call(this);
		this.refresh = $('#refresh');
		this.wise = $('#Icon').find('li');
		this.aLi = $('.menu-ul li');
		this.fun = $('.wt-fun').find('li');
		this.deskUl = $('.deskX1').find('ul');
		this.cell = $('#cell');
		this.oPos = $('.pos-ul');
		this.oUl = $('.pos-ul ul');
		this.oPosLi = this.oPos.find('li');
		this.scroll = $('.scroll');
		this.scrollT = $('.scroll').find('span');
		this.aBut = true;
 };

 Zmenu.prototype={

		init  :   function(){			
			this.deskUse();      // 右键功能
			this.deskIcon();	 // 图标切换
			this.createdesk();	 // 创建文件夹
			this.menuCell();	 // 方块格子	
			
			var This =this;

			this.cell.find('li').eq(3).click(function(ev){	
				This.setMove();
				
			});             
		},
		
	  deskUse  : function(){
			var desk = desktop.olocation;
			var This = this;
			
	
			this.refresh.click(function(){
				This.aDeskLi = $('.deskX1').find('li');
				This.aDeskLi.css('opacity',0);
				This.aDeskLi.animate({'opacity':1})
			});
			
			this.aLi.eq(2).click(function(){
				This.wise.removeClass('active');
				This.wise.eq(0).addClass('active');
				This.wise.eq(4).addClass('active');
				
				desktop.size=1;
				desk.cord = false;
				desktop.deskmove();
			});		
	  },

	  deskIcon : function(){
			var desk = desktop.olocation;			

			this.wise.eq(0).click(function(ev){
				desktop.size=1;
				desk.iLeft=97;

				$('#Icon').find('li:lt(3)').each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');

				desktop.deskmove();
			});

			this.wise.eq(1).click(function(ev){
				desktop.size=2;
				desk.iLeft=95;

				$('#Icon').find('li:lt(3)').each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');

				desktop.deskmove();
			});

			this.wise.eq(2).click(function(){
				desktop.size=3;
				desk.iLeft=120;

				$('#Icon').find('li:lt(3)').each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');

				desktop.deskmove();
			});
			

			this.wise.eq(3).click(function(ev){
				desk.cord = true;

				$('#Icon').find('li:gt(2)').each(function(){
					$(this).removeClass('active');
				});

				$(this).addClass('active');
				desktop.deskmove();
			});

			this.wise.eq(4).click(function(){		
				desk.cord = false;

				$('#Icon').find('li:gt(2)').each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');

				desktop.deskmove();
			});

			this.wise.eq(5).click(function(){
				desk.cord = desk.cord == true ? false : true ;
				
				$('#Icon').find('li:gt(2)').each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');

				desktop.deskmove();
			});
	  },

	  createdesk :  function(){
			var This = this;
			var str = '';
			this.fun.eq(1).click(function(){
				str+='<li>';
				str+='<a href="javascript:;">';
				str+='<span>';
				str+='<img src="image/deskicon/folder_o.png" alt="" />';
				str+='</span>';
				str+='<input class="wsc-text" type="text" value="重命名">';
				str+='</a>';
				str+='</li>';
				
				for(var i=0;i<$('.desk-cx').length;i++){
					if($('.desk-cx').eq(i).css('opacity') == 1){
						$('.desk-cx').eq(i).find('ul').append(str);
					}
				}
				
				desktop.tc = true;
				desktop.deskmove();
				str = '';
				
				for(var i=0;i<$('.desk-cx').length;i++){
					if($('.desk-cx').eq(i).css('opacity') == 1){
						var oUl = $('.desk-cx').eq(i).find('ul');
						oUl.find('input.wsc-text').css('background','#fff');
						oUl.find('input.wsc-text').focus();
						oUl.find('input.wsc-text').css('background','none');
					}
				}
				
				$('.text').last().blur(function(){
					if($('.text').last().val()== '') {
						$('.text').last().val('文件夹');
					}
				});

			});	
	  },
		
	  fnMenu : function(){
			 var This = this;

			$(document).contextmenu(function(ev){
				This.oMenu.css('display','block');
				This.oMenu.stop().animate({opacity:1},500);

				var iWidth = $(window).width()-This.oMenu.outerWidth();
				var iHeight = $(window).height()-This.oMenu.outerHeight();
				var L = ev.pageX;
				var T = ev.pageY;
				if(L<0)
				{
					L=0;
				}
				else if(L>iWidth)
				{
					L=iWidth;
					This.oMenuUl.addClass('active');
				}
				else if(L>iWidth-This.oMenuUl.outerWidth()) 
				{
					L=iWidth-This.oMenuUl.outerWidth();
					This.oMenuUl.removeClass('active');
				}
				else
				{
					This.oMenuUl.removeClass('active');
				}

				if(T<0)
				{
					T=0;
				}
				else if(T>iHeight)
				{
					T=iHeight;
				}

				This.oMenu.css('left',L).css('top',T);

				return false;
			});

			$(document).click(function(ev){
				This.oMenu.stop().animate({opacity:0},500,function(){
					This.oMenu.css('display','none');
				});
			});

			this.oMenuLi.mouseover(function(ev){
				This.menuover($(this));

			}).mouseout(function(){
				This.menuout($(this));	
			});

	 },

	 menuover : function(obj){
			var oUl = obj.find('ul');
			var This = this;

			if(oUl)
			{
				This.menuUl(obj.get(0).timer);
				oUl.css('display','block');
			}
	 },
	
	 menuout  : function(obj) {
			var oUl = obj.find('ul');
			obj.get(0).timer= null;

			var This = this;

			if(oUl)
			{
				obj.get(0).timer = setTimeout(function(){
					oUl.css('display','none');
				},100)

				this.oMenuUl.mouseover(function(){
					This.menuUl(obj.get(0).timer);
				});
			}
	 },

	 menuUl : function(timer){
			clearTimeout(timer);
	 },

	 menuCell : function(){
			var This = this;
			$('.deskUl').delegate('#cell4','contextmenu',function(ev){
				This.cell.css('display','block');
				This.cell.css('left',ev.pageX+20).css('top',ev.pageY-20);

				return false;
			});

			$(document).click(function(){
				This.cell.css('display','none');
			});

			this.fnCell();		//打开方块格子
			this.fnCellt();		//方块格子滚动条
			this.setwheel();	//方块滚轮时间
			this.dragLi();		//方块滚轮时间
			this.statmove()		//拖拽方格子
	 },
		
	 // 打开格子
	 fnCell  : function(){
			
			var This = this;
			var iWidth = ($(window).width()-this.cell.width())/2;

			this.cell.find('li').eq(0).click(function(){
				
				if(!$(this).hasClass('active')) {
					$('.folder').css('left',$('#cell4').offset().left)
								.css('top',$('#cell4').offset().top)
								.css('width',86)
								.css('height',88);
					$('.folder').css('display','block');
				}
				
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				
				$('.folder').stop().animate({opacity:1,left:iWidth,top:100,width:244,height:285},function(){
						if(This.oPos.outerHeight()/This.oUl.outerHeight() > 1){
							This.scrollT.css('height',0);
							This.scroll.css('height',0);
						}
						else{
							This.scrollT.css('height',This.oPos.outerHeight()/This.oUl.outerHeight()*This.scroll.outerHeight());
							This.scroll.css('height',235);
						}
				});

				$('#cell4').css('visibility','hidden');

				desktop.iCeil = true;
				if(desktop.iCeil){
					desktop.deskmove();
				}	
			});
			

			this.cell.find('li').eq(2).click(function(){
				var L = $('#cell4').offset().left;
				var T = $('#cell4').offset().top;
				//var W = $('#cell4').outerWidth();
				//var H = $('#cell4').outerHeight();
	
				$('.folder').stop().animate({opacity:0,left:L,top:T,width:0,height:0},function(){
					$('.folder').css('display','none');
					$('#cell4').css('visibility','visible');
				})
			});
			
			this.cell.find('li').click(function(){
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
			});
					
	 },
	
	 //格子滚动条
	 fnCellt  : function(){
			var This = this;
					
			$('.pos-cont').find('h4 span').click(function(ev){
				 This.cell.css('display','block')
						  .css('left',ev.pageX)
						  .css('top',ev.pageY);
				ev.stopPropagation(); 
			});
				
			this.scrollT.mousedown(function(ev){
				var iTop = ev.pageY-$(this).position().top;

				$(document).mousemove(function(ev){
					var T = ev.pageY-iTop;

					if(T<0)
					{
						T=0;
					}
					else if(T>This.scroll.outerHeight()-This.scrollT.outerHeight()){
						T = This.scroll.outerHeight()-This.scrollT.outerHeight();
					}
			
					This.scrollT.css('top',T);

					var scall = T/(This.scroll.outerHeight()-This.scrollT.outerHeight());
					var iY = This.oPos.outerHeight()-This.oUl.outerHeight();

					This.oUl.css('top',iY*scall);
				});
				
				$(document).mouseup(function(){
					$(document).off('mousemove');
					$(document).off('mouseup');
				});
			});
		},
		
		// 格子滚轮事件
		setwheel  :  function(){
				var This = this;
				var bBtn = true;

				if(this.oPos.get(0).addEventListener){
					This.oPos.get(0).addEventListener('DOMMouseScroll',show,false);
				}

				this.oPos.get(0).onmousewheel = show;

				function show(ev){
					var ev = ev || window.event;

					if(ev.detail){
						bBtn = ev.detail>0 ? true : false;
					}
					else{
						bBtn = ev.wheelDelta<0 ? true : false;
					}
					
					var iY = This.oPos.outerHeight()-This.oUl.outerHeight();

					if(bBtn)
					{

						var T = This.scrollT.position().top+10;
						
						if(T>This.scroll.outerHeight()-This.scrollT.outerHeight()){
							T = This.scroll.outerHeight()-This.scrollT.outerHeight();
						}

						var scall = T/(This.scroll.outerHeight()-This.scrollT.outerHeight());

						This.scrollT.css('top',T);
						This.oUl.css('top',iY*scall);
					}
					else
					{
						var T = This.scrollT.position().top-10;
						if(T<0)
						{
							T=0;
						}
						var scall = T/(This.scroll.outerHeight()-This.scrollT.outerHeight());

						This.scrollT.css('top',T);
						This.oUl.css('top',iY*scall);
					}

				};

		},
		
		// 拖拽格子内文件 桌面新建
		dragLi  :  function(){
				var This = this;
							
				$('.pos-pare').delegate('li','mousedown',function(ev){
					var iLeft = ev.pageX-$(this).position().left;
					var iTop = ev.pageY-$(this).position().top;
					var iHeight = This.scrollT.outerHeight();
					var aLi = $(this);
					var cell = $('.cell-file');
					
					$(this).attr('class','active');

					if(cell.get(0).setCapture)
					{
						cell.get(0).setCapture();
					}

					$(document).mousemove(function(ev){
						cell.css('display','block');
						cell.css('left',ev.pageX-(cell.outerWidth()/2));
						cell.css('top',ev.pageY-(cell.outerWidth()/2));
						cell.find('em').text(aLi.text());

					});
					
					$(document).mouseup(function(ev){
						$(document).off('mousemove');
						$(document).off('mouseup');
						
						if(cell.get(0).releaseCapture) {
							cell.get(0).releaseCapture();
						}
						
						var cleate = '';

						if(ev.pageX<This.oPos.offset().left||ev.pageX>This.oPos.offset().left+This.oPos.outerWidth()||
							ev.pageY<This.oPos.offset().top||ev.pageY>This.oPos.offset().top+This.oPos.outerHeight())
						{
							cleate+='<li>';
							cleate+='<a href="javascript:;">';
							cleate+='<span>';
							cleate+='<img src="image/deskicon/folder_o.png" alt="" />';
							cleate+='</span>';
							cleate+='<input type="text" value="'+aLi.text()+'" />';
							cleate+='</a>';
							cleate+='</li>';
							
							aLi.remove();
							
							if(This.oPos.outerHeight()/This.oUl.outerHeight() > 1){
								This.scrollT.css('height',0);
								This.scroll.css('height',0);
							}
							else{
								if(This.scrollT.position().top>This.scroll.outerHeight()-This.scrollT.outerHeight()-5){
									This.scrollT.css('top',This.scrollT.position().top-(This.oPos.outerHeight()/This.oUl.outerHeight()*This.scroll.outerHeight()-iHeight))
									This.oUl.css('top',This.oUl.position().top+This.oPosLi.outerHeight());
								}
								
								This.scrollT.css('height',This.oPos.outerHeight()/This.oUl.outerHeight()*This.scroll.outerHeight());
								This.scroll.css('height',235);
							}

							cell.css('display','none');

							for(var i=0;i<$('.desk-cx').length;i++){
								if($('.desk-cx').eq(i).css('opacity') == 1){
									$('.desk-cx').eq(i).find('ul').append(cleate);
									$('.desk-cx').eq(i).find('li:last').css('left',ev.pageX-cell.outerWidth()-20)
																.css('top',ev.pageY-cell.outerHeight()-20);
								}
							}

							desktop.tc = true;
							desktop.deskmove();
					
						}
						else
						{
							aLi.removeClass('active');
							cell.css('display','none');
						}
					})

					return false;
				});
		},
		
		// 移除格子，所有文件移动到桌面
		setMove   : function(){

				var confirmA = $('.con-alert').find('a');
				var conClose = $('.con-alert').find('span');
				var conAlert = $('.con-alert');
				
				var This =this;

				conAlert.css('display','block');

				confirmA.eq(0).click(function(){
					conAlert.css('display','none');
					var cleates = '';
					$('.pos-pare li').each(function(){
							cleates+='<li>';
							cleates+='<a href="javascript:;">';
							cleates+='<span>';
							cleates+='<img src="image/deskicon/folder_o.png" alt="" />';
							cleates+='</span>';
							cleates+='<input type="text" value="'+$(this).text()+'" />';
							cleates+='</a>';
							cleates+='</li>';
					});

					for(var i=0;i<$('.desk-cx').length;i++){
						if($('.desk-cx').eq(i).css('opacity') == 1){
							$('.desk-cx').eq(i).find('ul').append(cleates);
						}		
					}
					
					This.oPosLi.parent().html('');
					$('.folder').remove();
					$('#cell4').remove();
					desktop.bBtn = true;
					desktop.iCeil = false;
					desktop.tc = true;
					This.deskUse();
					desktop.deskmove();
				});

				confirmA.eq(1).click(function(){
					conAlert.css('display','none');
					This.cell.find('li').eq(3).removeClass('active');
					return false;
				});

				conClose.click(function(){
					conAlert.css('display','none');
					return false;
				});
		},
			
		// 拖拽格子
		statmove  : function() {
				var aLi = $('.deskX1').find('li');
				var cell = $('.cell-file');
				drag($('.folder').find('h4'),$('.folder'));		
		} 
 };

function NewCell(){
	this.oCell = $('.new-folder');
	this.oCellT = $('.new-folder').find('h4');
	this.cellUl = $('.post-ul');
	this.cellH = $('.post-pare');
	this.cellLi = this.oCell.find('li');
	this.fun = $('.fun1');
	this.iNow = 0;
	this.aNow=0;
	this.iLength = 0;
};

NewCell.prototype = {
		
		init  :  function(){
				var This = this;

				this.fun.click(function(ev){
					This.clearCell(ev);
				});	
			
				for(var i=0;i<$('.new-folder').length;i++){
					this.moveCell($('.new-folder').eq(i));
				}

		},
		
		// 新建方格子
		clearCell : function(ev){
				var str = '';
				var cell = '';

				oPublic.zIndex += 1;

				str += '<div class="new-folder" now="'+this.aNow+'" style="z-index:'+oPublic.zIndex+'">';
				str += '<div class="post-bg"></div>';
				str += '<div class="post-cont">';
				str += '<h4><input type="text" value="" maxLength="4" class="cell-text" /><span></span></h4>';
				str += '<div class="post-ul">';
				str += '<ul class="post-pare">';
				str += '</ul>';
				str += '</div>';
				str += '<div class="scrolls" style="display:none"><span style="display:none"></span></div>';
				str += '</div>';
				str += '</div>';
				
				cell += '<div class="cells" now="'+this.aNow+'">';
				cell += '<ul>';
				cell += '<li class="active">展开格子</li>';
				cell += '<li>列表显示</li>';
				cell += '<li>收起此格子</li>';
				cell += '<li>移除此格子</li>';
				cell += '</ul>';
				cell += '</div>';
				
				$('#desktop').append(str);
				$('#desktop').append(cell);
				
				
				
				$('.cell-text').focus();
				$('.new-folder').eq(this.iNow).find($('.cell-text')).val('新分类'+(parseInt(this.aNow)+1));
				
				$('.cell-text').css('background','none');

				drag($('.new-folder').eq(this.iNow).find('h4'),$('.new-folder').eq(this.iNow));

				$('.new-folder').eq(this.iNow).css('left',ev.pageX-230);
				$('.new-folder').eq(this.iNow).css('top',ev.pageY-170);
				
				this.iNow++;
				this.aNow++;

				desktop.newCell = true;
				desktop.deskmove();
					
					

				for(var i=0;i<$('.new-folder').length;i++){
					this.cellMove($('.new-folder').eq(i));
					
					this.cellScroll($('.new-folder').eq(i));
					this.celWheel($('.new-folder').eq(i));
					
					this.cellCk($('.new-folder').eq(i),$('.cells').eq(i));
					//aaa;
					this.removeCells($('.new-folder').eq(i),$('.newCellc').eq(i),$('.cells').eq(i));

				}
		},
		
		// 拖拽方格子内文件，移动到桌面
		cellMove  :  function(obj){
				
				var This = this;
				obj.undelegate(); 

				obj.click(function(){
					obj.css('z-index',oPublic.zIndex++);
				});
				

				obj.delegate('li','mousedown',function(ev){
					This.oPos = obj.find($('.post-ul'));
					This.oUl = obj.find($('.post-ul ul'));
					This.scroll = obj.find($('.scrolls'));
					This.scrollT = obj.find($('.scrolls span'));
					
					var iLeft = ev.pageX-$(this).position().left;
					var iTop = ev.pageY-$(this).position().top;
					var iHeight = This.scrollT.outerHeight();
					var aLi = $(this);
					var cell = $('.cell-file');
					
					if(cell.get(0).setCapture)
					{
						cell.get(0).setCapture();
					}

					$(document).mousemove(function(ev){
						cell.css('display','block');
						cell.css('left',ev.pageX-(cell.outerWidth()/2));
						cell.css('top',ev.pageY-(cell.outerWidth()/2));
						cell.find('img').attr('src',aLi.find('img').attr('src'));
						cell.find('img').css('height',46).css('width',46);
						cell.find('em').text(aLi.text());

						aLi.css('opacity',0.6)

					});
					
					$(document).mouseup(function(ev){
						$(document).off('mousemove');
						$(document).off('mouseup');
						
						if(cell.get(0).releaseCapture) {
							cell.get(0).releaseCapture();
						}
						
						var cleate = '';
						var cleates = '';
						var aBut = false;
						var arr = [];
			
						for(var i=0;i<$('.new-folder').length;i++){
							if(pzs(cell,$('.new-folder').eq(i))){
								arr.push($('.new-folder').eq(i).css('z-index'));								
								aBut = true;

								if(obj.find('li').length<7){
									obj.find('.scrolls span').css('display','none');
									obj.find('.scrolls').css('display','none');
								}								
								else
								{
									obj.find('.scrolls span').css('display','block');
									obj.find('.scrolls').css('display','block');
									obj.find('.scrolls span').css('height',obj.find('.post-ul').outerHeight()/obj.find('.post-pare').outerHeight()*obj.find('.scrolls').outerHeight());
								}
							}
						}

						if(aBut){

							cleates+='<li title="'+aLi.attr('title')+'">';
							cleates+='<a href="javascript:;">';
							cleates+='<span>';
							cleates+='<img src="'+aLi.find('img').attr('src')+'" alt="" />';
							cleates+='</span>';
							cleates+='<em>'+aLi.text()+'</em>';
							cleates+='</a>';
							cleates+='</li>';

							arr.sort(function(num1,num2){
								return num2 - num1;
							})
					
							for(var i=0;i<$('.new-folder').length;i++){

								if($('.new-folder').eq(i).css('z-index') == arr[0])
								{
									var news = $('.new-folder').eq(i);
									news.find('.post-pare').prepend(cleates);
									
									news.find('.scrolls').css('height',235);

									if(news.find('li').length<7){
										news.find('.scrolls span').css('display','none');
										news.find('.scrolls').css('display','none');
									}								
									else
									{
										news.find('.scrolls span').css('display','block');
										news.find('.scrolls').css('display','block');
										news.find('.scrolls span').css('height',news.find('.post-ul').outerHeight()/news.find('.post-pare').outerHeight()*news.find('.scrolls').outerHeight());
									}
									
								}

								
							
							}
							
							cell.css('display','none');
							aLi.remove();

							return false;
						}

						if(ev.pageX<This.oPos.offset().left||ev.pageX>This.oPos.offset().left+This.oPos.outerWidth()||
							ev.pageY<This.oPos.offset().top||ev.pageY>This.oPos.offset().top+This.oPos.outerHeight())
						{
							cleate+='<li title="'+aLi.attr('title')+'">';
							cleate+='<a href="javascript:;">';
							cleate+='<span>';
							cleate+='<img src="'+aLi.find('img').attr('src')+'" alt="" />';
							cleate+='</span>';
							cleate+='<input type="text" value="'+aLi.text()+'" />';
							cleate+='</a>';
							cleate+='</li>';
							
							aLi.remove();
							
							if(This.oPos.find('li').length<=6){
								This.scrollT.css('display','none');
								This.scroll.css('display','none');
							}
								
							This.scrollT.css('height',This.oPos.outerHeight()/This.oUl.outerHeight()*This.scroll.outerHeight());
							This.scroll.css('height',235);

							cell.css('display','none');

							for(var i=0;i<$('.desk-cx').length;i++){
								if($('.desk-cx').eq(i).css('opacity') == 1){
									$('.desk-cx').eq(i).find('ul').append(cleate);
									$('.desk-cx').eq(i).find('li:last').css('left',ev.pageX-cell.outerWidth()-20)
																.css('top',ev.pageY-cell.outerHeight()-20);
									$('.desk-cx').eq(i).find('li:last').prop('addBut',true);
								}
							}

							desktop.tc = true;
							desktop.deskmove();
					
						}
						else
						{
							cell.css('display','none');
							aLi.css('opacity',1)
						}
					})

					return false;
				});
		},
		
		// 拖拽方格滚动条
		cellScroll   :  function(obj){	
			
			var scroll = obj.find('.scrolls')
			var scrollT = obj.find('.scrolls span');
			var oPos = obj.find('.post-ul');
			var oUl = obj.find('.post-pare');
			
			var This = this;
			
			
			scrollT.mousedown(function(ev){
				var iTop = ev.pageY-$(this).position().top;

				$(document).mousemove(function(ev){
					var T = ev.pageY-iTop;

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
			});
		},

		celWheel :  function(obj){
				
				var scroll = obj.find('.scrolls')
				var scrollT = obj.find('.scrolls span');
				var oPos = obj.find('.post-ul');
				var oUl = obj.find('.post-pare');

				var This = this;
				var bBtn = true;

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
						oUl.css('top',iY*scall);
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

				};	
		},
		
		// 格子移动回桌面
		cellCk  :  function(obj,cells){
				var aBut = obj.find('h4 span');
				var aLi = cells.find('li');

				var addBut = false;

				var This = this;
				
				
				aBut.click(function(ev){
					$('.cells').css('display','none');
					cells.css('display','block');
					cells.css('left',ev.pageX-85);
					cells.css('top',ev.pageY-95);
					
					addBut = true;

					return false;
				});
				
				aLi.eq(2).off();


				aLi.eq(2).click(function(ev){
					if(!addBut){
						return false;
					}
					
					for(var i=0;i<$('.desk-cx').length;i++){
						if($('.desk-cx').eq(i).css('opacity') == 1){
							var deskLi = $('.desk-cx').eq(i).find('li');
						}
					}

					var L = desktop.olocation.iLeft;
					var T = desktop.olocation.iTop;

					var iCellCountX = Math.floor( ($(window).width()-50)/L );
					var iCellCountY = Math.floor( $(window).height()/T );
					
					var aBut = desktop.olocation.cord;
					
					aLi.removeClass('active');
					$(this).addClass('active');
					
					if(aBut){

						obj.stop().animate({
											  left : L*((deskLi.length)%iCellCountX),
											  top : T*Math.floor((deskLi.length)/iCellCountX),
											  width : 0, height : 0,
											  opacity : 0
						 },function(){

								This.clearLi(obj);	  
								obj.css('display','none');				
						 });
					
					}else{
						obj.stop().animate({
											  left:L*Math.floor((deskLi.length)/iCellCountY),
											  top:T*((deskLi.length)%iCellCountY),
											  width:86, height:86,
											  opacity : 0
						 },function(){	

								This.clearLi(obj);
								obj.css('display','none')
								   .css('width',0)
								   .css('height',0)							
						});		
					}
						
														
					addBut = false;
				});

				$(document).click(function(){
					cells.css('display','none');
				});
		},
		
		// 创建桌面图标
		clearLi   :  function(obj){
				var cleates = '';
	
				$('.cells').each(function(i,value){
					$(this).eq(i).find('li').eq(2).attr('class','');
					$(this).eq(i).find('li').eq(1).attr('class','active');
				});

				if(obj.find('li').html()){
					var src = 'Recycle cs4.png';
				}
				else
				{
					var src = 'Recycle cs5.png';
				}

				this.izIndex = obj.attr('now');

				cleates+='<li class="newCellc" work="a" now="'+this.izIndex+'" style="display:block">';
				cleates+='<a href="javascript:;">';
				cleates+='<span>';
				cleates+='<img src="image/deskicon/'+src+'" alt="" />';
				cleates+='</span>';
				cleates+='<input type="text" value="'+obj.find('input').val()+'" />';
				cleates+='</a>';
				cleates+='</li>';
				
				for(var i=0;i<$('.desk-cx').length;i++){
					if($('.desk-cx').eq(i).css('opacity') == 1){
						$('.desk-cx').eq(i).find('ul').append(cleates);

						if($('.desk-cx').eq(i).find('li').hasClass('active')){
							$('.desk-cx').eq(i).find('.newCellc').addClass('active');
						}

						$('.desk-cx').eq(i).find('.newCellc').last().css('left',obj.position().left);
						$('.desk-cx').eq(i).find('.newCellc').last().css('top',obj.position().top);
					}
				}				
				

				desktop.bBtn = true;
				desktop.tc = true;
				desktop.newCells = true;
				desktop.deskmove();
				$('.newCellc').eq($('.newCellc').length-1).css('display','block');	
				
				this.addBut = true;
		
		},
		
		// 右键显示格子菜单
		cellOpen   :  function(){
				
				var This = this;
					
				$('.deskX1').undelegate();
			
				$('.deskX1').delegate('.newCellc','contextmenu',function(ev){
					var aThis = $(this);
	
					for(var i=0;i<$('.new-folder').length;i++){

						if($('.new-folder').eq(i).attr('now') == $(this).attr('now')){
							$('.new-folder').eq(i).css('left',aThis.position().left);
							$('.new-folder').eq(i).css('top',aThis.position().top);
							var folder = $('.new-folder').eq(i);						
						}

						if($('.cells').eq(i).attr('now') == $(this).attr('now')){
							var cell = $('.cells').eq(i);
						}
					}
			
					var obj = $(this);

					cell.css('display','block');
					cell.css('left',ev.pageX-53);
					cell.css('top',ev.pageY-110);
					
					var aLi = cell.find('li');
					
					aLi.eq(0).off();
					aLi.eq(0).click(function(){

						This.unCellCk(obj,aLi);
					});
					
					aLi.eq(3).off();
					aLi.eq(3).click(function(){
						This.removeCell(obj,folder,cell);
					});

					return false;
				});
		},
		
		// 展开格子
		unCellCk   :  function(obj,aLi){

				var folder = $('.new-folder').eq(obj.attr('now'));
				
				for(var i=0;i<$('.new-folder').length;i++){
					if($('.new-folder').eq(i).attr('now') == obj.attr('now')){
						folder = $('.new-folder').eq(i);
					}
				}

				aLi.removeClass('active');
				aLi.eq(0).addClass('active');
				$(this).addClass('active');
				folder.css('display','block');

				obj.remove();
				
				folder.css('width',68)
					  .css('height',68);

				folder.stop().animate({
						width : 298, height : 276,
						left : ($(window).width()-298)/2,
						top  : ($(window).height()-278)/2,
						opacity : 100
				});

				desktop.bBtn = true;
				desktop.deskmove();	
		},
		
		// 删除格子
		removeCells :  function(obj,folder,cell){
	
				var This = this;
				cell.find('li').eq(3).off();
				cell.find('li').eq(3).click(function(){

					$('.con-alert').css('display','block');
					
					$('.con-affirm').off();

					$('.con-affirm').click(function(){
							$('.con-alert').css('display','none');
							
							var cleates = '';

							obj.find('li').each(function(){

									cleates+='<li title='+$(this).text()+'>';
									cleates+='<a href="javascript:;">';
									cleates+='<span>';
									cleates+='<img src="'+$(this).find('img').attr('src')+'" alt="" />';
									cleates+='</span>';
									cleates+='<input type="text" value="'+$(this).text()+'" />';
									cleates+='</a>';
									cleates+='</li>';
							});
							

							for(var i=0;i<$('.desk-cx').length;i++){
								if($('.desk-cx').eq(i).css('opacity') == 1){
									$('.desk-cx').eq(i).find('ul').append(cleates);
								}						
							}

							obj.remove();
							cell.remove();
							folder.remove();
								
							This.iNow = $('.new-folder').length;

							if(($('.new-folder').length == 0)){
								This.aNow = 0;
							}
							else{
								This.aNow = parseInt($('.new-folder:last').attr('now'))+1;
							}
							

							desktop.bBtn = true;
							desktop.iCeil = false;
							desktop.tc = true;
							desktop.deskmove();

							return false;
						});

						$('.cancel').click(function(){
							$('.con-alert').css('display','none');
						});
						
						$('.con-alert').find('.close').click(function(){
							$('.con-alert').css('display','none');
						});
						
				});
		},

		// 删除格子
		removeCell  :  function(obj,folder,cell){
				
				var This = this;
				var arr = [];

				$('.con-alert').css('display','block');
				
				$('.con-affirm').off();

				$('.con-affirm').click(function(){

					$('.con-alert').css('display','none');

					obj.remove();
					
					var cleates = '';
					folder.find('li').each(function(){
						 arr.push($(this).text());

						 cleates+='<li title='+$(this).text()+'>';
						 cleates+='<a href="javascript:;">';
						 cleates+='<span>';
						 cleates+='<img src="'+$(this).find('img').attr('src')+'" alt="" />';
						 cleates+='</span>';
						 cleates+='<input type="text" value="'+$(this).text()+'" />';
						 cleates+='</a>';
						 cleates+='</li>';
					});
					
					alert(arr)
					for(var i=0;i<$('.desk-cx').length;i++){
						if($('.desk-cx').eq(i).css('opacity') == 1){
							$('.desk-cx').eq(i).find('ul').append(cleates);
						}
					}

					obj.remove();
					cell.remove();
					folder.remove();

					This.iNow = $('.new-folder').length;

					if($('.new-folder').length == 0){
						this.aNow = 0;

					}else{

						this.aNow = parseInt($('.new-folder:last').attr('now'))+1;
					}


					desktop.bBtn = true;
					desktop.iCeil = false;
					desktop.tc = true;
					desktop.deskmove();
				});

				$('.cancel').click(function(){
					$('.con-alert').css('display','none');
				});

				$('.con-alert').find('.close').click(function(){
					$('.con-alert').css('display','none');
				});
			}
	};



		
  function Recom(){
		this.aList = $('.q-recom-list');
		this.listLi = $('.q-recom-col');
		this.aLists = $('.q-recom-lists');
		this.iNow = 0;
  };

  Recom.prototype = {
		init   :  function(){
	
			for(var i=0;i<this.listLi.length;i++){
				this.fnclick(this.listLi.eq(i));
				this.listLi.eq(i).find('.q-recom-lists').css('left','-300px');
				this.listLi.eq(i).find('.q-recom-lists').eq(0).css('left',0);
			}
		},

		fnclick  :  function(parent){
			var This = this;

			parent.attr('iNow',0);
			parent.find('.recom-title-btn span a').click(function(){
				var list = parent.find('.q-recom-lists');
				var iNow = parent.attr('iNow');
				
				parent.attr('iNum',$(this).index());
				if($(this).index()>iNow){
					list.eq(iNow).animate({left : '300px'});
					list.eq($(this).index()).css('left','-300px');
				}
				else if($(this).index()<iNow){
					list.eq(iNow).animate({left : '-300px'});
					list.eq($(this).index()).css('left','300px');
				}
				
				$(this).attr('class','active');
				$(this).siblings().attr('class','');

				list.eq($(this).index()).animate({left : 0});
				parent.attr('iNow',$(this).index());
			});
			
			parent.attr('iNum',0);

			parent.find('.recom-prev-btn').click(function(){
				var list = parent.find('.q-recom-lists');
				var iNow = parent.attr('iNow');
				var iNum = parent.attr('iNum');
				iNow --;

				if(iNow < 0){
				   iNow = 2;
				}
						
				parent.attr('iNow',iNow);
				list.eq(iNum).stop().animate({left : '-300px'});
				list.eq(iNow).stop().css('left','300px');
				
				parent.find('.recom-title-btn span a').attr('class','');
				parent.find('.recom-title-btn span a').eq(iNow).attr('class','active');
				
				list.eq(iNow).animate({left : 0});
				
				iNum = iNow;
				parent.attr('iNum',iNum);
			});

			parent.find('.recom-next-btn').click(function(){
				var list = parent.find('.q-recom-lists');
				var iNow = parent.attr('iNow');
				var iNum = parent.attr('iNum');

				iNow ++;
				
				if(iNow > 2){
				   iNow = 0;
				}
						
				parent.attr('iNow',iNow);
				list.eq(iNum).stop().animate({left : '300px'});
				list.eq(iNow).stop().css('left','-300px');
				
				parent.find('.recom-title-btn span a').attr('class','');
				parent.find('.recom-title-btn span a').eq(iNow).attr('class','active');
				
				list.eq(iNow).animate({left : 0});
				
				iNum = iNow;
				parent.attr('iNum',iNum);
			});
		}
  };
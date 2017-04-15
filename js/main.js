$(function(){
	
	var desktop = new Desktop();    // ����ͼ�궨��
	desktop.deskmove( );
	desktop.fnsize();

	window.desktop = desktop;
	var zmenu = new Zmenu();        //�Ҽ��˵�
	zmenu.init();
	zmenu.fnMenu(); 

	var newCell = new NewCell();    //�������
	newCell.init();
	newCell.cellOpen();
	
	
	var search = new Search();
	search.init();
	window.search = search;

	var clearBg = new Clearbg();    //���浼�� ����
	clearBg.init();
	clearBg.showImg();
	clearBg.setNav();
	window.clearBg = clearBg;

	var show3d = new Show3d();      //3dЧ��
	show3d.init();

	var talk = new Talk();          //�ҵ�˵˵  
	talk.init();
	window.talk = talk;

	var destopc = new Destopc();    // ���浯��
	destopc.init();

	var recom = new Recom();
	recom.init();	
});

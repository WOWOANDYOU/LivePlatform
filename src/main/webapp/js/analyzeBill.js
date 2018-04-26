$(document).ready(function(){
	$(".myAlertFail").hide();
	 $('.form_datetime').datetimepicker({
	    //language:  'fr',
	    weekStart: 1,
	    todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 4,
		minView:4,
		forceParse: 0,
	    showMeridian: 1
	});
	debugger
	var timeText = $('.yearNumInput').val();
	var graType = $('.span-type-text').text();
	if(graType=='收支曲线'){
		graType = 'line';
	}else{
		graType = 'pie';
	}
	ajaxSpendIncomeGra(timeText,graType);
	/*var time = new Date();
	var Year = time.getFullYear();*/
	/*$('.yearNumClass').text(Year);
	var timeText = $('.yearNumClass')[0].innerText;
	$('.btnYearSub').click(yearSubFun);
	$('.btnYearAdd').click(yearAddFun);
	ajaxSpendIncomeGra(timeText,'line');*/
});
function yearChange(){
	debugger
	var timeText = $('.yearNumInput').val();
	var graType = $('.span-type-text').text();
	if(graType=='收支曲线'){
		graType = 'line';
	}else{
		graType = 'pie';
	}
	ajaxSpendIncomeGra(timeText,graType);
}
function yearSubFun(){
	var timeText = $('.yearNumClass')[0].innerText;
	timeText--;
	$('.yearNumClass').text(timeText);
	debugger
	var graType = $('.span-type-text').text();
	if(graType=='收支曲线'){
		graType = 'line';
	}else{
		graType = 'pie';
	}
	ajaxSpendIncomeGra(timeText,graType);
}
function yearAddFun(){
	var timeText = $('.yearNumClass')[0].innerText;
	timeText++;
	$('.yearNumClass').text(timeText);
	debugger
	var graType = $('.span-type-text').text();
	if(graType=='收支曲线'){
		graType = 'line';
	}else{
		graType = 'pie';
	}
	ajaxSpendIncomeGra(timeText,graType);
	ajaxSpendIncomeGra(timeText,graType);
}
function ajaxSpendIncomeGra(yearNum,grpType){
	$('.headingTitle').text(yearNum+'年度收支提示：');
	ajaxFun('/LivePlatform/bill/anaSpendIncome.action','yearNum='+yearNum,'post',function(data){
		console.log(data);
		debugger
		var arraySpend = new Array(12);
		var arrayIncome = new Array(12);
		var spendTotal = 0;
		var incomeTotal = 0;
		for(var i=0;i<data.object.spendList.length;i++){
			arraySpend[i] = data.object.spendList[i].totalNum;
			spendTotal+= arraySpend[i];
		}
		for(var i=0;i<data.object.incomeList.length;i++){
			arrayIncome[i] = data.object.incomeList[i].totalNum;
			incomeTotal+= arrayIncome[i];
		}
		if(grpType=='line'){
			var title = {
				      text: yearNum+'年度收支情况'   
			   };
			   var subtitle = {
			      text: 'Source: LivePlatform.com'
			   };
			   var xAxis = {
			      categories: ['一月', '二月', '三月', '四月', '五月', '六月',
			         '七月', '八月', '九月', '十月', '十一月', '十二月']
			   };
			   var yAxis = {
			      title: {
			         text: '人民币￥ (\元)'
			      }
			   };
			   var plotOptions = {
			      line: {
			         dataLabels: {
			            enabled: true
			         },   
			         enableMouseTracking: false
			      }
			   };
			   var series= [{
			         name: '支出',
			         data: arraySpend,
			         color:'red'
			      }, {
			         name: '收入',
			         data: arrayIncome
			      }
			   ];
			   
			   var json = {};
			
			   json.title = title;
			   json.subtitle = subtitle;
			   json.xAxis = xAxis;
			   json.yAxis = yAxis;  
			   json.series = series;
			   json.plotOptions = plotOptions;
			  
			   $('.yearAnaTop').highcharts(json);
		}else{
			var allTotal = spendTotal+incomeTotal;
			   if(allTotal!=0){
				   var spendTotalPie = spendTotal/allTotal;
				   var incomeTotalPie = incomeTotal/allTotal;
				   var chart = {      
						      type: 'pie',     
						      options3d: {
						         enabled: true,
						         alpha: 45         
						      }
						   };
						   var title = {
						      text: yearNum+'年度收支比重'   
						   };   
						   var subtitle = {
						      text: 'LivePlatform record'
						   };  

						   var plotOptions = {
						      pie: {
						         innerSize: 100,
						         depth: 45
						      }
						   };
						   
						   var relData = [{name:'收入',y:incomeTotalPie},{name:'支出',y:spendTotalPie}];
						   var series= [{
						         name: '收入支出比重',
						         data: relData
						   }];     
						      
						   var json = {};   
						   json.chart = chart; 
						   json.title = title;       
						   json.subtitle = subtitle; 
						   json.plotOptions = plotOptions; 
						   json.series = series;   
						   $('.yearAnaTop').highcharts(json);
			   }else{
				  $('.yearAnaTop').html('<p><font style="color:red;">还没数据哦</font></p>'); 
			   }
		}
		$('.tellIncomeTitle').html('总收入：+'+incomeTotal);
		$('.tellSpendTitle').html('总支出：<font style="color:red">-'+spendTotal+'</font>');
		var relIncome = incomeTotal-spendTotal;
		$('.tellrelIncomeTitle').html('净收入：<font style="color:green">'+relIncome+'</font>');
	},
	function(error){
		$(".myAlertFail").show();
	});
}

function topPieLineChange(cateType){
	var timeText = $('.yearNumInput').val();
	if(cateType=='line'){
		$('.span-type-text').text('收支曲线');
		$('.panelChange').attr('class','panel panel-info panelChange');
		debugger
		ajaxSpendIncomeGra(timeText,'line');
	}
	if(cateType=='pie'){
		$('.span-type-text').text('收支比重');
		$('.panelChange').attr('class','panel panel-success panelChange');
		debugger
		ajaxSpendIncomeGra(timeText,'pie');
	}
	
}
 
//ajax 函数
function ajaxFun(parUrl,parData,parType,parSucFun,parErrFun){
	debugger
	$.ajax({
		url:parUrl,
		type:parType,
		data:parData,
		dataType:'json',
		success:parSucFun,
		error:parErrFun
	});
}
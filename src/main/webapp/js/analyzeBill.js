$(document).ready(function(){
	$(".myAlertFail").hide();
	debugger
	var time = new Date();
	var Year = time.getFullYear();
	$('.yearNumClass').text(Year);
	var timeText = $('.yearNumClass')[0].innerText;
	$('.btnYearSub').click(yearSubFun);
	$('.btnYearAdd').click(yearAddFun);
	ajaxSpendIncomeGra(timeText);
	
});
function yearSubFun(){
	var timeText = $('.yearNumClass')[0].innerText;
	timeText--;
	$('.yearNumClass').text(timeText);
	ajaxSpendIncomeGra(timeText);
}
function yearAddFun(){
	var timeText = $('.yearNumClass')[0].innerText;
	timeText++;
	$('.yearNumClass').text(timeText);
	ajaxSpendIncomeGra(timeText);
}
function ajaxSpendIncomeGra(yearNum){
	$('.headingTitle').text(yearNum+'年度收支提示：');
	ajaxFun('/LivePlatform/bill/anaSpendIncome.action','yearNum='+yearNum,'post',function(data){
		console.log(data);
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
	/*	   var Arrayspend = new Array(12);
		   var Arrayincome = new Array(12);
		   //将对应 月份 数据 赋值到 对应 数组下标
		   for(var i=0;i < Arrayspend.length;i++){
		   		Arrayspend[i] = 0;
		   }
		   for(var k=0;k < data.spendNum.length;k++){
		   	var a = data.spendNum[k].month_num;
		   	a--;
		   	Arrayspend[a] = data.spendNum[k].totalNum;
		   }
		   
		   for(var i=0;i < Arrayincome.length;i++){
		   		Arrayincome[i] = 0;
		   }
		   for(var i=0;i < data.incomeNum.length;i++){
		   	var a = data.spendNum[i].month_num;
		   	a--;
		   	Arrayincome[a] = data.incomeNum[i].totalNum;
		   }*/
		   
		   //console.log("支出:"+Arrayspend+"  收入:"+Arrayincome);
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
		   $('.tellIncomeTitle').html('总收入：+'+incomeTotal);
		   $('.tellSpendTitle').html('总支出：<font style="color:red">-'+spendTotal+'</font>');
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
		
	},
	function(error){
		$(".myAlertFail").show();
	});
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
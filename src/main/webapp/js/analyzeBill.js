$(document)
		.ready(
				function() {
					$(".myAlertFail").hide();
					$('.chooseYearMonth').hide();
					$('.chooseYearMonthDay').hide();
					$('.incomeYearMonCate').hide();
					$.fn.datetimepicker.dates['zh-CN'] = {
						days : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五",
								"星期六", "星期日" ],
						daysShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六",
								"周日" ],
						daysMin : [ "日", "一", "二", "三", "四", "五", "六", "日" ],
						months : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月",
								"八月", "九月", "十月", "十一月", "十二月" ],
						monthsShort : [ "一月", "二月", "三月", "四月", "五月", "六月",
								"七月", "八月", "九月", "十月", "十一月", "十二月" ],
						today : "今天",
						suffix : [],
						meridiem : [ "上午", "下午" ]
					};
					$('.spendIncome_dateTime').datetimepicker({
						weekStart : 1,
						todayBtn : 1,
						autoclose : 1,
						todayHighlight : 1,
						startView : 4,
						minView : 4,
						forceParse : 0,
						showMeridian : 1
					});

					$('.income_dateTime').datetimepicker({
						// language: 'fr',
						weekStart : 1,
						todayBtn : 1,
						autoclose : 1,
						todayHighlight : 1,
						startView : 4,
						minView : 4,
						forceParse : 0,
						showMeridian : 1
					});

					$('.spend_date_yearType').datetimepicker({
						weekStart : 1,
						todayBtn : 1,
						autoclose : 1,
						todayHighlight : 1,
						startView : 4,
						minView : 4,
						forceParse : 0,
						showMeridian : 1
					});

					$('.spend_date_monthType').datetimepicker({
						language : 'zh-CN',
						weekStart : 1,
						todayBtn : 1,
						autoclose : 1,
						todayHighlight : 1,
						startView : 4,
						minView : 3,
						forceParse : 0,
						showMeridian : 1
					});

					$('.spend_date_dayType').datetimepicker({
						language : 'zh-CN',
						weekStart : 1,
						todayBtn : 1,
						autoclose : 1,
						todayHighlight : 1,
						startView : 4,
						minView : 2,
						forceParse : 0,
						showMeridian : 1
					});

					$('.form_dateMon').datetimepicker({
						language : 'zh-CN',
						weekStart : 1,
						todayBtn : 1,
						autoclose : 1,
						todayHighlight : 1,
						startView : 4,
						minView : 3,
						forceParse : 0,
						showMeridian : 1
					});

					debugger
					var timeText = $('.yearNumInput').val();
					var graType = $('.span-type-text').text();
					if (graType == '收支曲线') {
						graType = 'line';
					} else {
						graType = 'pie';
					}
					ajaxSpendIncomeGra(timeText, graType);
					timeSpendChange($('.yearNumSpendInput')[0]);
					timeIncomeChange($('.yearIncomeNumInput')[0]);
				});
function rightPieTimeChange(cateName) {
	debugger
	$('.span-incomeTimetype-text').text(cateName);
	var dateNow = new Date();
	var strDate = dateNow.toLocaleDateString().split('/').join('-');
	var strDateArr = strDate.split('-');
	if (cateName == '年份类') {
		$('.incomeYearMonCate').hide();
		$('.yearIncomeNumInput').val();
		$('.incomeYearCate').show(strDateArr[0]);
		timeIncomeChange($('.yearIncomeNumInput')[0]);
	} else {
		$('.incomeYearCate').hide();
		$('.yearMonIncomeNumInput').val(strDateArr[0] + '-' + strDateArr[1]);
		$('.incomeYearMonCate').show();
		timeIncomeChange($('.yearMonIncomeNumInput')[0]);
	}

}
function yearChange() {
	debugger
	var timeText = $('.yearNumInput').val();
	var graType = $('.span-type-text').text();
	if (graType == '收支曲线') {
		graType = 'line';
	} else {
		graType = 'pie';
	}
	ajaxSpendIncomeGra(timeText, graType);
}

function leftPieTimeChange(timeTypeCate) {
	$('.span-Timetype-text').text(timeTypeCate);
	var dateNow = new Date();
	var strDate = dateNow.toLocaleDateString().split('/').join('-');
	var strDateArr = strDate.split('-');
	debugger
	if (timeTypeCate == '年份类') {
		$('.chooseYearMonth').hide();
		$('.chooseYearMonthDay').hide();
		$('.yearNumSpendInput').val(strDateArr[0]);
		$('.chooseYear').show();
		timeSpendChange($('.yearNumSpendInput')[0]);
	} else if (timeTypeCate == '年月类') {
		$('.chooseYear').hide();
		$('.chooseYearMonthDay').hide();
		$('.yearMonNumSpendInput').val(strDateArr[0] + '-' + strDateArr[1]);
		$('.chooseYearMonth').show();
		timeSpendChange($('.yearMonNumSpendInput')[0]);
	} else {
		$('.chooseYear').hide();
		$('.chooseYearMonth').hide();
		$('.yearMonDayNumSpendInput').val(
				strDateArr[0] + '-' + strDateArr[1] + '-' + strDateArr[2]);
		$('.chooseYearMonthDay').show();
		timeSpendChange($('.yearMonDayNumSpendInput')[0]);
	}
}

function timeIncomeChange(input) {
	debugger
	var inputNum = input.value;

	ajaxFun('/LivePlatform/bill/anaSpendIncomePie.action', 'dateStr='
			+ inputNum + '&cateNum=1', 'post', function(data) {
		var time = new Date().getTime();
		console.log(data);
		if (data.isLogin == 'false') {
			window.location.href = "/LivePlatform/user/signinupUI.action?"
					+ time;
		} else {
			if (data.info == "false") {
				layer.msg("查询失败，请稍后再试！", {
					inco : 5
				});
			} else {
				drawPieGra(data, input,1);
			}
		}
	}, function(error) {
	});
}

function timeSpendChange(input) {
	debugger
	var inputValue = input.value;
	if (inputValue != '') {
		ajaxFun(
				'/LivePlatform/bill/anaSpendIncomePie.action',
				'dateStr=' + inputValue + '&cateNum=-1',
				'post',
				function(data) {
					var time = new Date().getTime();
					console.log(data);
					if (data.isLogin == 'false') {
						window.location.href = "/LivePlatform/user/signinupUI.action?"
								+ time;
					} else {
						if (data.info == "false") {
							layer.msg("查询失败，请稍后再试！", {
								inco : 5
							});
						} else {
							drawPieGra(data,input,-1);
						}
					}
				}, function(error) {
				});
	}
}

function drawPieGra(data, input, cateNum) {
	var inputNum = input.value;
	var chart = {
		plotBackgroundColor : null,
		plotBorderWidth : null,
		plotShadow : false
	};
	var title;
	if (cateNum == -1) {
		title = {
			text : inputNum + '各消费类别所占比重图'
		};
	} else {
		title = {
			text : inputNum + '各收入类别所占比重图'
		};
	}

	var tooltip = {
		pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
	};
	var plotOptions = {
		pie : {
			allowPointSelect : true,
			cursor : 'pointer',
			dataLabels : {
				enabled : true,
				format : '<b>{point.name}%</b>: {point.percentage:.1f} %',
				style : {
					color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
							|| 'black'
				}
			}
		}
	};
	// 计算比例
	debugger
	var alltotal = 0;
	for (var i = 0; i < data.object.length; i++) {
		alltotal += data.object[i].totalNum;
	}
	var dataArray = [];
	for (var i = 0; i < data.object.length; i++) {
		var temp1 = data.object[i].cateName;
		var temp2 = data.object[i].totalNum / alltotal;
		if (i != data.object.length - 1) {
			dataArray.push({
				name : temp1,
				y : temp2
			});
		} else {
			dataArray.push({
				name : temp1,
				y : temp2,
				sliced : true,
				selected : true
			});
		}
	}
	console.log(dataArray);
	var series = [ {
		type : 'pie',
		name : '收入类别金额比例',
		data : dataArray
	} ];
	var json = {};
	json.chart = chart;
	json.title = title;
	json.tooltip = tooltip;
	json.series = series;
	json.plotOptions = plotOptions;
	if(cateNum==-1){
		$('.spendCatePie').highcharts(json);
	}else{
		$('.incomeCatePie').highcharts(json);
	}
	
	if (data.object.length == 0) {
		if(cateNum==-1){
			$('.spendCatePie').append('<p><font style="color:red;font-size:18px;position:absolute;top:20%;left:5%;">暂无数据！</font></p>');
		}else{
			$('.incomeCatePie').append('<p><font style="color:red;font-size:18px;position:absolute;top:20%;left:5%;">暂无数据！</font></p>');
		}
		
	}
}

function yearSubFun() {
	var timeText = $('.yearNumClass')[0].innerText;
	timeText--;
	$('.yearNumClass').text(timeText);
	debugger
	var graType = $('.span-type-text').text();
	if (graType == '收支曲线') {
		graType = 'line';
	} else {
		graType = 'pie';
	}
	ajaxSpendIncomeGra(timeText, graType);
}
function yearAddFun() {
	var timeText = $('.yearNumClass')[0].innerText;
	timeText++;
	$('.yearNumClass').text(timeText);
	debugger
	var graType = $('.span-type-text').text();
	if (graType == '收支曲线') {
		graType = 'line';
	} else {
		graType = 'pie';
	}
	ajaxSpendIncomeGra(timeText, graType);
	ajaxSpendIncomeGra(timeText, graType);
}
function ajaxSpendIncomeGra(yearNum, grpType) {
	$('.headingTitle').text(yearNum + '年度收支提示：');
	ajaxFun(
			'/LivePlatform/bill/anaSpendIncome.action',
			'yearNum=' + yearNum,
			'post',
			function(data) {
				console.log(data);
				var time = new Date().getTime();
				if (data.isLogin == "false") {
					window.location.href = "/LivePlatform/user/signinupUI.action?"
							+ time;
				} else {
					debugger
					var arraySpend = new Array(12);
					var arrayIncome = new Array(12);
					var spendTotal = 0;
					var incomeTotal = 0;
					for (var i = 0; i < data.object.spendList.length; i++) {
						arraySpend[i] = data.object.spendList[i].totalNum;
						spendTotal += arraySpend[i];
					}
					for (var i = 0; i < data.object.incomeList.length; i++) {
						arrayIncome[i] = data.object.incomeList[i].totalNum;
						incomeTotal += arrayIncome[i];
					}
					if (grpType == 'line') {
						var title = {
							text : yearNum + '年度收支情况'
						};
						var subtitle = {
							text : 'Source: LivePlatform.com'
						};
						var xAxis = {
							categories : [ '一月', '二月', '三月', '四月', '五月', '六月',
									'七月', '八月', '九月', '十月', '十一月', '十二月' ]
						};
						var yAxis = {
							title : {
								text : '人民币￥ (\元)'
							}
						};
						var plotOptions = {
							line : {
								dataLabels : {
									enabled : true
								},
								enableMouseTracking : false
							}
						};
						var series = [ {
							name : '支出',
							data : arraySpend,
							color : 'red'
						}, {
							name : '收入',
							data : arrayIncome
						} ];

						var json = {};

						json.title = title;
						json.subtitle = subtitle;
						json.xAxis = xAxis;
						json.yAxis = yAxis;
						json.series = series;
						json.plotOptions = plotOptions;

						$('.yearAnaTop').highcharts(json);
					} else {
						var allTotal = spendTotal + incomeTotal;
						if (allTotal != 0) {
							var spendTotalPie = spendTotal / allTotal;
							var incomeTotalPie = incomeTotal / allTotal;
							var chart = {
								type : 'pie',
								options3d : {
									enabled : true,
									alpha : 45
								}
							};
							var title = {
								text : yearNum + '年度收支比重'
							};
							var subtitle = {
								text : 'LivePlatform record'
							};

							var plotOptions = {
								pie : {
									innerSize : 100,
									depth : 45
								}
							};

							var relData = [ {
								name : '收入',
								y : incomeTotalPie
							}, {
								name : '支出',
								y : spendTotalPie
							} ];
							var series = [ {
								name : '收入支出比重',
								data : relData
							} ];
							var json = {};
							json.chart = chart;
							json.title = title;
							json.subtitle = subtitle;
							json.plotOptions = plotOptions;
							json.series = series;
							$('.yearAnaTop').highcharts(json);
						} else {
							$('.yearAnaTop')
									.html(
											'<p><font style="color:red;">还没数据哦</font></p>');
						}
					}
					$('.tellIncomeTitle').html('总收入：+' + incomeTotal);
					$('.tellSpendTitle').html(
							'总支出：<font style="color:red">-' + spendTotal
									+ '</font>');
					var relIncome = incomeTotal - spendTotal;
					$('.tellrelIncomeTitle').html(
							'净收入：<font style="color:green">' + relIncome
									+ '</font>');
				}
			}, function(error) {
				$(".myAlertFail").show();
			});
}

function topPieLineChange(cateType) {
	var timeText = $('.yearNumInput').val();
	if (cateType == 'line') {
		$('.span-type-text').text('收支曲线');
		$('.panelChange').attr('class', 'panel panel-info panelChange');
		debugger
		ajaxSpendIncomeGra(timeText, 'line');
	}
	if (cateType == 'pie') {
		$('.span-type-text').text('收支比重');
		$('.panelChange').attr('class', 'panel panel-success panelChange');
		debugger
		ajaxSpendIncomeGra(timeText, 'pie');
	}

}

//ajax 函数
function ajaxFun(parUrl, parData, parType, parSucFun, parErrFun) {
	debugger
	$.ajax({
		url : parUrl,
		type : parType,
		data : parData,
		dataType : 'json',
		success : parSucFun,
		error : parErrFun
	});
}
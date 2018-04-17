$(document).ready(function(){
	$(".myAlertFail").hide();
	$(".myAlertFail2").hide();
	ajaxYearAnaTop();
	ajaxYearLevel(1,"all");  //页面 加载 默认 是获取第一学年 必修 的数据
});
function majorSelectChange(major){
	debugger
	//统计 各个学年 优秀 良好 中等 不及格的 数量
	$(".span-major-text").text(major);
	if(major=="所有学科"){
		$(".span-major-text")[0].attributes[0].nodeValue="all";
	}else{
		$(".span-major-text")[0].attributes[0].nodeValue=major;
	}
	var yearNum = $(".span-year-text")[0].attributes[0].nodeValue;
	var majorType = $(".span-major-text")[0].attributes[0].nodeValue;
	ajaxYearLevel(yearNum,majorType);
}
function yearSelectChange(yearNum){
	debugger
	$(".span-year-text").text(yearNum);
	if(yearNum=="第一学年"){
		$(".span-year-text")[0].attributes[0].nodeValue="1";
	}else if(yearNum=="第二学年"){
		$(".span-year-text")[0].attributes[0].nodeValue="2";
	}else if(yearNum=="第三学年"){
		$(".span-year-text")[0].attributes[0].nodeValue="3";
	}else if(yearNum=="第四学年"){
		$(".span-year-text")[0].attributes[0].nodeValue="4";
	}else{
		$(".span-year-text")[0].attributes[0].nodeValue="5";
	}
	var yearNum = $(".span-year-text")[0].attributes[0].nodeValue;
	var majorType = $(".span-major-text")[0].attributes[0].nodeValue;
	ajaxYearLevel(yearNum,majorType);
}
function ajaxYearLevel(yearNum,majorType){
	ajaxFun('/LivePlatform/record/analyYearLevel.action','yearNum='+yearNum+'&majorType='+majorType,'post',function(data){
		console.log(data);
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.location.href="/LivePlatform/user/signinupUI.action?"+time;
		}else{
			if(data.info=="false"){
				$(".myAlertFail2").show();
			}else{
				var chart = {      
			      type: 'pie',     
			      options3d: {
			         enabled: true,
			         alpha: 45         
			      }
			   };
			   var title = {
			      text: '学习成绩等级比例图'   
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
			   var relData = [{name:'优秀',y:data.object.aLevel},{name:'良好',y:data.object.bLevel},{name:'中等',y:data.object.cLevel},{name:'不及格',y:data.object.dLevel}];
			   var series= [{
			         name: '成绩等级比例',
			         data: relData
			   }];     
			      
			   var json = {};   
			   json.chart = chart; 
			   json.title = title;       
			   json.subtitle = subtitle; 
			   json.plotOptions = plotOptions; 
			   json.series = series;   
			   $('.anaYearMajorType').highcharts(json);
			}
		}
	});
}
function ajaxYearAnaTop(){
	ajaxFun('/LivePlatform/record/analyzeYearRecord.action',null,'post',function(data){
		console.log(data);
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.location.href="/LivePlatform/user/signinupUI.action?"+time;
		}else{
			if(data.info=="false"){
				$(".myAlertFail").show();
			}else{
				yearAnaTop(data);
			}
		}
	});
}
//学年数据统计分析
function yearAnaTop(data){
	var chart = {      
		      type: 'column',
		      marginTop: 50,
		      marginRight: 40,
		      options3d: {
		         enabled: true,
		         alpha: 15,
		         beta: 13,
		         viewDistance: 25,
		         depth: 40
		      }
		   };
   var title = {
      text: '按类别统计成绩'   
   };   
   var xAxis = {
      categories: ['第一学年', '第二学年', '第三学年', '第四学年']
   };
   var yAxis = {
      allowDecimals: false,
      min: 0,
      title: {
         text: '科目成绩分数'
      }
   };  

   var tooltip = {
      headerFormat: '<b>{point.key}</b><br>',
      pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
   };

   var plotOptions = {
      column: {
         stacking: 'normal',
         depth: 40
      }
   };
   var relData = data.object;
   var series= [{
         name: '文科',
            data: [relData[0].artTotalRecord, relData[1].artTotalRecord, relData[2].artTotalRecord, relData[3].artTotalRecord],
            stack: 'male'
         }, {
            name: '理科',
            data: [relData[0].phyTotalRecord, relData[1].phyTotalRecord, relData[2].phyTotalRecord, relData[3].phyTotalRecord],
            stack: 'male'
         }, {
            name: '必修',
            data: [relData[0].mainMajorRecord, relData[1].mainMajorRecord, relData[2].mainMajorRecord, relData[3].mainMajorRecord],
            stack: 'female'
         }, {
            name: '选修',
            data: [relData[0].selectMajorRecord, relData[1].selectMajorRecord, relData[2].selectMajorRecord, relData[3].selectMajorRecord],
            stack: 'female'
   }];     
      
   var json = {};   
   json.chart = chart; 
   json.title = title;      
   json.xAxis = xAxis; 
   json.yAxis = yAxis; 
   json.tooltip = tooltip; 
   json.plotOptions = plotOptions; 
   json.series = series;   
   $('.yearAnaTop').highcharts(json);
   
   
		   
		   
}
//ajax封装函数
/*
 * @param 
 * 	ParUrl url
 * 	parData 带过来的参数数据
 * 	parType 请求类型
 * 	parSucFun ajax请求成功 绑定函数(整个函数带过来 可怕)
 */
function ajaxFun(parUrl,parData,parType,parSucFun){
	debugger
	$.ajax({
		url:parUrl,
		type:parType,
		data:parData,
		dataType:'json',
		success:parSucFun,
		error:function(error){
			console.log(error)
		}
	});
}
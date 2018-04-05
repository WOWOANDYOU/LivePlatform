$(document).ready(function(){
	$(".mySubBtn").click(recordValidate);
});
function recordValidate(){
	//校验数据 
	var courseName = $(".courseName").val();
	var courseRecord = $(".courseRecord").val();
	var r = /^[0-9]*[1-9][0-9]*$/;//正整数
	//debugger
	if(courseName=="" || courseName.trim()==""){
		 $(".addRecordForm-div1").addClass("has-error");
		 $(".addRecordForm-div1 label").text("课程名称输入错误");
	}else if(!r.test(courseRecord)){
		$(".addRecordForm-div2").addClass("has-error");
		$(".addRecordForm-div2 label").text("分数应为正整数");
	}else{
		recordSubmit();
	}
}
function cleanError(className){
	//debugger
	var title = $("."+className+" label").text();
	$("."+className).removeClass("has-error");
	if(title=="课程名称输入错误"){
		$("."+className+" label").text("课程名称:");
	}else if(title=="分数应为正整数"){
		$("."+className+" label").text("期末分数:");
	}else{
		
	}
}
function recordSubmit(){
	$("#addRecordForm").ajaxSubmit({
		url:'/LivePlatform/record/addRecord.action',
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data);
		},
		error:function(error){
			console.log(error);
		}
		
	});
}
$(document).ready(function(){
	$(".myAlertSuccess").hide();
	$(".btnAddBillType").click(addBillType);
});
var spendIn = -1;//全局 默认是  消费支出
function addBillType(){
	debugger
	if(spendIn==-1){
		$(".addBillTitle").text("添加消费类别");
		var $html = $("<input type='text' class='form-control' placeholder='输入消费类别名'>");
		$(".addBillInput").html($html);
		$("#myAddBillTypeModal").modal('show');
	}else{
		$(".addBillTitle").text("添加收入类别");
		var $html = $("<input type='text' class='form-control' placeholder='输入收入类别名'>");
		$(".addBillInput").html($html);
		$("#myAddBillTypeModal").modal('show');
	}
}
function selectChange(s){
	var sValue = s.value;
	if(sValue==-1){
		$(".panel-warning-succ").attr("class","panel panel-warning panel-warning-succ");
		var $title = $("<span>输入<b>消费支出</b>信息</span>");
		$(".addBillHeading").html($title);
		$(".textAddBill").text("选择消费类别");
		spendIn = -1;
	}else{
		$(".panel-warning-succ").attr("class","panel panel-success panel-warning-succ");
		var $title = $("<span>输入<b>收入账单</b>信息</span>");
		$(".addBillHeading").html($title);
		$(".textAddBill").text("选择收入类别");
		spendIn = 1;
	}
}
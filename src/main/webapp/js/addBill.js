$(document).ready(function(){
	$(".myAlertSuccess").hide();
	$(".btnReset").hide();
	$(".btnAddBillType").click(addBillType);
	$(".btnSureAddType").click(sureAddType);
	$(".submitAddBill").click(validateAddBill);
	$(".btnKeepAddRecord").click(keepAddFun);
	ajaxSpendCate();
});
function keepAddFun(){
	$(".myAlertSuccess").hide();
	$(".btnReset").click();
	ajaxSpendCate();
	$("#addBillForm").show();
	
}
var spendIn = -1;//全局 默认是  消费支出
function ajaxSpendCate(){
	ajaxFun("/LivePlatform/bill/selectSpendCate.action",null,"get",function(data){
		console.log(data);
		if(data.info=="false"){
			layer.msg("查询消费类别出错！",{icon:5});
		}else{
			var selectItem = "<option value='0'>选择类别</option>";
			for(var i=0;i<data.object.length;i++){
				selectItem+="<option value='"+data.object[i].spendCateId+"'>"+data.object[i].spendCateName+"</option>";
			}
			$(".selectCateJs").html(selectItem);
		}
	});
}
function ajaxIncomeCate(){
	ajaxFun("/LivePlatform/bill/selectIncomeCate.action",null,"get",function(data){
		console.log(data);
		if(data.info=="false"){
			layer.msg("查询收入类别出错！",{icon:5});
		}else{
			var selectItem = "<option value='0'>选择类别</option>";
			for(var i=0;i<data.object.length;i++){
				selectItem+="<option value='"+data.object[i].incomeCateId+"'>"+data.object[i].incomeCateName+"</option>";
			}
			$(".selectCateJs").html(selectItem);
		}
	});
}

//提交表单
function validateAddBill(){
	debugger
	var inputBillAmount = $(".inputBillAmount").val();
	var selectValue = $(".selectCateJs").val();
	if(inputBillAmount==""){
		layer.msg("请输入金额！",{icon:5});
	}else if(isNaN(inputBillAmount) || inputBillAmount<0){
		layer.msg("金额请输入大于0的数字！",{icon:5});
	}else if(selectValue==0){
		layer.msg("请选择账单类别！",{icon:5});
	}else{
		if(spendIn==-1){
			$('.selectCateJs').attr('name','spendCateId');
		}else{
			$('.selectCateJs').attr('name','incomeCateId');
		}
		ajaxAddBillInfo();
	}
}
function ajaxAddBillInfo(){
	debugger
	$("#addBillForm").ajaxSubmit({
		url:'/LivePlatform/bill/addBillInfo.action',
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data);
			if(data.info=="false"){
				layer.msg("添加失败了，请稍后再试！",{icon:5});
			}else{
				$("#addBillForm").hide();
				$(".myAlertSuccess").show();
			}
		},
		error:function(error){
			console.log(error);
		}
	});
}
function addBillType(){
	debugger
	if(spendIn==-1){
		$(".addBillTitle").text("添加消费类别");
		var $html = $("<input type='text' class='form-control intputCateValue' placeholder='输入消费类别名'>");
		$(".addBillInput").html($html);
		$("#myAddBillTypeModal").modal('show');
	}else{
		$(".addBillTitle").text("添加收入类别");
		var $html = $("<input type='text' class='form-control intputCateValue' placeholder='输入收入类别名'>");
		$(".addBillInput").html($html);
		$("#myAddBillTypeModal").modal('show');
	}
}
function sureAddType(){
	var relValue = $(".intputCateValue").val();
	if(relValue==''){
		layer.msg("类别名不能为空！",{icon:5});
	}else{
		ajaxFun('/LivePlatform/bill/addCate.action','CateName='+relValue+'&spendIncome='+spendIn,'get',function(data){
			console.log(data);
			$("#myAddBillTypeModal").modal('hide');
			if(data.info=="false"){
				layer.msg("添加失败,请稍后再试！",{icon:5});
			}else{
				layer.msg("添加成功！");
				var selectItem = "<option value='0'>选择类别</option>";
				if(spendIn==-1){
					for(var i=0;i<data.object.length;i++){
						selectItem+="<option value='"+data.object[i].spendCateId+"'>"+data.object[i].spendCateName+"</option>";
					}
				}else{
					for(var i=0;i<data.object.length;i++){
						selectItem+="<option value='"+data.object[i].incomeCateId+"'>"+data.object[i].incomeCateName+"</option>";
					}
				}
				$(".selectCateJs").html(selectItem);
			}
		});
	}
}
function selectChange(s){
	var sValue = s.value;
	if(sValue==-1){
		$(".panel-warning-succ").attr("class","panel panel-warning panel-warning-succ");
		var $title = $("<span>输入<b>消费支出</b>信息</span>");
		$(".addBillHeading").html($title);
		$(".textAddBill").text("选择消费类别");
		ajaxSpendCate();
		spendIn = -1;
	}else{
		$(".panel-warning-succ").attr("class","panel panel-success panel-warning-succ");
		var $title = $("<span>输入<b>收入账单</b>信息</span>");
		$(".addBillHeading").html($title);
		$(".textAddBill").text("选择收入类别");
		ajaxIncomeCate();
		spendIn = 1;
	}
}
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
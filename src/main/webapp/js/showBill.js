$(document).ready(function(){
	$(".myAlertFail").hide();
	$(".btnSureDelete").click(relDeleteBill);
	$(".btnSureUpdate").click(relUpdateBill);
	ajaxSpendFirstPage();
});
//全局变量 默认是 消费 -1 1表示 收入
var spendIncome = -1;

//当前页 总页数
var jsCurrentPage = 0;
var jsTotalPages = 0;
function ajaxSpendFirstPage(){
	ajaxFun('/LivePlatform/bill/showBillInfoPage.action','cateNum='+spendIncome+'&currentPage=1','post',function(data){
		console.log(data);
		jsTotalPages = data.object.pageTotal; //总页数
		if(data.info=="false"){
			$('.myAlertFail').show();
		}else{
			$(".tableMy thead").html("");//清空 后追加
			var $html = $("<tr>"+
					"<th>金额/￥元</th>"+
					"<th>消费类别</th>"+
					"<th>账簿备注</th>"+
					"<th>录入时间</th>"+
					"<th>操作</th>"+
				"</tr>");
			$(".tableMy thead").html($html);
			$(".tableMy tbody").html("");//清空 后追加
			$("#dataTables-example_paginate ul").html("");
			var pageInfo = data.object.object;
			var time = new Date().getTime();
			var deleteUrl = "/LivePlatform/bill/deleteBillInfo.action?t="+time+"&billId=";
			debugger
			$.each(pageInfo,function(i){
				$(".tableMy tbody").append("<tr><td>"+pageInfo[i].billAmount+"</td>"
											+"<td>"+pageInfo[i].spendCateEntity.spendCateName+"</td>"
											+"<td>"+pageInfo[i].billComment+"</td>"
											+"<td>"+pageInfo[i].strTime+"</td>"
											+"<td>"
											+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;,&quot;"+pageInfo[i].cateNum+"&quot;)'>"
											+"<button class='btn btn-warning btn-xs'><i class='fa fa-pencil fa-fw'></i>"
											+"</button></a>&nbsp;&nbsp;"
											+"<a href='#' onclick='sureDelete(&quot;"+deleteUrl+pageInfo[i].billId+"&quot;)'>"
											+"<button class='btn btn-danger btn-xs'><i class='fa fa-trash fa-fw'></i>"
											+"</button></a></td></tr>");
			});
			//分页按钮
			pageBtnFun(data);
		}
	},
	function(error){console.log();});
}

//输入 分页第一次 第一页
function ajaxIncomeFirstPage(){
	$(".tableMy thead").html("");//清空 后追加
	var $html = $("<tr>"+
					"<th>金额/￥元</th>"+
					"<th>收入类别</th>"+
					"<th>收入备注</th>"+
					"<th>录入时间</th>"+
					"<th>操作</th>"+
				"</tr>");
	$(".tableMy thead").html($html);
	ajaxFun('/LivePlatform/bill/showBillInfoPage.action','cateNum='+spendIncome+'&currentPage=1','post',function(data){
		console.log(data);
		jsTotalPages = data.object.pageTotal; //总页数
		if(data.info=="false"){
			$('.myAlertFail').show();
		}else{
			$(".tableMy tbody").html("");//清空 后追加
			$("#dataTables-example_paginate ul").html("");
			var pageInfo = data.object.object;
			var time = new Date().getTime();
			var deleteUrl = "/LivePlatform/bill/deleteBillInfo.action?t="+time+"&billId=";
			debugger
			$.each(pageInfo,function(i){
				$(".tableMy tbody").append("<tr><td>"+pageInfo[i].billAmount+"</td>"
											+"<td>"+pageInfo[i].incomeCateEntity.incomeCateName+"</td>"
											+"<td>"+pageInfo[i].billComment+"</td>"
											+"<td>"+pageInfo[i].strTime+"</td>"
											+"<td>"
											+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;,&quot;"+pageInfo[i].cateNum+"&quot;)'>"
											+"<button class='btn btn-warning btn-xs'><i class='fa fa-pencil fa-fw'></i>"
											+"</button></a>&nbsp;&nbsp;"
											+"<a href='#' onclick='sureDelete(&quot;"+deleteUrl+pageInfo[i].billId+"&quot;)'>"
											+"<button class='btn btn-danger btn-xs'><i class='fa fa-trash fa-fw'></i>"
											+"</button></a></td></tr>");
			});
			//分页按钮
			pageBtnFun(data);
		}
	},
	function(error){console.log();});
}
//分页按钮 显示 函数
function pageBtnFun(data){
	var pageInfo = data.object.object;
	if(pageInfo.length!=0){
		jsCurrentPage = 1;//设置当前页 是 第一页
		if(data.object.pageTotal==1){//1页
			$("#dataTables-example_paginate ul").append("<li class='paginate_button previous disabled' aria-controls='dataTables-example' tabindex='0' id='my_previous' onclick='prePageData()'>"
									+"<a href='#'>上一页</a></li>"
									+"<li class='paginate_button active' aria-controls='dataTables-example' tabindex='0' value='1' onclick='getPageData(this)'>"
									+"<a href='#'>1</a></li>"
									+"<li class='paginate_button next disabled' tabindex='0' id='my_next' onclick='nextPageData()'>"
									+"<a href='#'>下一页</a></li>");
		}else{//1页以上
			debugger
			$("#dataTables-example_paginate ul").append("<li class='paginate_button previous disabled' aria-controls='dataTables-example' tabindex='0' id='my_previous' onclick='prePageData()'>"
											+"<a href='#'>上一页</a></li>"
											+"<li class='paginate_button active' aria-controls='dataTables-example' tabindex='0' onclick='getPageData(this)' value='1'>"
											+"<a href='#'>1</a></li>");
			for(var i=0;i<(Number(data.object.pageTotal))-1;i++){
				$("#dataTables-example_paginate ul").append("<li class='paginate_button' aria-controls='dataTables-example' tabindex='0' onclick='getPageData(this)' value='"+(i+2)+"'>"
													+"<a href='#'>"+(i+2)+"</a></li>");
			}
			$("#dataTables-example_paginate ul").append("<li class='paginate_button next' aria-controls='dataTables-example' tabindex='0' id='my_next' onclick='nextPageData()'>"
					+"<a href='#'>下一页</a></li>");
		}
	}
}
function TypeChange(cateNum){
	spendIncome = cateNum;
	if(cateNum==-1){
		$(".span-billType-text").text("消费支出");
		$(".panel-change").attr("class","panel panel-info panel-change");
		$(".div-title").html("<b>消费支出</b>账单明细");
		ajaxSpendFirstPage();
	}
	if(cateNum==1){
		$(".span-billType-text").text("收入账簿");
		$(".panel-change").attr("class","panel panel-success panel-change");
		$(".div-title").html("<b>收入</b>账单明细");
		ajaxIncomeFirstPage();
	}
}


//分页查询数据 函数
function getPageData(li){
	debugger
	jsCurrentPage = li.value;//记住当前页
	var allLi = $("#dataTables-example_paginate ul li");
	if(allLi.length>3){
		for(var i=1;i<allLi.length-1;i++){
			allLi[i].className = "paginate_button";
		}
	}
	li.className = "paginate_button active";
	
	//当选择最后一页时 下一页按钮禁点
	if(li.value == jsTotalPages){
		allLi[allLi.length-1].className = "paginate_button next disabled";
	}else{
		allLi[allLi.length-1].className = "paginate_button next";
	}
	
	//当 选择的时 第一页时 上一页按钮禁点
	if(li.value == 1){
		allLi[0].className = "paginate_button previous disabled";
	}else{
		allLi[0].className = "paginate_button previous";
	}
	console.log(li.className);
	ajaxPageData(jsCurrentPage);
}

//点击 上一页时
function prePageData(){
	debugger
	if(jsCurrentPage==1){
	}else{
		var allLi = $("#dataTables-example_paginate ul li");
		if(jsCurrentPage==2){
			allLi[0].className = "paginate_button previous disabled";
		}
		allLi[allLi.length-1].className = "paginate_button next";
		jsCurrentPage--;
		for(var i=1;i<allLi.length-1;i++){
			allLi[i].className = "paginate_button";
		}
		allLi[jsCurrentPage].className = "paginate_button active";
		ajaxPageData(jsCurrentPage);
	}
}
//点击下一页时
function nextPageData(){
	debugger
	if(jsCurrentPage==jsTotalPages){
	}else{
		var allLi = $("#dataTables-example_paginate ul li");
		if(jsCurrentPage+1==jsTotalPages){
			allLi[allLi.length-1].className = "paginate_button next disabled";
		}
		allLi[0].className = "paginate_button previous";
		jsCurrentPage++;
		for(var i=1;i<allLi.length-1;i++){
			allLi[i].className = "paginate_button";
		}
		allLi[jsCurrentPage].className = "paginate_button active";
		ajaxPageData(jsCurrentPage);
	}
	
}
//ajax 向后台拿分页数据
function ajaxPageData(currentPageNum){
	ajaxFun('/LivePlatform/bill/showBillInfoPage.action','cateNum='+spendIncome+'&currentPage='+currentPageNum,'post',function(data){
		console.log(data);
		if(data.info=="false"){
			$('.myAlertFail').show();
		}else{
			$(".tableMy tbody").html("");//清空 后追加
			var pageInfo = data.object.object;
			var time = new Date().getTime();
			var deleteUrl = "/LivePlatform/bill/deleteBillInfo.action?t="+time+"&billId=";
			
			if(spendIncome==-1){
				$.each(pageInfo,function(i){
					$(".tableMy tbody").append("<tr><td>"+pageInfo[i].billAmount+"</td>"
												+"<td>"+pageInfo[i].spendCateEntity.spendCateName+"</td>"
												+"<td>"+pageInfo[i].billComment+"</td>"
												+"<td>"+pageInfo[i].strTime+"</td>"
												+"<td>"
												+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;,&quot;"+pageInfo[i].cateNum+"&quot;)'>"
												+"<button class='btn btn-warning btn-xs'><i class='fa fa-pencil fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='#' onclick='sureDelete(&quot;"+deleteUrl+pageInfo[i].billId+"&quot;)'>"
												+"<button class='btn btn-danger btn-xs'><i class='fa fa-trash fa-fw'></i>"
												+"</button></a></td></tr>");
				});
			}
			if(spendIncome==1){
				$.each(pageInfo,function(i){
					$(".tableMy tbody").append("<tr><td>"+pageInfo[i].billAmount+"</td>"
												+"<td>"+pageInfo[i].incomeCateEntity.incomeCateName+"</td>"
												+"<td>"+pageInfo[i].billComment+"</td>"
												+"<td>"+pageInfo[i].strTime+"</td>"
												+"<td>"
												+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;,&quot;"+pageInfo[i].cateNum+"&quot;)'>"
												+"<button class='btn btn-warning btn-xs'><i class='fa fa-pencil fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='#' onclick='sureDelete(&quot;"+deleteUrl+pageInfo[i].billId+"&quot;)'>"
												+"<button class='btn btn-danger btn-xs'><i class='fa fa-trash fa-fw'></i>"
												+"</button></a></td></tr>");
				});
			}
		}
	},
	function(error){
		$('.myAlertFail').show();
	});
}
var relDeleteUrl = '';
function relDeleteBill(){
	debugger
	ajaxFun(relDeleteUrl,null,'post',function(data){
		console.log(data);
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.location.href="/LivePlatform/user/signinupUI.action?"+time;
		}else{
			$("#myDeleteModal").modal("hide");
			if(data.info=="false"){
				layer.msg("删除失败！请稍后再试。",{icon:5});
			}else{
				layer.msg("删除成功！");
				if(spendIncome==-1){
					ajaxSpendFirstPage();
				}else{
					ajaxIncomeFirstPage();
				}
			}
		}
	},
	function(){});
}

//确定是否删除
function sureDelete(deleteUrl){
	debugger
	relDeleteUrl = deleteUrl;
	$("#myDeleteModal").modal("show");
}

var relUpdateUrl='';
//myUpdateModal  修改成绩
function sureUpdate(billId,cateNum){
	//先查询数据
	var updateSearchUrl = "/LivePlatform/bill/showBillDetail.action?billId="+billId+"&cateNum="+cateNum;
	ajaxFun(updateSearchUrl,null,"post",function(data){
		console.log(data);
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.location.href="/LivePlatform/user/signinupUI.action?"+time;
		}else if(data.info=="false"){
			layer.msg("操作失败……请稍后再试！",{inco:5});
		}else{
			$(".updatePanelBody").html("");
			var $html = $("<div class='alert alert-warning myAlertUpdateFail'>"+
								"<a href='#' class='close' data-dismiss='alert'>&times;</a>"+
								"<strong>修改失败！</strong>请稍后再试！"+
							"</div>"+
							"<div class='col-sm-12'>"+
								"<form id='updateBillForm'>"+
									"<div class='col-sm-6'>"+
										"<label class='control-label'>金额/￥(元):</label>"+
										"<input class='form-group form-control updateBillAmount' name='billAmount' type='text'>"+
									"</div>"+
									"<div class='col-sm-6'>"+
										"<label class='cateName'></label>"+
										"<select class='form-control form-group updateCateId' name=''>"+
					            		"</select>"+
									"</div>"+
									"<div class='col-sm-12'>" +
										"<label>备注信息:</label>"+
										"<textarea rows='6' cols='60' class='form-control updateBillComment' name='billComment' placeholder='请输入备注信息'></textarea>"+
										"<input type='hidden' class='updateBillId' name='billId'>"+
									"</div>"+
					        	"</form>"+
							"</div>");
			$(".updatePanelBody").append($html);
			$(".myAlertUpdateFail").hide();
			$(".updateBillId").val(data.object[0].billId);
			debugger
			var $cate;
			var cateStr = '';
			$(".updateBillAmount").val(data.object[0].billAmount);
			$(".updateBillComment").val(data.object[0].billComment);
			if(cateNum==-1){
				$(".cateName").text("消费类别");
				$(".updateCateId").attr("name","spendCateId");
				for(var i=0;i<data.object[1].length;i++){
					cateStr+="<option value='"+data.object[1][i].spendCateId+"'>"+data.object[1][i].spendCateName+"</option>"
				}
				$cate = $(cateStr);
				$(".updateCateId").html($cate);
				$(".updateCateId").val(data.object[0].spendCateEntity.spendCateId);
			}else{
				$(".cateName").text("收入类别");
				$(".updateCateId").attr("name","incomeCateId");
				for(var i=0;i<data.object[1].length;i++){
					cateStr+="<option value='"+data.object[1][i].incomeCateId+"'>"+data.object[1][i].incomeCateName+"</option>"
				}
				$cate = $(cateStr);
				$(".updateCateId").html($cate);
				$(".updateCateId").val(data.object[0].incomeCateEntity.incomeCateId);
			}
			
			$("#myUpdateModal").modal("show");
			
			relUpdateUrl = "/LivePlatform/bill/updateBill.action";
		}
	},
	function(error){console.log(error)});
}
function relUpdateBill(){
	var inputBillAmount = $(".updateBillAmount").val();
	if(inputBillAmount==""){
		layer.msg("请输入金额！",{icon:5});
	}else if(isNaN(inputBillAmount) || inputBillAmount<0){
		layer.msg("金额请输入大于0的数字！",{icon:5});
	}else{
		$("#updateBillForm").ajaxSubmit({
			url:relUpdateUrl,
			type:'post',
			dataType:'json',
			success:function(data){
				$("#myUpdateModal").modal("hide");
				var time = new Date().getTime();
				if(data.isLogin=="false"){
					window.location.href="/LivePlatform/user/signinupUI.action?"+time;
				}else{
					if(data.info=="true"){
						layer.msg("修改成功");
						if(spendIncome==-1){
							ajaxSpendFirstPage();
						}else{
							ajaxIncomeFirstPage();
						}
					}else{
						layer.msg("修改失败,请稍后再试",{icon:5});
					}
				}
			},
			error:function(){}
		});
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
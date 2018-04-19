$(document).ready(function(){
	$(".myAlertFail").hide();
	$(".btnSureDelete").click(relDeleteBill);
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
											+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;)'>"
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
											+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;)'>"
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
												+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;)'>"
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
												+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].billId+"&quot;)'>"
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


//myUpdateModal  修改成绩
function sureUpdate(billId){
	//先查询数据
	var updateSearchUrl = "/LivePlatform/bill/showBillDetail.action?billId="+billId;
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
								"<form id='updateRecordForm'>"+
									"<div class='col-sm-6'>"+
										"<label class='control-label'>课程名称:</label>"+
										"<input class='form-group form-control updateCourseName' name='courseName' type='text'>"+
										"<label>学期数:</label>"+
										"<select name='courseTermNumStr' class='form-control recordTermNum'>"+
					               			"<option value='第一学期'>第一学期</option>"+
					               			"<option value='第二学期'>第二学期</option>"+
					               			"<option value='第三学期'>第三学期</option>"+
					               			"<option value='第四学期'>第四学期</option>"+
					               			"<option value='第五学期'>第五学期</option>"+
					               			"<option value='第六学期'>第六学期</option>"+
					               			"<option value='第七学期'>第七学期</option>"+
					               			"<option value='第八学期'>第八学期</option>"+
					               		"</select>"+
										"<label class='control-label'>课程分数:</label>"+
										"<input class='form-group form-control updateRecordNum' name='courseRecord' type='text'>"+
										"<input type='hidden' class='updateCourseId' name='courseId'>"+
									"</div>"+
									"<div class='col-sm-6'>"+
										"<label>课程类别:</label>"+
										"<select class='form-control form-group updatePhyArtCate' name='coursePhyArtCateName'>"+
					            			"<option value='文科类'>文科类</option>"+
					            			"<option value='理科类'>理科类</option>"+
					            		"</select>"+
										"<label>课程性质:</label>"+
										"<select class='form-control form-group updateMajorCate' name='courseMajorCateName'>"+
					            			"<option value='必修类'>必修类</option>"+
					            			"<option value='选修类'>选修类</option>"+
					            		"</select>"+
									"</div>"+
					        	"</form>"+
							"</div>");
			$(".updatePanelBody").append($html);
			$(".myAlertUpdateFail").hide();
			$(".updateCourseName").val(data.object.courseName);
			$(".updateCourseTermNum").val(data.object.courseTermNumStr);
			$(".updateRecordNum").val(data.object.courseRecord);
			$(".updateCourseId").val(data.object.courseId);
			$(".recordTermNum").val(data.object.courseTermNumStr);
			$(".updatePhyArtCate").val(data.object.coursePhyArtCateName);
			$(".updateMajorCate").val(data.object.courseMajorCateName);
			$("#myUpdateModal").modal("show");
			
			relUpdateUrl = "/LivePlatform/record/updateRecord.action?recordId="+recordId;
		}
	},
	function(error){console.log(error)});
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
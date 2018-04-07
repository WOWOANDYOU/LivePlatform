$(document).ready(function(){
	$('.myAlertFail').hide();
	showRecordFirst();
	$(".btnSureDelete").click(relDelete);
	$(".btnSureUpdate").click(updateRecordValidate);
});
var jsTotalPages = 0; //总页数
var jsCurrentPage = 0; //当前页
function showRecordFirst(){
	$.ajax({
		url:'/LivePlatform/record/showRecordPage.action',
		type:'post',
		data:'currentPage=1',//页面加载默认为第一页
		dataType:'json',
		success:function(data){
			console.log(data);
			jsTotalPages = data.object.pageTotal; //总页数
			if(data.info=="false"){
				$('.myAlertFail').show();
			}else{
				$(".tableMy tbody").html("");//清空 后追加
				$("#dataTables-example_paginate ul").html("");
				var pageInfo = data.object.object;
				var time = new Date().getTime();
				var detailUrl = "/LivePlatform/record/showRecordDetail.action?t="+time+"&recordId=";
				var deleteUrl = "/LivePlatform/record/deleteRecord.action?t="+time+"&recordId=";
				
				$.each(pageInfo,function(i){
					$(".tableMy tbody").append("<tr><td>"+pageInfo[i].courseName+"</td>"
												+"<td>"+pageInfo[i].courseTermNumStr+"</td>"
												+"<td>"+pageInfo[i].courseRecord+"</td>"
												+"<td>"+pageInfo[i].coursePhyArtCateName+"</td>"
												+"<td>"+pageInfo[i].courseMajorCateName+"</td>"
												+"<td>"
												+"<a href='#' onclick='recordDetail(&quot;"+detailUrl+pageInfo[i].courseId+"&quot;)'>"
												+"<button class='btn btn-info btn-xs'><i class='fa fa-search fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].courseId+"&quot;)'>"
												+"<button class='btn btn-warning btn-xs'><i class='fa fa-pencil fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='#' onclick='sureDelete(&quot;"+deleteUrl+pageInfo[i].courseId+"&quot;)'>"
												+"<button class='btn btn-danger btn-xs'><i class='fa fa-trash fa-fw'></i>"
												+"</button></a></td></tr>");
				});
				//分页按钮
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
		},
		error:function(error){
			console.log(error);
			$('.myAlertFail').show();
		}
	});
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
	$.ajax({
		url:'/LivePlatform/record/showRecordPage.action',
		type:'post',
		data:'currentPage='+currentPageNum,
		dataType:'json',
		success:function(data){
			console.log(data);
			if(data.info=="false"){
				$('.myAlertFail').show();
			}else{
				$(".tableMy tbody").html("");//清空 后追加
				var pageInfo = data.object.object;
				var time = new Date().getTime();
				var detailUrl = "/LivePlatform/record/showRecordDetail.action?t="+time+"&recordId=";
				var deleteUrl = "/LivePlatform/record/deleteRecord.action?t="+time+"&recordId=";
				
				$.each(pageInfo,function(i){
					$(".tableMy tbody").append("<tr><td>"+pageInfo[i].courseName+"</td>"
												+"<td>"+pageInfo[i].courseTermNumStr+"</td>"
												+"<td>"+pageInfo[i].courseRecord+"</td>"
												+"<td>"+pageInfo[i].coursePhyArtCateName+"</td>"
												+"<td>"+pageInfo[i].courseMajorCateName+"</td>"
												+"<td>"
												+"<a href='#' onclick='recordDetail(&quot;"+detailUrl+pageInfo[i].courseId+"&quot;)'>"
												+"<button class='btn btn-info btn-xs'><i class='fa fa-search fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='#' onclick='sureUpdate(&quot;"+pageInfo[i].courseId+"&quot;)'>"
												+"<button class='btn btn-warning btn-xs'><i class='fa fa-pencil fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='#' onclick='sureDelete(&quot;"+deleteUrl+pageInfo[i].courseId+"&quot;)'>"
												+"<button class='btn btn-danger btn-xs'><i class='fa fa-trash fa-fw'></i>"
												+"</button></a></td></tr>");
				});
			}
		},
		error:function(error){
			$('.myAlertFail').show();
		}
	});
}
var relDeleteUrl = '';
//确定是否删除
function sureDelete(deleteUrl){
	debugger
	$("#myDeleteModal").modal("show");
	relDeleteUrl = deleteUrl;
}
function relDelete(){
	ajaxFun(relDeleteUrl,null,"post",function(data){
		debugger
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.location.href="/LivePlatform/user/signinupUI.action?"+time;
		}else{
			if(data.info=="false"){
				$(".myAlertFail").show();
			}else{
				$("#myDeleteModal").modal("hide");
				layer.msg("删除成功！");
				showRecordFirst();
			}
		}
	});
}

//查找 detail
function recordDetail(detatilUrl){
	ajaxFun(detatilUrl,null,"post",function(data){
		console.log(data);
		debugger
		if(data.info=="false"){
			$(".myAlertFail").show();
		}else{
			var relData = data.object;
			$(".recordItem").html("");
			$(".recordItem").append("<div class='col-sm-4'>课程科目:"+relData.courseName+"</div>"
									+"<div class='col-sm-4'>学期数:"+relData.courseTermNumStr+"</div>"
									+"<div class='col-sm-4'>分数:"+relData.courseRecord+"</div>"
									+"<div class='col-sm-4'>课程类别:"+relData.coursePhyArtCateName+"</div>"
									+"<div class='col-sm-4'>课程性质:"+relData.courseMajorCateName+"</div>"
									+"<div class='col-sm-4'>&nbsp;</div>"
									+"<div class='col-sm-8'>记录时间:"+relData.strTime+"</div>");
			$("#mydetailModal").modal("show");
		}
	});
}

//myUpdateModal  修改成绩
function sureUpdate(recordId){
	//先查询数据
	var updateSearchUrl = "/LivePlatform/record/showRecordDetail.action?recordId="+recordId;
	ajaxFun(updateSearchUrl,null,"post",function(data){
		console.log(data);
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.location.href="/LivePlatform/user/signinupUI.action?"+time;
		}else if(data.info=="false"){
			layer.msg("操作失败……请稍后再试！",{inco:5});
		}else{
			$(".myAlertUpdateFail").hide();
			$(".updateCourseName").val(data.object.courseName);
			$(".updateCourseTermNum").val(data.object.courseTermNumStr);
			$(".updateRecordNum").val(data.object.courseRecord);
			$(".updateCourseId").val(data.object.courseId);
			if(data.object.courseMajorCateName=="选修类"){
				$(".updateMajorCate").html("");
				$(".updateMajorCate").html("<option value='选修类'>选修类</option><option value='必修类'>必修类</option>");
			}
			if(data.object.coursePhyArtCateName=="理科类"){
				$(".updatePhyArtCate").html("");
				$(".updatePhyArtCate").html("<option value='理科类'>理科类</option><option value='文科类'>文科类</option>");
			}
			$("#myUpdateModal").modal("show");
			debugger
			relUpdateUrl = "/LivePlatform/record/updateRecord.action?recordId="+recordId;
		}
	});
}

//修改前校验数据
function updateRecordValidate(){
	debugger
	//校验数据 
	var courseName = $(".updateCourseName").val();
	var courseRecord = $(".updateRecordNum").val();
	var r = /^[0-9]*[1-9][0-9]*$/;//正整数
	//debugger
	if(courseName=="" || courseName.trim()==""){
		layer.msg("课程名不能为空！",{icon:5});
	}else if(!r.test(courseRecord)){
		layer.msg("课程成绩须为整数！",{icon:5});
	}else{
		relUpdate();
	}
}

var relUpdateUrl = "";
//relUpdate
function relUpdate(){
	debugger
	$("#updateRecordForm").ajaxSubmit({
		url:relUpdateUrl,
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data);
			var time = new Date().getTime();
			if(data.isLogin=="false"){
				window.location.href="/LivePlatform/user/signinupUI.action?"+time;
			}else if(data.info=="false"){
				$(".myAlertUpdateFail").show();
				layer.msg("修改失败……稍后再试",{icon:5});
			}else{
				$("#myUpdateModal").modal("hide");
				layer.msg("修改成功！");
				showRecordFirst();
			}
		},
		error:function(error){}
	});
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

$(document).ready(function(){
	$('.myAlertFail').hide();
	showRecordFirst();
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
				var pageInfo = data.object.object;
				var time = new Date().getTime();
				var detailUrl = "/LivePlatform/record/showRecordDetail.action?t="+time+"&recordId=";
				var updateUrl = "/LivePlatform/record/updateRecord.action?t="+time+"&recordId=";
				var deleteUrl = "/LivePlatform/record/deleteRecord.action?t="+time+"&recordId=";
				
				$.each(pageInfo,function(i){
					$(".tableMy tbody").append("<tr><td>"+pageInfo[i].courseName+"</td>"
												+"<td>"+pageInfo[i].courseTermNumStr+"</td>"
												+"<td>"+pageInfo[i].courseRecord+"</td>"
												+"<td>"+pageInfo[i].coursePhyArtCateName+"</td>"
												+"<td>"+pageInfo[i].courseMajorCateName+"</td>"
												+"<td>"
												+"<a href='"+detailUrl+pageInfo[i].courseId+"'>"
												+"<button class='btn btn-info btn-xs'><i class='fa fa-search fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='"+updateUrl+pageInfo[i].courseId+"'>"
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
				var updateUrl = "/LivePlatform/record/updateRecord.action?t="+time+"&recordId=";
				var deleteUrl = "/LivePlatform/record/deleteRecord.action?t="+time+"&recordId=";
				
				$.each(pageInfo,function(i){
					$(".tableMy tbody").append("<tr><td>"+pageInfo[i].courseName+"</td>"
												+"<td>"+pageInfo[i].courseTermNumStr+"</td>"
												+"<td>"+pageInfo[i].courseRecord+"</td>"
												+"<td>"+pageInfo[i].coursePhyArtCateName+"</td>"
												+"<td>"+pageInfo[i].courseMajorCateName+"</td>"
												+"<td>"
												+"<a href='"+detailUrl+pageInfo[i].courseId+"'>"
												+"<button class='btn btn-info btn-xs'><i class='fa fa-search fa-fw'></i>"
												+"</button></a>&nbsp;&nbsp;"
												+"<a href='"+updateUrl+pageInfo[i].courseId+"'>"
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

//确定是否删除
function sureDelete(deleteUrl){
	debugger
	$("#myDeleteModal").modal("show");
	$(".btnSureDelete").click(function(){
		$.ajax({
			url:deleteUrl,
			type:'post',
			dataType:'json',
			success:function(data){
				var time = new Date().getTime();
				if(data.isLogin=="false"){
					window.location.href="/LivePlatform/user/signinupUI.action?"+time;
				}else{
					if(data.info=="false"){
						$(".myAlertFail").show();
					}else{
						window.location.href="/LivePlatform/record/showRecordUI.action?"+time;
					}
				}
			},
			error:function(error){
				
			}
		});
	});
}
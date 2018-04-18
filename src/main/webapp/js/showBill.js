$(document).ready(function(){
	$(".myAlertFail").hide();
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
			$(".tableMy tbody").html("");//清空 后追加
			$("#dataTables-example_paginate ul").html("");
			var pageInfo = data.object.object;
			var time = new Date().getTime();
			var detailUrl = "/LivePlatform/bill/showBillInfoDetail.action?t="+time+"&billId=";
			var deleteUrl = "/LivePlatform/bill/deleteBillInfo.action?t="+time+"&billId=";
			
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
	});
}
function TypeChange(){
	
}
//ajax 函数
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
$(document).ready({
	
});
function toPages(url){
	debugger  //利用时间戳 当作参数 使得每个参数都已新的url 解决浏览器 url 缓存问题
	var timeStamp = new Date().getTime();
	var relUrl = url+"?"+timeStamp;
	window.location.href=relUrl;
}
function findAllToMeCom(){
	layer.load();
	ajaxFun('/LivePlatform/comment/findToMsg.action',null,'post',function(data){
		debugger
		layer.closeAll('loading');
		console.log(data);
		if(data.isLogin=='false'){
			var time = new Date().getTime();
			window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
		}else{
			if(data.info=='false'){
				layer.msg('查询失败，请稍后再试',{icon:5});
			}else{
				$('.indexAppendMsg').html('');
				if(data.object.length==0){
					var $topMsg = $("<li>"+
					        "<div style='margin-left:15px;cursor: pointer;'>消息&nbsp;"+
					        	"<span class='badge' style='background-color:red;'>0</span>"+
					            "<span class='pull-right text-muted small' style='margin-right:5px;margin-top:3px;'>"+(new Date().toLocaleString())+"</span>"+
					        "</div>"+
					    "</li>"+
					    "<li class='divider'></li>");
		
					$('.indexAppendMsg').append($topMsg);
					return;
				}
				var $topMsg = $("<li>"+
							        "<div style='margin-left:15px;cursor: pointer;'>消息&nbsp;"+
							        	"<span class='badge' style='background-color:red;'>"+data.object.length+"</span>"+
							            "<span class='pull-right text-muted small' style='margin-right:5px;margin-top:3px;'>"+data.object[0].strTime+"</span>"+
							        "</div>"+
							    "</li>"+
							    "<li class='divider'></li>");
				
				$('.indexAppendMsg').append($topMsg);
				
				$.each(data.object,function(i){
					$('.indexAppendMsg').append("<div class='col-lg-12 myMesg' style='border-bottom: 0.3px solid #f6f6f6;' onclick='checkMsg(&quot;"+data.object[i].commentId+"&quot;,&quot;"+data.object[i].commentGoodId+"&quot;)'>"+
											    	"<div class='col-lg-2' style='margin-top: 5px;'>"+
											    		"<img alt='photo' src='"+data.object[i].commentFromUserPhotoPath+"' width='40px' height='40px' style='border-radius: 4px;margin-left:-10px;'>"+
											    	"</div>"+
											    	"<div class='col-lg-10' style='margin-left:-10px;margin-bottom: 10px;'>"+
											    		"<div class='col-lg-8' style='margin-left:-8px;'>"+data.object[i].commentFromUserName+"</div>"+
											    		"<div class='col-lg-10' style='color:#8590a6;margin-left:-8px;width:260px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>"+data.object[i].commentContent+"</div>"+
											    	"</div>"+
											    "</div>");
				});
			}
		}
		
	},
	function(error){});
}

function checkMsg(commentId,commentGoodId){
	layer.load();
	ajaxFun('/LivePlatform/comment/checkComment.action','commentId='+commentId+"&commentGoodId="+commentGoodId,'post',function(data){
		layer.closeAll('loading');
		console.log(data);
		if(data.isLogin=='false'){
			var time = new Date().getTime();
			window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
		}else{
			if(data.info=='false'){
				layer.msg('数据查询失败，请稍后再试!',{icon:5});
			}else{
				sessionStorage.setItem('msgData',JSON.stringify(data));
				var time = new Date().getTime();
				window.location.href = '/LivePlatform/comment/messageUI.action?'+time;
			}
		}
	},
	function(error){layer.closeAll('loading')});
}

var currentPageJ = 1;
function searchGoodInfo(btn){
	layer.load();
	debugger
	var goodText = btn.parentElement.parentElement.childNodes[1].value;
	if(goodText==''){
		layer.closeAll('loading');
		layer.msg('请输入要搜索的闲置信息',{icon:5});
		return;
	}
	ajaxFun('/LivePlatform/unused/findGoodInfo.action','currentPage='+currentPageJ+'&goodInfoText='+goodText,'post',function(data){
		layer.closeAll('loading');
		console.log(data);
		if(data.info=='false'){
			layer.msg('查询出错了，请稍后再试！',{icon:5});
			return;
		}
		sessionStorage.setItem('resultData',JSON.stringify(data));var time = new Date().getTime();
		window.location.href = '/LivePlatform/unused/searchResultUI.action?'+time;
	});
}

function locaPage(str){
	var time = new Date().getTime();
	if(str=='record'){
		window.location.href = '/LivePlatform/record/analyzeRecordUI.action?'+time;
	}else if(str=='bill'){
		window.location.href = '/LivePlatform/bill/analyzeBillUI.action?'+time;
	}else{
		window.location.href = '/LivePlatform/unused/unusedMarketUI.action?'+time;
	}
}
function ajaxFun(parUrl,parData,parType,succFun,errorFun){
	debugger
	$.ajax({
		url:parUrl,
		type:parType,
		data:parData,
		dataType:'json',
		success:succFun,
		error:errorFun
	});
}
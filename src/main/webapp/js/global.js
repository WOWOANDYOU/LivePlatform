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
	},
	function(error){});
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
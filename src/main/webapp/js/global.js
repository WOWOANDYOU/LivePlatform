$(document).ready({
	
});
function toPages(url){
	debugger  //利用时间戳 当作参数 使得每个参数都已新的url 解决浏览器 url 缓存问题
	var timeStamp = new Date().getTime();
	var relUrl = url+"?"+timeStamp;
	window.location.href=relUrl;
}

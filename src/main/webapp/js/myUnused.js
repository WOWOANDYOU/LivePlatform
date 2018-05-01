$(document).ready(function(){
	firstFonMyGoodFun();
	$('.btnAddGoodInfo').click(function(){
		$('#myAddInfoModal').modal('show');
	});
	$('.btnSureAdd').click(beforeAddInfo);
	$('.toCancleBtn').click(function(){
		$('#resetForm').click();
		$('.imgAll ul').html("");
	});
});
var currentPageJ = 1;//默认当前第一页
function firstFonMyGoodFun(){
	ajaxFun('/LivePlatform/unused/findMyGoodInfo.action','currentPage='+currentPageJ,'post',function(data){
		console.log(data);
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.localtion.href="/LivePlatform/user/signinupUI.action?"+time;
		}else{
			if(data.info=="false"){
				layer.msg("查询数据失败，请稍后再试！",{icon:5});
			}else{
				
			}
		}
	},
	function(error){});
}
function beforeAddInfo(){
	var title = $('.inputTitle').val();
	var inputGoodPrice = $('.inputGoodPrice').val();
	var inputInfo = $('.goodContent').val();
	if(title==''){
		layer.msg("请输入标题！",{icon:5});
	}else if(inputGoodPrice==""){
		layer.msg("请输入价格！",{icon:5});
	}else if(isNaN(inputGoodPrice) || inputGoodPrice<0){
		layer.msg("金额请输入大于0的数字！",{icon:5});
	}else if(inputInfo==''){
		layer.msg("请输入闲置货物说明信息！",{icon:5});
	}else{
		addGoodInfo();
	}
}
function addGoodInfo(){
	$('#addGoodInfoForm').ajaxSubmit({
		url:'/LivePlatform/unused/addGoodInfo.action',
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data);
			var time = new Date().getTime();
			if(data.isLogin=='false'){
				window.localtion.href='/LivePlatform/user/signinupUI.action?'+time;
			}else{
				if(data.info=='false'){
					layer.msg("服务器异常，发布闲置信息失败！请稍后再试。",{icon:5});
				}else{
					$('#resetForm').click();
					$('.imgAll ul').html("");
					$('#myAddInfoModal').modal('hide');
					layer.msg("发布成功！");
				}
			}
		},
		error:function(error){
			
		}
	});
}
function clickTitle(title){
	debugger
	var before = title.nextElementSibling;
	var after = before.nextElementSibling;
	var close = title.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[5];
	before.style.display="none";
	after.style.display="block";
	close.style.display="block";
}
function clickBefore(change){
	debugger
	var d_before = change;
	var d_after = d_before.nextElementSibling;
	var d_readLess = change.nextElementSibling.nextElementSibling.childNodes[5];

	d_before.style.display = "none";
	d_after.style.display = "block";
	d_readLess.style.display = "block";
}
function clickAfter(change){
	debugger
	var d_after = change.parentElement.parentElement.previousElementSibling;
	var d_before = d_after.previousElementSibling;
	d_after.style.display="none";
	//$('.btn-readLess').css("display","none");
	change.parentElement.style.display = "none";
	d_before.style.display="block";
}
function clickDownComment(btn){
	var btnPN = btn.parentElement.nextElementSibling;
	btnPN.style.display = "block";
}
function clickUpComment(btn){
	btn.parentElement.style.display="none";
	
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
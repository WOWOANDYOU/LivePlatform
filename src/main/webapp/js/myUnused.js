$(document).ready(function(){
	$('.btnAddGoodInfo').click(function(){
		$('#myAddInfoModal').modal('show');
	});
	$('.btnSureAdd').click(beforeAddInfo);
	$('.toCancleBtn').click(function(){
		$('#resetForm').click();
		$('.imgAll ul').html("");
	});
});
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
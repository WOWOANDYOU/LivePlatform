$(document).ready(function(){
	ajaxFun('/LivePlatform/user/userInfo.action',null,'post',function(data){
		console.log(data);
		if(data.isLogin=='false'){
			var time = new Date().getTime();
			window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
		}else{
			if(data.info=='false'){
				layer.msg('查询失败了，请稍后再试！',{icon:5});
			}else{
				dataAppend(data);
			}
		}
	});
	$('.resetBtn').click(function(){
		$('#myUpdateImgModal').modal('hide');
		$('.imgAll ul').html("");
		$('#changePhotoReset').click();
	});
	$('.btnSureUpdate').click(toSubmitPhoto);
	$('.changePad').click(function(){
		$('#myUpdatePadModal').modal('show');
	});
	$('.btnSureUpdatePad').click(changePad);
	$('.resetBtnPad').click(function(){
		$('#myUpdatePadModal').modal('hide');
		$('#changepadReset').click();
	});
});
function changePad(){
	debugger
	var originPad = $('#changePadForm')[0][0].value;
	var newPad = $('#changePadForm')[0][1].value;
	if(originPad=='' || typeof(originPad) == 'undefined'){
		layer.msg('请输入原密码',{icon:5});
		return;
	}
	if(newPad ==''||typeof(newPad) == 'undefined'){
		layer.msg('请输入新密码',{icon:5});
		return;
	}
	$.ajax({
		url:'/LivePlatform/user/changePadIn.action',
		type:'post',
		data:'originPad='+originPad+'&newPad='+newPad,
		dataType:'json',
		success:function(data){
			console.log(data);
			if(data.isLogin=='false'){
				var time = new Date().getTime();
				window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
			}else if(data.info == 'false' && data.object == '原密码错误'){
				layer.msg('原密码错误',{icon:5});
			}else{
				$('#myUpdatePadModal').modal('hide');
				$('#changepadReset').click();
				layer.msg('密码修改成功',{icon:6});
			}
		}
	});
}
function toSubmitPhoto(){
	$('#changePhotoForm').ajaxSubmit({
		url:'/LivePlatform/user/updateInfo.action',
		type:'post',
		dataType:'json',
		success:function(data){
			$('#changePhotoReset').click();
			$('.imgAll ul').html("");
			if(data.isLogin=='false'){
				var time = new Date().getTime();
				window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
			}else if(data.info=='false'){
				layer.msg('修改失败，请稍后再试',{icon:5});
			}else{
				layer.msg('修改成功',{icon:6});
				dataAppend(data);
				console.log(data);
				$('#myUpdateImgModal').modal('hide');
				$('#changePhotoReset').click();
			}
		},
		error:function(error){
			layer.msg('出错了，请稍后再试！',{icon:5});
			$('#myUpdateImgModal').modal('hide');
			$('#changePhotoReset').click();
		}
	});
}
function showForm(span){
	var parent = span.parentElement;
	var bro = parent.nextElementSibling;
	parent.style.display = 'none';
	debugger
	bro.childNodes[0].value = span.previousElementSibling.textContent;
	bro.style.display = 'block';
}
function reSet(btn){
	debugger
	var parent = btn.parentElement;
	var parPre = parent.previousElementSibling;
	parent.childNodes[0].value = '';
	parent.style.display = 'none';
	parPre.style.display = 'block';
}
function subInfo(btn){
	debugger
	var parent = btn.parentElement;
	if(parent.childNodes[0].value=='' || typeof(parent.childNodes[1].value) == 'undefined'){
		layer.msg('内容不能为空！',{icon:5});
		return;
	}
	$(parent).ajaxSubmit({
		url:'/LivePlatform/user/updateInfo.action',
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data);
			if(data.isLogin=='false'){
				var time = new Date().getTime();
				window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
			}else if(data.info=='false'){
				layer.msg('修改失败，请稍后再试',{icon:5});
			}else{
				layer.msg('修改成功',{icon:6});
				dataAppend(data);
			}
		},
		error:function(){}
	});
}
function changePhoto(){
	$('#myUpdateImgModal').modal('show');
}



function dataAppend(data){
	$('.userInfoBackground').html('');
	var $info = ("<div class='col-lg-2'>"+
			"<img alt='' class='photoImg' style='border-radius: 6px;' src='"+data.object.userPhotoPath+"' width='163px' height='163px'>"+
			"<i class='fa fa-camera fa-2x' style='cursor:pointer;position:absolute;bottom:1%;right:1%;' onclick='changePhoto()'></i>"+
		"</div>" +
		"<div class='col-lg-8'>" +
			"<div class='row' style='margin-bottom: 5px;'>"+
				"<div class='col-lg-4' style='margin-left:10px;font-size:22px;'><strong>"+data.object.userName+"</strong></div>"+
			"</div>"+
			"<div class='row' style='font-size:16px;'>"+
				"<div class='col-lg-8' style='margin-bottom: 15px;'>"+
					"<div class='col-lg-3'>"+
						"<font style='color:'><b>学校：</b></font>"+
					"</div>"+
					"<span>"+
						"<span style='margin-left:-40px;'>"+data.object.userUniversityName+"</span>"+
						"&nbsp;&nbsp;<span style='color:#175199;cursor: pointer;' onclick='showForm(this)'><i class='fa fa-edit fa-fw'></i>修改</span>"+
					"</span>"+
					"<form style='display:none;' method='post' enctype='multipart/form-data'>"+
						"<input type='text' name='userUniversityName' class='form-control' style='float:left;width:45%;margin-top:-5px;margin-left:-20px;'>"+
						"<button type='button' class='btn btn-info' style='margin-top:-5px;margin-left:10px;' onclick='subInfo(this)'>保存</button>"+
						"<button type='button' class='btn btn-default' style='margin-top:-5px;margin-left:10px;' onclick='reSet(this)'>取消</button>"+
					"</form>"+
				"</div>"+
				
				"<div class='col-lg-8' style='margin-bottom: 15px;'>"+
					"<div class='col-lg-3'>"+
						"<font style='color:'><b>专业：</b></font>"+
					"</div>"+
					"<span>"+
						"<span style='margin-left:-40px;'>"+data.object.userMajor+"</span>"+
						"&nbsp;&nbsp;<span style='color:#175199;cursor: pointer;' onclick='showForm(this)'><i class='fa fa-edit fa-fw'></i>修改</span>"+
					"</span>"+
					"<form style='display:none;' method='post' enctype='multipart/form-data'>"+
						"<input type='text' name='userMajor' class='form-control' style='float:left;width:45%;margin-top:-5px;margin-left:-20px;'>"+
						"<button type='button' class='btn btn-info' style='margin-top:-5px;margin-left:10px;' onclick='subInfo(this)'>保存</button>"+
						"<button type='button' class='btn btn-default' style='margin-top:-5px;margin-left:10px;' onclick='reSet(this)'>取消</button>"+
					"</form>"+
				"</div>"+
				
				
				"<div class='col-lg-8' style='margin-bottom: 15px;'>"+
					"<div class='col-lg-3'>"+
						"<font style='color:'><b>班级：</b></font>"+
					"</div>"+
					"<span>"+
						"<span style='margin-left:-40px;'>"+data.object.userClassNum+"</span>"+
						"&nbsp;&nbsp;<span style='color:#175199;cursor: pointer;' onclick='showForm(this)'><i class='fa fa-edit fa-fw'></i>修改</span>"+
					"</span>"+
					"<form style='display:none;' method='post' enctype='multipart/form-data'>"+
						"<input type='text'name='userClassNum' class='form-control' style='float:left;width:45%;margin-top:-5px;margin-left:-20px;'>"+
						"<button type='button' class='btn btn-info' style='margin-top:-5px;margin-left:10px;' onclick='subInfo(this)'>保存</button>"+
						"<button type='button' class='btn btn-default' style='margin-top:-5px;margin-left:10px;' onclick='reSet(this)'>取消</button>"+
					"</form>"+
				"</div>"+
				
				
				"<div class='col-lg-8' style='margin-bottom: 15px;'>"+
					"<div class='col-lg-3'>"+
						"<font style='color:'><b>性别：</b></font>"+
					"</div>"+
					"<span>"+
						"<span style='margin-left:-40px;'>"+data.object.userGender+"</span>"+
						"&nbsp;&nbsp;<span style='color:#175199;cursor: pointer;' onclick='showForm(this)'><i class='fa fa-edit fa-fw'></i>修改</span>"+
					"</span>"+
					"<form style='display:none;' method='post' enctype='multipart/form-data'>"+
						"<select name='userGender' class='form-control' style='float:left;width:45%;margin-top:-5px;margin-left:-20px;'>"+
							"<option value='男'>男</option>"+
							"<option value='女'>女</option>"+
						"</select>"+
						"<button type='button' class='btn btn-info' style='margin-top:-5px;margin-left:10px;' onclick='subInfo(this)'>保存</button>"+
						"<button type='button' class='btn btn-default' style='margin-top:-5px;margin-left:10px;' onclick='reSet(this)'>取消</button>"+
					"</form>"+
				"</div>"+
				"</div>"+
		"</div>");

	$('.userInfoBackground').append($info);

}

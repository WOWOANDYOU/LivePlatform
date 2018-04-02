$(document).ready(function(){
	$("#newPassword").hide();
	$("#newPassword2").hide();
	$(".findPassSub").hide();
	$(".btn-getCode").click(codeValidate);
	$(".signupSub").click(allValidate);
	$(".findPassSub").click(newPassValidate);
});
function codeValidate(){
	var email = $("#inputFindEmail").val();
	if(email==""){
		$("#inputFindEmail").addClass("invalid");
		$("#inputFindEmail").attr("placeholder","邮箱不能为空");
	}else if(!isEmail(email)){
		$("#inputFindEmail").addClass("invalid");
		$("#inputFindEmail").val("");
		$("#inputFindEmail").attr("placeholder","邮箱不正确");
	}else{
		getCode();
	}
}
function isEmail(emailStr){
	 var reg=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	 var istrue = reg.test(emailStr);
	 return istrue;
}
var isClickGetCode = 0;
function getCode(){
	isClickGetCode = 1;
	$("#myModal_gifInfo").modal("show");
	var email = $("#inputFindEmail").val();
	$.ajax({
		url:'./findPassSendCode.action',
		type:'post',
		dataType:'json',
		data:'userEmail='+email,
		success:function(data){
			$("#myModal_gifInfo").modal("hide");
			console.log(data);
			if(data.existence == -1){
				$(".pInfo").html("用户不存在");
			}else if(data.existence == 1 && data.info == "true"){
				run("btn-getCode");
			}else{
				$(".pInfo").text("出错拉，邮件未能发出，请稍后再试");
			}
		},
		error:function(error){
			$(".btn-getCode").removeAttr("disabled");
			$("#myModal_gifInfo").modal("hide");
			$(".pInfo").text("出错啦，请稍后再试");
		}
	});
}
function newPassValidate(){
	var newPass = $("#newPassword").val();
	var newPass2 = $("#newPassword2").val();
	if(newPass==""){
		$("#newPassword").addClass("invalid");
		$("#newPassword").attr("placeholder","密码不能为空");
	}else if(newPass.length < 6){
		$(".pInfo").html("密码须6位数或者以上");
	}else if(newPass != newPass2){
		$(".pInfo").html("两次密码输入不一致");
	}else{
		$(".btn-getCode").attr("disabled","true");
		$("#myModal_gifInfo").modal("show");
		changePass();
	}
}
function changePass(){
	$("#userFindPad").ajaxSubmit({
		url:'./changePass.action',
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data);
			$(".btn-getCode").removeAttr("disabled");
			$("#myModal_gifInfo").modal("hide");
			if(data.info == "true"){
				$(".pInfo").html("密码修改成功,3秒后跳到登录页面");
				$('body').oneTime('3000ms',function(){
					window.location.replace("./signinupUI.action");
	            });
			}else{
				$(".pInfo").html("密码修改失败，请稍后再试");
			}
		},
		error:function(error){
			$(".btn-getCode").removeAttr("disabled");
			$("#myModal_gifInfo").modal("hide");
			$(".pInfo").html("密码修改失败，请稍后再试");
			console.log(error);
		}
	});
}
function run(className){
	var time = 120;// 定义时间变量。用于倒计时用
    var timer = null;// 定义一个定时器；
    timer = setInterval(function(){//开启定时器。函数内执行
    	$("."+className).attr("disabled","true");
        $("."+className).text(time+"秒后重发"); //点击发生后，按钮的文本内容变成之前定义好的时间值。
        time--;// 时间值自减
        if(time ==0){     // 判断,当时间值小于等于0的时候
        	$("."+className).text("");// 其文本内容变成……点击重新发送……
            $("."+className).text("重发验证码");
            $("."+className).removeAttr("disabled");
            clearInterval(timer); // 清除定时器
        }
    },1000)
}
function allValidate(){
	var email = $("#inputFindEmail").val();
	var findCode = $("#inputFindEmailCode").val();
	if(isClickGetCode == 0){
		$("#inputFindEmailCode").val("");
		$("#inputFindEmailCode").addClass("invalid");
		$("#inputFindEmailCode").attr("placeholder","请先获取验证码");
	}else if(email==""){
		$("#inputFindEmail").addClass("invalid");
		$("#inputFindEmail").attr("placeholder","邮箱不能为空");
	}else if(!isEmail(email)){
		$("#inputFindEmail").addClass("invalid");
		$("#inputFindEmail").val("");
		$("#inputFindEmail").attr("placeholder","邮箱不正确");
	}else if(findCode == "" || findCode.trim() == ""){
		$("#inputFindEmailCode").val("");
		$("#inputFindEmailCode").addClass("invalid");
		$("#inputFindEmailCode").attr("placeholder","验证码不能为空");
	}else{
		//$("#inputFindEmail").hide();
		$("#myModal_gifInfo").modal("show");
		$(".signupSub").attr("disabled","true");
		checkCodeFun();
	}
}
function checkCodeFun(){
	var code = $("#inputFindEmailCode").val();
	$(".pInfo").html("");
	$.ajax({
		url:'./findPassCheckCode.action',
		type:'post',
		data:'code='+code,
		dataType:'json',
		success:function(data){
			console.log(data);
			$("#myModal_gifInfo").modal("hide");
			$(".signupSub").removeAttr("disabled");
			if(data.megInfo == 1 && data.info == "true"){
				$("#inputFindEmail").hide();
				$(".codeLabel").hide();
				$("#newPassword").show();
				$("#newPassword2").show();
				$(".signupSub").hide();
				$(".pp").hide();
				$(".findPassSub").show();
			}else if(data.megInfo == -1){//
				$(".pInfo").html("验证码错误");
			}else if(data.megInfo == -2){//超时
				$(".pInfo").html("验证码超时，请重新获取");
			}else{
				$(".pInfo").html("服务器异常，请稍后再试");
			}
		},
		error:function(error){
			$("#myModal_gifInfo").modal("hide");
			$(".signupSub").removeAttr("disabled");
		}
	})
}
function removeClassFun2(a){
	var isFirefox=navigator.userAgent.indexOf("Firefox"); 
	if(a.placeholder == "密码不能为空"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control";
		}else{
			a.attributes[3].nodeValue = "form-control";
		}
		a.placeholder = "输入新密码6位数或以上";
	}else if(a.placeholder == "密码位数须6位数或以上"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control";
		}else{
			a.attributes[3].nodeValue = "form-control";
		}
		a.placeholder = "输入密码6位数或以上";
	}else if(a.placeholder == "邮箱不能为空"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control inputName2";
		}else{
			a.attributes[3].nodeValue = "form-control inputName2";
		}
		a.placeholder = "输入邮箱";
	}else if(a.placeholder == "邮箱不正确"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control inputName2";
		}else{
			a.attributes[3].nodeValue = "form-control inputName2";
		}
		a.placeholder = "输入邮箱";
	}else if(a.placeholder=="验证码不能为空" || a.placeholder=="请先获取验证码"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control";
		}else{
			a.attributes[3].nodeValue = "form-control";
		}
		a.placeholder = "输入验证码";
	}else{
	}
}
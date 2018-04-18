$(document).ready(function(){
	debugger
	var cookieUserName = $.cookie('cookieUserName');
	var cookieUserPad = $.cookie('cookieUserPad');
	if(cookieUserName!=null || cookieUserPad!=null){
		$('#inputName').val(cookieUserName);
		$('#inputPassword').val(cookieUserPad);
		signinFun();
	}else{
		createCode();
		$("#userSignup").hide();
		$("#toSignup").click(function(){
			$(".pInfo").text("");
			$("input").val();
			$("#userSignin").hide();
			$("#userSignup").show();
		});
		$("#toSignin").click(function(){
			$(".pInfo").text("");
			$("input").val();
			$("#userSignup").hide();
			$("#userSignin").show();
		});
		$(".signinSub").click(signinValidate);
		
		$(".btn-getCode").click(getMessCodeFun);
		
		$(".signupSub").click(signupValidate);
		
		$("#testbtn").click(function(){
		});
		
		$("#btnSubhaha").click(function(){
			alert("hah");
			$("#testForm").ajaxSubmit({
				url:'./haha.action',
				dataType:'json',
				success:function(data){
					alert("hahah");
				}
			});
		});
	}
});
var code ; //在全局 定义验证码  
function createCode(){   
  code = "";  
  var codeLength = 4;//验证码的长度  
  var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，当然也可以用中文的    
  for(var i=0;i<codeLength;i++){  
	  var charIndex = Math.floor(Math.random()*36);  
	  code +=selectChar[charIndex];  
  }  
  //随机颜色
  var aa=('#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6));
  //改变颜色
  $("#messCode").css('color',aa);
  $("#messCode").val(code);
}  

function signinValidate(){
	var name = $("#inputName").val();
	var password = $("#inputPassword").val();
	var checkCode = $("#megCode").val();
	
	if(name==""){
		$("#inputName").addClass("invalid");
		$("#inputName").attr("placeholder","用户名不能为空");
	}else if(password==""){
		$("#inputPassword").addClass("invalid");
		$("#inputPassword").attr("placeholder","密码不能为空");
	}else if(checkCode.toUpperCase()!=code){
		$("#megCode").val("");
		$("#megCode").addClass("invalid");
		$("#megCode").attr("placeholder","验证码错误");
		createCode();
	}else{
		$(".signinSub").attr("disabled","true");
		$("#myModal_gifInfo").modal("show");
		debugger
		if($(".rememberMe").is(':checked')){
			var cookieUserName = $("#inputName").val();
			var cookieUserPad = $("#inputPassword").val();
			//存入cookie 7天内有效
			$.cookie('cookieUserName',cookieUserName,{expires:7});
			$.cookie('cookieUserPad',cookieUserPad,{expires:7});
		}
		signinFun();
	}
}
var getMessCodeNum = 0;
function signupValidate(){
	var name = $("#inputName2").val();
	var password = $("#inputPassword2").val();
	var emailStr = $("#inputEmail").val();
	var messCode = $("#inputEmailCode").val();
	
	if(name==""){
		$("#inputName2").addClass("invalid");
		$("#inputName2").attr("placeholder","用户名不能为空");
	}else if(password==""){
		$("#inputPassword2").addClass("invalid");
		$("#inputPassword2").attr("placeholder","密码不能为空");
	}else if(password.length<6){
		$("#inputPassword2").addClass("invalid");
		$("#inputPassword2").val("");
		$("#inputPassword2").attr("placeholder","密码位数须6位数或以上");
	}else if(emailStr == ""){
		$("#inputEmail").addClass("invalid");
		$("#inputEmail").attr("placeholder","请输入邮箱");
	}else if(!isEmail(emailStr)){
		$("#inputEmail").addClass("invalid");
		$("#inputEmail").val("");
		$("#inputEmail").attr("placeholder","邮箱不正确");
	}else if(getMessCodeNum == 0){
		$("#inputEmailCode").val("");
		$("#inputEmailCode").addClass("invalid");
		$("#inputEmailCode").attr("placeholder","请先获取验证码");
	}else if(isExistence == 1){
		$(".pInfo").text("该邮箱已注册，请直接登录");
	}else if(messCode == ""){
		$("#inputEmailCode").addClass("invalid");
		$("#inputEmailCode").attr("placeholder","验证码不能为空");
	}else{
		$(".signupSub").attr("disabled","true");
		$("#myModal_gifInfo").modal("show");
		signupFun();
	}
}
function isEmail(emailStr){
	 var reg=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	 var istrue = reg.test(emailStr);
	 return istrue;
}
function removeClassFun(a){
	var isFirefox=navigator.userAgent.indexOf("Firefox"); 
	if(a.placeholder == "用户名不能为空"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control inputName2";
		}else{
			a.attributes[3].nodeValue = "form-control inputName2";
		}
		a.placeholder = "输入用户名";
	}else if(a.placeholder == "密码不能为空"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control";
		}else{
			a.attributes[3].nodeValue = "form-control";
		}
		a.placeholder = "输入密码";
	}else if(a.placeholder == "验证码错误"){
		if(isFirefox>0){
			a.attributes[1].nodeValue = "form-control";
		}else{
			a.attributes[2].nodeValue = "form-control";
		}
		a.placeholder = "输入验证码";
	}else{
		
	}
}
function removeClassFun2(a){
	var isFirefox=navigator.userAgent.indexOf("Firefox"); 
	if(a.placeholder == "用户名不能为空"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control inputName2";
		}else{
			a.attributes[3].nodeValue = "form-control inputName2";
		}
		a.placeholder = "输入用户名";
	}else if(a.placeholder == "密码不能为空"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control";
		}else{
			a.attributes[3].nodeValue = "form-control";
		}
		a.placeholder = "输入密码6位数或以上";
	}else if(a.placeholder == "密码位数须6位数或以上"){
		if(isFirefox>0){
			a.attributes[2].nodeValue = "form-control";
		}else{
			a.attributes[3].nodeValue = "form-control";
		}
		a.placeholder = "输入密码6位数或以上";
	}else if(a.placeholder == "请输入邮箱"){
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
var isExistence;//是否存在
function getMessCodeFun(){
	var name = $("#inputName2").val();
	var password = $("#inputPassword2").val();
	var email = $("#inputEmail").val();
	
	if(name==""){
		$("#inputName2").addClass("invalid");
		$("#inputName2").attr("placeholder","用户名不能为空");
	}else if(password==""){
		$("#inputPassword2").addClass("invalid");
		$("#inputPassword2").attr("placeholder","密码不能为空");
	}else if(password.length<6){
		$("#inputPassword2").addClass("invalid");
		$("#inputPassword2").val("");
		$("#inputPassword2").attr("placeholder","密码位数须6位数或以上");
	}else if(email == ""){
		$("#inputEmail").addClass("invalid");
		$("#inputEmail").attr("placeholder","请输入邮箱");
	}else if(!isEmail(email)){
		$("#inputEmail").addClass("invalid");
		$("#inputEmail").val("");
		$("#inputEmail").attr("placeholder","邮箱不正确");
	}else{
		getMessCodeNum+=1;
		$("#myModal_gifInfo").modal("show");
		$.ajax({
			url:'/LivePlatform/user/getMegCode.action',
			type:'post',
			data:'userEmail='+email,
			dataType:'json',
			success:function(data){
				console.log(data);
				$("#myModal_gifInfo").modal("hide");
				if(data.existence == 1){
					isExistence = 1;
					$(".pInfo").text("该邮箱已注册，请直接登录");
					return;
				}
				if(data.existence == -1 && data.info == "true"){
					isExistence = -1;
					run("btn-getCode");
				}
				if(data.info == "false"){
					$(".pInfo").text("邮件未能发送，请稍后再试");
				}
			},
			error:function(error){
				console.log(error);
				$("#myModal_gifInfo").modal("hide");
				$(".pInfo").text("出错了，请稍后重试");
			}
		});
	}
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

function signinFun(){
	$("#userSignin").ajaxSubmit({
		url:'/LivePlatform/user/signin.action',
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data);
			$(".signinSub").removeAttr("disabled");
			$("#myModal_gifInfo").modal("hide");
			if(data.info == "error"){
				createCode();
				$(".pInfo").text("用户名或者密码错误");
			}else if(data.info == "false"){
				createCode();
				$(".pInfo").text("服务器出错，请稍后再试");
			}else{
				window.location.replace("/LivePlatform/index.action");
			}
		},
		error:function(error){
			createCode();
			$(".signinSub").removeAttr("disabled");
			$("#myModal_gifInfo").modal("hide");
			$(".pInfo").text("出错了，请稍后重试");
		}
	});
	
}

function signupFun(){
	debugger
	$("#userSignup").ajaxSubmit({
		url:'/LivePlatform/user/signup.action',
		type:'post',
		dataType:'json',
		success:function(data){
			$(".signupSub").removeAttr("disabled");
			$("#myModal_gifInfo").modal("hide");
			console.log(data);
			if(data.megInfo == 1 && data.info == "true"){
				window.location.replace("../index.action"); 
			}else if(data.megInfo == -1){
				$(".pInfo").text("验证码错误，请重新输入");
			}else if(data.megInfo == -2){
				$(".pInfo").text("验证码超时，请重新获取");
			}else{
				$(".pInfo").text("服务器异常，请稍后重试");
			}
		},
		error:function(error){
			$(".signupSub").attr("disabled","false");
			$("#myModal_gifInfo").modal("hide");
			$(".pInfo").text("出错拉，请稍后重试");
		}
	});
}
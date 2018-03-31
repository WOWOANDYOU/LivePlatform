$(document).ready(function(){
	createCode();
	
	$("#userSignup").hide();
	
	$("#toSignup").click(function(){
		$("#userSignin").hide();
		$("#userSignup").show();
	});
	$("#toSignin").click(function(){
		$("#userSignup").hide();
		$("#userSignin").show();
	});
	
	$(".signinSub").click(signinValidate);
	
	$(".btn-getCode").click(getMessCodeFun);
	
	$(".signupSub").click(signupValidate);
	
	$("#testbtn").click(function(){
		$(".img-gifInfo").attr("src","../img/loadding2.gif");
		$("#myModal_gifInfo").modal("show");
	});
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
	}else if(messCode == ""){
		$("#inputEmailCode").addClass("invalid");
		$("#inputEmailCode").attr("placeholder","验证码不能为空");
	}else{
		SigupFun();
	}
}
function isEmail(emailStr){
	 var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
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
		$.ajax({
			url:'./getMegCode.action',
			type:'post',
			data:'userEmail='+email,
			dataType:'json',
			success:function(data){
				console.log(data);
				if(data.existence == -1 && data.info == "true"){
					
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	}
}
var ajax_option={
	url:"../user/signin.action",//默认是form action
	dataType:'json',
	success:function(data){
		console.log(data);
	}
}

function signinFun(){
	alert('wowo');
	$("#userSignin").ajaxSubmit(ajax_option);
	/*$("#userSignin").ajaxForm({
		url:'../user/signin.action',
		dataType:'json',
		success:function(data){
			console.log(data);
		},
		error:function(error){
			console.log(error);
		}
	});*/
}
function SigupFun(){
	$("#userSignup").ajaxForm({
		url:'./signup.action',
		type:'post',
		dataType:'json',
		success:function(data){
			
		},
		error:function(error){
			
		}
	});
}
$(document).ready(function(){
	//firstFindMyGoodFun();
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
function firstFindMyGoodFun(){
	ajaxFun('/LivePlatform/unused/findMyGoodInfo.action','currentPage='+currentPageJ,'post',function(data){
		console.log(data);
		var time = new Date().getTime();
		if(data.isLogin=="false"){
			window.localtion.href="/LivePlatform/user/signinupUI.action?"+time;
		}else{
			if(data.info=="false"){
				layer.msg("查询数据失败，请稍后再试！",{icon:5});
			}else{
				var goodInfo = data.object.object;
				for(var i=0;i<goodInfo.length;i++){
					debugger;
					var imgs = goodInfo[i].goodImgPath.split(",");
					var $html = $("<div class='row'>" +
									"<div class='col-lg-10' style='border:solid 1px #ccc;margin:10px auto;border-radius:4px;'>" +
										"<div class='col-lg-12 my-col-class' onclick='clickTitle(this)'>"+
											"<h4 style='padding-left:8px;'><strong>"+goodInfo[i].goodTitle+"&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#777777e8;'>"+goodInfo[i].goodPrice+"元/￥</font></strong></h4>"+
										"</div>"+
										"<div class='col-lg-12 beforeBody'  onclick='clickBefore(this)'>"+
											"<div class='col-lg-3 my-col-class' style='height:110px;'>"+
												"<img alt='' src='"+imgs[0]+"' width='100%' height='100%' style='max-height:470px;max-width:640px;border-radius:4px;'>"+
											"</div>"+
											"<div class='col-lg-9 directionText'>"+goodInfo[i].goodContent+
												"<button type='button' class='btn myReadAll'>阅读全文<i class='fa fa-angle-down fa-fw'></i></button>" +
											"</div>"+
										"</div>"+
										"<div class='col-lg-12 afterBody' style='display:none;'>"+
											"<div class='col-lg-12' style='font-size:16px;'>"+
												"<blockquote>"+goodInfo[i].goodContent+"</blockquote>"+
											"</div>"+
											"<div class='col-lg-12'></div>"+
											"<div class='col-lg-5' style='color:#8590a6;font-size:15px;margin-bottom: 10px;'>发布于 "+goodInfo[i].strTime+"</div>"	+
										"</div>"+
									
										"<div class='col-lg-12' style='margin-bottom: 10px;margin-top: 10px;'>"+
											"<div class='col-lg-3 readComments' onclick='clickDownComment(this,&quot;"+goodInfo[i].goodId+"&quot;)'>"+
												"<i class='fa fa-comments fa-fw'></i>查看评论"+
											"</div>"+
											"<div class='col-lg-3' style=''>收藏</div>"+
					            			"<div class='col-lg-1 btn-readLess' style='float:right;display:none;'>"+
					            				"<button type='button' class='btn myReadLess' onclick='clickAfter(this)'>收起<i class='fa fa-angle-up fa-fw'></i></button>"+
					            			"</div>"+
				            			"</div>"+
									
									"</div>"+
								"</div>");
					
					for(var j=0;j < imgs.length;j++){
						var $imgHtml = $("<div class='col-lg-6'>"+
											"<img alt='' src='"+imgs[j]+"' width='100%' height='100%' style='max-height:700px;max-width:650px;margin:15px auto;'>"+
										"</div>");
						var $imgBody = $html[0].childNodes[0].childNodes[2].childNodes[1];
						$($imgBody).append($imgHtml);
					}
					
					$('.myGoodInfoBody').append($html);
				}
				
				/*<div class="row"> 
            	<div class="col-lg-10" style="border:solid 1px #ccc;margin:10px auto;border-radius:4px;">
            		<div class="col-lg-12 my-col-class" onclick="clickTitle(this)">
            			<h4 style="padding-left:8px;"><strong>华为P20滴血出让生活就像海洋只有意志坚强的人才能到达彼岸</strong></h4>
            		</div>
            		<div class="col-lg-12 beforeBody"  onclick="clickBefore(this)">
            			<div class="col-lg-3 my-col-class" style="height:110px;">
            				<img onclick="wowo()" alt="" src="/images/4911e78f-c319-4b4e-89db-711a834d062e.jpg" width="100%" height="100%" style="max-height:470px;max-width:640px;border-radius:4px;">
						</div>
            			<div class="col-lg-9 directionText">
	            			这里没有刁钻尖锐的公式、数字或专有名词，从泛泛无边的真相中挑选出与你看似完全无关、又紧紧相连的一些，
	            			再用谁都听得懂的语言去描述。想把最冷僻的知识，浪漫地说给你听。最近《国家地理》杂志改版了，
	            			特别喜欢他们在官网上说的一句话：「请相信，我们有三个原则是不会改变的——我们永远站在科学、事实和地球的这一边。」
	            			<button type="button" class="btn myReadAll">阅读全文<i class="fa fa-angle-down fa-fw"></i></button>
            			</div>
					</div>
					
					<div class="col-lg-12 afterBody" style="display:none;">
						<div class="col-lg-12" style="font-size:16px;">
							<blockquote>
								如果中国不发展自己的汽车工业，我相信首先的问题就不是用禁止提供芯片这种方式“掐住喉咙”了。
								是整个汽车工业产业链的每一个环节，都会被人捏在手里。你想反抗？想换一种活法？没有的事。
								我想，能提出来“如果没有国产车，那么zf就不会搞出那么多的税来保护国产，合资和进口车就会更便宜”这种观点的人，
								绝对是一个精致的利己主义者。在财富还没有达到他们所期望的程度的时候，无论在国内赚多少钱，都会嫌弃这个国家。
								当他们的财富能够满足他们移民他国的时候，他们更是拍拍屁股不带走一丝留恋的离开。然后回头告诉所有人，
								“看，这就是个*******的国家，连一台车都造不出来”。幸好，中国是有自主品牌的。
								幸好，中国自主品牌的发展速度比利己主义者们想象得快得多。幸好，下一个时代的汽车工业话语权，很可能会被中国掌控。
							</blockquote>
						</div>
						<div class="col-lg-12">
							<div class="col-lg-6">
								<img alt="" src="/images/75610593-1d4c-4469-93e3-6ad57690b464.jpg" width="100%" height="100%" style="max-height:700px;max-width:650px;margin:15px auto;">
							</div>
							<div class="col-lg-6">
								<img alt="" src="/images/4911e78f-c319-4b4e-89db-711a834d062e.jpg" width="100%" height="100%" style="max-height:700px;max-width:650px;margin:15px auto;">
							</div>
							<div class="col-lg-6">
								<img alt="" src="/images/4911e78f-c319-4b4e-89db-711a834d062e.jpg" width="100%" height="100%" style="max-height:700px;max-width:650px;margin:15px auto;">
							</div>
							<div class="col-lg-6">
								<img alt="" src="/images/75610593-1d4c-4469-93e3-6ad57690b464.jpg" width="100%" height="100%" style="max-height:700px;max-width:650px;margin:15px auto;">
							</div>
						</div>
						<div class="col-lg-5" style="color:#8590a6;font-size:15px;margin-bottom: 10px;">发布于 2018年4月31日  9:29:34</div>
					</div>
					<!-- afterBody -->
					
					<div class="col-lg-12" style="margin-bottom: 10px;margin-top: 10px;">
						<div class="col-lg-3 readComments" onclick="clickDownComment(this)">
							<i class="fa fa-comments fa-fw"></i>查看评论
						</div>
            			<div class="col-lg-3" style="">收藏</div>
            			<div class="col-lg-1 btn-readLess" style="float:right;display:none;">
            				<button type="button" class="btn myReadLess" onclick="clickAfter(this)">收起<i class="fa fa-angle-up fa-fw"></i></button>
            			</div>
					</div>
					
            	</div> 
            	<!-- col-lg-10 -->
            </div>
            <!-- /.row -->*/
				
				
				
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
	var d_readLess = change.nextElementSibling.nextElementSibling.childNodes[2];

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

function toReplayFun(btn){
	debugger
	var form = btn.previousElementSibling.childNodes[1];
	
	$(form).ajaxSubmit({
		url:'/LivePlatform/comment/addComment.action',
		type:'post',
		dataType:'json',
		success:function(data){
			
		},
		error:function(error){
			
		}
	});
}
function clickDownComment(btn,goodId){
	debugger
	
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
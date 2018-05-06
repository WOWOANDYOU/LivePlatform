$(document).ready(function(){
	var resultData = JSON.parse(sessionStorage.getItem('resultData'));
	console.log(resultData);
	var goodInfo = resultData.object.object;
	if(goodInfo.length==0){
		$('.goodInfoBody').html('<font style="font-size:16px;color:red;">没有搜索到结果哦！</font>');
		return;
	}
	for(var i=0;i<goodInfo.length;i++){
		debugger;
		var imgs = goodInfo[i].goodImgPath.split(",");
		var $html = $("<div class='row'>" +
						"<div class='col-lg-10' style='border:solid 1px #ccc;margin:10px auto;border-radius:4px;'>" +
							"<div class='col-lg-12' style='margin-top: 10px;'>"+
            					"<img alt='photo' style='border-radius:2px;' src='"+goodInfo[i].goodUser.userPhotoPath+"' width='28px' height='28px'>"+
            					"<b style='color:#444;margin-left:5px;'>"+goodInfo[i].goodUser.userName+"</b>"+
            				"</div>"+
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
								"<div class='col-lg-3 readComments' onclick='clickDownComment(this,&quot;"+goodInfo[i].goodId+"&quot;,&quot;"+goodInfo[i].goodUserId+"&quot;)'>"+
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
								"<img alt='' src='"+imgs[j]+"' width='372px' height='235px' style='max-height:700px;max-width:650px;margin:15px auto;'>"+
							"</div>");
			var $imgBody = $html[0].childNodes[0].childNodes[3].childNodes[1];
			$($imgBody).append($imgHtml);
		}
		
		$('.goodInfoBody').append($html);
		if(resultData.object.pageTotal>1){
			$('.goodInfoBody')[0].nextElementSibling.style.display = "block";
		}
	}
})

var currentPageJ = 1;
function readPageMore(){
	currentPageJ++;
	firstFindGoodFun();
}
function clickTitle(title){
	debugger
	var before = title.nextElementSibling;
	var after = before.nextElementSibling;
	var close = title.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[2];
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
	change.parentElement.style.display = "none";
	d_before.style.display="block";
}

function clickDownComment(btn,goodId,goodUserId){
	debugger
	layer.load();
	ajaxFun('/LivePlatform/comment/goodInfoComment.action','goodId='+goodId,'post',function(data){
		layer.closeAll('loading');
		console.log(data);
		if(data.info=='false'){
			layer.msg('查询出错了，请稍后再试！',{icon:5});
		}else{
			debugger
			var p_div = btn.parentElement.parentElement;
			var $commentBody = $("<div class='col-lg-12' style='display:none;border:solid 1px #ccc;margin:10px auto;border-radius:4px;'>"+
									"<div class='col-lg-3' style='font-size:16px;margin:5px auto;'><strong><span>"+data.object.length+"</span>条评论</strong></div>"+
									"<div class='col-lg-2 myReadLess' onclick='clickUpComment(this)'>"+
										"收起评论<i class='fa fa-angle-up fa-fw'></i>"+
									"</div>"+
									"<div class='col-lg-3' style='float:right;margin:5px auto;'>按时间先后顺序排序</div>"+
									"<div class='col-lg-12' style='margin:8px auto;'>"+
										"<div style='border:solid 0.3px #ccc;background-color:#ccc;'></div>"+
									"</div>"+
								"</div>");
			$.each(data.object,function(i){
				debugger
				$($commentBody).append("<div class='col-lg-12'>"+
											"<div class='col-lg-1'>"+
												"<img alt='photo' style='border-radius:2px;' src='"+data.object[i].commentFromUserPhotoPath+"' width='28px;' height='28px;'>"+
											"</div>"+
											"<span style='margin-left:-10px;'>"+data.object[i].commentFromUserName+"</span>&nbsp;&nbsp;"+
											"<span style='color: #8590a6;'>回复</span>&nbsp;&nbsp;"+
											"<span>"+data.object[i].commentToUserName+"</span>"+
											"<div class='col-lg-3' style='float:right;'>"+data.object[i].strTime+"</div>"+
											"<div class='col-lg-12' style='margin:10px auto;'>"+
												data.object[i].commentContent+
											"</div>"+
											"<div class='col-lg-2' style='color: #8590a6;cursor: pointer;' onclick='showCommentPanel(this)'>" +
												"<i class='fa fa-reply fa-fw'></i>回复" +
											"</div>"+
											"<div class='col-lg-12' style='display:none;'>"+
												"<div class='col-lg-12'>"+
													"<form method='post'>"+
														"<input type='text' class='form-control' name='commentContent' placeholder='回复"+data.object[i].commentFromUserName+"'>"+
														"<input type='hidden' value='"+data.object[i].commentFromUserId+"' name='commentToUserId'>"+
														"<input type='hidden' value='"+data.object[i].commentGoodId+"' name='commentGoodId'>"+
														"<input type='reset' style='display:none'>"+
													"</form>"+
												"</div>"+
												"<div class='col-lg-12' style='margin-top:10px;margin-bottom: 5px;'>"+
													"<button style='float:right;' type='button' class='btn btn-info' onclick='toReplayFun(this)'>评论</button>"+
													"<button style='float:right;cursor: pointer;background-color: #f8f8f8;margin-right:5px;' type='button' class='btn' onclick='closeForm(this)'><font style='color:#8590a6;'>取消</font></button>"+
												"</div>"+
											"</div>"+
										"</div>"+
					
										"<div class='col-lg-12' style='margin:10px auto;'>"+
											"<div style='border:solid 0.4px #f5f5f5;background-color:#ccc;'></div>"+
										"</div>");
			});
			
			$($commentBody).append("<div class='col-lg-12' style='margin-bottom: 10px;'>"+
									"<form method='post'>"+
										"<input style='width:92%;float:left;' type='text' class='form-control' placeholder='写下你的购买意向' name='commentContent'>"+
										"<input type='hidden' value='"+data.goodId+"' name='commentGoodId'>"+
										"<input type='hidden' value='"+goodUserId+"' name='commentToUserId'>"+
									"</form>"+
									"<button type='button' class='btn btn-info' style='float:right;' onclick='toGoodComment(this)'>发表</button>"+
							"</div>");
			$(p_div).append($commentBody);
			
		}
		var btnPN = btn.parentElement.nextElementSibling;
		btnPN.style.display = "block";
	},
	function(error){});
}

function toGoodComment(btn){
	layer.load();
	debugger
	var form = btn.previousElementSibling;
	var p_div = btn.parentElement.parentElement;
	if(form[0].value == '' || typeof(form[0].value) == 'undefined'){
		layer.closeAll('loading');
		layer.msg('请输入意向内容！',{icon:5});
		return;
	}
	$(form).ajaxSubmit({
		url:'/LivePlatform/comment/addComment.action',
		type:'post',
		dataType:'json',
		success:function(data){
			debugger
			layer.closeAll('loading');
			console.log(data);
			if(data.isLogin=='false'){
				var time = new Date().getTime();
				window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
			}else{
				var lastChild = p_div.childNodes[p_div.childNodes.length-1];//最后一个 评论节点
				var $beforeChild = $("<div class='col-lg-12'>"+
											"<div class='col-lg-1'>"+
												"<img alt='photo' style='border-radius:2px;' src='"+data.object.commentFromUserPhotoPath+"' width='28px;' height='28px;'>"+
											"</div>"+
											"<span style='margin-left:-10px;'>"+data.object.commentFromUserName+"</span>&nbsp;&nbsp;"+
											"<span style='color: #8590a6;'>回复</span>&nbsp;&nbsp;"+
											"<span>"+data.object.commentToUserName+"</span>"+
											"<div class='col-lg-3' style='float:right;'>"+data.object.strTime+"</div>"+
											"<div class='col-lg-12' style='margin:10px auto;'>"+
												data.object.commentContent+
											"</div>"+
											"<div class='col-lg-2' style='color: #8590a6;cursor: pointer;' onclick='showCommentPanel(this)'>" +
												"<i class='fa fa-reply fa-fw'></i>回复" +
											"</div>"+
											"<div class='col-lg-12' style='display:none;'>"+
												"<div class='col-lg-12'>"+
													"<form method='post'>"+
														"<input type='text' class='form-control' name='commentContent' placeholder='回复"+data.object.commentFromUserName+"'>"+
														"<input type='hidden' value='"+data.object.commentFromUserId+"' name='commentToUserId'>"+
														"<input type='hidden' value='"+data.object.commentGoodId+"' name='commentGoodId'>"+
														"<input type='reset' style='display:none'>"+
													"</form>"+
												"</div>"+
												"<div class='col-lg-12' style='margin-top:10px;margin-bottom: 5px;'>"+
													"<button style='float:right;' type='button' class='btn btn-info' onclick='toReplayFun(this)'>评论</button>"+
													"<button style='float:right;cursor: pointer;background-color: #f8f8f8;margin-right:5px;' type='button' class='btn' onclick='closeForm(this)'><font style='color:#8590a6;'>取消</font></button>"+
												"</div>"+
											"</div>"+
										"</div>"+
					
										"<div class='col-lg-12' style='margin:10px auto;'>"+
											"<div style='border:solid 0.4px #f5f5f5;background-color:#ccc;'></div>"+
										"</div>");
				p_div.insertBefore($beforeChild[0],lastChild);
				p_div.insertBefore($beforeChild[1],lastChild);
				form[0].value = '';
				layer.msg('发表成功！',{icon:6});
				var commentNumDom = btn.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0];
				var commentNum = commentNumDom.textContent;
				commentNum++;
				commentNumDom.textContent = commentNum;
			}
			
		},
		error:function(error){
			layer.closeAll('loading');
			layer.msg('出错了，请稍后再试！',{icon:5});
		}
	});
}

function clickUpComment(btn){
	btn.parentElement.style.display="none";
}

function toReplayFun(btn){
	debugger
	var form = btn.parentElement.previousElementSibling.childNodes[0];
	var inputV = form[0].value;
	if(inputV=='' || typeof(inputV) == 'undefined'){
		layer.msg('请输入评论内容',{icon:5});
	}else{
		layer.load();
		$(form).ajaxSubmit({
			url:'/LivePlatform/comment/addComment.action',
			type:'post',
			dataType:'json',
			success:function(data){
				console.log(data);
				var time = new Date().getTime();
				if(data.isLogin=='false'){
					window.location.href = '/LivePlatform/user/signinupUI.action?'+time;
				}else{
					btn.parentElement.parentElement.style.display = 'none';
					$(form[3]).click();
					layer.closeAll('loading');
					var p_div = btn.parentElement.parentElement.parentElement.parentElement;
					 var $html = $("<div class='col-lg-12'>"+
								"<div class='col-lg-1'>"+
								"<img alt='photo' style='border-radius:2px;' src='"+data.object.commentFromUserPhotoPath+"' width='28px;' height='28px;'>"+
							"</div>"+
							"<span style='margin-left:-10px;'>"+data.object.commentFromUserName+"</span>&nbsp;&nbsp;"+
							"<span style='color: #8590a6;'>回复</span>&nbsp;&nbsp;"+
							"<span>"+data.object.commentToUserName+"</span>"+
							"<div class='col-lg-3' style='float:right;'>"+data.object.strTime+"</div>"+
							"<div class='col-lg-12' style='margin:10px auto;'>"+
								data.object.commentContent+
							"</div>"+
							"<div class='col-lg-2' style='color: #8590a6;cursor: pointer;' onclick='showCommentPanel(this)'>" +
								"<i class='fa fa-reply fa-fw'></i>回复" +
							"</div>"+
							"<div class='col-lg-12' style='display:none;'>"+
								"<div class='col-lg-12'>"+
									"<form method='post'>"+
										"<input type='text' class='form-control' name='commentContent' placeholder='回复"+data.object.commentFromUserName+"'>"+
										"<input type='hidden' value='"+data.object.commentFromUserId+"' name='commentToUserId'>"+
										"<input type='hidden' value='"+data.object.commentGoodId+"' name='commentGoodId'>"+
										"<input type='reset' style='display:none'>"+
									"</form>"+
								"</div>"+
								"<div class='col-lg-12' style='margin-top:10px;margin-bottom: 5px;'>"+
									"<button style='float:right;' type='button' class='btn btn-info' onclick='toReplayFun(this)'>评论</button>"+
									"<button style='float:right;cursor: pointer;background-color: #f8f8f8;margin-right:5px;' type='button' class='btn' onclick='closeForm(this)'><font style='color:#8590a6;'>取消</font></button>"+
								"</div>"+
							"</div>"+
						"</div>"+

						"<div class='col-lg-12' style='margin:10px auto;'>"+
							"<div style='border:solid 0.4px #f5f5f5;background-color:#ccc;'></div>"+
						"</div>");
					 var lastChild = p_div.childNodes[p_div.childNodes.length-1];
					 p_div.insertBefore($html[0],lastChild);
					 p_div.insertBefore($html[1],lastChild);
					 layer.msg('回复成功',{icon:6});
					 var commentNumDom = btn.parentElement.parentElement.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0];
					 var commentNum = commentNumDom.textContent;
					 commentNum++;
					 commentNumDom.textContent = commentNum;
				}
			},
			error:function(error){
				layer.msg('出错了~稍后再试',{icon:5});
			}
		});
	}
}

function closeForm(btn){
	debugger
	var p_div = btn.parentElement.parentElement;
	p_div.style.display = 'none';
	var div2 = btn.parentElement.previousElementSibling.childNodes[0];
	$(div2[3]).click();
	
}
function showCommentPanel(div){
	debugger
	var next_div = div.nextElementSibling;
	next_div.style.display = 'block';
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
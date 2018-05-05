package cn.edu.zhku.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.CommentEntity;
import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.CommentService;

@Controller
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	private CommentService commentService;
	
	@SuppressWarnings("finally")
	@RequestMapping(value="goodInfoComment",method=RequestMethod.POST)
	@ResponseBody
	public String goodInfoComment(String goodId,String goodUserId,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			ArrayList<CommentEntity> list = commentService.selectComment(goodId);
			ArrayList<CommentEntity> list2 = new ArrayList<CommentEntity>();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for(CommentEntity commentEntity:list) {
				commentEntity.setStrTime(sdf.format(commentEntity.getCommentTime()));
				list2.add(commentEntity);
			}
			jr.setObject(list2);
			jr.setGoodId(goodId);
			jr.setGoodUserId(goodUserId);
			jr.setInfo("true");
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping(value="addComment",method=RequestMethod.POST)
	@ResponseBody
	public String addComment(CommentEntity comment,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null) {
				jr.setIsLogin("false");
			}else {
				comment.setCommentFromUserId(user.getUserId());
				String commentId = UUID.randomUUID().toString();
				comment.setCommentId(commentId);
				int num = commentService.addCommentInfo(comment);
				CommentEntity commentNew = commentService.selectCommentByPrimaryKey(commentId);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				commentNew.setStrTime(sdf.format(commentNew.getCommentTime()));
				jr.setObject(commentNew);
				jr.setInfo((num>0 && commentNew!=null)?"true":"false");
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	
	@SuppressWarnings("finally")
	@RequestMapping(value="findToMsg",method=RequestMethod.POST)
	@ResponseBody
	public String findToMsg(HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null) {
				jr.setIsLogin("false");
			}else {
				ArrayList<CommentEntity> list = commentService.selectCommentByToUserId(user.getUserId());
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				for(CommentEntity comment:list) {
					comment.setStrTime(sdf.format(comment.getCommentTime()));
				}
				jr.setObject(list);
				jr.setInfo("true");
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
}

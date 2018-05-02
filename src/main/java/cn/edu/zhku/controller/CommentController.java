package cn.edu.zhku.controller;

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

@Controller
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	private CommentService commentService;
	
	@SuppressWarnings("finally")
	@RequestMapping(value="goodInfoComment",method=RequestMethod.POST)
	@ResponseBody
	public String goodInfoComment(String goodId,String currentPage,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null) {
				jr.setIsLogin("fasle");
			}else {
				
				//ArrayList<CommentEntity> list = commentService.selectCommentPage(map);
			}
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
				jr.setIsLogin("fasle");
			}else {
				comment.setCommentFromUserId(user.getUserId());
				comment.setCommentId(UUID.randomUUID().toString());
				 int num = commentService.addCommentInfo(comment);
				 jr.setInfo(num>0?"true":"false");
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
}

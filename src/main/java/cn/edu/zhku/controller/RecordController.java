package cn.edu.zhku.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.CourseRecordEntity;
import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.RecordService;

@Controller
@RequestMapping("/record")
public class RecordController {
	@Autowired
	private RecordService recordService;
	
	@RequestMapping("addRecordUI")
	public String addRecordUI(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if(user!=null){
			return "addRecord";
		}else {
			return "signinup";
		}
	}
	
	@RequestMapping("showRecordUI")
	public String showRecordUI(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if(user!=null){
			return "showRecord";
		}else {
			return "signinup";
		}
	}
	
	//添加 成绩
	@SuppressWarnings("finally")
	@RequestMapping(value="addRecord",method=RequestMethod.POST)
	@ResponseBody
	public String addRecord(CourseRecordEntity recordEntity,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		try {
			if(user==null) {//未登录 让他转去 登录
				jr.setIsLogin("false");
			}else {
				if(recordEntity.getCourseName()==null || recordEntity.getCourseRecord()==null) {
					jr.setIsLogin("false");
				}else {
					recordEntity.setCourseRecordUserId(user.getUserId());
					recordEntity.setCourseId(UUID.randomUUID().toString());
					int num = recordService.addRecordInfo(recordEntity);
					if(num > 0) {
						jr.setInfo("true");
					}else{
						jr.setInfo("false");
					}
				}
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
}

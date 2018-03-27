package cn.edu.zhku.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@SuppressWarnings("finally")
	@RequestMapping(value = "singup", method = RequestMethod.POST)
	@ResponseBody
	public String singup(UserEntity userEntity,HttpRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			int num = userService.addUser(userEntity);
			if(num!=0) {
				jr.setInfo("true");//表示 注册成功
			}else {
				jr.setInfo("false");//表示 注册失败
			}
		}catch(Exception e) {
			jr.setInfo("false");
		}finally {
			return JSON.toJSONString(jr);
		}
	}
}

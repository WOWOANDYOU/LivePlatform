package cn.edu.zhku.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.UserEntity;

@Controller
public class GloableController {
	//用户登录后 系统首页
	@RequestMapping("/index")
	public String index(HttpServletRequest request) {
		/*UserEntity userEntity = (UserEntity) request.getSession().getAttribute("userSession");
		if(userEntity==null) {
			return "redirect:/user/siginup";
		}else {
			return "index";
		}*/
		return "index";
	}
}

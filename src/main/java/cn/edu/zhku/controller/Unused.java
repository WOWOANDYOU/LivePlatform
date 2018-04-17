package cn.edu.zhku.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.UserEntity;
@Controller
@RequestMapping("/unused")
public class Unused {
	@RequestMapping("unusedMarketUI")
	public String unusedMarketUI(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if(user==null) {
			return "signinup";
		}else {
			return "unusedMarket";
		}
	}
}

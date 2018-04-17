package cn.edu.zhku.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.BillService;

@RequestMapping("/bill")
@Controller
public class BillController {
	@Autowired
	private BillService billService;
	
	@RequestMapping("addBillUI")
	public String addBillUI(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if(user==null) {
			return "signinup";
		}else {
			return "addBill";
		}
		
	}
}

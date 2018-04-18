package cn.edu.zhku.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.BillEntity;
import cn.edu.zhku.pojo.IncomeCateEntity;
import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.SpendCateEntity;
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
	
	@RequestMapping("showBillUI")
	public String showBillUI(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if(user==null) {
			return "signinup";
		}else {
			return "showBill";
		}
	}
	
	
	@SuppressWarnings("finally")
	@RequestMapping(value="showBillInfoPage",method=RequestMethod.POST)
	@ResponseBody
	public String showBillInfoPage(String cateNum,String currentPage,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null) {
				jr.setIsLogin("false");
			}else {
				if(cateNum==null || "".equals(cateNum.trim()) || currentPage==null || "".equals(currentPage.trim())) {
					jr.setInfo("false");
				}else {
					Map<String,Object> map = new HashMap<String,Object>();
					map.put("userId", user.getUserId());
					
				}
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	
	@SuppressWarnings("finally")
	@RequestMapping("addCate")
	@ResponseBody
	public String addSpendCate(String CateName,String spendIncome) {
		JsonReturn jr = new JsonReturn();
		try {
			String id = UUID.randomUUID().toString();
			int num = 0;
			if(spendIncome==null || "".equals(spendIncome.trim())) {
				jr.setInfo("false");
			}else if(spendIncome.equals("-1")) {
				SpendCateEntity spendCate = new SpendCateEntity();
				spendCate.setSpendCateId(id);
				spendCate.setSpendCateName(CateName);
				num = billService.addSpendCate(spendCate);
				jr.setObject(billService.selectAllSpendCate());
			}else {
				IncomeCateEntity incomeCate = new IncomeCateEntity();
				incomeCate.setIncomeCateId(id);
				incomeCate.setIncomeCateName(CateName);
				num = billService.addIncomeCate(incomeCate);
				jr.setObject(billService.selectAllIncomeCate());
			}
			jr.setInfo(num==0?"false":"true");
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping("selectSpendCate")
	@ResponseBody
	public String selectSpendCate() {
		JsonReturn jr = new JsonReturn();
		try {
			ArrayList<SpendCateEntity> list = billService.selectAllSpendCate();
			jr.setObject(list);
			jr.setInfo(list==null?"false":"true");
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping("selectIncomeCate")
	@ResponseBody
	public String selectIncomeCate() {
		JsonReturn jr = new JsonReturn();
		try {
			ArrayList<IncomeCateEntity> list = billService.selectAllIncomeCate();
			jr.setObject(list);
			jr.setInfo(list==null?"false":"true");
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping(value="addBillInfo",method=RequestMethod.POST)
	@ResponseBody
	public String addBillInfo(BillEntity billEntity,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null) {
				jr.setIsLogin("false");
			}else {
				billEntity.setBillId(UUID.randomUUID().toString());
				billEntity.setUserId(user.getUserId());
				int num = billService.addBillInfo(billEntity);
				jr.setInfo(num==0?"false":"true");
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
}

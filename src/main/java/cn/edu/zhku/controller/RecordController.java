package cn.edu.zhku.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

import cn.edu.zhku.pojo.CourseRecordEntity;
import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.PagesEntity;
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
	
	@SuppressWarnings("finally")
	@RequestMapping(value="showRecordPage",method=RequestMethod.POST)
	@ResponseBody
	public String showRecordPage(String currentPage,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			if(currentPage==null || "".equals(currentPage.trim())) {
				jr.setInfo("false");
			}else {
				int currentPageJ = Integer.parseInt(currentPage);
				if(currentPageJ<=0) {
					currentPageJ = 1;
				}
				UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
				if(user==null) {
					jr.setInfo("false");
				}else {
					String userId = user.getUserId();
					PagesEntity pageEntity = new PagesEntity();
					int start = (currentPageJ-1)*PagesEntity.pageSize;
					int pagesize = pageEntity.pageSize;
					pageEntity.setCurrentPage(currentPageJ);
					if(currentPageJ==1) {
						pageEntity.setTotalNum(recordService.userRecordTotalNum(userId));//总记录数
						//总页数
						if(PagesEntity.totalNum % PagesEntity.pageSize == 0) {
							pageEntity.setPageTotal(PagesEntity.totalNum / PagesEntity.pageSize);
						}else{
							pageEntity.setPageTotal((PagesEntity.totalNum / PagesEntity.pageSize) + 1);
						}
					}
					Map<String,Object> map = new HashMap<String,Object>();
					map.put("userId", userId);
					map.put("start", start);
					map.put("pagesize", pagesize);
					ArrayList<CourseRecordEntity> list = recordService.selectUserAllRecordPage(map);
					pageEntity.setObject(list);
					jr.setObject(pageEntity);
					jr.setInfo("true");
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
	@RequestMapping(value="deleteRecord",method=RequestMethod.POST)
	@ResponseBody
	public String deleteRecord(String recordId,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null || recordId == null || "".equals(recordId.trim())) {
				jr.setIsLogin("false");
			}else {
				int num = recordService.deleteRecoreInfo(recordId);
				if(num>0) {
					jr.setInfo("true");
				}else {
					jr.setInfo("false");
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
	@RequestMapping(value="showRecordDetail",method=RequestMethod.POST)
	@ResponseBody
	public String showRecordDetail(String recordId,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null || recordId==null || "".equals(recordId.trim())) {
				jr.setIsLogin("false");
			}else {
				CourseRecordEntity record = recordService.selectOne(recordId);
				if(record==null) {
					jr.setInfo("false");
				}else {
					jr.setInfo("true");
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					record.setStrTime(sdf.format(record.getCourseRecordDate()));//存入转换后的时间字符 方便前端展示
					record.getCourseRecordDate();
					jr.setObject(record);
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
	@RequestMapping(value="updateRecord",method=RequestMethod.POST)
	@ResponseBody
	public String updateRecord(CourseRecordEntity recordEntity,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(recordEntity==null || user==null || "".equals(recordEntity.getCourseId().trim())) {
				jr.setIsLogin("false");
			}else {
				int num = recordService.updateRecoreInfo(recordEntity);
				if(num<=0) {
					jr.setInfo("false");
				}else {
					jr.setInfo("true");
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

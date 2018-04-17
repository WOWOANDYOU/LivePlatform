package cn.edu.zhku.controller;

import java.text.SimpleDateFormat;
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

import cn.edu.zhku.pojo.CourseRecordEntity;
import cn.edu.zhku.pojo.CourseYearAnaEntity;
import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.PagesEntity;
import cn.edu.zhku.pojo.RecordLevelEntity;
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
	
	@RequestMapping("analyzeRecordUI")
	public String analyzeRecordUI(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if(user!=null){
			return "analyzeRecord";
		}else {
			return "signinup";
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping(value="analyzeYearRecord",method=RequestMethod.POST)
	@ResponseBody
	public String analyzeYearRecord(HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		try {
			if(user!=null){
				//获取 该用户 4个学年 文科 理科 必修 选修 的数据 
				ArrayList<CourseYearAnaEntity> listPhyArt = recordService.selectYearPhyArt(user.getUserId());
				ArrayList<CourseYearAnaEntity> listMajor = recordService.selectYearMajor(user.getUserId());
				ArrayList<CourseYearAnaEntity> listReturn = new ArrayList<CourseYearAnaEntity>();
				CourseYearAnaEntity c1 = new CourseYearAnaEntity();
				c1.setCourseYearNum(1);
				CourseYearAnaEntity c2 = new CourseYearAnaEntity();
				c2.setCourseYearNum(2);
				CourseYearAnaEntity c3 = new CourseYearAnaEntity();
				c3.setCourseYearNum(3);
				CourseYearAnaEntity c4 = new CourseYearAnaEntity();
				c4.setCourseYearNum(4);
				int num,record;
				for(CourseYearAnaEntity c:listPhyArt) {
					num = c.getCourseYearNum();
					record = c.getPhyArtTotalRecord();
					if(num==1) {
						if(c.getCoursePhyArtCateName().equals("文科类")) {
							c1.setArtTotalRecord(record);
						}else {
							c1.setPhyTotalRecord(record);
						}
					}else if(num == 2) {
						if(c.getCoursePhyArtCateName().equals("文科类")) {
							c2.setArtTotalRecord(record);
						}else {
							c2.setPhyTotalRecord(record);
						}
					}else if(num==3) {
						if(c.getCoursePhyArtCateName().equals("文科类")) {
							c3.setArtTotalRecord(record);
						}else {
							c3.setPhyTotalRecord(record);
						}
					}else {
						if(c.getCoursePhyArtCateName().equals("文科类")) {
							c4.setArtTotalRecord(record);
						}else {
							c4.setPhyTotalRecord(record);
						}
					}
				}
				
				for(CourseYearAnaEntity c:listMajor) {
					num = c.getCourseYearNum();
					record = c.getMajorTotalRecord();
					if(num==1) {
						if(c.getCourseMajorCateName().equals("必修类")) {
							c1.setMainMajorRecord(record);
						}else {
							c1.setSelectMajorRecord(record);
						}
					}else if(num == 2) {
						if(c.getCourseMajorCateName().equals("必修类")) {
							c2.setMainMajorRecord(record);
						}else {
							c2.setSelectMajorRecord(record);
						}
					}else if(num==3) {
						if(c.getCourseMajorCateName().equals("必修类")) {
							c3.setMainMajorRecord(record);
						}else {
							c3.setSelectMajorRecord(record);
						}
					}else {
						if(c.getCourseMajorCateName().equals("必修类")) {
							c4.setMainMajorRecord(record);
						}else {
							c4.setSelectMajorRecord(record);
						}
					}
				}
				listReturn.add(c1);
				listReturn.add(c2);
				listReturn.add(c3);
				listReturn.add(c4);
				jr.setObject(listReturn);
				jr.setInfo("true");
			}else {
				jr.setIsLogin("false");
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	@SuppressWarnings("finally")
	@RequestMapping(value="analyYearLevel",method=RequestMethod.POST)
	@ResponseBody
	public String analyYearLevel(String yearNum,String majorType,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		try {
			if(user==null) {
				jr.setIsLogin("false");
			}else {
				if((yearNum==null || "".equals(yearNum.trim())) || (majorType==null || "".equals(majorType.trim()))) {
					jr.setInfo("false");
				}else {
					Map<String,Object> map = new HashMap<String,Object>();
					Integer year = Integer.parseInt(yearNum);
					map.put("yearNum", year);
					if(majorType.equals("all")) {
						map.put("majorType", null);
					}else {
						map.put("majorType", majorType);
					}
					map.put("userId", user.getUserId());
					RecordLevelEntity rle = recordService.selectRecordLevel(map);
					jr.setInfo("true");
					jr.setObject(rle);
				}
			}
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
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

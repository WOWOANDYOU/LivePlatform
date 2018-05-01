package cn.edu.zhku.controller;

import java.io.File;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.BillEntity;
import cn.edu.zhku.pojo.GoodEntity;
import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.PagesEntity;
import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.UnusedService;

@Controller
@RequestMapping("/unused")
public class UnusedController {
	@Autowired
	private UnusedService unUsedService;

	@RequestMapping("unusedMarketUI")
	public String unusedMarketUI() {
		return "unusedMarket";
	}

	@RequestMapping("myUnusedUI")
	public String myUnusedUI(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if (user == null) {
			return "signinup";
		} else {
			return "myUnused";
		}
	}

	@SuppressWarnings("finally")
	@RequestMapping(value = "addGoodInfo", method = RequestMethod.POST)
	@ResponseBody
	public String addGoodInfo(GoodEntity good, @RequestParam MultipartFile[] file, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if (user == null) {
				jr.setIsLogin("false");
			} else {
				good.setGoodUserId(user.getUserId());
				good.setGoodId(UUID.randomUUID().toString());
				if (file != null && file.length != 0) {
					String type[] = new String[file.length];
					;// 文件类型
					String fileName[] = new String[file.length];
					for (int i = 0; i < fileName.length; i++) {
						fileName[i] = file[i].getOriginalFilename();
						type[i] = fileName[i].indexOf(".") != -1
								? fileName[i].substring(fileName[i].lastIndexOf(".") + 1, fileName[i].length())
								: null;
					}
					String realPath = "E:\\java2018\\images\\";
					String realImgPath[] = new String[file.length];
					String picPath = "";
					for (int i = 0; i < file.length; i++) {
						String uuid = UUID.randomUUID().toString();
						realImgPath[i] = realPath + uuid + "." + type[i];
						picPath += realImgPath[i] + ",";
					}
					picPath = picPath.substring(0, picPath.length() - 1);
					good.setGoodImgPath(picPath);
					for (int i = 0; i < file.length; i++) {
						file[i].transferTo(new File(realImgPath[i]));
					}
				} else {
					good.setGoodImgPath("none");
				}

				int num = unUsedService.addGoodInfo(good);
				jr.setInfo(num > 0 ? "true" : "false");
			}
		} catch (Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		} finally {
			return JSON.toJSONString(jr);
		}
	}

	@SuppressWarnings("finally")
	@RequestMapping(value = "findMyGoodInfo", method = RequestMethod.POST)
	@ResponseBody
	public String findMyGoodInfo(String currentPage, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if (user == null) {
				jr.setIsLogin("false");
			} else {
				int currentPageJ = Integer.parseInt(currentPage);
				if (currentPageJ <= 0) {
					currentPageJ = 1;
				}
				String userId = user.getUserId();
				PagesEntity pageEntity = new PagesEntity();
				int start = (currentPageJ - 1) * PagesEntity.pageSize;
				int pagesize = pageEntity.pageSize;
				pageEntity.setCurrentPage(currentPageJ);
				if (currentPageJ == 1) {
					pageEntity.setTotalNum(unUsedService.userGoodInfoTotalNum(userId));// 总记录数
					// 总页数
					pageEntity.setPageTotal(PagesEntity.totalNum % PagesEntity.pageSize == 0
							? (PagesEntity.totalNum / PagesEntity.pageSize)
							: ((PagesEntity.totalNum / PagesEntity.pageSize) + 1));
					/*
					 * if(PagesEntity.totalNum % PagesEntity.pageSize == 0) {
					 * pageEntity.setPageTotal(PagesEntity.totalNum / PagesEntity.pageSize); }else{
					 * pageEntity.setPageTotal((PagesEntity.totalNum / PagesEntity.pageSize) + 1); }
					 */
				}
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("userId", userId);
				map.put("start", start);
				map.put("pagesize", pagesize);
				ArrayList<GoodEntity> list = unUsedService.selectPageGoodInfo(map);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				for (GoodEntity good : list) {
					good.setStrTime(sdf.format(good.getGoodUpTime()));
				}
				pageEntity.setObject(list);
				jr.setObject(pageEntity);
				jr.setInfo("true");
			}
		} catch (Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		} finally {
			return JSON.toJSONString(jr);
		}
	}
}

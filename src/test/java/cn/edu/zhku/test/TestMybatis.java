package cn.edu.zhku.test;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.CourseYearAnaEntity;
import cn.edu.zhku.pojo.RecordLevelEntity;
import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.RecordService;
import cn.edu.zhku.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations= {"classpath:spring/applicationContext-*.xml"})
public class TestMybatis {
	@Autowired
	private UserService userService;
	@Autowired
	private RecordService recordService;
	
	
	private JavaMailSenderImpl senderImpl;
	private SimpleMailMessage mailMessage;
	
	
	@Test
	public void testUserSelect() {
		ArrayList<UserEntity> list = userService.selectAllUser();
		double d = Math.random();
		double a = d * 10;
		Integer x =(int)((Math.random()*10+1)*100000);
		System.out.println(x.toString()+" "+d+" "+a);
		for(UserEntity userEntity:list) {
		}
	}
	
	@Test
	public void testUserInsert() {
		UserEntity user = new UserEntity();
		user.setUserId(UUID.randomUUID().toString());
		user.setUserName("文涛");
		user.setUserPassword("123123");
		user.setUserEmail("2515466407@qq.com");
		user.setUserGender("男");
		user.setUserUniversityName("清华大学");
		user.setUserMajor("计算机系");
		user.setUserClassNum("计算机142班");
		user.setUserPhotoPath("test");
		user.setUserGrade("14级");
		user.setUserRegisterTime(new Timestamp(new Date().getTime()));
		user.setUserRecentInTime(new Timestamp(new Date().getTime()));
		
		int num = userService.addUser(user);
		if(num>0) {
			
		}
	}
	@Test
	public void testSelectNum() {
		System.out.println(recordService.userRecordTotalNum("061ef367-3e27-4fa1-bace-b6156057cfff"));
	}
	@Test
	public void testSelectPage() {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("start", 0);
		map.put("pagesize", 8);
		map.put("userId", "171ea60d-f99f-4be3-84aa-eb3ff83c1f54");
		ArrayList list = recordService.selectUserAllRecordPage(map);
		System.out.println(list.toString());
	}
	@Test
	public void testSelectYearAna() {
		try {
			ArrayList<CourseYearAnaEntity> listPhyArt = recordService.selectYearPhyArt("171ea60d-f99f-4be3-84aa-eb3ff83c1f54");
			ArrayList<CourseYearAnaEntity> listMajor = recordService.selectYearMajor("171ea60d-f99f-4be3-84aa-eb3ff83c1f54");
			System.out.println("haha");
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testSelectYearAna2() {
		try {
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("userId", "171ea60d-f99f-4be3-84aa-eb3ff83c1f54");
			map.put("yearNum", 1);
			map.put("majorType", null);
			RecordLevelEntity rle = recordService.selectRecordLevel(map);
			System.out.println("haha");
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	@Test
	public void testhaha() {
		RecordLevelEntity r = new RecordLevelEntity();
		r.setaLevel(1.834f);
		r.setbLevel(0.88f);
		System.out.println(JSON.toJSONString(r));
	}
}

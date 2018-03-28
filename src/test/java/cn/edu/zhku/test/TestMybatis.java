package cn.edu.zhku.test;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations= {"classpath:spring/applicationContext-*.xml"})
public class TestMybatis {
	@Autowired
	private UserService userService;
	
	@Test
	public void testUserSelect() {
		ArrayList<UserEntity> list = userService.selectAllUser();
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
}

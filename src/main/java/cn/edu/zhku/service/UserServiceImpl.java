package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.UserMapper;
import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.util.MailUtil;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public int addUser(UserEntity userEntity) {
		Timestamp time = new Timestamp(new Date().getTime());
		userEntity.setUserRegisterTime(time);
		userEntity.setUserRecentInTime(time);
		
		return userMapper.addUser(userEntity);
	}

	@Override
	public UserEntity selectOne(UserEntity userEntity) {
		return userMapper.seleceOne(userEntity);
	}

	@Override
	public ArrayList<UserEntity> selectAllUser() {
		return userMapper.selectAllUser();
	}

	@Override
	public int deleteUser(String userId) {
		return userMapper.deleteUser(userId);
	}

	@Override
	public int updateUser(UserEntity userEntity) {
		return userMapper.updateUser(userEntity);
	}

	@Override
	public String sendMail(String to) {
		MailUtil mailUtil = new MailUtil();
		//随机生成6验证码
        Integer x =(int)((Math.random()*9+1)*100000);  
        String text = x.toString(); 
        if(mailUtil.sendMail(to, text)) {
        	return text;
        }else {
        	return null;
        }
	}

	@SuppressWarnings("unlikely-arg-type")
	@Override
	public Integer checkCode(String emailCode, String originMailTime) {
		//private Integer megInfo;//-1 表示验证码错误  -2表示验证码超时   1表示验证码正确
		String [] mailTime = originMailTime.split("#");
		if(mailTime.equals(emailCode)) {
			String time = mailTime[1];
			long oringTime = Long.parseLong(time);
			long nowTime = new Date().getTime();
			// 2分钟 有效
			if(nowTime-oringTime > 1000*60*2) {
				return -2;//-2表示验证码超时
			}else {
				return 1;//1表示验证码正确 且在有效时间内
			}
		}else {
			return -1;//-1 表示验证码错误
		}
	}
}

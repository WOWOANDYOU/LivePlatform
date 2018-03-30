package cn.edu.zhku.service;


import java.util.ArrayList;

import cn.edu.zhku.pojo.UserEntity;

public interface UserService {
	public int addUser(UserEntity userEntity);
	
	public UserEntity selectOne(UserEntity userEntity);
	
	public ArrayList<UserEntity> selectAllUser();
	
	public int deleteUser(String userId);
	
	public int updateUser(UserEntity userEntity);
	
	public String sendMail(String to);//发送验证码
	
	public Integer checkCode(String emailCode,String originMailTime); 
}

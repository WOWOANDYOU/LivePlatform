package cn.edu.zhku.mapper;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.UserEntity;

public interface UserMapper {
	public int addUser(UserEntity userEntity);
	
	public int deleteUser(String userId);
	
	public int updateUser(UserEntity userEntity);
	
	public ArrayList<UserEntity> selectAllUser();
	
	public UserEntity seleceOne(UserEntity userEntity);

	public int updateSigninTime(Map<String, Object> map);

	public int updateLogOutTime(Map<String, Object> map);
}

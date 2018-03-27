package cn.edu.zhku.mapper;

import java.util.ArrayList;

import cn.edu.zhku.pojo.UserEntity;

public interface UserMapper {
	public int addUser(UserEntity userEntity);
	
	public int deleteUser(String userId);
	
	public int updateUser(UserEntity userEntity);
	
	public ArrayList<UserEntity> selectAllUser();
	
	public UserEntity seleceOne(UserEntity userEntity);
}

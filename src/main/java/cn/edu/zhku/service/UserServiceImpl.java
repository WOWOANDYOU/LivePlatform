package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.UserMapper;
import cn.edu.zhku.pojo.UserEntity;

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

}

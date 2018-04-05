package cn.edu.zhku.mapper;

import java.util.ArrayList;

import cn.edu.zhku.pojo.CourseRecordEntity;

public interface RecordMapper {
	public int addRecordInfo(CourseRecordEntity recordInfo);
	
	public int deleteRecoreInfo(String courseId);
	
	public CourseRecordEntity selectOne(CourseRecordEntity recordInfo);
	
	//查询 所有用户的所有记录
	public ArrayList<CourseRecordEntity> selectAllRecord();
	
	//查询单个用户所有记录
	public ArrayList<CourseRecordEntity> selectUserAllRecord(String courseRecordUserId);
	
	public int updateRecoreInfo(CourseRecordEntity recordInfo);
}

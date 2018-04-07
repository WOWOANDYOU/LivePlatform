package cn.edu.zhku.service;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.CourseRecordEntity;

public interface RecordService {
public int addRecordInfo(CourseRecordEntity recordInfo);
	
	public int deleteRecoreInfo(String courseId);
	
	public CourseRecordEntity selectOne(String recordId);
	
	//查询 所有用户的所有记录
	public ArrayList<CourseRecordEntity> selectAllRecordPage(Map map);
	
	//分页查询单个用户所有记录
	public ArrayList<CourseRecordEntity> selectUserAllRecordPage(Map map);
	
	public int updateRecoreInfo(CourseRecordEntity recordInfo);
	
	//查询 用户成绩总记录数
	public int userRecordTotalNum(String userId);

}

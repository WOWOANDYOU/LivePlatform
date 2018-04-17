package cn.edu.zhku.service;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.CourseRecordEntity;
import cn.edu.zhku.pojo.CourseYearAnaEntity;
import cn.edu.zhku.pojo.RecordLevelEntity;

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
	
	//查询 学年 文理数据
	public ArrayList<CourseYearAnaEntity> selectYearPhyArt(String userId);
	
	//查询 学年 必修 选修数据
	public ArrayList<CourseYearAnaEntity> selectYearMajor(String userId);

	public RecordLevelEntity selectRecordLevel(Map<String, Object> map);
}

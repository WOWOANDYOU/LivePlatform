package cn.edu.zhku.mapper;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.CourseRecordEntity;

public interface RecordMapper {
	public int addRecordInfo(CourseRecordEntity recordInfo);
	
	public int deleteRecoreInfo(String courseId);
	
	public CourseRecordEntity selectOne(CourseRecordEntity recordInfo);
	
	//查询 所有用户的所有记录
	public ArrayList<CourseRecordEntity> selectAllRecord(Map map);
	
	//分页查询单个用户所有记录
	public ArrayList<CourseRecordEntity> selectUserAllRecordPage(Map map);
	
	public int updateRecoreInfo(CourseRecordEntity recordInfo);

	public int userRecordTotalNum(String userId);
	
	//分页查询
}

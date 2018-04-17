package cn.edu.zhku.mapper;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.CourseRecordEntity;
import cn.edu.zhku.pojo.CourseYearAnaEntity;
import cn.edu.zhku.pojo.RecordLevelEntity;

public interface RecordMapper {
	public int addRecordInfo(CourseRecordEntity recordInfo);
	
	public int deleteRecoreInfo(String courseId);
	
	public CourseRecordEntity selectOne(String courseId);
	
	//查询 所有用户的所有记录
	public ArrayList<CourseRecordEntity> selectAllRecord(Map map);
	
	//分页查询单个用户所有记录
	public ArrayList<CourseRecordEntity> selectUserAllRecordPage(Map map);
	
	public int updateRecoreInfo(CourseRecordEntity recordInfo);

	public int userRecordTotalNum(String userId);

	public ArrayList<CourseYearAnaEntity> selectYearPhyArtM(String userId);

	public ArrayList<CourseYearAnaEntity> selectYearMajorM(String userId);

	//查询 成绩等级比例
	public RecordLevelEntity selectRecordLevel(Map<String, Object> map);
	
	//分页查询
}

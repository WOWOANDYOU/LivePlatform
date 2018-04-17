package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.RecordMapper;
import cn.edu.zhku.pojo.CourseRecordEntity;
import cn.edu.zhku.pojo.CourseYearAnaEntity;
import cn.edu.zhku.pojo.RecordLevelEntity;
@Service
public class RecordServiceImpl implements RecordService {
	@Autowired
	private RecordMapper recordMapper;
	
	@Override
	public int addRecordInfo(CourseRecordEntity recordInfo) {
		recordInfo.setCourseRecordDate(new Timestamp(new Date().getTime()));
		String courseTeam = recordInfo.getCourseTermNumStr();
		if(courseTeam.equals("第一学期") || courseTeam.equals("第二学期")) {
			recordInfo.setCourseYearNum(1);
		}else if(courseTeam.equals("第三学期") || courseTeam.equals("第四学期")) {
			recordInfo.setCourseYearNum(2);
		}else if(courseTeam.equals("第五学期") || courseTeam.equals("第六学期")) {
			recordInfo.setCourseYearNum(3);
		}else {
			recordInfo.setCourseYearNum(4);
		}
		return recordMapper.addRecordInfo(recordInfo);
	}

	@Override
	public int deleteRecoreInfo(String courseId) {
		return recordMapper.deleteRecoreInfo(courseId);
	}

	@Override
	public CourseRecordEntity selectOne(String courseId) {
		return recordMapper.selectOne(courseId);
	}

	@Override
	public ArrayList<CourseRecordEntity> selectAllRecordPage(Map map) {
		return null;
	}

	@Override
	public ArrayList<CourseRecordEntity> selectUserAllRecordPage(Map map) {
		return recordMapper.selectUserAllRecordPage(map);
	}

	@Override
	public int updateRecoreInfo(CourseRecordEntity recordInfo) {
		String courseTeam = recordInfo.getCourseTermNumStr();
		if(courseTeam.equals("第一学期") || courseTeam.equals("第二学期")) {
			recordInfo.setCourseYearNum(1);
		}else if(courseTeam.equals("第三学期") || courseTeam.equals("第四学期")) {
			recordInfo.setCourseYearNum(2);
		}else if(courseTeam.equals("第五学期") || courseTeam.equals("第六学期")) {
			recordInfo.setCourseYearNum(3);
		}else {
			recordInfo.setCourseYearNum(4);
		}
		return recordMapper.updateRecoreInfo(recordInfo);
	}

	@Override
	public int userRecordTotalNum(String userId) {
		return recordMapper.userRecordTotalNum(userId);
	}

	@Override
	public ArrayList<CourseYearAnaEntity> selectYearPhyArt(String userId) {
		return recordMapper.selectYearPhyArtM(userId);
	}

	@Override
	public ArrayList<CourseYearAnaEntity> selectYearMajor(String userId) {
		return recordMapper.selectYearMajorM(userId);
	}

	@Override
	public RecordLevelEntity selectRecordLevel(Map<String, Object> map) {
		return recordMapper.selectRecordLevel(map);
	}

}

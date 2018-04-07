package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.RecordMapper;
import cn.edu.zhku.pojo.CourseRecordEntity;
@Service
public class RecordServiceImpl implements RecordService {
	@Autowired
	private RecordMapper recordMapper;
	
	@Override
	public int addRecordInfo(CourseRecordEntity recordInfo) {
		recordInfo.setCourseRecordDate(new Timestamp(new Date().getTime()));
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
		return recordMapper.updateRecoreInfo(recordInfo);
	}

	@Override
	public int userRecordTotalNum(String userId) {
		return recordMapper.userRecordTotalNum(userId);
	}

}

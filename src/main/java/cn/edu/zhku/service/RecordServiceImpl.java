package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

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
	public CourseRecordEntity selectOne(CourseRecordEntity recordInfo) {
		return recordMapper.selectOne(recordInfo);
	}

	@Override
	public ArrayList<CourseRecordEntity> selectAllRecord() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<CourseRecordEntity> selectUserAllRecord(String courseRecordUserId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateRecoreInfo(CourseRecordEntity recordInfo) {
		return recordMapper.updateRecoreInfo(recordInfo);
	}

}

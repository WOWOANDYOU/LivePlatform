package cn.edu.zhku.pojo;

import java.util.Date;
//成绩表
public class CourseRecordEntity {
	private String courseId;
	private String courseName;
	private Integer courseRecord;
	private Integer coursePhyArtCate;
	private Integer courseMajorCate;
	private Date courseRecordDate;
	private String courseRecordUserId;
	public String getCourseId() {
		return courseId;
	}
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public Integer getCourseRecord() {
		return courseRecord;
	}
	public void setCourseRecord(Integer courseRecord) {
		this.courseRecord = courseRecord;
	}
	public Integer getCoursePhyArtCate() {
		return coursePhyArtCate;
	}
	public void setCoursePhyArtCate(Integer coursePhyArtCate) {
		this.coursePhyArtCate = coursePhyArtCate;
	}
	public Integer getCourseMajorCate() {
		return courseMajorCate;
	}
	public void setCourseMajorCate(Integer courseMajorCate) {
		this.courseMajorCate = courseMajorCate;
	}
	public Date getCourseRecordDate() {
		return courseRecordDate;
	}
	public void setCourseRecordDate(Date courseRecordDate) {
		this.courseRecordDate = courseRecordDate;
	}
	public String getCourseRecordUserId() {
		return courseRecordUserId;
	}
	public void setCourseRecordUserId(String courseRecordUserId) {
		this.courseRecordUserId = courseRecordUserId;
	}
	
}	

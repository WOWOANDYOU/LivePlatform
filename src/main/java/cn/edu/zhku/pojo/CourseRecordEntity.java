package cn.edu.zhku.pojo;

import java.util.Date;
//成绩表
public class CourseRecordEntity {
	private String courseId;
	private String courseName;
	private Integer courseRecord;
	private String coursePhyArtCateName;
	private String courseMajorCateName;
	private Date courseRecordDate;
	private String courseRecordUserId;
	private String courseTermNumStr;
	
	public String getCourseTermNumStr() {
		return courseTermNumStr;
	}
	public void setCourseTermNumStr(String courseTermNumStr) {
		this.courseTermNumStr = courseTermNumStr;
	}
	public String getCoursePhyArtCateName() {
		return coursePhyArtCateName;
	}
	public void setCoursePhyArtCateName(String coursePhyArtCateName) {
		this.coursePhyArtCateName = coursePhyArtCateName;
	}
	public String getCourseMajorCateName() {
		return courseMajorCateName;
	}
	public void setCourseMajorCateName(String courseMajorCateName) {
		this.courseMajorCateName = courseMajorCateName;
	}
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

package cn.edu.zhku.pojo;
//统计 学年 文理科 必修 选修 数据
public class CourseYearAnaEntity {
	private Integer courseYearNum;
	private String coursePhyArtCateName;
	private String courseMajorCateName;
	private Integer phyArtTotalRecord;
	private Integer majorTotalRecord;
	
	//后台拆分数据
	private Integer phyTotalRecord; //理科成绩
	private Integer artTotalRecord;//文科成绩
	private Integer selectMajorRecord;//选修 成绩
	private Integer mainMajorRecord;//必修成绩
	
	public CourseYearAnaEntity() {
		this.phyTotalRecord = 0;
		this.artTotalRecord = 0;
		this.selectMajorRecord = 0;
		this.mainMajorRecord = 0;
	}
	public Integer getPhyTotalRecord() {
		return phyTotalRecord;
	}
	public void setPhyTotalRecord(Integer phyTotalRecord) {
		this.phyTotalRecord = phyTotalRecord;
	}
	public Integer getArtTotalRecord() {
		return artTotalRecord;
	}
	public void setArtTotalRecord(Integer artTotalRecord) {
		this.artTotalRecord = artTotalRecord;
	}
	public Integer getSelectMajorRecord() {
		return selectMajorRecord;
	}
	public void setSelectMajorRecord(Integer selectMajorRecord) {
		this.selectMajorRecord = selectMajorRecord;
	}
	public Integer getMainMajorRecord() {
		return mainMajorRecord;
	}
	public void setMainMajorRecord(Integer mainMajorRecord) {
		this.mainMajorRecord = mainMajorRecord;
	}
	
	public Integer getCourseYearNum() {
		return courseYearNum;
	}
	public void setCourseYearNum(Integer courseYearNum) {
		this.courseYearNum = courseYearNum;
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
	public Integer getPhyArtTotalRecord() {
		return phyArtTotalRecord;
	}
	public void setPhyArtTotalRecord(Integer phyArtTotalRecord) {
		this.phyArtTotalRecord = phyArtTotalRecord;
	}
	public Integer getMajorTotalRecord() {
		return majorTotalRecord;
	}
	public void setMajorTotalRecord(Integer majorTotalRecord) {
		this.majorTotalRecord = majorTotalRecord;
	}
	
}

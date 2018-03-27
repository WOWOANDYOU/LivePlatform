package cn.edu.zhku.pojo;

import java.util.Date;

public class UserEntity {
	private String userId;
	private String userName;
	private String userPassword;
	private String userEmail;
	private String userGender;
	private String userUniversityName;
	private String UserMajor;//专业名
	private String userGrade;//年级
	private String userClassNum;//班级名
	private String userPhotoPath;//用户头像路径
	private Date userRegisterTime;
	private Date userRecentInTime;//最近登录时间
	private Date userRecentOutTime;//最近登出时间
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserGender() {
		return userGender;
	}
	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}
	public String getUserUniversityName() {
		return userUniversityName;
	}
	public void setUserUniversityName(String userUniversityName) {
		this.userUniversityName = userUniversityName;
	}
	public String getUserMajor() {
		return UserMajor;
	}
	public void setUserMajor(String userMajor) {
		UserMajor = userMajor;
	}
	public String getUserGrade() {
		return userGrade;
	}
	public void setUserGrade(String userGrade) {
		this.userGrade = userGrade;
	}
	public String getUserClassNum() {
		return userClassNum;
	}
	public void setUserClassNum(String userClassNum) {
		this.userClassNum = userClassNum;
	}
	public String getUserPhotoPath() {
		return userPhotoPath;
	}
	public void setUserPhotoPath(String userPhotoPath) {
		this.userPhotoPath = userPhotoPath;
	}
	public Date getUserRegisterTime() {
		return userRegisterTime;
	}
	public void setUserRegisterTime(Date userRegisterTime) {
		this.userRegisterTime = userRegisterTime;
	}
	public Date getUserRecentInTime() {
		return userRecentInTime;
	}
	public void setUserRecentInTime(Date userRecentInTime) {
		this.userRecentInTime = userRecentInTime;
	}
	public Date getUserRecentOutTime() {
		return userRecentOutTime;
	}
	public void setUserRecentOutTime(Date userRecentOutTime) {
		this.userRecentOutTime = userRecentOutTime;
	}
	
	
}

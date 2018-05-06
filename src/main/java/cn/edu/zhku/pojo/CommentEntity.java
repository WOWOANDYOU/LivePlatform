package cn.edu.zhku.pojo;

import java.util.Date;

//评论pojo
public class CommentEntity {
	private String commentId;
	private String commentContent;
	private String commentGoodId;
	private String commentFromUserId;//发起评论的人的id
	private String commentFromUserName;
	private String commentFromUserPhotoPath;
	private String commentToUserId;//接受评论的人的id
	private String commentToUserName;
	private String commentToUserPhotoPath;
	private Date commentTime;
	private String strTime;
	private Integer commentState;
	public Integer getCommentState() {
		return commentState;
	}
	public void setCommentState(Integer commentState) {
		this.commentState = commentState;
	}
	public String getCommentFromUserName() {
		return commentFromUserName;
	}
	public void setCommentFromUserName(String commentFromUserName) {
		this.commentFromUserName = commentFromUserName;
	}
	public String getCommentFromUserPhotoPath() {
		return commentFromUserPhotoPath;
	}
	public void setCommentFromUserPhotoPath(String commentFromUserPhotoPath) {
		this.commentFromUserPhotoPath = commentFromUserPhotoPath;
	}
	public String getCommentToUserName() {
		return commentToUserName;
	}
	public void setCommentToUserName(String commentToUserName) {
		this.commentToUserName = commentToUserName;
	}
	public String getCommentToUserPhotoPath() {
		return commentToUserPhotoPath;
	}
	public void setCommentToUserPhotoPath(String commentToUserPhotoPath) {
		this.commentToUserPhotoPath = commentToUserPhotoPath;
	}
	public String getStrTime() {
		return strTime;
	}
	public void setStrTime(String strTime) {
		this.strTime = strTime;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public String getCommentContent() {
		return commentContent;
	}
	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}
	public String getCommentGoodId() {
		return commentGoodId;
	}
	public void setCommentGoodId(String commentGoodId) {
		this.commentGoodId = commentGoodId;
	}
	public String getCommentFromUserId() {
		return commentFromUserId;
	}
	public void setCommentFromUserId(String commentFromUserId) {
		this.commentFromUserId = commentFromUserId;
	}
	public String getCommentToUserId() {
		return commentToUserId;
	}
	public void setCommentToUserId(String commentToUserId) {
		this.commentToUserId = commentToUserId;
	}
	public Date getCommentTime() {
		return commentTime;
	}
	public void setCommentTime(Date commentTime) {
		this.commentTime = commentTime;
	}
	
}

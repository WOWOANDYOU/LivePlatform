package cn.edu.zhku.pojo;

import java.util.Date;

//评论pojo
public class Comment {
	private String commentId;
	private String commentContent;
	private String commentGoodId;
	private String commentFromUserId;//发起评论的人的id
	private String commentToUserId;//接受评论的人的id
	private Date commentTime;
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

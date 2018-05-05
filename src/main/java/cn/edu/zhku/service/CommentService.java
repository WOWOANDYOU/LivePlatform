package cn.edu.zhku.service;

import java.util.ArrayList;

import cn.edu.zhku.pojo.CommentEntity;

public interface CommentService {
	public int addCommentInfo(CommentEntity comment);
	
	public ArrayList<CommentEntity> selectComment(String goodId);
	
	public CommentEntity selectCommentByPrimaryKey(String commentId);

	public ArrayList<CommentEntity> selectCommentByToUserId(String userId);
}

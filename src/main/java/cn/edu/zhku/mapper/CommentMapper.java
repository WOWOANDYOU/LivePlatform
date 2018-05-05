package cn.edu.zhku.mapper;

import java.util.ArrayList;

import cn.edu.zhku.pojo.CommentEntity;

public interface CommentMapper {
	int addCommentInfo(CommentEntity comment);

	ArrayList<CommentEntity> selectComment(String goodId);

	CommentEntity selectCommentByPrimaryKey(String commentId);

	ArrayList<CommentEntity> selectCommentByToUserId(String userId);
}

package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.CommentMapper;
import cn.edu.zhku.pojo.CommentEntity;
@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentMapper commentMapper;
	
	@Override
	public int addCommentInfo(CommentEntity comment) {
		Timestamp time = new Timestamp(new Date().getTime());
		comment.setCommentTime(time);
		return commentMapper.addCommentInfo(comment);
	}

	@Override
	public ArrayList<CommentEntity> selectComment(String goodId) {
		return commentMapper.selectComment(goodId);
	}

	@Override
	public CommentEntity selectCommentByPrimaryKey(String commentId) {
		return commentMapper.selectCommentByPrimaryKey(commentId);
	}

	@Override
	public ArrayList<CommentEntity> selectCommentByToUserId(String userId) {
		return commentMapper.selectCommentByToUserId(userId);
	}

}

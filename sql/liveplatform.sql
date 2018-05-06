/*
Navicat MySQL Data Transfer

Source Server         : mysql5.7
Source Server Version : 50720
Source Host           : 127.0.0.1:3306
Source Database       : liveplatform

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-06 21:36:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_bill
-- ----------------------------
DROP TABLE IF EXISTS `t_bill`;
CREATE TABLE `t_bill` (
  `bill_id` varchar(36) NOT NULL COMMENT '账单主键 UUID',
  `bill_amount` float(11,2) DEFAULT NULL COMMENT '金额',
  `bill_date` timestamp NULL DEFAULT NULL,
  `bill_comment` text COMMENT '账单备注',
  `spend_cate_id` varchar(36) DEFAULT NULL COMMENT '消费账单类别名id',
  `income_cate_id` varchar(36) DEFAULT NULL COMMENT '收入账单类别名id',
  `user_id` varchar(36) NOT NULL,
  `cate_num` int(5) DEFAULT NULL COMMENT '-1 表示该记录是消费，1 表示该记录是收入',
  PRIMARY KEY (`bill_id`),
  KEY `user_id` (`user_id`),
  KEY `spend_cate_id` (`spend_cate_id`),
  KEY `t_bill_ibfk_3` (`income_cate_id`),
  CONSTRAINT `t_bill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_bill_ibfk_2` FOREIGN KEY (`spend_cate_id`) REFERENCES `t_spend_cate` (`spend_cate_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_bill_ibfk_3` FOREIGN KEY (`income_cate_id`) REFERENCES `t_income_cate` (`income_cate_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账单表';

-- ----------------------------
-- Table structure for t_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_comment`;
CREATE TABLE `t_comment` (
  `comment_id` varchar(36) NOT NULL,
  `comment_content` text,
  `comment_good_id` varchar(36) DEFAULT NULL COMMENT '该评论是挂在哪个商品下面的',
  `comment_from_user_id` varchar(36) DEFAULT NULL COMMENT '发起评论的人的id',
  `comment_to_user_id` varchar(36) DEFAULT NULL COMMENT '接受评论的人的id',
  `comment_time` datetime DEFAULT NULL COMMENT '评论时间',
  `comment_state` int(11) DEFAULT '0' COMMENT '阅读状态 1 表示 已读  0表示 未读',
  PRIMARY KEY (`comment_id`),
  KEY `comment_good_id` (`comment_good_id`),
  KEY `comment_from_user_id` (`comment_from_user_id`),
  KEY `comment_to_user_id` (`comment_to_user_id`),
  CONSTRAINT `t_comment_ibfk_1` FOREIGN KEY (`comment_good_id`) REFERENCES `t_good` (`good_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_comment_ibfk_2` FOREIGN KEY (`comment_from_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_comment_ibfk_3` FOREIGN KEY (`comment_to_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_course_record
-- ----------------------------
DROP TABLE IF EXISTS `t_course_record`;
CREATE TABLE `t_course_record` (
  `course_id` varchar(36) NOT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `course_record` int(11) DEFAULT NULL COMMENT '课程分数',
  `course_phy_art_cate_name` varchar(30) DEFAULT NULL COMMENT '0 表示 文科，1 表示理科',
  `course_major_cate_name` varchar(30) DEFAULT NULL COMMENT '0 表示选修，1表示主修',
  `course_record_date` timestamp NULL DEFAULT NULL COMMENT '课程成绩记录时间 系统生成',
  `course_record_user_id` varchar(36) DEFAULT NULL COMMENT '该条记录 所属学生的id',
  `course_term_num_str` varchar(10) DEFAULT NULL COMMENT '科目成绩 对应的学期',
  `course_year_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `course_record_user_id` (`course_record_user_id`),
  CONSTRAINT `t_course_record_ibfk_1` FOREIGN KEY (`course_record_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_good
-- ----------------------------
DROP TABLE IF EXISTS `t_good`;
CREATE TABLE `t_good` (
  `good_id` varchar(36) NOT NULL,
  `good_title` varchar(100) DEFAULT NULL,
  `good_price` float(11,0) DEFAULT NULL,
  `good_up_time` datetime DEFAULT NULL COMMENT '商品上架发布时间',
  `good_user_id` varchar(36) DEFAULT NULL COMMENT '商品所属商家',
  `good_cate` int(11) DEFAULT NULL COMMENT '商品的类别  只有2类 1表示 书籍  0表示 其他生活工具类',
  `good_img_path` text COMMENT '记录图片的硬盘路径',
  `good_content` text,
  PRIMARY KEY (`good_id`),
  KEY `t_good_ibfk_1` (`good_user_id`),
  CONSTRAINT `t_good_ibfk_1` FOREIGN KEY (`good_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_income_cate
-- ----------------------------
DROP TABLE IF EXISTS `t_income_cate`;
CREATE TABLE `t_income_cate` (
  `income_cate_id` varchar(36) NOT NULL,
  `income_cate_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`income_cate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_spend_cate
-- ----------------------------
DROP TABLE IF EXISTS `t_spend_cate`;
CREATE TABLE `t_spend_cate` (
  `spend_cate_id` varchar(36) NOT NULL,
  `spend_cate_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`spend_cate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `user_id` varchar(36) NOT NULL COMMENT '主键由UUID设置',
  `user_name` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_gender` varchar(1) DEFAULT NULL COMMENT '性别',
  `user_university_name` varchar(150) DEFAULT NULL COMMENT '用户大学名称',
  `user_major` varchar(100) DEFAULT NULL COMMENT '专业名称',
  `user_grade` varchar(10) DEFAULT NULL COMMENT '年级',
  `user_class_num` varchar(20) DEFAULT NULL COMMENT '班级名称',
  `user_photo_path` text COMMENT '用户头像路径',
  `user_register_time` datetime DEFAULT NULL COMMENT '用户注册时间',
  `user_recent_in_time` datetime DEFAULT NULL COMMENT '用户最近登录时间',
  `user_recent_out_time` datetime DEFAULT NULL COMMENT '用户最近登出时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

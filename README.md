LivePlatform 大学生生活管理平台

项目需求功能：

1：个人成绩管理。
说明：学生用户可以在该系统中添加考试成绩，记录成绩数据。后台拿到成绩数据，给学生用户做简单的数据分析（具体可表现为用HighCharts图表绘制插件分学期、分科目展示数据图表）。
功能：学生可增删改查 数据。

2：个人生活理财记账。
说明：学生可添加账单信息（消费以及收入信息），然后分账单类	别、时间展示用户账单图表信息。给出简单分析。
功能：学生可增删改查 数据，添加心愿单 心愿单该如何实现呢。

3：闲置市场
说明：学生可以发布二手闲置（但是不能在该系统中交易，可在评论区谈好交易价格、时间以及地点）。
功能：用户可浏览二手市场。可在喜欢的闲置商品中的评论区 表示购买意向，约定交易时间。
此外，用户也可以查看自己发布的 闲置商品（先提交到后台审核，	审核通过后 便可以上架），修改商品信息。可以下架闲置商品。

4：生活娱乐：写个爬虫爬取豆瓣电影数据。展示热门以及冷门电影。这个爬虫应该不好处理，看时间情况，太赶就去掉咯。
说明：用户查看电影 影评以及其他数据 可以点击 “想看” 将电影添加进自己的 收藏列表中。（PS 这个较复杂 时间短可能做不出来。。。）

扩展点：
个人空间（比如：个人日记、个人相册等）
就业职位信息情况的数据展示。
发起话题，参与讨论话题等。

数据库表的设计
数据库（```liveplatform```）
create database liveplatform;
use liveplatform;
```用户表 t_user```
```
CREATE TABLE `t_user` (
`user_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键由UUID设置' ,
`user_name`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`user_password`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`user_email`  varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`user_gender`  varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别' ,
`user_university_name`  varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户大学名称' ,
`user_major`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '专业名称' ,
`user_grade`  varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '年级' ,
`user_class_num`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级名称' ,
`user_photo_path`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像路径' ,
`user_register_time`  datetime NULL DEFAULT NULL COMMENT '用户注册时间' ,
`user_recent_in_time`  datetime NULL DEFAULT NULL COMMENT '用户最近登录时间' ,
`user_recent_out_time`  datetime NULL DEFAULT NULL COMMENT '用户最近登出时间' ,
PRIMARY KEY (`user_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=DYNAMIC
;
```

```消费类别表 t_spend_cate```
```
CREATE TABLE `t_spend_cate` (
`spend_cate_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`spend_cate_name`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`spend_cate_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=DYNAMIC
;
```

```收入类别表 t_income_cate```
```
CREATE TABLE `t_income_cate` (
`income_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`income_name`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`income_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=DYNAMIC
;
```

```账单表 t_bill```
```
CREATE TABLE `t_bill` (
`bill_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账单主键 UUID' ,
`bill_amount`  int(11) NULL DEFAULT NULL COMMENT '金额' ,
`bill_date`  date NULL DEFAULT NULL ,
`bill_comment`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账单备注' ,
`spend_cate_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消费账单类别名id' ,
`income_cate_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收入账单类别名id' ,
`user_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`cate_num`  int(5) NULL DEFAULT NULL COMMENT '-1 表示该记录是消费，1 表示该记录是收入' ,
PRIMARY KEY (`bill_id`),
FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`spend_cate_id`) REFERENCES `t_spend_cate` (`spend_cate_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`income_cate_id`) REFERENCES `t_income_cate` (`income_id`) ON DELETE CASCADE ON UPDATE CASCADE,
INDEX `user_id` (`user_id`) USING BTREE ,
INDEX `spend_cate_id` (`spend_cate_id`) USING BTREE ,
INDEX `income_cate_id` (`income_cate_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='账单表'
ROW_FORMAT=DYNAMIC
;
```

```成绩表 t_course_record```
```
CREATE TABLE `t_course_record` (
`course_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`course_name`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`course_record`  int(11) NULL DEFAULT NULL COMMENT '课程分数' ,
`course_phy_art_cate`  int(11) NULL DEFAULT NULL COMMENT '0 表示 文科类，1 表示理科类' ,
`course_major_cate`  int(11) NULL DEFAULT NULL COMMENT '0 表示选修，1表示主修' ,
`course_record_date`  date NULL DEFAULT NULL COMMENT '课程成绩记录时间 系统生成' ,
`course_record_user_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '该条记录 所属学生的id' ,
PRIMARY KEY (`course_id`),
FOREIGN KEY (`course_record_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
INDEX `course_record_user_id` (`course_record_user_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=DYNAMIC
;

```

```闲置货物商品表 t_good```
```
CREATE TABLE `t_good` (
`good_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`good_name`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`good_price`  int(11) NULL DEFAULT NULL ,
`good_up_time`  datetime NULL DEFAULT NULL COMMENT '商品上架发布时间' ,
`good_number`  int(11) NULL DEFAULT NULL COMMENT '商品库存' ,
`good_user_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品所属商家' ,
`good_cate`  int(11) NULL DEFAULT NULL COMMENT '商品的类别  只有2类 1表示 书籍  0表示 其他生活工具类' ,
`good_img_path`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '记录图片的硬盘路径' ,
PRIMARY KEY (`good_id`),
FOREIGN KEY (`good_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
INDEX `t_good_ibfk_1` (`good_user_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=DYNAMIC
;
```

```评论表 t_comment ```
```
CREATE TABLE `t_comment` (
`comment_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`comment_content`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`comment_good_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '该评论是挂在哪个商品下面的' ,
`comment_from_user_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发起评论的人的id' ,
`comment_to_user_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '接受评论的人的id' ,
`comment_time`  datetime NULL DEFAULT NULL COMMENT '评论时间' ,
PRIMARY KEY (`comment_id`),
FOREIGN KEY (`comment_good_id`) REFERENCES `t_good` (`good_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`comment_from_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`comment_to_user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
INDEX `comment_good_id` (`comment_good_id`) USING BTREE ,
INDEX `comment_from_user_id` (`comment_from_user_id`) USING BTREE ,
INDEX `comment_to_user_id` (`comment_to_user_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=DYNAMIC
;
```

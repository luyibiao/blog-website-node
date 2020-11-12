/*
Navicat MySQL Data Transfer

Source Server         : blog
Source Server Version : 80016
Source Host           : 127.0.0.1:3306
Source Database       : blog-sql

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2020-11-12 18:22:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `label` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `contentdesc` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章简介， 描述',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `watch_num` int(11) NOT NULL DEFAULT '0' COMMENT '观看数',
  `comment_num` int(11) NOT NULL DEFAULT '0' COMMENT '评论数',
  `hot_comments` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否为热评文章',
  `topping` tinyint(4) NOT NULL DEFAULT '0' COMMENT '置顶',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'LINE' COMMENT '文章状态',
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '文章类型， SKILL.技术分享，ESSAY.心情随笔，STUDY.书屋',
  `child_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '文章二级栏目',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('3', '测试001', '九七', 'http://192.168.100.169:3000/static/real/a-test21602824029139.png', '[{\"id\":2,\"label\":\"技术\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 13:24:56\",\"update_time\":\"2020-10-14 13:24:56\"},{\"id\":1,\"label\":\"生活\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 11:40:59\",\"update_time\":\"2020-10-15 09:08:07\"}]', '这是测试001简介', '<p>结构化广发华福更好地发挥</p>', '0', '0', '1', '0', 'LINE', 'SKILL', '', '2020-10-16 13:09:22', '2020-10-30 10:58:08');
INSERT INTO `article` VALUES ('4', '测试001', '九七', '', '[{\"id\":2,\"label\":\"技术\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 13:24:56\",\"update_time\":\"2020-10-14 13:24:56\"},{\"id\":1,\"label\":\"生活\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 11:40:59\",\"update_time\":\"2020-10-15 09:08:07\"}]', '这是文章简介', '<p>发生的官方梵蒂冈放到</p>', '0', '0', '1', '0', 'LINE', 'SKILL', null, '2020-10-16 13:10:04', '2020-10-29 11:48:45');
INSERT INTO `article` VALUES ('5', '运动也使人进步', '九', 'http://192.168.100.169:3000/static/real/ban11603076139423.png', '[]', '文章简介', '<p>发的广泛地</p>', '0', '0', '0', '1', 'LINE', 'ESSAY', '', '2020-10-19 10:57:35', '2020-10-31 11:11:48');

-- ----------------------------
-- Table structure for articletype
-- ----------------------------
DROP TABLE IF EXISTS `articletype`;
CREATE TABLE `articletype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(11) NOT NULL DEFAULT '1' COMMENT '类型码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文章类型名称',
  `side_column` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '栏目下所要展示的侧边栏',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articletype
-- ----------------------------
INSERT INTO `articletype` VALUES ('1', 'SKILL', '技术分享', 'LOOK-AROUND', '2020-10-23 11:15:53', '2020-11-12 18:06:02');
INSERT INTO `articletype` VALUES ('2', 'ESSAY', '心情随笔', null, '2020-10-23 11:15:53', '2020-10-29 11:45:56');
INSERT INTO `articletype` VALUES ('11', 'STUDY', '书屋', null, '2020-10-30 10:45:20', '2020-10-30 10:45:20');
INSERT INTO `articletype` VALUES ('14', 'HOME', '首页', null, '2020-11-12 18:04:30', '2020-11-12 18:04:30');

-- ----------------------------
-- Table structure for articletype_item
-- ----------------------------
DROP TABLE IF EXISTS `articletype_item`;
CREATE TABLE `articletype_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '栏目名称',
  `articletype_id` varchar(255) NOT NULL COMMENT '一级栏目名称',
  `articletype_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articletype_item
-- ----------------------------
INSERT INTO `articletype_item` VALUES ('12', 'SKILL-SK', '技术', '1', 'SKILL', '2020-10-30 15:01:51', '2020-10-30 15:01:51');
INSERT INTO `articletype_item` VALUES ('13', 'ESSAY-WS', '心情', '2', 'ESSAY', '2020-10-30 15:05:29', '2020-10-30 15:05:29');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` varchar(11) DEFAULT NULL COMMENT '文章id',
  `type` int(11) DEFAULT '1' COMMENT '轮播类型，1.跳转文章， 2.外链跳转',
  `imgUrl` varchar(255) NOT NULL COMMENT '轮播图片',
  `url` varchar(255) DEFAULT NULL COMMENT '图片链接',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('8', '5', '1', 'http://192.168.100.169:3000/static/real/a-test21604280859633.png', '', '2020-11-02 09:34:41', '2020-11-02 09:34:41');
INSERT INTO `banner` VALUES ('9', '4', '1', 'http://192.168.100.169:3000/static/real/recommend1604289462275.jpg', '', '2020-11-02 11:57:46', '2020-11-02 11:57:46');

-- ----------------------------
-- Table structure for bloguser
-- ----------------------------
DROP TABLE IF EXISTS `bloguser`;
CREATE TABLE `bloguser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `userEmail` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `bg_color` varchar(15) DEFAULT NULL COMMENT '背景颜色',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bloguser
-- ----------------------------
INSERT INTO `bloguser` VALUES ('2', 'jiuqi', '1739717921@qq.com', null, '2020-11-07 20:09:45', '2020-11-09 18:07:37');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `use_num` int(11) NOT NULL DEFAULT '0',
  `hot` tinyint(11) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('1', '生活', '1', '0', '2020-10-14 11:40:59', '2020-10-30 15:07:42');
INSERT INTO `label` VALUES ('2', '技术', '2', '0', '2020-10-14 13:24:56', '2020-10-23 10:39:14');
INSERT INTO `label` VALUES ('3', '1', '0', '0', '2020-10-19 10:46:47', '2020-10-19 10:46:47');
INSERT INTO `label` VALUES ('4', '2', '2', '0', '2020-10-19 10:46:49', '2020-10-23 10:39:14');
INSERT INTO `label` VALUES ('5', '4', '2', '0', '2020-10-19 10:46:51', '2020-10-23 10:39:14');
INSERT INTO `label` VALUES ('6', '5', '0', '0', '2020-10-19 10:46:53', '2020-10-19 10:46:53');
INSERT INTO `label` VALUES ('7', '6', '0', '0', '2020-10-19 10:46:56', '2020-10-19 10:46:56');
INSERT INTO `label` VALUES ('8', '8', '0', '0', '2020-10-19 10:46:59', '2020-10-19 10:46:59');
INSERT INTO `label` VALUES ('9', '90', '0', '0', '2020-10-19 10:47:02', '2020-10-30 17:17:25');
INSERT INTO `label` VALUES ('11', '6781', '0', '0', '2020-10-19 10:47:07', '2020-10-30 17:21:07');

-- ----------------------------
-- Table structure for mine
-- ----------------------------
DROP TABLE IF EXISTS `mine`;
CREATE TABLE `mine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像',
  `description` varchar(255) NOT NULL COMMENT '个人说明',
  `profile` text NOT NULL COMMENT '个人简介',
  `content` text NOT NULL COMMENT '详细说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mine
-- ----------------------------
INSERT INTO `mine` VALUES ('1', 'http://192.168.100.169:3000/static/real/a-test11603419876675.png', '1321', '123213个梵蒂冈梵蒂冈', '<p>1232</p>', '2020-10-22 17:59:37', '2020-10-23 10:24:38');

-- ----------------------------
-- Table structure for side_column
-- ----------------------------
DROP TABLE IF EXISTS `side_column`;
CREATE TABLE `side_column` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL COMMENT '侧边栏目code',
  `column_name` varchar(50) NOT NULL DEFAULT '' COMMENT '栏目名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of side_column
-- ----------------------------
INSERT INTO `side_column` VALUES ('1', 'LOOK-AROUND', '随便看看', '2020-11-12 18:05:03', '2020-11-12 18:06:12');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `passWord` varchar(255) NOT NULL,
  `frozen` tinyint(11) NOT NULL DEFAULT '1' COMMENT '是否冻结',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'blogadmin', '1', '2020-10-14 12:35:53', '2020-10-14 12:36:06');

-- ----------------------------
-- Table structure for vercode
-- ----------------------------
DROP TABLE IF EXISTS `vercode`;
CREATE TABLE `vercode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL COMMENT '验证码',
  `userEmail` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `count` int(11) NOT NULL DEFAULT '1' COMMENT '可使用次数',
  `eff_time` int(11) NOT NULL DEFAULT '5' COMMENT '有效时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vercode
-- ----------------------------
INSERT INTO `vercode` VALUES ('1', '1234', '56566', '0', '5', '2020-11-07 16:31:29', '2020-11-07 17:44:01');
INSERT INTO `vercode` VALUES ('2', '1634', '5656', '2', '5', '2020-11-07 16:31:48', '2020-11-07 16:35:12');
INSERT INTO `vercode` VALUES ('3', '4', '1739717921@qq.com', '0', '5', '2020-11-07 18:06:13', '2020-11-07 18:10:41');
INSERT INTO `vercode` VALUES ('4', '116302', '1739717921@qq.com', '0', '5', '2020-11-07 18:10:41', '2020-11-07 18:10:54');
INSERT INTO `vercode` VALUES ('5', '247706', '1739717921@qq.com', '0', '5', '2020-11-07 18:10:54', '2020-11-07 18:25:15');
INSERT INTO `vercode` VALUES ('6', '22664', '1739717921@qq.com', '0', '5', '2020-11-07 18:25:15', '2020-11-07 20:05:12');
INSERT INTO `vercode` VALUES ('7', '502251', '3237308887@qq.com', '1', '5', '2020-11-07 18:27:30', '2020-11-07 18:27:30');
INSERT INTO `vercode` VALUES ('8', '882341', '1739717921@qq.com', '0', '5', '2020-11-07 20:05:12', '2020-11-07 20:05:36');
INSERT INTO `vercode` VALUES ('9', '852955', '1739717921@qq.com', '0', '5', '2020-11-07 20:05:36', '2020-11-09 18:07:20');
INSERT INTO `vercode` VALUES ('10', '330699', '1739717921@qq.com', '0', '5', '2020-11-07 20:08:49', '2020-11-07 20:08:59');
INSERT INTO `vercode` VALUES ('11', '790814', '1739717921@qq.com', '0', '5', '2020-11-07 20:09:28', '2020-11-07 20:09:45');
INSERT INTO `vercode` VALUES ('12', '26109', '1739717921@qq.com', '0', '5', '2020-11-09 18:07:20', '2020-11-09 18:07:37');

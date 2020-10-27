/*
Navicat MySQL Data Transfer

Source Server         : blog
Source Server Version : 80016
Source Host           : 127.0.0.1:3306
Source Database       : blog-sql

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2020-10-27 18:20:23
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
  `type` int(5) NOT NULL DEFAULT '1' COMMENT '文章类型， 1.技术分享，2.心情随笔，3.书屋',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('3', '测试001', '九七', 'http://192.168.100.169:3000/static/real/a-test21602824029139.png', '[{\"id\":2,\"label\":\"技术\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 13:24:56\",\"update_time\":\"2020-10-14 13:24:56\"},{\"id\":1,\"label\":\"生活\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 11:40:59\",\"update_time\":\"2020-10-15 09:08:07\"}]', '这是测试001简介', '<p>结构化广发华福更好地发挥</p>', '0', '0', '1', '0', 'LINE', '1', '2020-10-16 13:09:22', '2020-10-19 10:44:32');
INSERT INTO `article` VALUES ('4', '测试001', '九七', '', '[{\"id\":2,\"label\":\"技术\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 13:24:56\",\"update_time\":\"2020-10-14 13:24:56\"},{\"id\":1,\"label\":\"生活\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 11:40:59\",\"update_time\":\"2020-10-15 09:08:07\"}]', '这是文章简介', '<p>发生的官方梵蒂冈放到</p>', '0', '0', '1', '0', 'LINE', '1', '2020-10-16 13:10:04', '2020-10-27 17:52:40');
INSERT INTO `article` VALUES ('5', '文章', '九', 'http://192.168.100.169:3000/static/real/ban11603076139423.png', '[]', '文章简介', '<p>发的广泛地</p>', '0', '0', '0', '1', 'LINE', '2', '2020-10-19 10:57:35', '2020-10-22 16:04:52');
INSERT INTO `article` VALUES ('6', '测试02', '九七', '', '[]', '文章简介', '<p>1321</p>', '0', '0', '0', '1', 'LINE', '3', '2020-10-20 14:14:04', '2020-10-27 17:40:53');

-- ----------------------------
-- Table structure for articletype
-- ----------------------------
DROP TABLE IF EXISTS `articletype`;
CREATE TABLE `articletype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL DEFAULT '1' COMMENT '类型码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文章类型名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articletype
-- ----------------------------
INSERT INTO `articletype` VALUES ('1', '1', '技术分享', '2020-10-23 11:15:53', '2020-10-23 11:16:04');
INSERT INTO `articletype` VALUES ('2', '2', '心情随笔', '2020-10-23 11:15:53', '2020-10-23 11:16:04');
INSERT INTO `articletype` VALUES ('3', '3', '书屋', '2020-10-23 11:15:53', '2020-10-23 11:16:04');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` varchar(11) DEFAULT NULL COMMENT '文章id',
  `article_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` int(11) DEFAULT '1' COMMENT '轮播类型，1.跳转文章， 2.外链跳转',
  `imgUrl` varchar(255) NOT NULL COMMENT '轮播图片',
  `url` varchar(255) DEFAULT NULL COMMENT '图片链接',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('4', '6', '测试02', '1', 'http://192.168.100.169:3000/static/real/a-test21603703492388.png', 'hasdfsa ', '2020-10-26 17:11:39', '2020-10-26 18:12:38');
INSERT INTO `banner` VALUES ('5', '6', '测试02', '1', 'http://192.168.100.169:3000/static/real/a-test21603705726989.png', '', '2020-10-26 17:48:55', '2020-10-27 17:46:46');

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
INSERT INTO `label` VALUES ('1', '生活', '0', '0', '2020-10-14 11:40:59', '2020-10-15 09:08:07');
INSERT INTO `label` VALUES ('2', '技术', '2', '0', '2020-10-14 13:24:56', '2020-10-23 10:39:14');
INSERT INTO `label` VALUES ('3', '1', '0', '0', '2020-10-19 10:46:47', '2020-10-19 10:46:47');
INSERT INTO `label` VALUES ('4', '2', '2', '0', '2020-10-19 10:46:49', '2020-10-23 10:39:14');
INSERT INTO `label` VALUES ('5', '4', '2', '0', '2020-10-19 10:46:51', '2020-10-23 10:39:14');
INSERT INTO `label` VALUES ('6', '5', '0', '0', '2020-10-19 10:46:53', '2020-10-19 10:46:53');
INSERT INTO `label` VALUES ('7', '6', '0', '0', '2020-10-19 10:46:56', '2020-10-19 10:46:56');
INSERT INTO `label` VALUES ('8', '8', '0', '0', '2020-10-19 10:46:59', '2020-10-19 10:46:59');
INSERT INTO `label` VALUES ('9', '90', '0', '1', '2020-10-19 10:47:02', '2020-10-23 10:28:15');
INSERT INTO `label` VALUES ('10', '687', '0', '0', '2020-10-19 10:47:04', '2020-10-21 19:08:36');
INSERT INTO `label` VALUES ('11', '678', '0', '0', '2020-10-19 10:47:07', '2020-10-21 19:15:22');

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

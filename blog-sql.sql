/*
Navicat MySQL Data Transfer

Source Server         : blog
Source Server Version : 80016
Source Host           : 127.0.0.1:3306
Source Database       : blog-sql

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2020-10-19 18:23:22
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
  `draft` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否为草稿',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'LINE' COMMENT '文章状态',
  `type` int(5) NOT NULL DEFAULT '1' COMMENT '文章类型， 1.技术分享，2.心情随笔，3.书屋',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('3', '测试001', '九七', 'http://192.168.100.169:3000/static/real/a-test21602824029139.png', '[{\"id\":2,\"label\":\"技术\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 13:24:56\",\"update_time\":\"2020-10-14 13:24:56\"},{\"id\":1,\"label\":\"生活\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 11:40:59\",\"update_time\":\"2020-10-15 09:08:07\"}]', '这是测试001简介', '<p>结构化广发华福更好地发挥</p>', '0', '0', '1', '0', '1', 'LINE', '1', '2020-10-16 13:09:22', '2020-10-19 10:44:32');
INSERT INTO `article` VALUES ('4', '测试001', '九七', 'http://192.168.100.169:3000/static/real/recommend1602824982661.jpg', '[{\"id\":2,\"label\":\"技术\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 13:24:56\",\"update_time\":\"2020-10-14 13:24:56\"},{\"id\":1,\"label\":\"生活\",\"use_num\":0,\"hot\":0,\"create_time\":\"2020-10-14 11:40:59\",\"update_time\":\"2020-10-15 09:08:07\"}]', '这是文章简介', '<p>发生的官方梵蒂冈放到</p>', '0', '0', '1', '0', '1', 'OFFLINE', '1', '2020-10-16 13:10:04', '2020-10-19 10:52:06');
INSERT INTO `article` VALUES ('5', '文章', '九', 'http://192.168.100.169:3000/static/real/ban11603076139423.png', '[]', '文章简介', '<p>发的广泛地</p>', '0', '0', '0', '1', '1', 'LINE', '2', '2020-10-19 10:57:35', '2020-10-19 14:50:20');

-- ----------------------------
-- Table structure for articletype
-- ----------------------------
DROP TABLE IF EXISTS `articletype`;
CREATE TABLE `articletype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL DEFAULT '1' COMMENT '类型码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文章类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articletype
-- ----------------------------
INSERT INTO `articletype` VALUES ('1', '1', '技术分享');
INSERT INTO `articletype` VALUES ('2', '2', '心情随笔');
INSERT INTO `articletype` VALUES ('3', '3', '书屋');

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
INSERT INTO `label` VALUES ('2', '技术', '0', '0', '2020-10-14 13:24:56', '2020-10-14 13:24:56');
INSERT INTO `label` VALUES ('3', '1', '0', '0', '2020-10-19 10:46:47', '2020-10-19 10:46:47');
INSERT INTO `label` VALUES ('4', '2', '0', '0', '2020-10-19 10:46:49', '2020-10-19 10:46:49');
INSERT INTO `label` VALUES ('5', '4', '0', '0', '2020-10-19 10:46:51', '2020-10-19 10:46:51');
INSERT INTO `label` VALUES ('6', '5', '0', '0', '2020-10-19 10:46:53', '2020-10-19 10:46:53');
INSERT INTO `label` VALUES ('7', '6', '0', '0', '2020-10-19 10:46:56', '2020-10-19 10:46:56');
INSERT INTO `label` VALUES ('8', '8', '0', '0', '2020-10-19 10:46:59', '2020-10-19 10:46:59');
INSERT INTO `label` VALUES ('9', '90', '0', '0', '2020-10-19 10:47:02', '2020-10-19 10:47:02');
INSERT INTO `label` VALUES ('10', '687', '0', '0', '2020-10-19 10:47:04', '2020-10-19 10:47:04');
INSERT INTO `label` VALUES ('11', '678', '0', '0', '2020-10-19 10:47:07', '2020-10-19 10:47:07');

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

'use strict';

module.exports = app => {
  const { STRING, INTEGER, SMALLINT } = app.Sequelize;

  const modelDefinition = {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      comment: '主键ID',
    },
    name: {
      type: STRING(100),
      allowNull: false,
      defaultValue: '',
      comment: '英雄名称',
    },
    hero_type: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '英雄类型',
    },
    avatar: {
      type: STRING(200),
      allowNull: false,
      defaultValue: '',
      comment: '英雄头像路径',
    },
    life: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '生命',
    },
    shield: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '护盾',
    },
    armour: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '护甲',
    },
    is_delete: {
      type: SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '是否删除: 0=否, 1=是',
    },
    create_time: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '创建时间',
    },
    update_time: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '更新时间',
    },
    delete_time: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '删除时间',
    },
  };

  const Hero = app.model.define('Hero', modelDefinition, {
    createdAt: false,   // 禁用Sequelize自动管理的createdAt字段
    updatedAt: false,   // 禁用Sequelize自动管理的updatedAt字段
    tableName: 'la_hero',  // 指定表名
    comment: '英雄表',     // 表注释
  });

  return Hero;
};
'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const sequelize = require('../database/sequelize');

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = Blog;
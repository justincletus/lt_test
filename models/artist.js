'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const sequelize = require('../database/sequelize');

const Artist = sequelize.define('Artist', {
  href: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  uri: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = Artist;
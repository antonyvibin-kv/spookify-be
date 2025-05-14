const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserFavorite = sequelize.define('UserFavorite', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  SongId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Songs',
      key: 'id'
    }
  }
}, {
  tableName: 'UserFavorites',
  timestamps: true
});

module.exports = UserFavorite; 
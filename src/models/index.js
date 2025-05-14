const User = require('./User');
const Song = require('./Song');
const Playlist = require('./Playlist');
const UserFavorite = require('./UserFavorite');

// Define associations
User.hasMany(Playlist, { foreignKey: 'userId' });
Playlist.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Song, {
  through: UserFavorite,
  as: 'favorites',
  foreignKey: 'UserId',
  otherKey: 'SongId'
});

Song.belongsToMany(User, {
  through: UserFavorite,
  as: 'favoritedBy',
  foreignKey: 'SongId',
  otherKey: 'UserId'
});

Playlist.belongsToMany(Song, { through: 'PlaylistSongs', foreignKey: 'PlaylistId' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs', foreignKey: 'SongId' });

module.exports = {
  User,
  Song,
  Playlist,
  UserFavorite
}; 
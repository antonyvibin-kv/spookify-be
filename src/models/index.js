const User = require('./User');
const Song = require('./Song');
const Playlist = require('./Playlist');

// Define associations
User.hasMany(Playlist, { foreignKey: 'userId' });
Playlist.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Song, { through: 'UserFavorites', foreignKey: 'UserId' });
Song.belongsToMany(User, { through: 'UserFavorites', foreignKey: 'SongId' });

Playlist.belongsToMany(Song, { through: 'PlaylistSongs', foreignKey: 'PlaylistId' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs', foreignKey: 'SongId' });

module.exports = {
  User,
  Song,
  Playlist
}; 
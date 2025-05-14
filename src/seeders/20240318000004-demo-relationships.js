'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add songs to playlists
    const playlistSongs = [
      {
        id: '11111111-1111-aaaa-aaaa-aaaaaaaaaaaa',
        PlaylistId: '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // Rock Classics
        SongId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // Bohemian Rhapsody
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '22222222-2222-aaaa-aaaa-aaaaaaaaaaaa',
        PlaylistId: '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // Rock Classics
        SongId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', // Smells Like Teen Spirit
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '33333333-3333-bbbb-bbbb-bbbbbbbbbbbb',
        PlaylistId: '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', // Pop Hits
        SongId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', // Billie Jean
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '44444444-4444-bbbb-bbbb-bbbbbbbbbbbb',
        PlaylistId: '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', // Pop Hits
        SongId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', // Shape of You
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Add user favorites
    const userFavorites = [
      {
        id: '11111111-1111-ffff-ffff-ffffffffffff',
        UserId: '11111111-1111-1111-1111-111111111111', // johndoe
        SongId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // Bohemian Rhapsody
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '22222222-2222-ffff-ffff-ffffffffffff',
        UserId: '22222222-2222-2222-2222-222222222222', // janedoe
        SongId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', // Billie Jean
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '33333333-3333-ffff-ffff-ffffffffffff',
        UserId: '33333333-3333-3333-3333-333333333333', // musiclover
        SongId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', // Uptown Funk
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('PlaylistSongs', playlistSongs, {});
    await queryInterface.bulkInsert('UserFavorites', userFavorites, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserFavorites', null, {});
    await queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
}; 
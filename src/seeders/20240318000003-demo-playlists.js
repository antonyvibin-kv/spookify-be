'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const playlists = [
      {
        id: '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Rock Classics',
        description: 'The best rock songs of all time',
        coverImage: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663bb',
        isPublic: true,
        userId: '11111111-1111-1111-1111-111111111111',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Pop Hits',
        description: 'Current pop music hits',
        coverImage: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
        isPublic: true,
        userId: '22222222-2222-2222-2222-222222222222',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '33333333-cccc-cccc-cccc-cccccccccccc',
        name: 'My Favorites',
        description: 'Personal favorite songs',
        coverImage: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
        isPublic: false,
        userId: '33333333-3333-3333-3333-333333333333',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Playlists', playlists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
}; 
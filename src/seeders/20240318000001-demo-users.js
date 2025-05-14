'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        username: 'johndoe',
        email: 'john@example.com',
        password: hashedPassword,
        profilePicture: 'https://i.pravatar.cc/150?img=1',
        isPremium: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        username: 'janedoe',
        email: 'jane@example.com',
        password: hashedPassword,
        profilePicture: 'https://i.pravatar.cc/150?img=2',
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        username: 'musiclover',
        email: 'music@example.com',
        password: hashedPassword,
        profilePicture: 'https://i.pravatar.cc/150?img=3',
        isPremium: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
}; 
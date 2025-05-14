'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create PlaylistSongs junction table
    await queryInterface.createTable('PlaylistSongs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      PlaylistId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Playlists',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      SongId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Songs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create UserFavorites junction table
    await queryInterface.createTable('UserFavorites', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      SongId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Songs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add unique constraints
    await queryInterface.addIndex('PlaylistSongs', ['PlaylistId', 'SongId'], {
      unique: true
    });
    await queryInterface.addIndex('UserFavorites', ['UserId', 'SongId'], {
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserFavorites');
    await queryInterface.dropTable('PlaylistSongs');
  }
}; 
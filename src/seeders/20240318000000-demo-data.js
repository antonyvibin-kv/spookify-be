const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, clean up any existing data
    await queryInterface.bulkDelete('PlaylistSongs', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkDelete('Playlists', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkDelete('Songs', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });

    // Create users
    const users = [
      {
        id: uuidv4(),
        username: 'johndoe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        profilePicture: 'https://i.pravatar.cc/150?img=1',
        isPremium: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'janedoe',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        profilePicture: 'https://i.pravatar.cc/150?img=2',
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'musiclover',
        email: 'music@example.com',
        password: await bcrypt.hash('password123', 10),
        profilePicture: 'https://i.pravatar.cc/150?img=3',
        isPremium: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});

    // Create songs
    const popularSongs = [
      {
        id: uuidv4(),
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        duration: 235,
        coverImage: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        genre: "Pop",
        releaseDate: "2017-01-06",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
        coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        genre: "Pop",
        releaseDate: "2019-11-29",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: "Dance Monkey",
        artist: "Tones and I",
        album: "The Kids Are Coming",
        duration: 210,
        coverImage: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20b7d7a73a",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        genre: "Pop",
        releaseDate: "2019-05-10",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Songs', popularSongs, {});

    // Create playlists
    const playlists = [
      {
        id: uuidv4(),
        name: "Rock Classics",
        description: "The best rock songs of all time",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        isPublic: true,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Pop Hits",
        description: "Current pop music hits",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        isPublic: true,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Chill Vibes",
        description: "Relaxing music for your day",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20b7d7a73a",
        isPublic: false,
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Workout Mix",
        description: "High energy tracks for your workout",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273e2e352d5c3f42f5b56b6e0f9",
        isPublic: true,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Late Night Drive",
        description: "Perfect for your midnight cruise",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268",
        isPublic: true,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Coffee Shop",
        description: "Acoustic vibes for your coffee break",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
        isPublic: true,
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Party Mix",
        description: "Get the party started with these hits",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20b7d7a73a",
        isPublic: true,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Rainy Day",
        description: "Cozy tunes for rainy days",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
        isPublic: false,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Study Focus",
        description: "Background music for studying",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        isPublic: true,
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Road Trip",
        description: "The ultimate road trip playlist",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        isPublic: true,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Playlists', playlists, {});

    // Create playlist-song relationships
    const playlistSongs = [];
    
    // Add 2-3 songs to each playlist
    playlists.forEach(playlist => {
      const numSongs = 2 + Math.floor(Math.random() * 2); // 2-3 songs per playlist
      const selectedSongs = popularSongs
        .sort(() => 0.5 - Math.random())
        .slice(0, numSongs);

      selectedSongs.forEach(song => {
        playlistSongs.push({
          id: uuidv4(),
          PlaylistId: playlist.id,
          SongId: song.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });

    await queryInterface.bulkInsert('PlaylistSongs', playlistSongs, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Clean up in reverse order of creation
    await queryInterface.bulkDelete('PlaylistSongs', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkDelete('Playlists', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkDelete('Songs', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
}; 
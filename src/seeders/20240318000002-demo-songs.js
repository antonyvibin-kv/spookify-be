'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const songs = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: 354,
        coverImage: 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b',
        audioUrl: 'https://example.com/songs/bohemian-rhapsody.mp3',
        genre: 'Rock',
        releaseDate: new Date('1975-10-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        album: 'Thriller',
        duration: 294,
        coverImage: 'https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5',
        audioUrl: 'https://example.com/songs/billie-jean.mp3',
        genre: 'Pop',
        releaseDate: new Date('1983-01-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: '÷ (Divide)',
        duration: 235,
        coverImage: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
        audioUrl: 'https://example.com/songs/shape-of-you.mp3',
        genre: 'Pop',
        releaseDate: new Date('2017-01-06'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        title: 'Smells Like Teen Spirit',
        artist: 'Nirvana',
        album: 'Nevermind',
        duration: 301,
        coverImage: 'https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a',
        audioUrl: 'https://example.com/songs/smells-like-teen-spirit.mp3',
        genre: 'Rock',
        releaseDate: new Date('1991-09-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        title: 'Uptown Funk',
        artist: 'Mark Ronson ft. Bruno Mars',
        album: 'Uptown Special',
        duration: 270,
        coverImage: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
        audioUrl: 'https://example.com/songs/uptown-funk.mp3',
        genre: 'Funk',
        releaseDate: new Date('2014-11-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Songs', songs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs', null, {});
  }
}; 
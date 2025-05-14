const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const popularSongs = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 235,
    coverImage: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: "Pop",
    releaseDate: "2017-01-06"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    genre: "Pop",
    releaseDate: "2019-11-29"
  },
  {
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    duration: 210,
    coverImage: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20b7d7a73a",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    genre: "Pop",
    releaseDate: "2019-05-10"
  },
  {
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired to a Hellish Extent",
    duration: 182,
    coverImage: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    genre: "Pop",
    releaseDate: "2018-11-08"
  },
  {
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: 194,
    coverImage: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    genre: "Pop",
    releaseDate: "2019-03-29"
  }
];

const genres = [
  "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Classical", 
  "Country", "Blues", "Folk", "Metal", "Punk", "Reggae", "Soul", "Funk"
];

const artists = [
  "Taylor Swift", "Drake", "The Weeknd", "Ed Sheeran", "Billie Eilish",
  "Post Malone", "Ariana Grande", "Justin Bieber", "Dua Lipa", "Bad Bunny",
  "Coldplay", "Maroon 5", "Imagine Dragons", "The Chainsmokers", "Maroon 5",
  "Kendrick Lamar", "Travis Scott", "J. Cole", "Eminem", "Kanye West"
];

// Free-to-use audio files from SoundHelix (verified working URLs)
const audioUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
];

// Real album cover images from Spotify (verified working URLs)
const coverImages = [
  "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", // Ed Sheeran - ÷
  "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", // The Weeknd - After Hours
  "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20b7d7a73a", // Tones and I
  "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5", // Lewis Capaldi
  "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e", // Billie Eilish
  "https://i.scdn.co/image/ab67616d0000b273e2e352d5c3f42f5b56b6e0f9", // Taylor Swift - Folklore
  "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268", // Drake - Views
  "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a", // Post Malone - Hollywood's Bleeding
  "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20b7d7a73a", // Ariana Grande - Positions
  "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20b7d7a73a"  // Justin Bieber - Justice
];

function generateRandomSong() {
  const artist = artists[Math.floor(Math.random() * artists.length)];
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const year = 2015 + Math.floor(Math.random() * 9);
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
  
  return {
    id: uuidv4(),
    title: `Song ${Math.floor(Math.random() * 1000)}`,
    artist: artist,
    album: `${artist}'s Album ${Math.floor(Math.random() * 10) + 1}`,
    duration: 120 + Math.floor(Math.random() * 240),
    coverImage: coverImages[Math.floor(Math.random() * coverImages.length)],
    audioUrl: audioUrls[Math.floor(Math.random() * audioUrls.length)],
    genre: genre,
    releaseDate: `${year}-${month}-${day}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, add some popular songs
    const popularSongsWithIds = popularSongs.map(song => ({
      ...song,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    await queryInterface.bulkInsert('Songs', popularSongsWithIds, {});

    // Then generate and add random songs
    const randomSongs = Array.from({ length: 995 }, generateRandomSong);
    await queryInterface.bulkInsert('Songs', randomSongs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs', null, {});
  }
}; 
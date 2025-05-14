const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const auth = async (req, res, next) => {
  try {
    // Hardcoded test user ID - this will be used for all authenticated requests
    const TEST_USER_ID = '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    
    // Try to find or create the test user
    let testUser = await User.findByPk(TEST_USER_ID);
    
    if (!testUser) {
      // Create test user if it doesn't exist
      const hashedPassword = await bcrypt.hash('password123', 10);
      testUser = await User.create({
        id: TEST_USER_ID,
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
        isPremium: true
      });
    }

    // Set the test user in the request
    req.user = testUser;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = auth; 
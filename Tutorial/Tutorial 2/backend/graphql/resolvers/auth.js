// Import bcrypt for hashing passwords
const bcrypt = require('bcrypt');

// Import jsonwebtoken for creating authentication tokens
const jwt = require('jsonwebtoken');

// Import User model (MongoDB user schema)
const User = require('../../models/user.js');

module.exports = {
  
  // =========================
  // CREATE USER (Signup)
  // =========================
  createUser: async args => {
    try {
      // Check if a user with this email already exists
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }

      // Hash the password before saving (12 = salt rounds for security)
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      // Create new user with hashed password
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      // Save user to database
      const result = await user.save();

      // Return user data (remove password for security)
      return { ...result._doc, password: null, _id: result.id };

    } catch (err) {
      // If something goes wrong, throw the error
      throw err;
    }
  },

  // =========================
  // LOGIN USER
  // =========================
  login: async ({ email, password }) => {

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }

    // Compare entered password with hashed password in database
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }

    // FIX #4: Create JWT token using environment variable secret
    // Token contains userId and email
    // Expires in 1 hour
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return login response
    return { 
      userId: user.id, 
      token: token, 
      tokenExpiration: 1  // 1 hour
    };
  }
};

import express from 'express';
import { UserModel } from './schema.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user document with an empty address
    const newUser = new UserModel({
      username,
      email,
      password,
      address: {},
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      if (password === user.password) {
        // Passwords match
        const userId = user._id; // Get the user's ID
        res.status(200).json({ message: 'Login successful', userId });
      } else {
        // Passwords do not match
        res.status(400).json({ message: 'Password did not match' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Save a new address for a user
router.post('/save-address', async (req, res) => {
  const { userId, street, city, state, postalCode } = req.body;

  try {
    // Find the user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new address object
    const newAddress = {
      street,
      city,
      state,
      postalCode,
    };

    // Assign the new address object to the user's address field
    user.address = newAddress;

    // Save the user (which will also save the new address)
    await user.save();

    return res.status(200).json({ message: 'Address saved successfully' });
  } catch (err) {
    console.error('Error saving address:', err);
    return res
      .status(500)
      .json({ message: 'Error saving address', error: err.message });
  }
});

export default router;

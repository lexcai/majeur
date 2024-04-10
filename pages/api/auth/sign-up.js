import User from '../../../models/User';
import bcrypt from 'bcrypt';
import dbConnect from '../../../src/db';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save(); // This will throw an error if it fails
    console.log('User created successfully', savedUser);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    // Provide a more generic message to the client for security
    return res.status(500).json({ message: 'Internal server error' });
  }
}

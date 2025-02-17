import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      // Log detailed error for monitoring but return generic message
      console.log(`Login attempt failed: User ${username} not found`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      console.log(`Login attempt failed: Invalid password for user ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error('JWT_SECRET_KEY is not defined');
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username 
      }, 
      secretKey, 
      { expiresIn: '1h' }
    );

    return res.json({ 
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();
router.post('/login', login);

export default router;
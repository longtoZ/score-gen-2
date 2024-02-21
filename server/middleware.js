import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const key = req.headers.authorization;
  
    if (!key) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const token = jwt.sign(
      {user_id: 2903}, 
      key.split(' ')[1],
      {expiresIn: '1m'}
    );
  

    // Verify the JWT token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }
      next();

    });
  };
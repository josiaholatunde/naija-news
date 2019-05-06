import jsonwebtoken from 'jsonwebtoken';
import keys from '../config/keys';

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jsonwebtoken.verify(token, keys.secret);

    req.userData = {
      userName: decodedToken.userName,
      userId: decodedToken.userId
    };
    next();

  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }
}

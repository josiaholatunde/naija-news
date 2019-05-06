import User from '../models/user';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import keys from '../config/keys';



export default class AuthController {
  static async registerUser(req, res) {
    const { email, userName, password } = req.body;
    try {
      User.findOne({email: email}, (err, user) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }
        if (user) {
          return res.status(400).json({
            message: 'Email exists'
          });
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          const savedUser = new User({
            email,
            userName,
            password: hashedPassword
          }).save();
          return res.status(201).json({
            message: 'Successfully created user',
            user: {
              id: savedUser._id,
              email,
              userName
            }
          })
        });
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something just happened'
      })
    }
  }
  static async loginUser(req, res) {
    const {email, password} = req.body;
    let savedUser;
    try {
      User.findOne({email: email}, (err, user) => {

        if (err) {
          return res.status(500).json({
            error: err
          })
        }
        if (!user) {
          return res.status(401).json({
            error: 'Invalid username or password'
          })
        }
        savedUser = user;
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          }
          if (!result) {
            return res.status(401).json({
              error: 'Invalid username or password'
            })
          }
          //generate jsonwebtoken
          jsonwebtoken.sign({
            userId: savedUser._id,
            role: savedUser.role,
            userName: savedUser.userName
          }, keys.secret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
              return res.status(500).json({
                error: 'Error in generating token'
              });
            }
            return res.status(200).json({
              message: 'Successfully logged in user',
              user: {
                id: savedUser._id,
                email: savedUser.email,
                userName: savedUser.userName
              },
              token: token
            });
          });

          })
        })
    } catch (error) {
      return res.status(500).json({
        error: 'Something just happened right now'
      })
    }
  }
}

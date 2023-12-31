import dotenv from 'dotenv';
dotenv.config();
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
   // token and secret key both comibined ; jwt verify checks whether is has the same secret key or key .
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.createdBy = user.id;
    //console.log(user);
    //console.log("User details");
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


export const userAuthForResetPassword = async (req, res, next) => {
  try {
    
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required.'
      };
    const token = bearerToken.split(' ')[1];
    const user = await jwt.verify(token, process.env.PASSWORD_RESET_KEY);
    req.body.id = user.id;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

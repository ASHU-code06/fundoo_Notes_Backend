import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const userRegistration = async (req, res) => {
  try{
    const data = await UserService.newUser(req.body);
   
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const token = await UserService.userLoginCredentials(req.body);
    
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      userToken: token,
      message:'User login successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const newToken = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      token: newToken,
      message: 'Code sent to recovery email or phoneNumber'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Password reset succesfully.'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

























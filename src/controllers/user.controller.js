import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



export const userRegistration = async (req, res, next) => {
  try{
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLoginCredentials(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message:'User login successfully'
    });
  } catch (error) {
    next(error);
  }
};


























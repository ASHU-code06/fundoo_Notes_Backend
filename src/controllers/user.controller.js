import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



export const userRegistration = async (req, res) => {
  try{
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
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
    console.log("#############################################",token);
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


























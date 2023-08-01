import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuthForResetPassword } from '../middlewares/auth.middleware';  
import { redisData } from '../middlewares/redis.middleware';


const router = express.Router();


//route to create a new user or user registeration
router.post('', newUserValidator, userController.userRegistration );

//route to login 
router.post('/login',userController.userLogin);

//route for forget password
router.put('/forgetPassword',userController.forgetPassword);

//route for reset password
router.put('/resetPassword',userAuthForResetPassword,userController.resetPassword);


export default router;
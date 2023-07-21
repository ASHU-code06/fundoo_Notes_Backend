import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';


const router = express.Router();


//route to create a new user or user registeration
router.post('', newUserValidator, userController.userRegistration );

//route to login 
router.post('/login',userController.userLogin);



export default router;

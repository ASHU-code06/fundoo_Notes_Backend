import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const User = require('../models/user')(sequelize, DataTypes);

//create new user
export const newUser = async (body) => {
  const isExist = await User.findOne({ where: { email: body.email } });
  if (isExist) {
    throw new Error('User already Exist');
  } else {
    const hash = bcrypt.hashSync(body.password, 10);
    body.password = hash;
    const data = await User.create(body);
    return data;
  }
};

//User login by email and password
export const userLoginCredentials = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (!data) {
    throw new Error('Invalid emailId.');
  }
  if (data) {
    const passwordMatch = bcrypt.compareSync(body.password, data.password);
    console.log("*************************************************"+data.password);
    if (!passwordMatch) {
      throw new Error('Invalid Password.');
    }
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    );
    return data;
  }
};

// //match password and email
// export const userLoginCredentials = async (body) =>{
//   const passwordMatch = await User.findOne({ where: { email: body.email,password: body.password } });
//   if(!passwordMatch){
//     throw new Error ("invalid password ");
//   }
//   return passwordMatch;

// };

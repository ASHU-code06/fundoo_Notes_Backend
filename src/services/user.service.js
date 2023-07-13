import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';

const User = require('../models/user')(sequelize, DataTypes);


//create new user
export const newUser = async (body) => {
  const isExist = await User.findOne({ where: { email: body.email } });
  if(isExist){
    throw new Error ("User already Exist");
  }else{
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(body.password,salt);
    body.password=hash;
    const data = await User.create(body);
    return data;
  }
};
//match password and email
export const userLoginCredentials = async (body) =>{
  const passwordMatch = await User.findOne({ where: { email: body.email,password: body.password } });
  if(!passwordMatch){
    throw new Error ("invalid password ");
  }
  return passwordMatch;

};






























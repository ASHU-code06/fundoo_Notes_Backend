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
    const saltRounds = 10;
    const hash = bcrypt.hashSync(body.password, saltRounds);
    body.password = hash;
    const data = await User.create(body);
    return '';
  }
};

//User login by email and password
export const userLoginCredentials = async (body) => {
  const data = await User.findOne({ where: { email: body.email } });
  if (!data) {
    throw new Error('Invalid emailId.');
  }
  if (data) {
    const passwordMatch = await bcrypt.compare(
      body.password,
      data.dataValues.password
    );
    if (passwordMatch) {
      const token = jwt.sign(
        { id: data.id, email: data.email },
        process.env.SECRET_KEY,
        { expiresIn: '4h' }
      );
      return token;
    } else {
      throw new Error('The password is not matching ');
    }
  }
};

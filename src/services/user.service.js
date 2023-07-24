import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as utils from '../utils/sendMail';
import dotenv from 'dotenv';
dotenv.config();

const nodemailer = require('nodemailer');

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

//reset password
export const resetPassword = async (body) => {
  const data = await User.findOne({ where: { id: body.id } });
  if (!data) {
    throw new Error('This user does not exist ');
  } else {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(body.password, saltRounds);
    body.passWord = hash;
    var updatedValue = await User.update(body, { where: { id: body.id } });
  }
  return updatedValue;
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
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('The password is not matching ');
    }
  }
};

//forget Password
export const forgetPassword = async (body) => {
  const data = await User.findOne({ where: { email: body.email } });
  if (data) {
    const token = jwt.sign(
      { email: data.email, id: data.id },
      process.env.PASSWORD_RESET_KEY,
      { expiresIn: '23h' }
    );
    await utils.sendMail(data.email, token);
    //utils.sendMail()
    return token;
  } else {
    throw new Error('Email not found');
  }
};

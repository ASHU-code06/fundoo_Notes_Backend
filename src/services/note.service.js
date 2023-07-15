import sequelize, { DataTypes } from '../config/database';

const Note = require('../models/note')(sequelize, DataTypes);

//create new user
export const newNote = async (body) => {
    const noteData = await Note.create(body);
    return noteData;
 };

 //get all users
export const getAllNotes = async () => {
  const data = await Note.findAll();
  return data;
};
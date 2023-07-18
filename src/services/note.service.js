import sequelize, { DataTypes } from '../config/database';


const Note = require('../models/note')(sequelize, DataTypes);

//create new user
export const newNote = async (body) => {
    const noteData = await Note.create(body);
    console.log(`*******************${noteData}`);
    return noteData;
 };

 //get all users
export const getAllNotes = async () => {
  const data = await Note.findAll();
  return data;
};

//get note by id
export const getById = async (id) => {
  const data = await Note.findOne({ where : {id : id}});
  if(!data){
    //if note does not exist
    throw new Error("This Note does not exist ");
   }
  return data;
};

//update a note by id 
export const updateNoteById = async (id,body) => {
  var NoteDataToUpdate = await Note.update(body,{ where: { id : id}});
  return NoteDataToUpdate;
 };

//delete Note by id
export const deleteNote = async (id) => {
 const data = await Note.destroy({  where : { id : id} });
 if(!data){
  //if note is already deleted 
  throw new Error("This Note does not exist ");
 }
  return 'note deleted succesfully';
};
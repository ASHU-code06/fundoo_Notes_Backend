import sequelize, { DataTypes } from '../config/database';

const Note = require('../models/note')(sequelize, DataTypes);

//create new user
export const newNote = async (body) => {
  const noteData = await Note.create(body);
  return noteData;
};

//get all users
export const getAllNotes = async (body) => {
  const data = await Note.findAll({ where: { createdBy: body.createdBy } });
  return data;
};

//get note by id
export const getById = async (id) => {
  const data = await Note.findOne({ where: { id: id } });
  if (!data) {
    //if note does not exist
    throw new Error('This Note does not exist ');
  }
  return data;
};

//update a note by id
export const updateNoteById = async (id, body) => {
  const findNote = await Note.findOne({ where: { id: id } });
  if (!findNote) {
    //if note does not exist
    throw new Error('This Note does not exist ');
  } else {
    var updatedValue = await Note.update(body, { where: { id: id } });
  }
  return updatedValue;
};

//delete Note by id
export const deleteNote = async (id) => {
  const data = await Note.destroy({ where: { id: id } });
  if (!data) {
    //if note is already deleted
    throw new Error('This Note does not exist ');
  }
  return 'note deleted succesfully';
};

//archive note
export const archiveNote = async (id, body) => {
  //variables:values
  const data = await Note.findOne({
    where: { id: id, createdBy: body.createdBy }
  });
  console.log(data);
  if (!data) {
    throw new Error('Provided invalid note id');
  }
  const archiveValue = !data.isArchive; //working like a NOT GATE
  const updateNote = await Note.update(
    { isArchive: archiveValue },
    {
      where: {
        id: id
      }
    }
  );
  return updateNote;
};

//archive note
export const trashNote = async (id, body) => {
  //variables:values
  const data = await Note.findOne({
    where: { id: id, createdBy: body.createdBy }
  });
  console.log(data);
  if (!data) {
    throw new Error('Provided invalid note id');
  }
  const trashValue = !data.isTrash; //working like a NOT GATE, toggle purpose
  const updatedNote = await Note.update(
    { isTrash: trashValue },
    {
      where: {
        id: id
      }
    }
  );
  return updatedNote;
};

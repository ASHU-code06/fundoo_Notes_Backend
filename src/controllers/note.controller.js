import HttpStatus from 'http-status-codes';
import * as UserNoteService from '../services/note.service';

export const newNoteData = async (req, res) => {
  try {
    console.log('this is body ', req.body);
    const data = await UserNoteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const getAllNotes = async (req, res) => {
  console.log("################",req.body.createdBy);
  try {
    const data = await UserNoteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const data = await UserNoteService.getById(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await UserNoteService.deleteNote(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const updateNote = async (req, res, next) => {
  try {
    // console.log(`%%%%%%%%%%%%%%%%%%%%${req.params.id}`);
    // console.log(req.body);
    const updateddata = await UserNoteService.updateNoteById(
      req.params.id,
      req.body
    );
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: updateddata,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const archiveNote = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const data = await UserNoteService.archiveNote(req.params.id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note archived successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const trashNote = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const data = await UserNoteService.trashNote(req.params.id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note trashed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

import HttpStatus from 'http-status-codes';
import * as UserNoteService from '../services/note.service';

export const newNoteData = async (req, res, next) => {
    try{
      const data = await UserNoteService.newNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'note created successfully'
      });
  
    } catch (error) {
      next(error);
    }
  };

  export const getAllNotes = async (req, res, next) => {
    try {
      const data = await UserNoteService.getAllNotes();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
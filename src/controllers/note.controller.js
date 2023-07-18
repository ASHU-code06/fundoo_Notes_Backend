import HttpStatus from 'http-status-codes';
import * as UserNoteService from '../services/note.service';

export const newNoteData = async (req, res) => {
    try{
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
    try {
      const data = await UserNoteService.getAllNotes();
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
      console.log(`*******************${req.params.id}`);
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

  export const updateNote = async (req,res,next) => {
    try{
      console.log(`%%%%%%%%%%%%%%%%%%%%${req.params.id}`);
      console.log(req.body);
      const updateddata = await UserNoteService.updateNoteById(req.params.id,req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: updateddata,
        message: 'Note updated successfully'
      });
     
    }catch(error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };
import express from 'express';
import * as   noteController from  '../controllers/note.controller';
// import { usernewNoteRegistration } from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';

const router = express.Router();

//router to create notes
router.post('',newNoteValidator, noteController.newNoteData);

//router to get all notes 
router.get('',noteController.getAllNotes);


export default router;
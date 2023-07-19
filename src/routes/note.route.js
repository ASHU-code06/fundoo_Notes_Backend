import express from 'express';
import { userAuth } from '../middlewares/auth.middleware'; 
import * as   noteController from  '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';

const router = express.Router();

//router to create notes
router.post('',newNoteValidator ,userAuth ,noteController.newNoteData);

//router to get all notes 
router.get('',userAuth,noteController.getAllNotes);

//router to get a note by id 
router.get('/:id',userAuth,noteController.getNoteById);

//route to delete a note
router.delete('/:id',userAuth,noteController.deleteNote); 

//route to update a note 
router.put('/:id',userAuth,noteController.updateNote);

//route to archive a note 
router.put('/archive/:id',userAuth,noteController.archiveNote);

//route to trash a note
router.put('/trash/:id',userAuth,noteController.trashNote);

export default router;
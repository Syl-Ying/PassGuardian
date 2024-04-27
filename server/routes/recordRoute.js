import express from 'express';
import { RecordList, RecordCreate, RecordEdit, RecordDelete } from '../controllers/recordController.js';

const router = express.Router();

router.get('/', RecordList);
router.post('/create', RecordCreate);
router.patch('/edit/:recordId', RecordEdit);
router.delete('/delete/:recordId', RecordDelete);


export default router;
import express from 'express';
import { RecordList, RecordCreate, RecordEdit, RecordDelete, RecordDecrypt } from '../controllers/recordController.js';

const router = express.Router();

router.get('/', RecordList);
router.post('/create', RecordCreate);
router.patch('/edit/:recordId', RecordEdit);
router.delete('/delete/:recordId', RecordDelete);

router.post('/decrypt', RecordDecrypt);


export default router;
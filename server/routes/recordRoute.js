import express from 'express';
import { RecordList, RecordGet, RecordCreate, RecordEdit, RecordDelete, RecordDecrypt } from '../controllers/recordController.js';

const router = express.Router();

router.get('/', RecordList);
router.get('/:recordId', RecordGet);
router.post('/create', RecordCreate);
router.patch('/edit/:recordId', RecordEdit);
router.delete('/delete/:recordId', RecordDelete);

router.post('/decrypt', RecordDecrypt);


export default router;
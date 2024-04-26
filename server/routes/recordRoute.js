import express from 'express';
import { getRecordList, getRecord, createRecord, updateRecord, deleteRecord } from '../controllers/recordController.js';

const router = express.Router();

router.get('/', getRecordList);
router.get('/:id', getRecord);

router.post('/', createRecord);
router.patch('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export default router;
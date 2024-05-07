import { error } from 'console';
import Record from '../models/record.js';
import crypto from 'crypto';

const key = process.env.CRYPTO_SECRET;
const algorithm = 'aes-256-ctr';
const initialization_vector = "X05IGQ5qdBnIqAWD"

// GET api/records/
export const RecordList = async (req, res) => {
    try {
        const records = await Record.find( { user: req.user._id });
        res.header('Access-Control-Allow-Credentials', true);
        res.status(200).send(records);
    } catch (err) {
        console.log('RecordList error: ', err);
        res.status(404).json({ success: false, msg: "An error Occured" });
    }
}

// POST api/records/create
export const RecordCreate = async (req, res) => {
    const { siteurl, username, password } = req.body;
    console.log(password);
    
    // encrypt AES password
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), Buffer.from(initialization_vector));
    let encrypted = cipher.update(Buffer.from(password), 'utf8', 'hex');
    encrypted += cipher.final('hex')
    const hashed_password = encrypted;
    
    const record = new Record({
        siteurl,
        username,
        password: hashed_password
    });

    try {
        await record.save();
        await Record.findOneAndUpdate({ siteurl: siteurl }, { user: req.user._id });
        res.status(200).json({ sucess: true, msg: "Record Added" })
    } catch (err) {
        res.status(401).json({ sucess: false, msg: "An error Ocurred!" })
        console.log(err)
    }
}

// GET api/records/:recordId
export const RecordGet = async (req, res) => {
    const recordId = req.params.recordId;
    try {
        const record = await Record.findOne({ _id: recordId });
        if (!record) throw error;
        res.status(200).send(record);
    } catch (error) {
        res.status(404).send(false)
    }
}

// PATCH api/record/edit/:recordId
export const RecordEdit = async (req, res) => {
    const recordId = req.params.recordId;
    const updates = req.body;
    const options = { new: true };
    try {
        // hash updated password
        if (Object.keys(updates).includes('password')) {
            // encrypt AES password
            let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), Buffer.from(initialization_vector));
            let encrypted = cipher.update(updates.password, 'utf8', 'hex');
            encrypted += cipher.final('hex')
            updates.password = encrypted;
        }

        const record = await Record.findOneAndUpdate({_id: recordId }, updates, options);
        if (!record) throw error;
        res.status(200).send(record);
    } catch (error) {
        res.status(404).json({ "success": false, "message": "Record Not Found" })
    }
}

// DELETE api/records/delete/:recordId
export const RecordDelete = async (req, res) => {
    const recordId = req.params.recordId;
    const record = await Record.findById(recordId);
    if (record) {
        try {
            const record = await Record.findByIdAndDelete(recordId)
            if (!record) throw error;
            res.status(200).json({ "success": true, "message": "Record is permenatly deleted" })
        }
        catch (error) {
            res.status(404).json({ "success": false, "message": "Record Not Found" })
        }
    }
}

// POST api/records/decrypt
export const RecordDecrypt = (req, res) => {
    try {
        let password = req.body.password;
        console.log('password',password);
        // decrypt password
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(initialization_vector));
        let decrypted = decipher.update(password, 'hex', 'utf8');
        decrypted  += decipher.final('utf8')
        console.log('decrypted',decrypted);

        res.header('Access-Control-Allow-Credentials', true);
        res.send(decrypted);
    } catch (err) {
        console.log(err);
    }
}

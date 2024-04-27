import Record from '../models/record.js';
import crypto from 'crypto';

const key = process.env.CRYPTO_SECRET;

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
    // encrypt AES password
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    const hashed_password = crypted;
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

// PATCH api/record/edit/:recordId
export const RecordEdit = async (req, res) => {
    const recordId = req.params.recordId;
    const updates = req.body;
    const options = { new: true };
    try {
        // hash updatred password
        if (Object.keys(updates).includes('password')) {
            // encrypt AES password
            const cipher = crypto.createCipher('aes192', key);
            var crypted = cipher.update(updates.password, 'utf8', 'hex');
            crypted += cipher.final('hex');
            updates.password = crypted;
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
        // decrypt password
        const decipher = crypto.createDecipher('aes192', key);
        var decrypted = decipher.update(password, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        res.header('Access-Control-Allow-Credentials', true);
        res.send(decrypted);
    } catch (err) {
        console.log(err);
    }
}

import mongoose, { Schema } from "mongoose";

const recordSchema = new mongoose.Schema(
    {
        siteurl: {
            type: String,
            trim: true,
            required: true,
            index: true

        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        user: { 
            type: mongoose.Schema.Types.String, 
            ref: `User` 
        }

    }, { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);
 
export default Record;
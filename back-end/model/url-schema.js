const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const urlSchema = new Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true,
    },
    visit: [
        {
            timestamp: {
                type: Number
            }
        }
    ]
});

const url = model('url', urlSchema);
module.exports={
    url
}
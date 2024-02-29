const { generateId } = require('./generateId.js')
const { url } = require("../model/url-schema.js")

const tempId = generateId();
const longUrlToShort = async (str) => {
    const newEntry = new url({
        shortUrl: tempId,
        longUrl: str,
        visit: []
    })
    await newEntry.save();
   
}
//const shortId=longUrlToShort()
module.exports = {
    longUrlToShort,tempId
}

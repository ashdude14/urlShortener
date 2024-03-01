const express = require("express");
const { generateId } = require('./control/generateId');
const PORT = process.env.PORT || 8000;
const cors = require('cors')
require('dotenv').config();
const mongoose = require("mongoose");
const { longUrlToShort, tempId } = require("./control/db-insert-helper");
const {  url } = require("./model/url-schema"); // Renamed variable to avoid conflict

mongoose.connect(process.env.CREDENTIAL_MONGO)
    .then(() => console.log(`Db connected!`))
    .catch((err) => console.log(err));


// const corsOptions = {
//     origin: 'http://localhost:8000',
//     credentials: true,
//     optionSuccessStatus: 200,

// }

const app = express();
app.use(cors())
app.use(express.json());

// app.use((req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// });
app.post('/url', (req, res) => {

    const requestedUrl = req.body.url;
    if (!requestedUrl) {
        return res.status(400).json({ "error": "must enter url" });
    }
    longUrlToShort(requestedUrl);
    return res.status(200).json(({ "shortUrl": tempId }));
});


app.get('/', (req, res) => {
    return res.status(200).json({ "message": "This is simple API to shortened the URL Created By Aashish Kumar Singh!" });
});

app.get("/:shortUrl", async (req, res) => {
    
    const shortUrl = req.params.shortUrl;
    const entry = await url.findOneAndUpdate(
        { shortUrl },
        {
            $push: {
                visit: { timestamp: Date.now() }
            }
        }
    );
    if (!entry || !entry.longUrl) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.longUrl);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

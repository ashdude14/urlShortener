const express = require("express");
const { generateId } = require('./control/generateId');
const PORT = process.env.PORT || 8000;
require('dotenv').config();
const mongoose = require("mongoose");
const { longUrlToShort, tempId } = require("./control/db-insert-helper");
const { url: UrlModel } = require("./model/url-schema"); // Renamed variable to avoid conflict

mongoose.connect(process.env.CREDENTIAL_MONGO)
    .then(() => console.log(`Db connected!`))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.post('/url', (req, res) => {
    const requestedUrl = req.body.url;
    if (!requestedUrl) {
        return res.status(400).json({ "error": "must enter url" });
    }
    longUrlToShort(requestedUrl);
    return res.status(200).json(({ "short-url": tempId }));
});

app.get('/', (req, res) => {
    return res.status(200).json({ "message": "Hi! This is simple API to shortened the URL Created By Aashish!" });
});

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const entry = await UrlModel.findOneAndUpdate(
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

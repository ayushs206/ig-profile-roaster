import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/scrap', (req, res) => {
    try {
        if (!req.query?.username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        const username = req.query.username;
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while scraping the Instagram profile.' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
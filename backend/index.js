import dotenv from "dotenv";
dotenv.config();

import express from "express";
import serverless from "serverless-http";
import axios from "axios";

const app = express();

import fs from "fs";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Enable CORS for frontend requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

import processProfile from "./functions/processProfile.js";
import analyzeProfile from "./functions/analyzeProfile.js";
import generateRoast from "./functions/generateRoast.js";

app.get('/api/scrap', async (req, res) => {
    try {
        if (!req.query?.username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        const username = req.query.username;

        try {
            const headers = {
                "User-Agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
                "Referer": "https://www.instagram.com/singlayush1938/",
                "X-IG-App-ID": "936619743392459",
                "X-Requested-With": "XMLHttpRequest",
                "Accept": "*/*"
            };
            const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
            const response = await axios.get(url, { headers });

            const responseData = response.data;

            const processedData = processProfile(responseData);
            const analyzedData = analyzeProfile(processedData);
            const roast = generateRoast(processedData, analyzedData);

            return res.status(200).json({
                success: true,
                profile: processedData,
                analysis: analyzedData,
                roast
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while scraping the Instagram profile.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while scraping the Instagram profile.' });
    }
});

app.get('/api/proxy-image', async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).send('Image URL is required');
        }

        const response = await axios.get(imageUrl, {
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer': 'https://www.instagram.com/'
            }
        });

        res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        response.data.pipe(res);
    } catch (error) {
        console.error('Error proxying image:', error.message);
        res.status(500).send('Error loading image');
    }
});

// app.listen(process.env.BACKEND_PORT || 3000, () => {
//     console.log(`Server is running on port ${process.env.BACKEND_PORT || 3000}`);
// });

export const handler = serverless(app);
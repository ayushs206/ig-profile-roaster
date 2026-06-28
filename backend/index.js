import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

import fs from "fs";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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

            // fs.writeFileSync(path.join(process.cwd(), `scrapedData_${username}.json`), JSON.stringify(responseData, null, 2));

            console.log(roast);
            return res.status(200).json(roast);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while scraping the Instagram profile.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while scraping the Instagram profile.' });
    }
});

app.listen(process.env.BACKEND_PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.BACKEND_PORT || 3000}`);
});
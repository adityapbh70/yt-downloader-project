const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const app = express();

app.use(cors());

app.get('/download', async (req, res) => {
    try {
        const videoURL = req.query.url;
        if (!videoURL) return res.status(400).send("URL missing");

        // Headers set karein taaki YouTube ko lage aap browser hain
        const requestOptions = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            }
        };

        const info = await ytdl.getInfo(videoURL, { requestOptions });
        const title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);

        ytdl(videoURL, {
            quality: 'highest',
            filter: 'audioandvideo',
            requestOptions
        }).pipe(res);

    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send("YouTube ne block kiya hai. Cookies ki zaroorat ho sakti hai.");
    }
});

// Port Render ke liye (Screenshot 185423 ke mutabiq 10000 par chalega)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server chalu hai port: ${PORT}`);
});
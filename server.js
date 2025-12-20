const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core'); // Naya version use kar rahe hain
const app = express();

app.use(cors());

app.get('/download', async (req, res) => {
    try {
        const videoURL = req.query.url;
        if(!videoURL) return res.status(400).send("URL zaroori hai");

        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        
        // Video download shuru karna
        ytdl(videoURL, {
    quality: 'highestvideo',
    requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }
}).pipe(res);

    } catch (err) {
        console.error(err);
        res.status(500).send("Kuch galti hui hai!");
    }
});

const PORT = process.env.PORT || 4000; // Render ke liye zaroori hai
app.listen(PORT, () => {
    console.log(`Server chalu hai port ${PORT} par`);
});
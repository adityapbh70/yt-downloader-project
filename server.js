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
            format: 'mp4',
            quality: 'highestvideo'
        }).pipe(res);

    } catch (err) {
        console.error(err);
        res.status(500).send("Kuch galti hui hai!");
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server chalu hai: http://localhost:${PORT}`);
});
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use('/videos', express.static('videos'));


// Video Upload Handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'videos'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
  const title = req.body.title;
  const filename = req.file.filename;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  // Save the title + filename in a JSON file (or a database ideally)
  const metadata = {
    title,
    filename
  };

  const metadataPath = path.join(__dirname, 'videos', `${filename}.json`);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata));

  res.json({ message: 'Video uploaded successfully!' });
});
// Fetch list of videos
app.get('/videos', (req, res) => {
  fs.readdir('videos', (err, files) => {
    if (err) return res.status(500).json({ error: 'Could not list videos' });
    const videoUrls = files.map(file => ({
      filename: file,
      url: `http://localhost:${port}/videos/${file}`
    }));
    res.json(videoUrls);
  });
});

// 🔴 Delete video route (your code)
app.delete('/videos/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'videos', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete video' });
    res.json({ message: 'Video deleted successfully!' });
  });
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

app.get('/videos', (req, res) => {
  fs.readdir('videos', (err, files) => {
    if (err) return res.status(500).json({ error: 'Could not list videos' });

    // Only keep .mp4 files
    const videoFiles = files.filter(file => file.endsWith('.mp4'));

    const videos = videoFiles.map(file => {
      const metadataPath = path.join(__dirname, 'videos', `${file}.json`);
      let title = "Untitled Video";

      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath));
        title = metadata.title || title;
      }

      return {
        filename: file,
        url: `http://localhost:${port}/videos/${file}`,
        title
      };
    });

    res.json(videos);
  });
});



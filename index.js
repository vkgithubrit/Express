// index.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload setup using multer
const upload = multer({ dest: '/uploads' });

// Route: Home
app.get('/', (req, res) => {
    res.send('✅ Welcome to Enhanced Express App!');
});

// Route: File Upload
app.post('/uploads', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('⚠️ No file uploaded.');
    }
    res.send(`✅ File "${req.file.originalname}" uploaded successfully.`);
});

// Route: Error Example
app.get('/error', (req, res, next) => {
    next(new Error('🚨 This is a manual error!'));
});

// Route: Third-Party API (JSONPlaceholder)
app.get('/posts', async (req, res, next) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.json(response.data);
    } catch (err) {
        next(err);
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).send({ error: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

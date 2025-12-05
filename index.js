import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// ---- TEST DATABASE ROUTE ----
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ connected: true, time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ connected: false, error: err.message });
    }
});
// -----------------------------

// Define routes to serve HTML templates
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'signup.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'shopping-cart.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'checkout.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'search-results.html'));
});

// Generic category route
app.get('/category/:categoryName', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'category-electronics.html'));
});

// Generic product route
app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'product-details.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

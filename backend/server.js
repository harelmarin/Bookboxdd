const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

require ('dotenv').config();

const app = express();

app.use (cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
  });

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/users', (req, res) => {
    const { id, email, name } = req.body;

    if (!id || !email || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO users (firebase_id, email, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE email = VALUES(email), name = VALUES(name)';
    const values = [id, email, name];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        result.status(200).json({ message: 'User created or updated successfully' });
    });
});

app.listen(8001, () => {

    console.log('Server is running on port 8001');
});

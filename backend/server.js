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

    const checkUserSql = 'SELECT user_id FROM users WHERE firebase_id = ?';
    db.query(checkUserSql, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking user:', checkErr);
            return res.status(500).json({ error: 'Database error' });
        }

        if (checkResult.length > 0) {
            // Utilisateur existe déjà, renvoyer l'ID
            const existingUserId = checkResult[0].user_id;
            res.status(200).json({ user_id: existingUserId });
        } else {
            // Vérifier si l'email existe déjà
            const checkEmailSql = 'SELECT user_id FROM users WHERE email = ?';
            db.query(checkEmailSql, [email], (emailCheckErr, emailCheckResult) => {
                if (emailCheckErr) {
                    console.error('Error checking email:', emailCheckErr);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (emailCheckResult.length > 0) {
                    // Email existe déjà, renvoyer l'ID
                    const existingEmailUserId = emailCheckResult[0].user_id;
                    res.status(200).json({ user_id: existingEmailUserId });
                } else {
                    // Insérer un nouvel utilisateur
                    const insertSql = 'INSERT INTO users (firebase_id, email, name) VALUES (?, ?, ?)';
                    const values = [id, email, name];

                    db.query(insertSql, values, (insertErr, insertResult) => {
                        if (insertErr) {
                            if (insertErr.code === 'ER_DUP_ENTRY') {
                                // Email a été inséré par un autre processus
                                return res.status(409).json({ error: 'Email already exists' });
                            }
                            console.error('Error inserting user:', insertErr);
                            return res.status(500).json({ error: 'Database error' });
                        }

                        // Renvoyer l'ID du nouvel utilisateur
                        res.status(200).json({ user_id: insertResult.insertId });
                    });
                }
            });
        }
    });
});




app.post('/api/wishlist', (req, res) => {
    const { user_id, book_id, book_name, book_pages, book_author, book_image, book_description } = req.body;

    if (!user_id || !book_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `
        INSERT INTO wishlist (user_id, book_id, book_name, book_pages, book_author, book_image, book_description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            book_name = VALUES(book_name),
            book_pages = VALUES(book_pages),
            book_author = VALUES(book_author),
            book_image = VALUES(book_image),
            book_description = VALUES(book_description)
    `;
    const values = [user_id, book_id, book_name, book_pages, book_author, book_image, book_description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding book to wishlist:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Insert result:', result);
        res.status(200).json({ message: 'Book added to wishlist successfully' });
    });
});


app.listen(8001, () => {

    console.log('Server is running on port 8001');
});

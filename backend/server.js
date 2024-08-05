const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use (cors());

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Boobox'
});

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/login', (req, res) => {
    res.send('Login');
}); 

app.listen(8001, () => {

    console.log('Server is running on port 8001');
});

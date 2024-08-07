require('dotenv').config();
const serviceAccount = require('../../../backend/bookbox-9f0ec-firebase-adminsdk-tk269-a343c479a7.json');

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;

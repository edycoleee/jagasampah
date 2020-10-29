const admin = require("firebase-admin");
const moment = require('moment');

admin.initializeApp();
const db = admin.firestore();

const today = moment().format("YYYY-MM-DD");

module.exports = { admin, db, today };

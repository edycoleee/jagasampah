const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express().use(cors());
const { getAllTodos } = require("./APIs/todos");
const { getTotalResiduTPA } = require("./APIs/jagasampah");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//Route
app.get("/hello1", (req, res) => {
  return res.status(200).send("Hello dari sini saja");
});

app.get("/todos", getAllTodos);

app.get("/residutotal", getTotalResiduTPA);

exports.api = functions.https.onRequest(app);

const functions = require("firebase-functions");
exports.ping = functions
  .region("europe-west3")
  .https.onRequest((req, res) => {
    res.status(200).send("pong");
  });
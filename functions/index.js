
// firebase related setup
const admin = require("firebase-admin");
admin.initializeApp();
// import custom functions
const playground = require("./playground.js");
const bluesky = require("./bluesky.js");
module.exports = {
  ...playground,
  ...bluesky,
};

const db = require("../models");

module.exports = {
  allAccess(req, res) {
    res.status(200).send("Public Content.");
  },

  userBoard(req, res) {
    res.status(200).send("User Content.");
  },

  adminBoard(req, res) {
    res.status(200).send("Admin Content.");
  },

  moderatorBoard(req, res) {
    res.status(200).send("Moderator Content.");
  },
};

const express = require("express");
const router = express.Router();
const { feed } = require("../models");
const { validateToken } = require("../middleware/authMiddleware");
const { verify } = require("jsonwebtoken");

router.get("/feeds", async (req, res) => {
  await feed
    .findAll({ raw: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error(err));
});

router.post("/createfeed", validateToken, async (req, res) => {
  const { name, background_color } = req.body;
  const user = verify(req.body.cookie.split("=")[1], "secret");
  await feed
    .create({
      name: name,
      background_color: background_color,
      userId: user.id,
    })
    .catch((err) => res.json({ error: err }));
  res.status(200).send("Feed Added");
});

module.exports = router;

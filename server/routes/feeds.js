const express = require("express");
const router = express.Router();
const { feed } = require("../models");
const { validateToken } = require("../middleware/authMiddleware");
const { verify } = require("jsonwebtoken");

router.post("/feeds", async (req, res) => {
  let { token } = req.body;
  const validToken = verify(token, "secret");
  await feed
    .findAll({
      raw: true,
      where: {
        userId: validToken.id,
      },
    })
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

router.delete("/delete/:feedId", async (req, res) => {
  const { feedId } = req.params;
  await feed
    .destroy({
      where: {
        id: feedId,
      },
    })
    .then((result) => res.status(200).send("Feed deleted"))
    .catch((err) => console.error(err));
});

router.put("/update/:feedId", async (req, res) => {
  const { feedId } = req.params;
  const { updatedValue } = req.body;
  console.log(req.body);
  console.log(feedId, updatedValue);

  await feed
    .findOne({
      where: {
        id: feedId,
      },
    })
    .then((result) => {
      result.name = updatedValue;
      result.save();
    })
    .catch((err) => console.error(err));
});

module.exports = router;

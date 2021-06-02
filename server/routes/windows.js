const express = require("express");
const router = express.Router();
const { window } = require("../models");

router.post("/windows", async (req, res) => {
  console.log("FEED ID", req.body);
  const { feedId } = req.body;
  await window
    .findAll({
      raw: true,
      where: {
        feedId: feedId,
      },
    })
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

router.post("/createwindow", async (req, res) => {
  const { start_x_l, start_y_l, height_l, width_l, feedId, type, content } =
    req.body[0];
  //   const user = verify(req.body.cookie.split("=")[1], "secret");

  console.log(type, content);
  console.log(req.body);

  if (type || content) {
    await window
      .create({
        start_x_l: start_x_l,
        start_y_l: start_y_l,
        height_l: height_l,
        width_l: width_l,
        feedId: feedId,
        type: type,
        content: content,
      })
      .catch((err) => console.error(err));
    res.status(200).send("Window Added");
  } else {
    await window
      .create({
        start_x_l: start_x_l,
        start_y_l: start_y_l,
        height_l: height_l,
        width_l: width_l,
        feedId: feedId,
      })
      .catch((err) => console.error(err));
    res.status(200).send("Window Added");
  }
});

module.exports = router;

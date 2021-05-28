const express = require("express");
const router = express.Router();
const { window } = require("../models");

router.post("/createwindow", async (req, res) => {
  const { top, left, height, width } = req.body[0];
  console.log(top, left, height, width);
  //   const user = verify(req.body.cookie.split("=")[1], "secret");

  // Problem je naci feedId
  await window
    .create({
      start_x_l: left,
      start_y_l: top,
      height_l: height,
      width_l: width,
    })
    .catch((err) => console.error(err));
  res.status(200).send("Window Added");
});

module.exports = router;

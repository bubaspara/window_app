const express = require("express");
const router = express.Router();
const { user } = require("../models");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
// const { validateToken } = require("../middleware/authMiddleware");

const { sign } = require("jsonwebtoken");

// cookieParser();

router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  await bcrypt.hash(password, 10).then((hash) => {
    user
      .create({
        name: name,
        password: hash,
      })
      .catch((err) => console.error(err));
  });

  res.status(200).send("User Added!");
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const dbUser = await user.findOne({ where: { name: name } });

  if (!dbUser) {
    res.status(400).send("User not found");
  } else {
    await bcrypt
      .compare(password, dbUser.password)
      .then((match) => {
        if (!match) res.status(400).send("Wrong username/password combination");
        const accessToken = sign(
          { name: dbUser.name, id: dbUser.id },
          "secret"
        );
        res
          .status(202)
          .cookie("SID", accessToken, {
            expire: new Date(new Date().getTime() + 3600 * 1000),
          })
          .send("User Found");
      })
      .catch((err) => console.error(err));
  }
});

router.post("/logout", (req, res) => {
  res.status(200).clearCookie("SID").send({ message: "Cookie cleared" });
});

// Might need it in the future
// router.get("/validate", validateToken, (req, res) => {
//   res.send(req.user);
// });

module.exports = router;

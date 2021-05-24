const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;
const whitelist = ["http://localhost:3000"];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
const db = require("./models");

//Routers
const userRouter = require("./routes/users");
app.use("/auth", userRouter);

const feedRouter = require("./routes/feeds");
app.use("/feed", feedRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch((err) => console.error("Error", err));

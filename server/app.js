const express = require("express");
const cors = require("cors");
const Jsonwebtoken = require("jsonwebtoken");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// authorization with token
app.use("/api", async (req, res, next) => {
  try {
    let token_str = req.get("authorization");
    if (token_str) {
      let tokenData = await Jsonwebtoken.verify(token_str, "111");
      if (tokenData) {
        req.user_id = tokenData.user_id;
      }
    }
  } catch (err) {
    return res.status(401).send({ success: 0, data: err });
  }
  next();
});

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add routes.
require("./src/routes/auth.routes.js")(express, app);
require("./src/routes/posting.routes.js")(express, app);
require("./src/routes/user.routes.js")(express, app);

module.exports = app

// Mainly imitates the W8 Prac (sever.js)
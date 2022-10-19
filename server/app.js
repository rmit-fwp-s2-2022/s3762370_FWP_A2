const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

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
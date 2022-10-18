module.exports = (express, app) => {
  const controller = require("../controllers/auth.controller.js");
  const router = express.Router();

  // Create a new user.
  router.post("/sign-up", controller.signUp); 

  // Sign in as a user
  router.post("/sign-in", controller.signIn); 

  // Add routes to server.
  app.use("/api/auth", router);
};

//Mainly imitates the W8 Prac (route part)
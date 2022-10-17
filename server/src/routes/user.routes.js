module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  router.get("/", controller.all);

  // Select all users.
  router.get("/profile", controller.getProfile);

  router.put("/profile", controller.updateProfile);

  router.delete("/profile", controller.deleteProfile);

  router.get("/search", controller.searchUsers);

  router.get("/followUsers", controller.getFollowUsers);
  
  router.post("/follow/:user_id", controller.followUser);

  router.post("/unfollow/:user_id", controller.unfollowUser);

  // Add routes to server.
  app.use("/api/users", router);
};

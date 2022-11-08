module.exports = (express, app) => {
  const controller = require("../controllers/posting.controller.js")
  const router = express.Router()

  router.get("/users/:user_id", controller.getUserPostings)

  router.get("/:posting_id", controller.getPosting)

  router.post("/", controller.createPosting)

  router.get("/", controller.getAllPosting)

  router.put("/:posting_id", controller.editPosting)

  router.delete("/:posting_id", controller.deletePosting)

  router.delete("/", controller.delPostingByUser)

  router.post("/reply/:posting_id", controller.replyPosting)

  // router.post("/like/:posting_id", controller.followUser)

  // router.post("/unlike/:user_id", controller.unfollowUser)

  // Add routes to server.
  app.use("/api/postings", router)
}

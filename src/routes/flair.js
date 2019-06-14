const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController");

router.get("/posts/:postId/flair/new", flairController.new);
router.post("/posts/:postId/flair/create", flairController.create);
router.get("/posts/:postId/flair/:id", flairController.show);
router.post("/posts/:postId/flair/:id/destroy", flairController.destroy);
router.get("/posts/:postId/flair/:id/edit", flairController.edit);
router.post("/posts/:postId/flair/:id/update", flairController.update);

module.exports = router;

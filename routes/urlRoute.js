const express = require("express");
const { analyticsShortUrl, getShortUrl, createShortUrl } = require("../controllers/UrlController");

const urlRouter = express.Router();

urlRouter.route("/").get(createShortUrl);

urlRouter.route("/").post(createShortUrl);

urlRouter.route("/:id").get(getShortUrl);

urlRouter.route("/analytics/:shortId").get(analyticsShortUrl);

module.exports = urlRouter;

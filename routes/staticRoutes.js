const express = require("express");

const staticRouter = express.Router();

staticRouter.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home Page",
  });
});

staticRouter.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Us",
  });
});

staticRouter.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "Conatct Us",
  });
});

staticRouter.get("/shorten_url", (req, res) => {
  res.render("shorten_url", {
    pageTitle: "Create Shorten Url",
    isCreated: false,
  });
});

module.exports = staticRouter;

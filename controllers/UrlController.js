const shortid = require("shortid");
const UrlModel = require("../models/UrlModel");

const createShortUrl = async (req, res) => {
  let isCreated,
    shortId = null;

  const urls = await UrlModel.find({});

  if (req.method === "GET") {
    isCreated = false;
  } else {
    isCreated = true;
    const body = req.body;

    shortId = shortid.generate(8);
    const url = await UrlModel.create({
      shortId: shortId,
      redirectURL: body.url,
      visithistory: [],
    });
  }

  res.render("shorten_url", {
    pageTitle: "Create Shorten Url",
    isCreated: isCreated,
    shortId,
    urls,
  });
};

const getShortUrl = async (req, res) => {
  const shortId = req.params.id;

  const url = await UrlModel.findOneAndUpdate({ shortId }, { $push: { visithistory: { timestamp: Date.now() } } });

  if (!url) return res.status(404).end("Not found");

  res.redirect(url.redirectURL);
};

const analyticsShortUrl = async (req, res) => {
  const shortId = req.params.shortId;

  const result = await UrlModel.findOne({ shortId });

  if (!result) return res.status(404).end("Not found");

  res.status(200).send({ totalClicks: result.visithistory.length, analytics: result.visithistory });
};

module.exports = {
  createShortUrl,
  getShortUrl,
  analyticsShortUrl,
};

const shortid = require("shortid");
const UrlModel = require("../models/UrlModel");

const createShortUrl = async (req, res) => {
  const body = req.body;

  const shortId = shortid.generate(8);
  const url = await UrlModel.create({
    shortId: shortId,
    redirectURL: body.url,
    visithistory: [],
  });

  return res.status(201).send({ status: "OK", shortId: shortId });
};

const getShortUrl = async (req, res) => {
  const shortId = req.params.id;

  const url = await UrlModel.findOneAndUpdate({ shortId }, { $push: { visithistory: { timestamp: Date.now() } } });

  if (!url) return res.status(404).end("Not found");

  res.status(200).send({ status: "OK", redirectURL: url.redirectURL });
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

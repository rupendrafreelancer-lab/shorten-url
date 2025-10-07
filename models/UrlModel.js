const { default: mongoose } = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visithistory: [{ timestampe: { type: Number } }],
  },
  { timestamps: true }
);

const UrlModel = mongoose.model("url", urlSchema);

module.exports = UrlModel;

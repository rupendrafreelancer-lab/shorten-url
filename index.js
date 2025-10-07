const express = require("express");
const { mongooseConnect } = require("./config");
const urlRouter = require("./routes/urlRoute");
const loggerReqRes = require("./middlewares/logger");

const app = express();
const PORT = 8000;

// Connection
mongooseConnect("mongodb://127.0.0.1:27017/short_url")
  .then((res) => console.log("DB Connected"))
  .catch((err) => console.log("DB Error", err));

// Middlewares
app.use(express.json());
app.use(loggerReqRes("log.txt"));

// Router
app.use("/api/url", urlRouter);

// Express Start
app.listen(PORT, () => {
  console.log("Server started on http://localhost:8000");
});

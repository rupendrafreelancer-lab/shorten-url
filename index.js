const path = require("path");
const express = require("express");
const { mongooseConnect } = require("./config");
const urlRouter = require("./routes/urlRoute");
const loggerReqRes = require("./middlewares/logger");
const staticRouter = require("./routes/staticRoutes");

const app = express();
const PORT = 8000;

// Connection
mongooseConnect("mongodb://127.0.0.1:27017/short_url")
  .then((res) => console.log("DB Connected"))
  .catch((err) => console.log("DB Error", err));

// Set view
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(loggerReqRes("log.txt"));

// Router
app.use("/url", urlRouter);
app.use("/", staticRouter);

// Express Start
app.listen(PORT, () => {
  console.log("Server started on http://localhost:8000");
});

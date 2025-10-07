const fs = require("fs");

function loggerReqRes(fileName) {
  return (req, res, next) => {
    const log = `${Date.now()} - ${req.method} - ${req.socket.remoteAddress} - ${req.url} New Request Received\n`;

    fs.appendFile(fileName, log, (error) => {
      if (error) res.end("Error in request");

      next();
    });
  };
}

module.exports = loggerReqRes;

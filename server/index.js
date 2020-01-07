const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");
const api = require("./api");
const notifications = require("./notifications");

const app = express();
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("*", function(request, response, next) {
  if (request.headers.accept.includes("text/html")) {
    const html = fs.readFileSync(path.resolve("dist/index.html"), "utf8");

    response
      .status(200)
      .contentType("text/html")
      .send(html);
  } else {
    next();
  }
});

api.init(app);
notifications.init();

const port = process.env.SERVER_PORT || 3000;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
});

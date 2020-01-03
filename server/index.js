const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");
const api = require("./api");
const notifications = require("./notifications");

const app = express();
app.use(bodyParser.json());
app.use(express.static("dist"));

api.init(app);
notifications.init();

const port = process.env.SERVER_PORT || 3000;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
});

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");
const api = require("./api");
const notifications = require("./notifications");

const app = express();
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use(express.static("public"));

app.get("/todos/:todoId", function(request, response, next) {
  if (request.headers.accept.includes("text/html")) {
    return response.sendFile(path.join(__dirname, "../dist", "index.html"));
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

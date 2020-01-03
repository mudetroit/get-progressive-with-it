const fs = require("fs");
const path = require("path");
const process = require("process");

const Sequelize = require("sequelize");
const webPush = require("web-push");

const database = require("./database");

const VAPID_KEYS_PATH = path.resolve(process.cwd() + "/vapid-keys.json");

console.log(`${VAPID_KEYS_PATH} exists: ${fs.existsSync(VAPID_KEYS_PATH)}`);
if (!fs.existsSync(VAPID_KEYS_PATH)) {
  console.log("Creating VAPID Keys");
  const keys = webPush.generateVAPIDKeys();
  fs.writeFileSync(VAPID_KEYS_PATH, JSON.stringify(keys));
}

const vapid = require(VAPID_KEYS_PATH);

class Notification extends Sequelize.Model {
  push({ subscription, todo }) {
    const options = {
      // TTL is the time to live, the time that the notification will be queued in the push service
      // this value is in seconds. For our purposes we will keep it for an hour.
      TTL: 60 * 60,
      vapidDetails: {
        subject: "email@example.com",
        ...vapid
      }
    };

    const data = {
      id: todo.id,
      title: "Get Progressive with it",
      body: `${todo.body} due at: ${todo.dueDate.toString()}`
    };

    webpush.sendNotification(subscription, data, options).then(function() {
      this.update({ pushed: true }).then(function() {
        console.log("Notification pushed");
      });
    });
  }
}

Notification.init(
  { pushed: Sequelize.BOOLEAN },
  { sequelize: database, modelName: "notification" }
);

module.exports = Notification;

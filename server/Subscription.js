const Sequelize = require("sequelize");

const database = require("./database");
const Notification = require("./Notification");

class Subscription extends Sequelize.Model {}

Subscription.init(
  {
    subscription: Sequelize.JSON
  },
  { sequelize: database, modelName: "subscription" }
);

Subscription.hasMany(Notification);
Notification.belongsTo(Subscription);

module.exports = Subscription;

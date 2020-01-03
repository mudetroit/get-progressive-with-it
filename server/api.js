const finale = require("finale-rest");

const database = require("./database");
const Todo = require("./Todo");
const Subscription = require("./Subscription");

exports.init = function init(app) {
  finale.initialize({ app, sequelize: database });

  finale.resource({
    model: Todo,
    endpoints: ["/todos", "/todos/:id"]
  });

  finale.resource({
    model: Subscription,
    endpoints: ["/subscription"]
  });
};

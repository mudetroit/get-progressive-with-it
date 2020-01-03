const Sequelize = require("sequelize");

const database = require("./database");
const Notification = require("./Notification");

class Todo extends Sequelize.Model {}

Todo.init(
  {
    body: Sequelize.STRING,
    dueDate: Sequelize.DATE,
    complete: Sequelize.BOOLEAN
  },
  { sequelize: database, modelName: "todo" }
);

Todo.hasMany(Notification);
Notification.belongsTo(Todo);

module.exports = Todo;

const { Op } = require("sequelize");

const Subscription = require("./Subscription");
const Todo = require("./Todo");
const Notification = require("./Notification");

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

exports.init = function init() {
  const now = new Date();
  const oneHourFromNow = new Date().setTime(
    now.getTime() + ONE_HOUR_IN_MILLISECONDS
  );

  // Check for todos requiring a notification and sendd them once a minute
  setInterval(() => {
    Subscription.findAll()
      .then(function(subscriptions) {
        Todo.findAll({
          where: {
            complete: {
              [Op.eq]: false
            },
            dueDate: {
              [Op.between]: [now, oneHourFromNow]
            }
          }
        }).then(function(pendingTodos) {
          pendingTodos.forEach(function(todo) {
            subscriptions.forEach(function(subscription) {
              Notification.findOrCreate({
                where: {
                  subscriptionId: subscription.id,
                  todoId: todo.id
                },
                defaults: {
                  pushed: false
                }
              }).then(function([notification]) {
                notification.push(subscription.subscription, todo);
              });
            });
          });
        });
      })
      .catch(function(err) {
        console.error(err);
      });
  }, 60000);
};

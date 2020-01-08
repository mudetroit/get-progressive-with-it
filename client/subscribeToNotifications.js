<<<<<<< HEAD
const applicationServerKey = import("../vapid-keys.json");
=======
const applicationServerKey = import("./vapid-keys.json");
>>>>>>> :sparkles: (client) Setup push notifications

function saveSubcription(subscription) {
  fetch("/todos", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subscription })
  });
}

export default function subscribeToNotifications() {
  // Ordinarily you would want to check that permission is in default state
  // before doing this
  // if (Notification.permission === "default") {
  Notification.requestPermission().then(result => {
    if (result === "denied") {
      console.log("Permission denied");
      return;
    }

    if (result === "granted") {
      console.log("Permission granted");
      /* This means the user has clicked the Allow button. We’re to get the subscription token generated by the browser and store it in our database.

          The subscription token can be fetched using the getSubscription method available on pushManager of the serviceWorkerRegistration object. If subscription is not available, we subscribe using the subscribe method available on pushManager. The subscribe method takes in an object.
          */

      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then(subscription => {
          if (!subscription) {
            const applicationServerKey = "";
            serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey
            });
          }
        })
        .then(() => {
          serviceWorkerRegistration.pushManager
            .getSubscription()
            .then(subscription => saveSubcription(subscription));
        });
    }
  });
  // }
}

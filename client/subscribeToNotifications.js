const applicationServerKey = import("../vapid-keys.json");

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
  alert("Subscribe to push notifications here");
}

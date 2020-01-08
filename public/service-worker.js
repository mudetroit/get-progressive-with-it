// This could also be multiple caches
const CACHE_NAME = "GPW_V1";

self.addEventListener("install", event => {
  let urlsToCache = [
    "/",
    "/android-icon-144x144.7989e46a.png",
    "/android-icon-192x192.cf3804e4.png",
    "/android-icon-48x48.adf25686.png",
    "/android-icon-72x72.acef788a.png",
    "/android-icon-96x96.8c828c3f.png",
    "/app.b1cef154.css",
    "/client.5ebb7743.js",
    "/manifest.webmanifest"
  ];
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", event => {
  let options = {
    body: event.data.body,
    icon: "android-icon-72x72.acef788a.png"
  };
  event.waitUntil(
    self.registration.showNotification(event.data.title, options)
  );
});

self.addEventListener("install", (event) => {
  console.log("serviceWorker installed!");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open("our-app")
      .then((cache) =>
        cache.addAll([
          "index.html",
          "css\main.css",
          "js/main.js",
          "footer.html",
          "navbar.html",
          "article1.html",
        ])
      )
  );
});

self.addEventListener("activate", (event) => {
  console.log("serviceWorker Activated!");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request.url).then((file) => {
      if (file) {
        console.log(file);
        console.log("inside if statment");
        return file;
      } else {
        console.log("network request");
        return fetch(event.request.url);
      }
    })
  );
});

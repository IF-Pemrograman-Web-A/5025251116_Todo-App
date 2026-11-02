const CACHE = "todo-aoi-v1";
const SHELL = [
  "./",
  "./index.php",
  "./index.php?type=personal",
  "./index.php?type=shared",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./offline.html",
  "./img/icon-192.png",
  "./img/icon-512.png",
];

// Install
self.addEventListener("install", (event) => {
  console.log("Service Worker: Terinstal");
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Aktif");
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name.startsWith("todo-aoi-") && name !== CACHE)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Cache First
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return Response.error();
  }
}

// Network First
async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") return cache.match("./offline.html");
    return Response.error();
  }
}

// Stale-While-Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const fetching = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => Response.error());
  return (await cache.match(request)) || fetching;
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  if (event.request.mode === "navigate" || url.pathname.endsWith("api.php")) {
    event.respondWith(networkFirst(event.request));
  } else if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")) {
    event.respondWith(staleWhileRevalidate(event.request));
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
});
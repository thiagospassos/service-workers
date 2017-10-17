self.importScripts('./util/util.js');
const _cache = "sw-cache";

self.addEventListener('install', function (event) {

    event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', function (event) {
    console.log(`FETCH: ${event.request.url}`);

    event.respondWith(fetch(event.request)
        .then(networkResponse => {
            console.log(`WORKER: Updating cache: ${event.request.url}`);
            var clone = networkResponse.clone();
            caches.open('sw-cache').then(cache => cache.put(event.request, clone));
            return networkResponse;
        })
        .catch(_ => {
            console.log(`WORKER: Serving from cache: ${event.request.url}`);
            return caches.open('sw-cache').then(cache => cache.match(event.request));
        })
    );
});
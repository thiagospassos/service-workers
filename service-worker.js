self.importScripts('./util/util.js');
const _cache = 'sw-cache';

self.addEventListener('install', function (event) {

    event.waitUntil(_ => self.skipWaiting());
});

self.addEventListener('fetch', function (event) {
    console.log(`FETCH: ${event.request.url}`);

    event.respondWith(fetch(event.request)
        .then(networkResponse => {
            console.log(`WORKER: Updating cache: ${event.request.url}`);
            var clone = networkResponse.clone();
            caches.open(_cache).then(cache => cache.put(event.request, clone));
            return networkResponse;
        })
        .catch(_ => {
            console.log(`WORKER: Serving from cache: ${event.request.url}`);
            return caches.open(_cache).then(cache => cache.match(event.request));
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "$${event.data.text()}"`);

    const title = 'Push';
    const options = {
        body: 'Yay it works.',
        icon: './images/chrome.png',
        badge: './images/ie.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('sync', function (event) {
    if (event.tag == 'demo-sync') {
        doSomeStuff(event.tag).then(result => {
            self.registration.showNotification('Sync worked', {
                body: 'worked',
                icon: './images/safari.png'
            })
        });
    }
});
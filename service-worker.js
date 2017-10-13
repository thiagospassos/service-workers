//self.importScripts('./util/util.js')

self.addEventListener('install', function (event) {
    console.log('Install event');


    event.waitUntil(_ => self.skipWaiting());
});


self.addEventListener('fetch', function (event) {
    console.log(`FETCH: ${event.request.url}`);

    //prank
    // if(event.request.url.endsWith("png")){
    //     event.respondWith(fetch('./images/chrome.png'));
    // }

    //cache 1
    event.respondWith(fetch(event.request)
        .then(networkResponse => {
            console.log(`WORKER: Updating cache: ${event.request.url}`);
            var clone = networkResponse.clone();
            caches.open('mycache').then(cache => cache.put(event.request, clone));
            return networkResponse;
        })
        .catch(_ => {
            console.log(`WORKER: Serving from cache: ${event.request.url}`);
            return caches.open('mycache').then(cache => cache.match(event.request));
        })
    );
});
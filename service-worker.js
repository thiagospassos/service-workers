//self.importScripts('./util/util.js')

self.addEventListener('install', function (event) {
    console.log('Install event');

    event.waitUntil(self.skipWaiting());
});


self.addEventListener('fetch', function (event) {
    console.log(`FETCH: ${event.request.url}`);

    if(event.request.url.endsWith("png")){
        event.respondWith(fetch('./images/ie.png'));
    }
});
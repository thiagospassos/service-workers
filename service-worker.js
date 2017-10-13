self.importScripts('./util/util.js');

self.addEventListener('install', function (event) {
    console.log('Install event');
    self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
    console.log(`FETCH: ${event.request.url}`);

    //prank
    // if (event.request.url.endsWith("png")) {
    //     event.respondWith(fetch('./images/chrome.png'));
    // }

    // cache 1
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

self.addEventListener('sync', function (event) {
    console.log(event);
    if (event.tag == 'demo-sync') {
        event.waitUntil(doSomeStuff().then(() => {
            self.registration.showNotification('Sync event fired!',{
                icon:"./images/chrome.png",
                body:"Aweeeeesome! I'm in sync now."
            });
        }).catch(() => {
            console.error("Error syncing");
        }));
    }
})

self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = './images/ie.png';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});
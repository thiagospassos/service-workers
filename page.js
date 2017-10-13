if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {

            Notification.requestPermission(function (result) {
                console.log(`REGISTER: requesting permission ${result}`);
            });

            document.getElementById('sync').addEventListener('click', () => {
                registration.sync.register('demo-sync').then(() => {
                    console.log('sync registered');
                }).catch(function (error) {
                    console.log('Unable to fetch image.');
                });
            });

        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
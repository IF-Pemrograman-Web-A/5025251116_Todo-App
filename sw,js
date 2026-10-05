self.addEventListener('install', (event) => {
    console.log('Service Worker: Terinstal');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Aktif');
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
});
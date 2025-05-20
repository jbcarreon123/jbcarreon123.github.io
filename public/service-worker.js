const CACHE_NAME = 'jbsite4_caching';
const ASSETS_TO_CACHE = [
    /\.html$/,
    /\/_astro\/.*/,
    /\.css$/,
    /\.js$/,
    /\/fonts\/.*/,
];

self.addEventListener('install', event => {
    event.waitUntil(
        self.skipWaiting()
    );
    console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(cacheName => {
                        return cacheName !== CACHE_NAME;
                    }).map(cacheName => {
                        return caches.delete(cacheName);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
    console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    const shouldCache = ASSETS_TO_CACHE.some(pattern => {
        return pattern.test(url.pathname);
    });
    if (!shouldCache) return;
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.match(event.request)
                    .then(response => {
                        if (response) {
                            return response;
                        }
                        return fetch(event.request)
                            .then(networkResponse => {
                                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                                    return networkResponse;
                                }
                                const responseToCache = networkResponse.clone();
                                cache.put(event.request, responseToCache);
                                return networkResponse;
                            });
                    });
            })
    );
});
const CACHE_NAME = 'new-app-pwa-v1'
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'main.js',
    'articles.json',
    'main.css',
    'sw.js'
]

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLS_TO_CACHE)
            })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                // If request data exist in the cache (cache first)
                if (response) {
                    return response
                }
                // If request data is not in the cache (network later)
                return fetch(e.request)
                    .then(response => {
                        // If cannot get response from server
                        if (!response || response.status !== 200) {
                            return response
                        }

                        // If got response from server
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                // Update cache
                                cache.put(e.request, responseToCache)
                            })

                        return response
                    })
            })

    )
})
const VERSION_FORCE = '3';
const CACHE_NAME = 'tick_trump_' + VERSION_FORCE;

// Perform install steps (cache statics)
self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE_NAME)
    .then(cache =>
      cache.addAll([
        '/',
      ])
    ).then(() => self.skipWaiting())
));

// clear old cache
self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(keyList => Promise.all(
    keyList.map((key) => {
      if (key !== CACHE_NAME) {
        return caches.delete(key);
      }
      return null;
    })
  ))
));

// Check cache for values
self.addEventListener('fetch', (event) => {
  return event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(event.request)
        .then(response => response || fetch(request).then(response))
      )
  );
});

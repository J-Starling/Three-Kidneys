const CACHE_NAME = 's-kidneys-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon512_rounded.png',
  '/icon512_maskable.png',
  '/service_worker.js',
  '/organs.html',
  '/feedback.php',
  '/form.php',
  '/contacts.html',
  '/style.css',
  '/kidney_l.png',
  '/kidney_r.png',
  '/logo.png',
  '/dmitriy.jpg',
  '/organs/heart.png',
  '/organs/kidney.png',
  '/organs/intestine.png',
  '/organs/brain.png',
  '/organs/liver.png',
  '/organs/stomach.png',
  '/organs/lungs.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(err => console.log('Cache error:', err))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        return cached || fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200) return response;
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => 
          key !== CACHE_NAME ? caches.delete(key) : Promise.resolve()
        )
      )
    )
  );
});
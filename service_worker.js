const CACHE_NAME = 's-kidneys-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon512_rounded.png',
  '/icon512_maskable.png',
  '/service_worker.js',
  '/organs.html',
  '/game.html',
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

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  if (event.request.method !== 'GET') {
    return fetch(event.request);
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
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

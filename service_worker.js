const CACHE_NAME = 'three-kidneys-v4';
const ASSETS = [
  '/Three-Kidneys/',
  '/Three-Kidneys/index.html',
  '/Three-Kidneys/manifest.json',
  '/Three-Kidneys/icon512_rounded.png',
  '/Three-Kidneys/icon512_maskable.png',
  '/Three-Kidneys/service_worker.js',
  '/Three-Kidneys/organs.html',
  '/Three-Kidneys/surgery.html',
  '/Three-Kidneys/casino.html',
  '/Three-Kidneys/contacts.html',
  '/Three-Kidneys/style.css',
  '/Three-Kidneys/kidney_l.png',
  '/Three-Kidneys/kidney_r.png',
  '/Three-Kidneys/logo.png',
  '/Three-Kidneys/dmitriy.jpg',
  '/Three-Kidneys/organs/heart.png',
  '/Three-Kidneys/organs/kidney.png',
  '/Three-Kidneys/organs/intestine.png',
  '/Three-Kidneys/organs/brain.png',
  '/Three-Kidneys/organs/liver.png',
  '/Three-Kidneys/organs/stomach.png',
  '/Three-Kidneys/organs/lungs.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(err => console.log('Cache error:', err))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Пропускаем не-GET запросы и chrome-extension
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        // Возвращаем кэшированную версию, если есть
        if (cached) {
          return cached;
        }
        
        // Иначе загружаем из сети
        return fetch(event.request)
          .then(response => {
            // Кэшируем только успешные ответы
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => {
            // Fallback для страниц
            if (event.request.destination === 'document') {
              return caches.match('/Three-Kidneys/index.html');
            }
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
  self.clients.claim();
});
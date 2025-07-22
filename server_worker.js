self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэшируем основные файлы');
        return cache.addAll(urlsToCache).catch(err => {
          console.error('Ошибка кэширования:', err);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(
          response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
const assetUrls = [
	'/Three-Kidneys/',
	'/Three-Kidneys/index.html',
	'/Three-Kidneys/organs.html',
	'/Three-Kidneys/feedback.php',
	'/Three-Kidneys/contacts.html',
	'/Three-Kidneys/style.css',
	'/Three-Kidneys/kidney_l.png',
	'/Three-Kidneys/kidney_r.png',
	'/Three-Kidneys/logo.png',
	'/Three-Kidneys/dmitriy.png',
	'/Three-Kidneys/organs/heart.png',
	'/Three-Kidneys/organs/kidney.png',
	'/Three-Kidneys/organs/intestine.png',
	'/Three-Kidneys/organs/brain.png',
	'/Three-Kidneys/organs/liver.png',
	'/Three-Kidneys/organs/stomach.png',
	'/Three-Kidneys/organs/lungs.png'
]

const CACHE_NAME = 's-app-v1'
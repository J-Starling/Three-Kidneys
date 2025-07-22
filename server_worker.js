self.addEventListener('activate', event => {
	console.log([SW]: activate)
})

self.addEventListener('install', async event => {
	console.log([SW]: install)
	const cache = await caches.open(staticCacheName)
	await cache.addAll(assetUrls)
})

self.addEventListener('install', async event => {
	console.log('Fetch', event.request)
	event.respondWith(cacheFirst(event.request))
	const cache = await caches.open(staticCacheName)
	await cache.addAll(assetUrls)
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	return cached ?? await fetch(request)

const assetUrls = [
	'index.html',
	'organs.html',
	'feedback.php',
	'contacts.html',
	'style.css',
	'kidney_l.png',
	'kidney_r.png',
	'logo.png',
	'dmitriy.png',
	'organs/heart.png',
	'organs/kidney.png',
	'organs/intestine.png',
	'organs/brain.png',
	'organs/liver.png',
	'organs/stomach.png',
	'organs/lungs.png'
]

const staticCacheName = 's-app-v1'
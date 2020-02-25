if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [])
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
} else {
  console.log('Service workers not supported')
}


self.addEventListener("install", event => {
  console.log('caching urls')
  const urlsToCache = [
    '/logo.png',
    '/src/App.css',
    '/src/index.js',
    '/src/images/logo.png',
    '/src/static/tubeMap.js'
]
  event.waitUntil(
    cacheResources(urlsToCache)
  )
});

const cacheResources = async (urlsToCache) => {
  const cache = await caches.open("status")
  return cache.addAll(urlsToCache)
}

const clearCache = async () => {
  const cache = await caches.open("status")
    const cacheNames = await cache.keys()
    return cacheNames.filter(cacheName => cacheNames.indexOf(cacheName) === -1).map(async cacheName =>  await cache.delete(cacheName))
}

self.addEventListener('activate', event => {
  event.waitUntil(clearCache())
}) 



self.addEventListener('fetch', async event => {
  event.respondWith(event.request.destination === "image" ? 
  fetchDataCacheFirst(event) : fetchDataNetworkFirst(event))
})

const fetchDataNetworkFirst = async event => {
  try {
    return await fetch(event.request);
  } catch (err) {
    return await caches.match(event.request);
  }
}

const fetchDataCacheFirst = async event => {
  try {
    console.log('about to return image')
    return await caches.match(event.request)
  } catch (err) {
    console.log('error in fetch ', err)
    return await fetch(event.request)
  }
}
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
    '/',
    '/main.js',
    '/logo.png',
    '/styles/main.css',
    '/script/main.js',
    '/manifest.json',
    '/static/css',
    '/static/js',
    '/src/App.css',
    '/src/index.js',
    '/tubeMap.js',
    '/static/js/bundle.js',
    '/static/js/0.chunk.js',
    '/static/js/main.chunk.js',
    'https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status'
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
  console.log('activating')
  // event.waitUntil(clearCache())
}) 


self.addEventListener('fetch', async event => {
  console.log('event.request ', event.request)
  event.respondWith(event.request.destination === "image" ? 
  fetchDataCacheFirst(event) : fetchDataNetworkFirst(event))
})

const fetchDataNetworkFirst = async event => {
  try {
    console.log('about to return non-image from network request', await fetch(event.request))
    return await fetch(event.request);
  } catch (err) {
    console.log('falling back to cache ', await caches.match(event.request))
    return await caches.match(event.request);
  }
}

const fetchDataCacheFirst = async event => {
  try {
    console.log('about to return image from cache ', await caches.match(event.request))
    return caches.match(event.request)
  } catch (err) {
    console.log('error in fetch ', err)
    return fetch(event.request)
  }
}

// self.addEventListener('fetch', event => {
//   event.respondWith(fetchDataAndUpdateCache(event))
// })

// const fetchDataAndUpdateCache = async event => {
//   const cache = await caches.open("status")
//   const cacheResponse = await cache.match(event.request)
//   const networkResponse = await fetch(event.request)

//   event.waitUntil(
//     updateCache(cache, event, cacheResponse, networkResponse)
//   )

  
// }

// const updateCache = async (cache, event, cacheResponse, networkResponse) => {
//    await cache.put(event.request, networkResponse.clone())
//    return cacheResponse || networkResponse 
// }

// self.addEventListener('sync', event => {
//   const urlsToCache = ["https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status"]
//   event.waitUntil(cacheResources(urlsToCache))
// })
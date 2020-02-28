if ("function" === typeof importScripts) {
 
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );

  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    const { NetworkFirst } = workbox.strategies;
    const { BroadcastUpdatePlugin } = workbox.broadcastUpdate;

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html");

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      /\.(?:js|json|css|html)$/,
      workbox.strategies.cacheFirst({
        cacheName: "assets",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      // cache dynamic data
      "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status",
      new NetworkFirst({
        networkTimeoutSeconds: 2,
        cacheName: "statuses"
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
//  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

//  const {registerRoute} = workbox.routing;
//  const {CacheFirst, NetworkFirst} = workbox.strategies;
//  const { BroadcastUpdatePlugin } = workbox.broadcastUpdate
//   /* global workbox */
//   if (workbox) {
//     console.log('Workbox is loaded')
//   } else {
//     console.log('Workbox could not be loaded. No Offline support')
//   }
//     /* injection point for manifest files.  */
//     workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [])

//     registerRoute(
//       /\.html$/,
//       new NetworkFirst()
//     )

//     registerRoute(
//       // Cache image files.
//       /\.(?:png|jpg|jpeg|svg|gif)$/,
//       // Use the cache if it's available.
//       new CacheFirst({
//         // Use a custom cache name.
//         cacheName: 'image-cache'
//       })
//     );

//     navigator.serviceWorker.addEventListener('install', e => console.log('installing'))
//     navigator.serviceWorker.addEventListener('activate', e => console.log('activating'))

//   navigator.serviceWorker.addEventListener('message', async (event) => {
//     console.log('message event listener ', event)
//     // Optional: ensure the message came from workbox-broadcast-update
//     if (event.data.meta === 'workbox-broadcast-update') {
//       const {cacheName, updatedUrl} = event.data.payload;

//       // Do something with cacheName and updatedUrl.
//       // For example, get the cached content and update
//       // the content on the page.
//       const cache = await caches.open(cacheName);
//       const updatedResponse = await cache.match(updatedUrl);
//       const updatedText = await updatedResponse.text();
//       console.log('updated text ', updatedText)
//     }
//   });

// // self.addEventListener("install", event => {
// //   console.log('caching urls')
// //   const urlsToCache = [
// //     '/',
// //     '/main.js',
// //     '/logo.png',
// //     '/styles/main.css',
// //     '/script/main.js',
// //     '/manifest.json',
// //     '/static/css',
// //     '/static/js',
// //     '/src/App.css',
// //     '/src/index.js',
// //     '/tubeMap.js',
// //     '/static/js/bundle.js',
// //     '/static/js/0.chunk.js',
// //     '/static/js/main.chunk.js',
// //     'https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status'
// // ]
// //   event.waitUntil(
// //     cacheResources(urlsToCache)
// //   )
// // });

// // const cacheResources = async (urlsToCache) => {
// //   const cache = await caches.open("status")
// //   return cache.addAll(urlsToCache)
// // }

// // const clearCache = async () => {
// //   const cache = await caches.open("status")
// //     const cacheNames = await cache.keys()
// //     return cacheNames.filter(cacheName => cacheNames.indexOf(cacheName) === -1).map(async cacheName =>  await cache.delete(cacheName))
// // }

// // self.addEventListener('activate', event => {
// //   event.waitUntil(clearCache())
// // })

// // self.addEventListener('fetch', async event => {
// //   event.respondWith(event.request.destination === "image" ?
// //   fetchDataCacheFirst(event) : fetchDataNetworkFirst(event))
// // })

// // const fetchDataNetworkFirst = async event => {
// //   try {
// //     return await fetch(event.request);
// //   } catch (err) {
// //     return await caches.match(event.request);
// //   }
// // }

// // const fetchDataCacheFirst = async event => {
// //   try {
// //     console.log('about to return image')
// //     return await caches.match(event.request)
// //   } catch (err) {
// //     console.log('error in fetch ', err)
// //     return await fetch(event.request)
// //   }
// // }

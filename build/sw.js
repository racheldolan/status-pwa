if ("function" === typeof importScripts) {
 
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );

  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    const { registerRoute, NavigationRoute } = workbox.routing
    const { NetworkFirst, CacheFirst } = workbox.strategies;
    const {BroadcastCacheUpdate} = workbox.broadcastUpdate;
    const { createHandlerBoundToURL} = workbox.precaching
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"850fdc7072b6be568187305c7bcb935c","url":"index.html"},{"revision":"03e67ea39f1f3ece3fadc709120c8c24","url":"logo.png"},{"revision":"4065eb260427f16cd7384c910de862d1","url":"precache-manifest.4065eb260427f16cd7384c910de862d1.js"},{"revision":"15f52944ca39b55f715a08f5e1880b05","url":"service-worker.js"},{"revision":"dc489a872fc84c28852170966caf3af4","url":"static/css/2.adcb3f64.chunk.css"},{"revision":"eac203985bdb019f84605aac04abb861","url":"static/css/main.5ecd60fb.chunk.css"},{"revision":"f77a59aa686cac856773083559fe8df9","url":"static/js/2.d9feadb0.chunk.js"},{"revision":"c461af23b6744b59f8cb66475db16a5b","url":"static/js/main.8c5db200.chunk.js"},{"revision":"2268e49d1a0444ea0a177fcc48a7fd28","url":"static/js/runtime-main.cb33f444.js"},{"revision":"9c74e172f87984c48ddf5c8108cabe67","url":"static/media/flags.9c74e172.png"},{"revision":"03e67ea39f1f3ece3fadc709120c8c24","url":"static/media/logo.03e67ea3.png"}]);
    workbox.precaching.precacheAndRoute([{url: '/index.html'}])
    // /* custom cache rules*/
    // workbox.routing.registerNavigationRoute("/index.html");
    
    registerRoute(
      /\.(?:png|gif|jpg|jpeg|js|json|css|html)$/,
      new NetworkFirst({
        cacheName: "assets"
      })
      );
      
      const handler = createHandlerBoundToURL(`/index.html`)
      const navigationRoute = new NavigationRoute(handler)
      registerRoute(navigationRoute)

    registerRoute(
      // cache dynamic data
      "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status",
      new NetworkFirst({
        networkTimeoutSeconds: 2,
        cacheName: "statuses",
        plugins: [
          new BroadcastCacheUpdate('status-updates')
        ]
      })
    );

    self.addEventListener('message', async (event) => {
    console.log('message event listener ', event)
    // Optional: ensure the message came from workbox-broadcast-update
    if (event.data.meta === 'workbox-broadcast-update') {
      const {cacheName, updatedUrl} = event.data.payload;

      // Do something with cacheName and updatedUrl.
      // For example, get the cached content and update
      // the content on the page.
      const cache = await caches.open(cacheName);
      const updatedResponse = await cache.match(updatedUrl);
      const updatedText = await updatedResponse.text();
      console.log('updated text ', updatedText)
    }
  });
  
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

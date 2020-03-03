if ("function" === typeof importScripts) {
 
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    const version = "0.1.0"
    const { registerRoute, NavigationRoute } = workbox.routing
    const { NetworkFirst, CacheFirst, StaleWhileRevalidate } = workbox.strategies;
    const {BroadcastCacheUpdate} = workbox.broadcastUpdate;
    const { createHandlerBoundToURL} = workbox.precaching
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"97fb970eba78aeaa26b40bef5e17c9b0","url":"index.html"},{"revision":"03e67ea39f1f3ece3fadc709120c8c24","url":"logo.png"},{"revision":"f7826d4814016d0838868845ee54fff8","url":"precache-manifest.f7826d4814016d0838868845ee54fff8.js"},{"revision":"08585b095aa516fd4df47ec7f9ecb599","url":"service-worker.js"},{"revision":"dc489a872fc84c28852170966caf3af4","url":"static/css/2.adcb3f64.chunk.css"},{"revision":"eac203985bdb019f84605aac04abb861","url":"static/css/main.5ecd60fb.chunk.css"},{"revision":"87741f406909281b3143ccef5974b730","url":"static/js/2.7dfa8b27.chunk.js"},{"revision":"9e1ffa664891cd2c8a9cbd22ba39532c","url":"static/js/main.5e159f2b.chunk.js"},{"revision":"2268e49d1a0444ea0a177fcc48a7fd28","url":"static/js/runtime-main.cb33f444.js"},{"revision":"9c74e172f87984c48ddf5c8108cabe67","url":"static/media/flags.9c74e172.png"},{"revision":"03e67ea39f1f3ece3fadc709120c8c24","url":"static/media/logo.03e67ea3.png"}] || []);
    workbox.precaching.precacheAndRoute([{url: '/index.html', revision: version}])
    // /* custom cache rules*/
    // workbox.routing.registerNavigationRoute("/index.html");
    
    registerRoute(
      /\.(?:js|json|css|html)$/,
      new NetworkFirst({
        cacheName: `assets-${version}`
      })
      );

    registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      new CacheFirst({
        cacheName: `images-${version}`
      })
    )  
      
      const handler = createHandlerBoundToURL(`/index.html`)
      const navigationRoute = new NavigationRoute(handler)
      registerRoute(navigationRoute)

    registerRoute(
      // cache dynamic data
      "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status",
      "https://api.tfl.gov.uk/line/mode/national-rail/status",
      new NetworkFirst({
        networkTimeoutSeconds: 3,
        cacheName: `statuses-${version}`,
        plugins: [
          new BroadcastCacheUpdate(`statuses-${version}`)
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

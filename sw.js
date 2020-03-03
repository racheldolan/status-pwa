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
    workbox.precaching.precacheAndRoute([{"revision":"432d0bd074e9b95b31f664d8feaecf6c","url":"index.html"},{"revision":"03e67ea39f1f3ece3fadc709120c8c24","url":"logo.png"},{"revision":"07935de3a621f9af1a470e9ee8f298f1","url":"national-rail-logo.png"},{"revision":"1045aa2c57c9e2e5dc26a981c44343de","url":"precache-manifest.1045aa2c57c9e2e5dc26a981c44343de.js"},{"revision":"4fd244492ef620773deceef19c42563c","url":"service-worker.js"},{"revision":"dc489a872fc84c28852170966caf3af4","url":"static/css/2.adcb3f64.chunk.css"},{"revision":"eac203985bdb019f84605aac04abb861","url":"static/css/main.5ecd60fb.chunk.css"},{"revision":"0c48850f996ce7429485bbcb974005b7","url":"static/js/2.520c2acd.chunk.js"},{"revision":"0653b96e2a44867c591a15ed8e6f3b3b","url":"static/js/main.3629132c.chunk.js"},{"revision":"2268e49d1a0444ea0a177fcc48a7fd28","url":"static/js/runtime-main.cb33f444.js"},{"revision":"9c74e172f87984c48ddf5c8108cabe67","url":"static/media/flags.9c74e172.png"},{"revision":"03e67ea39f1f3ece3fadc709120c8c24","url":"static/media/logo.03e67ea3.png"}] || []);
    workbox.precaching.precacheAndRoute([{url: '/index.html', revision: version}])
    // /* custom cache rules*/
    // workbox.routing.registerNavigationRoute("/index.html");
    
    registerRoute(
      /\.(?:js|json|css|html)$/,
      new StaleWhileRevalidate({
        cacheName: `assets-${version}`,
        plugins: [
          new BroadcastCacheUpdate(`statuses-${version}`)
        ]
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
      })
    );

  //   self.addEventListener('message', async (event) => {
  //   console.log('message event listener ', event)
  //   // Optional: ensure the message came from workbox-broadcast-update
  //   if (event.data.meta === 'workbox-broadcast-update') {
  //     const {cacheName, updatedUrl} = event.data.payload;

  //     // Do something with cacheName and updatedUrl.
  //     // For example, get the cached content and update
  //     // the content on the page.
  //     const cache = await caches.open(cacheName);
  //     const updatedResponse = await cache.match(updatedUrl);
  //     const updatedText = await updatedResponse.text();
  //     console.log('updated text ', updatedText)
  //   }
  // });
  
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

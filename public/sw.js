if ("function" === typeof importScripts) {
 
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    const version = "0.1.0"
    const { registerRoute, NavigationRoute } = workbox.routing
    const { NetworkFirst, CacheFirst } = workbox.strategies;
    const {BroadcastCacheUpdate} = workbox.broadcastUpdate;
    const { createHandlerBoundToURL} = workbox.precaching
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
    workbox.precaching.precacheAndRoute([{url: '/index.html', revision: version}])
    // /* custom cache rules*/
    // workbox.routing.registerNavigationRoute("/index.html");
    
    registerRoute(
      /\.(?:png|gif|jpg|jpeg|js|json|css|html)$/,
      new NetworkFirst({
        cacheName: `assets-${version}`
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
        cacheName: `statuses-${version}`,
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

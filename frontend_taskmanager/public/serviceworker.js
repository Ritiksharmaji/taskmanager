const CACHE_NAME = "version-1";

// there cache_name is a version number, so that when we update the service worker, it will create a new cache
// and the old cache will be deleted. This is important because if we don't do this, the old cache will still be used
// and the new version of the app will not be loaded. By using a version number, we can ensure that the new version of the app is always loaded when the service worker is updated.
// The cache name is used to identify the cache storage for the service worker.
// The cache name is used to store the files that are cached by the service worker.
// The cache name is used to identify the cache storage for the service worker. and it store the files that are cached by the service worker.
const urlsToCache = [ 'index.html', 'offline.html' ];

// we need to write events for three different stages of the service worker lifecycle: install, fetch, and activate.
// The install event is fired when the service worker is first installed. This is where we can cache the files that we want to be available offline.
// The fetch event is fired when the service worker intercepts a network request. This is where we can respond to the request with a cached file or fetch the file from the network.
// The activate event is fired when the service worker is activated. This is where we can clean up old caches and update the cache with new files.
// The self variable is a reference to the service worker itself. It is used to access the service worker's global scope and to register event listeners for the service worker's lifecycle events.

const self = this;

// event listener will take first argument as the event name and second argument as the callback function.
// The install event is fired when the service worker is first installed. This is where we can cache the files that we want to be available offline.
// The event object contains information about the event that was fired. In this case, we are using the waitUntil method to tell the browser that we are going to perform some asynchronous work (caching the files) and that it should not terminate the service worker until that work is complete.
// The caches object is a global object that provides a way to store and retrieve cached responses. It is used to cache the files that we want to be available offline.
// The open method is used to open a cache with the specified name. If the cache does not exist, it will be created.
// The addAll method is used to add multiple files to the cache. It takes an array of URLs as an argument and caches each URL in the cache.
// The cache object is a reference to the cache that was opened. It is used to store the files that we want to be available offline.
// The addAll method is used to add multiple files to the cache. It takes an array of URLs as an argument and caches each URL in the cache.
// The cache.addAll method is used to add multiple files to the cache. It takes an array of URLs as an argument and caches each URL in the cache.

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});
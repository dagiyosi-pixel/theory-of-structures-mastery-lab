// COTM 3101: Theory of Structures Mastery Lab - Service Worker (v9)
// Mobile-First, Network-First for instant live updates with 100% offline fallback.

const CACHE_NAME = 'structures-mastery-v9';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './katex.min.css',
  './katex.min.js',
  './auto-render.min.js',
  './math_engine.js',
  './visuals.js',
  './solvers.js',
  './data.js',
  './app.js',
  './manifest.json',
  './standalone.html',
  './fonts/KaTeX_AMS-Regular.woff2',
  './fonts/KaTeX_Caligraphic-Bold.woff2',
  './fonts/KaTeX_Caligraphic-Regular.woff2',
  './fonts/KaTeX_Fraktur-Bold.woff2',
  './fonts/KaTeX_Fraktur-Regular.woff2',
  './fonts/KaTeX_Main-Bold.woff2',
  './fonts/KaTeX_Main-BoldItalic.woff2',
  './fonts/KaTeX_Main-Italic.woff2',
  './fonts/KaTeX_Main-Regular.woff2',
  './fonts/KaTeX_Math-BoldItalic.woff2',
  './fonts/KaTeX_Math-Italic.woff2',
  './fonts/KaTeX_SansSerif-Bold.woff2',
  './fonts/KaTeX_SansSerif-Italic.woff2',
  './fonts/KaTeX_SansSerif-Regular.woff2',
  './fonts/KaTeX_Script-Regular.woff2',
  './fonts/KaTeX_Size1-Regular.woff2',
  './fonts/KaTeX_Size2-Regular.woff2',
  './fonts/KaTeX_Size3-Regular.woff2',
  './fonts/KaTeX_Size4-Regular.woff2',
  './fonts/KaTeX_Typewriter-Regular.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('Non-fatal SW precache note:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log('Purging legacy cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Network-First with Cache Fallback for instant updates when online
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return null;
        });
      })
  );
});

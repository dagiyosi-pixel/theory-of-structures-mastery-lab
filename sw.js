// COTM 3101: Theory of Structures Mastery Lab - Service Worker
// Enables 100% offline access with full KaTeX math font assets cached.

const CACHE_NAME = 'structures-mastery-v3';

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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});

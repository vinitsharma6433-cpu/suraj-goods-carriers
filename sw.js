// Offline support: app files cached; same-origin files are network-first (always checked with
// the server, bypassing the browser's HTTP cache) so a new version shows up on the next open.
const CACHE = 'sgc-v4';
const SHELL = ['./', 'index.html', 'firebase-config.js', 'manifest.json', 'icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (/googleapis\.com$|firebaseio|identitytoolkit|securetoken/.test(url.hostname) && !url.hostname.startsWith('fonts')) return; // live Firebase calls
  if (url.origin === location.origin) {
    // A navigation Request cannot be re-used with extra options, so build a fresh one from its URL.
    const fresh = new Request(url.href, { cache: 'no-cache', credentials: 'same-origin' });
    e.respondWith(fetch(fresh).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
  } else if (/cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(url.hostname)) {
    e.respondWith(caches.match(e.request).then(m => m || fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })));
  }
});

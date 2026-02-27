const cacheName = 'ses-arsivi-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Uygulama yüklendiðinde dosyalarý önbelleðe al
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Dosyalar önbelleðe alýnýyor...');
      return cache.addAll(assets);
    })
  );
});

// Ýnternet olmasa bile önbellekten dosyalarý getir
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

// Eski önbellekleri temizle
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
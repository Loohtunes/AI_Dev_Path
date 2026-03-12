self.addEventListener('fetch', (event) => {
  // Estratégia: Network Only (per user request)
  // O Service Worker existe apenas para permitir a instalação da PWA
  event.respondWith(fetch(event.request));
});

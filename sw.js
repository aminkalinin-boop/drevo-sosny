/* Офлайн-режим: все файлы справочника кешируются при первом открытии */
const CACHE="drevo-sosny-v1";
const FILES=["./","index.html","glossary.js","pine.js","schemes1.js","schemes2.js","tools.js","quiz.js","manifest.webmanifest","icon-192.png","icon-512.png","sosna.webp","forest.webp","otvod.webp","zag.webp","derevo.webp","real.webp","vost.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return res}).catch(()=>caches.match("index.html"))))});

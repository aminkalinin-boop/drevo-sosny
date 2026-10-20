/* Офлайн-режим: код кешируется при установке, картинки — при первом просмотре */
const CACHE="drevo-sosny-v9";
const FILES=["./", "index.html", "manifest.webmanifest", "apk_agro.js", "apk_anim1.js", "apk_anim2.js", "apk_crops.js", "apk_plant1.js", "apk_plant2.js", "apk_proc.js", "apk_tech.js", "assets2.js", "assets3.js", "assets4.js", "glossary.js", "icon-192.png", "icon-512.png", "photos.js", "pine.js", "pine2.js", "quiz.js", "schemes1.js", "schemes2.js", "species.js", "tech.js", "tools.js", "uis.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});

/* Изображения недостающих карточек: ASSET_PROMPTS_3.md, лист 1 из 96.
 * У каждой карточки своя фотография в WebP. Уже заданные иллюстрации не заменяем.
 */
(function () {
  const images = {
    con_root: "a_con_root.webp",
    crown: "a_crown.webp",
    needles: "a_needles.webp",
    hvm: "a_hvm.webp",
    hkp: "a_hkp.webp",
    eo: "a_eo.webp",
    extr: "a_extr.webp",
    nastoy: "a_nastoy.webp"
  };
  for (const [id, filename] of Object.entries(images)) {
    if (window.N[id] && !window.N[id].im) window.N[id].im = filename;
  }
})();

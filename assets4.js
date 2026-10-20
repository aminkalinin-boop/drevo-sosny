/* Изображения недостающих карточек: ASSET_PROMPTS_3.md, листы 1–3 из 96.
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
    nastoy: "a_nastoy.webp",
    lwool: "a_lwool.webp",
    lapnik: "a_lapnik.webp",
    buds: "a_buds.webp",
    bud_drug: "a_bud_drug.webp",
    shoots: "a_shoots.webp",
    syrup: "a_syrup.webp",
    malecones: "a_malecones.webp",
    pollen: "a_pollen.webp",
    bad: "a_bad.webp",
    cones: "a_cones.webp",
    seeds: "a_seeds.webp",
    greencone: "a_greencone.webp",
    fuelcone: "a_fuelcone.webp",
    branches: "a_branches.webp",
    trunk: "a_trunk.webp",
    komel: "a_komel.webp"
  };
  for (const [id, filename] of Object.entries(images)) {
    if (window.N[id] && !window.N[id].im) window.N[id].im = filename;
  }
})();

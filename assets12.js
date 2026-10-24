/* Новые разделы: перспективы, агролесной кластер, заглавные карточки. */
(function () {
  const images = {
  "lf_root": "a_lf_root.webp",
  "lf_wood": "a_lf_wood.webp",
  "lf_bioref": "a_lf_bioref.webp",
  "lf_nano": "a_lf_nano.webp",
  "lf_digital": "a_lf_digital.webp",
  "lf_plant": "a_lf_plant.webp",
  "lf_energy": "a_lf_energy.webp",
  "lf_climate": "a_lf_climate.webp",
  "lf_robot": "a_lf_robot.webp",
  "im_1": "a_im_1.webp",
  "im_2": "a_im_2.webp",
  "im_3": "a_im_3.webp",
  "im_4": "a_im_4.webp",
  "im_5": "a_im_5.webp",
  "im_6": "a_im_6.webp",
  "im_7": "a_im_7.webp",
  "im_8": "a_im_8.webp",
  "im_9": "a_im_9.webp",
  "im_10": "a_im_10.webp",
  "gl_res": "a_gl_res.webp",
  "gl_prod": "a_gl_prod.webp",
  "gl_proc": "a_gl_proc.webp",
  "ga_res": "a_ga_res.webp",
  "ga_proc": "a_ga_proc.webp",
  "gm_proc": "a_gm_proc.webp",
  "gm_tech": "a_gm_tech.webp",
  "gm_mkt": "a_gm_mkt.webp"
};
  for (const [id, image] of Object.entries(images)) {
    if (window.N[id]) window.N[id].im = image;
  }
})();

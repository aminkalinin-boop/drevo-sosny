/* Перестройка 31.10.2026: пищевая промышленность и рыбное хозяйство — в АПК, дикоросы и охота — в ЛПК,
   биоэнергетика и торф — в межотраслевой блок. Разделы этих отраслей становятся подразделами этапов. */
(function(){var N=window.N;
var M={
 pf_res:"ga_res",pf_prod:"ga_proc",pf_proc:"ga_proc",pf_tech:"at_root",pf_mkt:"ec_root",pf_law:"aw_root",pf_kad:"ak_root",pf_uis:"au_root",pf_eco:"ae_root",pf_fut:"nt_root",pf_cyc:"ia_root",
 rb_res:"ga_res",rb_prod:"ag_root",rb_proc:"ga_proc",rb_tech:"at_root",rb_mkt:"ec_root",rb_law:"aw_root",rb_kad:"ak_root",rb_uis:"au_root",rb_eco:"ae_root",rb_fut:"nt_root",rb_cyc:"ia_root",
 wl_res:"gl_res",wl_prod:"gl_prod",wl_proc:"gl_proc",wl_tech:"tech_root",wl_mkt:"r_root",wl_law:"lw_root",wl_kad:"lk_root",wl_uis:"u_root",wl_eco:"le_root",wl_fut:"lf_root",wl_cyc:"il_root",
 nr_res:"mx_land",nr_prod:"mx_root",nr_proc:"gm_proc",nr_tech:"gm_tech",nr_mkt:"gm_mkt",nr_law:"gm_mkt",nr_kad:"gm_mkt",nr_eco:"gm_mkt",nr_uis:"mx_uis",nr_fut:"mx_theory",nr_cyc:"im_root"};
var T={pf_res:"Пищевая промышленность: сырьё, вода, добавки, упаковка",pf_prod:"Пищевая промышленность: основные процессы",pf_proc:"Пищевая промышленность: подотрасли",pf_tech:"Техника пищевой промышленности",pf_mkt:"Рынок пищевой продукции",pf_law:"Право в пищевой промышленности",pf_kad:"Кадры пищевой промышленности",pf_uis:"Пищевые производства в УИС",pf_eco:"Экология и риски пищевой промышленности",pf_fut:"Перспективы пищевой промышленности",pf_cyc:"Идеальный цикл пищевой промышленности",
 rb_res:"Рыбное хозяйство и аквакультура: ресурсы",rb_prod:"Рыболовство и рыбоводство",rb_proc:"Переработка рыбы",rb_tech:"Техника рыбного хозяйства",rb_mkt:"Рынок рыбы и морепродуктов",rb_law:"Право в рыбном хозяйстве",rb_kad:"Кадры рыбного хозяйства",rb_uis:"Рыбное хозяйство и УИС",rb_eco:"Экология и риски рыбного хозяйства",rb_fut:"Перспективы рыбного хозяйства",rb_cyc:"Идеальный цикл рыбного хозяйства",
 wl_res:"Недревесные ресурсы леса: дикоросы и дичь",wl_prod:"Заготовка дикоросов и охота",wl_proc:"Переработка дикоросов и дичи",wl_tech:"Техника для дикоросов и охоты",wl_mkt:"Рынок дикоросов и охоты",wl_law:"Право: дикоросы и охота",wl_kad:"Кадры: охотоведы, егеря, заготовители",wl_uis:"Дикоросы и УИС",wl_eco:"Экология и риски: дикоросы и охота",wl_fut:"Перспективы дикоросов и охоты",wl_cyc:"Идеальный цикл дикоросов и охоты",
 nr_res:"Биоэнергетика и торф: ресурсы",nr_prod:"Биоэнергетика и торф: добыча и заготовка",nr_proc:"Биоэнергетика: переработка в топливо и энергию",nr_tech:"Техника биоэнергетики и торфа",nr_mkt:"Рынок биоэнергетики и торфа",nr_law:"Право в биоэнергетике и торфяной отрасли",nr_kad:"Кадры биоэнергетики и торфа",nr_eco:"Экология и риски биоэнергетики и торфа",nr_uis:"Биоэнергетика в УИС",nr_fut:"Перспективы биоэнергетики и торфа",nr_cyc:"Идеальный цикл биоэнергетики"};
Object.keys(M).forEach(function(k){var n=N[k],p=N[M[k]];if(!n||!p)return;if(T[k])n.t=T[k];p.c=p.c||[];if(p.c.indexOf(k)<0)p.c.push(k)});
/* оленеводство — в АПК, к пункту «Оленеводство» */
var d=N.an_deer;if(d){d.c=d.c||[];["wl_deer","wl_p_herd"].forEach(function(k){if(!N[k])return;[N.wl_res,N.wl_prod].forEach(function(g){if(g&&g.c)g.c=g.c.filter(function(x){return x!==k})});if(d.c.indexOf(k)<0)d.c.push(k)})}
/* карты: тексты регионов переносятся в карты ЛПК, АПК и межотраслевого блока */
[["rg_fod","rg_apk"],["rg_fsh","rg_apk"],["rg_wld","rg_lpk"],["rg_nrg","rg_mix"]].forEach(function(x){var a=N[x[0]],b=N[x[1]];if(a&&b)b.f=(b.f||[]).concat(a.f||[]);delete N[x[0]]});
})();

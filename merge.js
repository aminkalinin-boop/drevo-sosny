/* Перестройка 31.10.2026: пищевая промышленность и рыбное хозяйство — в АПК, дикоросы и охота — в ЛПК,
   биоэнергетика и торф — в ТЭК. Разделы этих отраслей становятся подразделами этапов. */
(function(){var N=window.N;
var M={
 pf_res:"ga_res",pf_prod:"ga_proc",pf_proc:"ga_proc",pf_tech:"at_root",pf_mkt:"ec_root",pf_law:"aw_root",pf_kad:"ak_root",pf_uis:"au_root",pf_eco:"ae_root",pf_fut:"nt_root",pf_cyc:"ia_root",
 rb_res:"ga_res",rb_prod:"ag_root",rb_proc:"ga_proc",rb_tech:"at_root",rb_mkt:"ec_root",rb_law:"aw_root",rb_kad:"ak_root",rb_uis:"au_root",rb_eco:"ae_root",rb_fut:"nt_root",rb_cyc:"ia_root",
 wl_res:"gl_res",wl_prod:"gl_prod",wl_proc:"gl_proc",wl_tech:"tech_root",wl_mkt:"r_root",wl_law:"lw_root",wl_kad:"lk_root",wl_uis:"u_root",wl_eco:"le_root",wl_fut:"lf_root",wl_cyc:"il_root",
 nr_res:"te_res",nr_prod:"te_prod",nr_proc:"te_proc",nr_tech:"te_tech",nr_mkt:"te_mkt",nr_law:"te_law",nr_kad:"te_kad",nr_eco:"te_eco",nr_uis:"te_uis",nr_fut:"te_fut",nr_cyc:"te_cyc"};
var T={pf_res:"Пищевая промышленность: сырьё, вода, добавки, упаковка",pf_prod:"Пищевая промышленность: основные процессы",pf_proc:"Пищевая промышленность: подотрасли",pf_tech:"Техника пищевой промышленности",pf_mkt:"Рынок пищевой продукции",pf_law:"Право в пищевой промышленности",pf_kad:"Кадры пищевой промышленности",pf_uis:"Пищевые производства в УИС",pf_eco:"Экология и риски пищевой промышленности",pf_fut:"Перспективы пищевой промышленности",pf_cyc:"Идеальный цикл пищевой промышленности",
 rb_res:"Рыбное хозяйство и аквакультура: ресурсы",rb_prod:"Рыболовство и рыбоводство",rb_proc:"Переработка рыбы",rb_tech:"Техника рыбного хозяйства",rb_mkt:"Рынок рыбы и морепродуктов",rb_law:"Право в рыбном хозяйстве",rb_kad:"Кадры рыбного хозяйства",rb_uis:"Рыбное хозяйство и УИС",rb_eco:"Экология и риски рыбного хозяйства",rb_fut:"Перспективы рыбного хозяйства",rb_cyc:"Идеальный цикл рыбного хозяйства",
 wl_res:"Недревесные ресурсы леса: дикоросы и дичь",wl_prod:"Заготовка дикоросов и охота",wl_proc:"Переработка дикоросов и дичи",wl_tech:"Техника для дикоросов и охоты",wl_mkt:"Рынок дикоросов и охоты",wl_law:"Право: дикоросы и охота",wl_kad:"Кадры: охотоведы, егеря, заготовители",wl_uis:"Дикоросы и УИС",wl_eco:"Экология и риски: дикоросы и охота",wl_fut:"Перспективы дикоросов и охоты",wl_cyc:"Идеальный цикл дикоросов и охоты",
 nr_res:"Биоэнергетика и торф: ресурсы",nr_prod:"Биоэнергетика и торф: добыча и заготовка",nr_proc:"Биоэнергетика: переработка в топливо и энергию",nr_tech:"Техника биоэнергетики и торфа",nr_mkt:"Рынок биоэнергетики и торфа",nr_law:"Право в биоэнергетике и торфяной отрасли",nr_kad:"Кадры биоэнергетики и торфа",nr_eco:"Экология и риски биоэнергетики и торфа",nr_uis:"Биоэнергетика в УИС",nr_fut:"Перспективы биоэнергетики и торфа",nr_cyc:"Идеальный цикл биоэнергетики"};
Object.keys(M).forEach(function(k){var n=N[k],p=N[M[k]];if(!n||!p)return;if(T[k])n.t=T[k];p.c=p.c||[];if(p.c.indexOf(k)<0)p.c.push(k)});
/* оленеводство — в АПК, к пункту «Оленеводство» */
var d=N.an_deer;if(d){d.c=d.c||[];["wl_deer","wl_p_herd"].forEach(function(k){if(!N[k])return;[N.wl_res,N.wl_prod].forEach(function(g){if(g&&g.c)g.c=g.c.filter(function(x){return x!==k})});if(d.c.indexOf(k)<0)d.c.push(k)})}
/* карты: тексты регионов переносятся в карты ЛПК, АПК и межотраслевого блока */
[["rg_fod","rg_apk"],["rg_fsh","rg_apk"],["rg_wld","rg_lpk"],["rg_nrg","rg_tek"]].forEach(function(x){var a=N[x[0]],b=N[x[1]];if(a&&b)b.f=(b.f||[]).concat(a.f||[]);delete N[x[0]]});
})();

/* «Связи»: разделы пар отраслей собирают ранее описанные карточки */
(function(){var N=window.N;function put(sec,ids,front){var p=N[sec];if(!p)return;p.c=p.c||[];ids.forEach(function(k){if(!N[k])return;Object.keys(N).forEach(function(q){var c=N[q].c;if(q!==sec&&c){var i=c.indexOf(k);if(i>=0)c.splice(i,1)}});if(p.c.indexOf(k)<0){front?p.c.unshift(k):p.c.push(k)}})}
put("mx_ka_now",["mx_land","mx_root","gm_proc","gm_tech","gm_mkt","mx_n_pack"]);
put("mx_p_ka",["mx_theory"]);if(N.mx_theory)N.mx_theory.t="В теории";
put("mx_ll_now",["mx_n_tannin","mx_n_visc"],true);
put("mx_tl_now",["mx_n_peat","mx_n_berryplant"]);
put("mx_la_now",["mx_n_fur","mx_n_agrotex","mx_n_flax"],true);
put("mx_ta_now",["mx_n_foodwaste","mx_n_heat"]);
put("mx_cmp",["mx_all"],true);
if(N.mx_uis)N.mx_uis.ln=(N.mx_uis.ln||[]).concat(["tl_uis","te_uis","pf_uis"].filter(function(k){return N[k]}));
})();

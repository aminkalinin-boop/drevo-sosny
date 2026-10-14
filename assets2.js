/* Фото-ассеты, присланные пользователем: схемы и сетки с кликабельными зонами.
   Зона: [цель, x, y, ширина, высота] в процентах. Цель: id пункта, t_… — оборудование, g:… — термин словаря. */
(function(){const N=window.N,T=window.T,G=window.G;
const pic=(src,hs)=>({src,hs:hs||[]});
const addPic=(ids,p)=>ids.forEach(id=>{if(N[id])(N[id].pics=N[id].pics||[]).push(p)});
const q8=ids=>ids.map((id,i)=>[id,(i%4)*25,i<4?0:49,25,i<4?49:51]);
const h4=ids=>ids.map((id,i)=>[id,(i%2)*50,i<2?0:49,50,i<2?49:51]);
/* недостающие термины */
Object.assign(G,{
"имитация бруса":"Строганая доска с пазом и гребнем, лицевая сторона которой похожа на брус. Обшивка стен снаружи и внутри.",
"блок-хаус":"Строганая доска с выпуклой лицевой стороной: после обшивки стена выглядит как сложенная из брёвен.",
"половая доска":"Толстая строганая доска с пазом и гребнем для настила полов.",
"трещина":"Разрыв древесины вдоль волокон. Появляется при высыхании, морозе или ударе при валке. Снижает сорт.",
"гнилой сучок":"Сучок, поражённый гнилью: тёмный, рыхлый. Снижает сорт сильнее, чем здоровый."});
/* сетки */
const plates=pic("g_plates.webp",[["pl_fan",0,0,33.4,48.5],["pl_dsp",33.4,0,33.3,48.5],["pl_mdf",66.7,0,33.3,48.5],["pl_osp",0,48.5,33.4,51.5],["pl_mdf",33.4,48.5,33.3,51.5],["m10",66.7,48.5,33.3,51.5]]);
addPic(["d_plates"],plates);
const lumber=pic("g_lumber.webp",q8(["g:обрезная доска","g:необрезная доска","g:брус","g:брусок","g:вагонка","g:имитация бруса","g:блок-хаус","g:половая доска"]));
addPic(["lumber","m9","d_products"],lumber);
const machines=pic("g_machines.webp",q8(["t_bandsaw_h","t_frame","t_multisaw","t_edger","t_planer","t_jointer","t_cnc","t_kiln"]));
addPic(["tg_wood","tw_saw","d_mill"],machines);
const taks=pic("g_taks.webp",[["t_vilka",0.5,12.5,25,84],["t_vysotomer",25.5,12.5,24.5,84],["t_burav",50,12.5,24.5,84],["g:керн",74.5,12.5,25,84]]);
addPic(["f_char","o7","tg_measure"],taks);
const pests=pic("g_pests.webp",q8(["fg_sosn","fg_okaim","in_lub","in_shelk","in_usach","fg_seryanka","en_plants","fg_opyonok"]));
addPic(["enemies"],pests);
addPic(["o_roads"],pic("g_roads.webp",h4(["o_mag","o_us","o_zim","o_lezh"])));
addPic(["z_skid"],pic("g_skid.webp",h4(["z_s_ch","z_s_bch","z_s_fw","z_s_cab"])));
const seedl=pic("g_seedl.webp",[["g:окс",0.5,10,50,84],["g:зкс",51,10,49,84],["t_kolesov",32.5,12.5,17.5,34],["t_tube",32.5,47,17.5,36]]);
addPic(["v_nursery","v_plant","seedl"],seedl);
/* пороки — новый пункт */
N.poroki={t:"Пороки древесины",k:"info",s:"что снижает сорт",
 w:"Порок — любой недостаток древесины, который снижает её качество и цену. По порокам решают, пойдёт отрезок в деловую или в дровяную древесину, и какой сорт ему присвоить. Нажми на плитку, чтобы прочитать про каждый порок.",
 f:["Сучки: здоровые допускаются в ограниченном количестве, гнилые и выпадающие сильно снижают сорт.","Гниль: ядровая гниль в торце бревна — главная причина перевода в дрова.","Синева: прочность почти не меняется, но сорт падает.","Трещины, червоточины, смоляные карманы, кривизна — их размер и количество ограничивает стандарт."],
 pics:[pic("g_poroki.webp",q8(["g:сучок","g:гнилой сучок","g:ядровая гниль","g:синева","g:трещина","g:червоточина","g:смоляной карман","g:кривизна"]))]};
N.delovaya.c=(N.delovaya.c||[]).concat(["poroki"]);
N.buck.ln=(N.buck.ln||[]).concat(["poroki"]);N.m1.ln=(N.m1.ln||[]).concat(["poroki"]);
/* схемы целиком */
addPic(["fg_cult"],pic("p_mush.webp"));
addPic(["u_struct"],pic("p_uis.webp",[["u_units",6,45.5,28.5,12.5],["u_units",36.5,45.5,28.5,12.5],["u_cycle",31,63.5,38,11.5],["u_train",5.5,76,29,12],["u_land",62.5,76,32,12]]));
addPic(["resin"],pic("p_podsoch.webp",[["g:карра",26.5,14.5,13.5,6],["t_hak",83.5,65.5,12.5,6]]));
addPic(["buck","z_buck"],pic("p_buck.webp",[["g:комель",6,19,8.5,5.5],["pilovoch",20.5,19,12.5,7],["pilovoch",39.5,20,11.5,7],["balans",55,20.5,11,7],["podtov",68,21.5,11.5,5.5],["drova",80,22,6.5,5],["g:вершина",90.5,22,9,5]]));
addPic(["saw","m5"],pic("p_saw.webp",[["g:горбыль",2,15,11,9],["g:обрезная доска",63.5,18,10,6],["g:необрезная доска",74.5,18,11.5,6],["g:горбыль",87.5,18.5,9,4.5],["opil",61,63,7,4],["techchip",84,63,6.5,4]]));
addPic(["fell","z_fell","z_f_chain"],pic("p_fell.webp",[["g:подруб",25.5,41,9,4.5],["g:недоруб",44,52.5,9,4.5],["g:валочный клин",56.5,34,6.5,4.5],["g:опасная зона",37,64,16,5]]));
addPic(["z_yard"],pic("p_kub.webp",[["g:плотный кубометр",0.5,13,49,84],["g:складочный кубометр",50.5,13,49,84]]));
addPic(["pulp","tg_pulp"],pic("p_paper.webp",[["t_drum",12,24.5,9,4.5],["techchip",28,23.5,8,4.5],["t_digester",41.5,13.5,8,4.5],["t_papermachine",63.5,26,17,6],["t_recovery",79.5,13,13.5,4.5]]));
const uchet=["o10","z_root","r_deal","r_legal","z_haul","r_docs","r_price"].map((id,i)=>[id,0.5+i*14.15,19,14,70]);
addPic(["r_path","r_legal"],pic("p_uchet.webp",uchet));
addPic(["tg_chem","rosin"],pic("p_chem.webp",[["resin",3,26.5,8,4.5],["t_resinplant",34,19,14,4.5],["g:конденсатор",52,17.5,11,4.5],["rosin",32,64,10,4.5],["turp",59,44,10,4.5],["osmol",69.5,15.5,11,6.5],["smola",85.5,70,9,4.5]]));
addPic(["u_cycle"],pic("p_cycle.webp",[["u_land",6,21.5,17,5.5],["z_root",34,20.5,17,5],["z_low",62,21,20,5.5],["d_mill",76,39,18,5],["m7",77,61.5,15,5],["d_root",42,73,21,5.5],["u_prod",15,70,18,5],["u_sales",1.5,49,18,5.5],["t_boiler",55,91,15,5]]));
/* сетки, сделанные раньше, переводим в общий формат */
Object.values(N).forEach(n=>{if(n.grid){(n.pics=n.pics||[]).unshift(n.grid);delete n.grid}});
/* картинки к отдельным пунктам */
["fg_sosn","fg_okaim","in_lub","in_shelk","in_usach","fg_seryanka","en_plants","fg_opyonok","o_mag","o_us","o_zim","o_lezh","z_s_ch","z_s_bch","z_s_fw","z_s_cab","pl_dsp","pl_mdf","pl_osp","m10"].forEach(id=>{if(N[id])N[id].im="a_"+id+".webp"});
/* картинки к оборудованию */
const tim={t_bandsaw_h:"a_t_bandsaw_h.webp",t_frame:"a_t_frame.webp",t_multisaw:"a_t_multisaw.webp",t_edger:"a_t_edger.webp",t_planer:"a_t_planer.webp",t_jointer:"a_t_jointer.webp",t_thicknesser:"a_t_jointer.webp",t_cnc:"a_t_cnc.webp",t_kiln:"a_t_kiln.webp",t_vilka:"a_t_vilka.webp",t_vysotomer:"a_t_vysotomer.webp",t_burav:"a_t_burav.webp",t_skidder:"a_z_s_ch.webp",t_skidder_g:"a_z_s_bch.webp",t_forwarder:"a_z_s_fw.webp",t_cable:"a_z_s_cab.webp"};
Object.entries(tim).forEach(([k,v])=>{if(T[k])T[k].im=v});
})();

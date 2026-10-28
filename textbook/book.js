/* Древо отраслей: отдельное иллюстрированное учебное пособие.
 * Исходные модули приложения используются только для чтения. */
(function(){
"use strict";
const N=window.N||{}, T=window.T||{}, G=window.G||{};
const LESSONS=window.BOOK_LESSONS||{}, CASES=window.BOOK_CASES||[];
const VOLUMES=[
{id:"lpk",title:"ТОМ I · Лесопромышленный комплекс",chapters:[["gl_res","Ресурсы"],["gl_prod","Производство"],["gl_proc","Переработка"],["tech_root","Техника"],["r_root","Рынок"],["u_root","УИС"],["lf_root","Перспективы"],["il_root","Идеальный цикл"],["rg_lpk","Регионы"]]},
{id:"apk",title:"ТОМ II · Агропромышленный комплекс",chapters:[["ga_res","Ресурсы"],["ag_root","Производство"],["ga_proc","Переработка"],["at_root","Техника"],["ec_root","Рынок"],["au_root","УИС"],["nt_root","Перспективы"],["ia_root","Идеальный цикл"],["rg_apk","Регионы"]]},
{id:"mix",title:"ТОМ III · Межотраслевое взаимодействие",chapters:[["mx_land","Ресурсы"],["mx_root","Обмен продукцией"],["gm_proc","Переработка"],["gm_tech","Техника и энергия"],["gm_mkt","Экономика и риски"],["mx_uis","УИС"],["mx_theory","Перспективы"],["im_root","Идеальный цикл"],["rg_mix","Регионы"]]}
];
const CHAPTERS=VOLUMES.flatMap(v=>v.chapters.map(([id,title],i)=>({id,title,n:i+1,v})));
const byId=id=>document.getElementById(id);
const arr=x=>Array.isArray(x)?x:[];
const safe=x=>String(x==null?"":x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const clean=x=>String(x==null?"":x).replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g,(m,k,d)=>d||k).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(m,k,d)=>d||(N[k]?N[k].t:T[k]?T[k].t:k)).replace(/<[^>]+>/g,"").trim();
const nodeTitle=id=>N[id]?clean(N[id].t||id):id;
function rich(x){
 return safe(x).replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g,(m,k,d)=>G[k]?'<a href="#term" data-term="'+safe(k)+'">'+safe(d||k)+'</a>':safe(d||k))
 .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(m,k,d)=>N[k]?'<a href="#card-'+safe(k)+'" data-node="'+safe(k)+'">'+safe(d||nodeTitle(k))+'</a>':T[k]?'<a href="#tool-'+safe(k)+'" data-tool="'+safe(k)+'">'+safe(d||T[k].t)+'</a>':safe(d||k));
}
function imagePath(p){
 if(typeof p!=="string"||!p.trim())return "";
 if(/^https?:\/\//i.test(p))return p;
 if(p.startsWith("/")||p.includes(".."))return "";
 return "../"+encodeURI(p.replace(/^\.\//,""));
}
function pic(p,caption){
 const path=imagePath(p);if(!path)return "";
 return '<figure class="figure"><img loading="lazy" src="'+safe(path)+'" alt="'+safe(caption)+'"><figcaption>'+safe(caption)+'</figcaption></figure>';
}
function nodePictures(id){
 const n=N[id]||{},title=nodeTitle(id),photos=arr(n.pics).filter(p=>p&&p.src);
 if(photos.length)return '<div class="figures">'+photos.map((p,i)=>pic(p.src,title+(photos.length>1?" · илл. "+(i+1):""))).join("")+'</div>';
 if(n.im)return pic(n.im,title);
 if(window.PHR&&window.PH&&window.PHR[id]&&window.PH[window.PHR[id]])return pic(window.PH[window.PHR[id]],title+" · схема");
 if(id==="pine"&&window.PH&&window.PH.pine)return pic(window.PH.pine,title);
 return '<p class="no-photo">Для обзорного пункта отдельная иллюстрация не назначена; см. подчинённые карточки.</p>';
}
function tree(id,ch,num,depth,seen,cb){
 if(!N[id]||depth>65||seen.has(id))return;
 const next=new Set(seen);next.add(id);
 cb(id,ch,num,depth);
 arr(N[id].c).forEach((child,i)=>tree(child,ch,num+"."+(i+1),depth+1,next,cb));
}
const index={},seenNodes=new Set();
for(const ch of CHAPTERS)tree(ch.id,ch,String(ch.n),0,new Set(),(id,ch,num,depth)=>{if(!index[id])index[id]={ch,num,depth};seenNodes.add(id)});
const extraNodes=Object.keys(N).filter(id=>!seenNodes.has(id));
const state={mode:"chapter",chapter:"gl_res",sector:"lpk"};
function nav(){
 let out='<button type="button" class="toc-link'+(state.mode==="cover"?" active":"")+'" data-mode="cover">Титульный лист и аннотация</button>';
 for(const v of VOLUMES){
  out+='<p class="volume-title">'+safe(v.title)+'</p>';
  out+='<button type="button" class="toc-link'+(state.mode==="volume"&&state.sector===v.id?" active":"")+'" data-sector="'+v.id+'">Весь том · 9 глав</button>';
  v.chapters.forEach(([id,name],i)=>out+='<button type="button" class="toc-link'+(state.mode==="chapter"&&state.chapter===id?" active":"")+'" data-chapter="'+safe(id)+'">'+(i+1)+'. '+safe(name)+'</button>');
 }
 out+='<div class="toc-tools"><p class="volume-title">ТОМ IV · Справочный аппарат</p>';
 const specials=[["glossary","Толковый словарь"],["equipment","Каталог оборудования"],["exercises","Практические задачи"],["sources","Источники и методика"],["extras","Дополнительные карточки"]];
 for(const [id,label] of specials){if(id==="extras"&&!extraNodes.length)continue;out+='<button type="button" class="toc-link'+(state.mode===id?" active":"")+'" data-mode="'+id+'">'+safe(label)+'</button>'}
 byId("toc").innerHTML=out+"</div>";
 byId("front-selector").innerHTML=VOLUMES.map(v=>'<button type="button" data-sector="'+v.id+'">'+safe(v.title)+'</button>').join("")+'<button type="button" data-mode="glossary">Словарь</button>';
}
function mapHtml(which){
 const r=window.RG;if(!r||!r.p||!r.d)return "";
 const cs=which==="apk"?["#f3ead9","#e4ca95","#bc9552","#8e6026"]:which==="mix"?["#eeeaf3","#c6bcd7","#9183af","#625280"]:["#e5eee0","#b7d4b0","#78aa74","#39733e"];
 const metric=which==="apk"?6:which==="mix"?2:1;
 const paths=Object.entries(r.p).map(([key,path])=>{
  const values=r.d[key]||[],band=Math.min(3,Math.max(0,Number(values[metric])||0));
  return '<path d="'+safe(path)+'" fill="'+cs[band]+'" stroke="#fff" stroke-width=".6"><title>'+safe(values[0]||key)+'</title></path>';
 }).join("");
 return '<figure class="chapter-map"><svg role="img" aria-label="Учебная карта регионов России" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+r.w+' '+r.h+'">'+paths+'</svg><figcaption>Карта из справочника: качественные ориентиры специализации, а не официальные значения конкретного года. Для просмотра остальных слоёв используйте приложение. Контуры: amCharts geodata (лицензия в репозитории).</figcaption></figure>';
}
function nodeHtml(id,num,depth,tools){
 const n=N[id],title=nodeTitle(id),facts=arr(n.f),results=arr(n.y),equipment=arr(n.tl).filter(t=>T[t]);
 equipment.forEach(t=>tools.add(t));
 let out='<article class="entry" data-depth="'+Math.min(7,depth)+'" id="card-'+safe(id)+'"><div class="node-top"><span class="node-number">'+safe(num)+'</span><h3>'+safe(title)+'</h3></div>';
 if(n.s)out+='<p class="node-subtitle">'+rich(n.s)+'</p>';
 out+=nodePictures(id);
 if(n.n)out+='<p class="alias"><strong>Названия и определения.</strong> '+rich(n.n)+'</p>';
 if(n.w)out+='<p>'+rich(n.w)+'</p>';
 if(n.h)out+='<p class="method"><strong>Как получают или применяют.</strong> '+rich(n.h)+'</p>';
 if(n.map)out+=mapHtml(n.map);
 if(facts.length)out+='<p class="data-head">Свойства, характеристики, замечания</p><ul>'+facts.map(x=>'<li>'+rich(x)+'</li>').join("")+'</ul>';
 if(results.length)out+='<p class="data-head">Продукция, результаты и применение</p><ul>'+results.map(x=>'<li>'+rich(x)+'</li>').join("")+'</ul>';
 if(equipment.length)out+='<p class="related"><strong>Связанное оборудование:</strong> '+equipment.map(t=>'<a href="#tool-'+safe(t)+'" data-tool="'+safe(t)+'">'+safe(T[t].t||t)+'</a>').join(" · ")+'</p>';
 const links=arr(n.ln).filter(x=>N[x]);
 if(links.length)out+='<p class="related"><strong>В других разделах:</strong> '+links.map(x=>'<a href="#card-'+safe(x)+'" data-node="'+safe(x)+'">'+safe(nodeTitle(x))+'</a>').join(" · ")+'</p>';
 const children=arr(n.c).filter(x=>N[x]);
 if(children.length)out+='<p class="hierarchy-path"><strong>Следующий уровень ('+children.length+'):</strong> '+children.map(x=>'<a href="#card-'+safe(x)+'" data-node="'+safe(x)+'">'+safe(nodeTitle(x))+'</a>').join(" · ")+'</p>';
 return out+"</article>";
}
function toolHtml(id){
 const n=T[id];if(!n)return "";
 let h='<article class="tool-card" id="tool-'+safe(id)+'"><h4>'+safe(n.t||id)+'</h4><p class="node-subtitle">'+safe(n.g||"Техника")+'</p>';
 if(n.im)h+=pic(n.im,n.t||id);
 if(n.w)h+='<p>'+rich(n.w)+'</p>';
 if(n.how)h+='<p><strong>Принцип действия:</strong> '+rich(n.how)+'</p>';
 if(n.use)h+='<p><strong>Использование:</strong> '+rich(n.use)+'</p>';
 if(n.perf)h+='<p><strong>Производительность:</strong> '+rich(n.perf)+'</p>';
 if(arr(n.f).length)h+='<ul>'+n.f.map(x=>'<li>'+rich(x)+'</li>').join("")+'</ul>';
 return h+"</article>";
}
function chapterHtml(ch){
 const n=N[ch.id];
 if(!n)return '<p class="notice">Раздел '+safe(ch.title)+' отсутствует в исходном приложении.</p>';
 const lesson=LESSONS[ch.id]||{},tools=new Set();let nodes=0,pictured=0;
 tree(ch.id,ch,String(ch.n),0,new Set(),id=>{nodes++;const v=N[id];if(v.im||arr(v.pics).length)pictured++});
 let h='<section class="book-chapter" data-root="'+safe(ch.id)+'"><header class="chapter-intro"><p class="vol-title">'+safe(ch.v.title)+'</p><p class="chapter-number">Глава '+ch.n+' / 9</p><h2>'+safe(ch.title)+'</h2>';
 h+='<p class="chapter-lead">'+safe(lesson.lead||clean(n.w)||clean(n.s))+'</p>';
 h+='<p class="chapter-meta">Карточек и подпунктов: '+nodes+' · с назначенными изображениями: '+pictured+' · номера отражают вложенность исходного справочника</p>';
 h+='<div class="controls"><button type="button" data-sector="'+ch.v.id+'">Весь том</button><button type="button" data-mode="glossary">Словарь</button><button type="button" data-mode="sources">Об источниках</button></div></header>';
 if(arr(lesson.theory).length){
  h+='<section class="theory"><h3>Теоретическое введение</h3>'+lesson.theory.map(x=>'<p>'+safe(x)+'</p>').join("");
  for(const c of CASES.filter(x=>arr(x.for).includes(ch.id))){
   h+='<aside class="mini-case"><h4>Учебный пример · '+safe(c.title)+'</h4><p><strong>Условие:</strong> '+safe(c.task)+'</p><p><strong>Разбор:</strong> '+safe(c.solution)+'</p><small>Синтетические данные, не показатели реального предприятия.</small></aside>';
  }
  h+="</section>";
 }
 h+='<section aria-label="Иерархический материал главы">';
 tree(ch.id,ch,String(ch.n),0,new Set(),(id,unused,num,depth)=>{h+=nodeHtml(id,num,depth,tools)});
 h+="</section>";
 if(tools.size){
  h+='<section><h3>Приложение к главе: оборудование ('+tools.size+')</h3><div class="tools-index">'+[...tools].map(id=>'<a href="#tool-'+safe(id)+'" data-tool="'+safe(id)+'">'+safe(T[id].t||id)+'</a>').join(" · ")+'</div>';
  h+=[...tools].map(toolHtml).join("")+"</section>";
 }
 h+='<section class="study-questions"><h3>Вопросы для самопроверки</h3><ol>';
 for(const q of arr(lesson.questions).length?lesson.questions:["Какие этапы включает представленная технологическая цепочка?","Какие факторы влияют на её экономический результат?","Какие сведения требуют проверки по актуальным источникам?"])h+='<li>'+safe(q)+'</li>';
 h+='</ol><p><strong>Практическое задание.</strong> Выберите один конечный продукт, пройдите по иерархии до исходного ресурса, перечислите оборудование, основные затраты, побочные продукты и источники данных для проверки расчёта.</p></section></section>';
 return h;
}
function glossaryHtml(){
 let h='<section class="special"><p class="vol-title">ТОМ IV · Справочный аппарат</p><h2>Толковый словарь</h2><p>Определения сохранены из словарных модулей исходного приложения.</p>';
 for(const k of Object.keys(G).sort((a,b)=>a.localeCompare(b,"ru")))h+='<div class="glossary-item" id="term-'+encodeURIComponent(k)+'"><strong>'+safe(k)+'</strong> — '+safe(G[k])+'</div>';
 return h+"</section>";
}
function equipmentHtml(){
 const keys=Object.keys(T).sort((a,b)=>String(T[a].g||"").localeCompare(String(T[b].g||""),"ru")||String(T[a].t||"").localeCompare(String(T[b].t||""),"ru"));
 return '<section class="special"><p class="vol-title">ТОМ IV · Справочный аппарат</p><h2>Каталог инструментов, машин и оборудования</h2><p>К каждому объекту приведены пояснения и имеющиеся иллюстрации.</p>'+keys.map(toolHtml).join("")+"</section>";
}
function exercisesHtml(){
 let h='<section class="special"><p class="vol-title">ТОМ IV · Практикум</p><h2>Экономико-технологические задачи</h2><p>Все числовые данные ниже условные. Примеры нужны для освоения способа расчёта.</p>';
 for(let i=0;i<CASES.length;i++){
  const c=CASES[i];
  h+='<aside class="mini-case"><h3>Задача '+(i+1)+'. '+safe(c.title)+'</h3><p><strong>Условие.</strong> '+safe(c.task)+'</p><p><strong>Разбор.</strong> '+safe(c.solution)+'</p><p><strong>Вопрос для анализа.</strong> Какие дополнительные сведения потребуются для расчёта на реальном предприятии?</p></aside>';
 }
 h+='<h3>Алгоритм анализа</h3><ol><li>Определить границы и этапы производства.</li><li>Уточнить исходные ресурсы и единицы измерения.</li><li>Построить баланс основного сырья и побочных потоков.</li><li>Выявить ограничения мощности и сезонности.</li><li>Рассчитать затраты, результат и альтернативные сценарии.</li><li>Проверить источники, применимые нормы и устойчивость вывода.</li></ol></section>';
 return h;
}
function sourcesHtml(){
 return '<section class="special"><p class="vol-title">ТОМ IV · Методика</p><h2>Источники и достоверность</h2>'+
 '<p>В этом пособии использованы тексты, карточки, фотографии, иллюстрации и схемы действующего приложения «Древо отраслей». Дополнительные теоретические введения, вопросы и учебные примеры хранятся исключительно в папке <code>textbook/</code>. Данные приложения не изменяются.</p>'+
 '<p>Материал предназначен для обучения. Точные значения площадей, запасов древесины, технических характеристик, цен, нормативов и отраслевой статистики должны проверяться по первичным источникам с указанием года наблюдения.</p>'+
 '<h3>Рекомендуемые источники для проверки</h3><ul>'+
 '<li><a href="https://pravo.gov.ru/" target="_blank" rel="noopener">Официальный интернет-портал правовой информации</a> — действующие нормативные акты.</li>'+
 '<li><a href="https://rosleshoz.gov.ru/" target="_blank" rel="noopener">Рослесхоз</a> — лесное хозяйство, лесные ресурсы, отраслевые данные.</li>'+
 '<li><a href="https://rosstat.gov.ru/" target="_blank" rel="noopener">Росстат</a> — отраслевые и региональные статистические данные.</li>'+
 '<li><a href="https://mcx.gov.ru/" target="_blank" rel="noopener">Минсельхоз России</a> — сведения об агропромышленном комплексе.</li>'+
 '<li><a href="https://fsin.gov.ru/" target="_blank" rel="noopener">ФСИН России</a> — официальные сведения о системе исполнения наказаний.</li>'+
 '<li><a href="../amcharts-geodata-LICENSE.txt">amCharts geodata</a> — лицензия на географические контуры приложения.</li></ul>'+
 '<h3>Как различать утверждения</h3><p><strong>Описание технологии</strong> объясняет принцип действия. <strong>Ориентировочные показатели</strong> иллюстрируют масштаб, но не заменяют статистику конкретного года. <strong>Концепции «идеального цикла»</strong> раскрывают возможную организацию потоков, однако не удостоверяют экономическую целесообразность. Не смешивайте эти категории в научных выводах.</p>'+
 '<p>Редакция: октябрь 2026 года. Расширения с помощью ИИ следует подвергать экспертной проверке при подготовке к публикации.</p></section>';
}
function extrasHtml(){
 const tools=new Set();
 return '<section class="special"><h2>Дополнительные карточки</h2><p>Пункты, не входящие в основные ветви 27 глав, приведены отдельно, чтобы не изменять исходную иерархию.</p>'+
 extraNodes.map((id,i)=>nodeHtml(id,String(i+1),0,tools)).join("")+"</section>";
}
function render(scroll){
 nav();
 let h="";
 if(state.mode==="chapter")h=chapterHtml(CHAPTERS.find(x=>x.id===state.chapter)||CHAPTERS[0]);
 else if(state.mode==="volume"){
  const v=VOLUMES.find(x=>x.id===state.sector)||VOLUMES[0];
  h='<section class="sector-intro"><p class="vol-title">Учебный том</p><h2>'+safe(v.title)+'</h2><p>Все девять глав тома с исходной иерархией, изображениями и дополнительными пояснениями. Для печати большого объёма удобно сохранять главы отдельно.</p></section>'+
  CHAPTERS.filter(x=>x.v.id===v.id).map(chapterHtml).join("");
 }else if(state.mode==="glossary")h=glossaryHtml();
 else if(state.mode==="equipment")h=equipmentHtml();
 else if(state.mode==="exercises")h=exercisesHtml();
 else if(state.mode==="sources")h=sourcesHtml();
 else if(state.mode==="extras")h=extrasHtml();
 else h='<section class="special"><h2>Выберите том или главу</h2><p>Используйте оглавление слева или кнопки на титульной странице.</p></section>';
 byId("study-content").innerHTML=h;
 document.title="Древо отраслей — "+(state.mode==="chapter"?(CHAPTERS.find(x=>x.id===state.chapter)||{}).title:state.mode==="volume"?(VOLUMES.find(x=>x.id===state.sector)||{}).title:state.mode)+" · Учебное пособие";
 if(scroll){byId("study-content").scrollIntoView({block:"start"});byId("sidebar").classList.remove("open");byId("toc-toggle").setAttribute("aria-expanded","false")}
}
function chapter(id){const ch=CHAPTERS.find(x=>x.id===id);if(!ch)return;state.mode="chapter";state.chapter=id;state.sector=ch.v.id;render(true)}
function toNode(id){
 if(byId("card-"+id)){byId("card-"+id).scrollIntoView({block:"start"});return}
 if(index[id]){chapter(index[id].ch.id);requestAnimationFrame(()=>byId("card-"+id)?.scrollIntoView({block:"start"}))}
 else if(extraNodes.includes(id)){state.mode="extras";render(true);requestAnimationFrame(()=>byId("card-"+id)?.scrollIntoView({block:"start"}))}
}
function toTool(id){
 if(byId("tool-"+id)){byId("tool-"+id).scrollIntoView({block:"start"});return}
 state.mode="equipment";render(true);requestAnimationFrame(()=>byId("tool-"+id)?.scrollIntoView({block:"start"}));
}
function toTerm(id){
 state.mode="glossary";render(true);requestAnimationFrame(()=>byId("term-"+encodeURIComponent(id))?.scrollIntoView({block:"start"}));
}
document.addEventListener("click",e=>{
 const btn=e.target.closest("[data-chapter],[data-sector],[data-mode],[data-node],[data-tool],[data-term]");if(!btn)return;
 e.preventDefault();
 if(btn.dataset.chapter)chapter(btn.dataset.chapter);
 else if(btn.dataset.sector){state.mode="volume";state.sector=btn.dataset.sector;render(true)}
 else if(btn.dataset.mode){state.mode=btn.dataset.mode;render(true)}
 else if(btn.dataset.node)toNode(btn.dataset.node);
 else if(btn.dataset.tool)toTool(btn.dataset.tool);
 else if(btn.dataset.term)toTerm(btn.dataset.term);
});
byId("toc-toggle").addEventListener("click",()=>{const v=byId("sidebar").classList.toggle("open");byId("toc-toggle").setAttribute("aria-expanded",String(v))});
const searchIndex=[
 ...Object.keys(N).map(id=>({type:"node",id,title:nodeTitle(id),data:clean([N[id].s,N[id].w,arr(N[id].f).join(" ")].join(" ")).toLowerCase()})),
 ...Object.keys(T).map(id=>({type:"tool",id,title:clean(T[id].t),data:clean([T[id].w,T[id].how,T[id].use].join(" ")).toLowerCase()})),
 ...Object.keys(G).map(id=>({type:"term",id,title:id,data:G[id].toLowerCase()}))
];
byId("search").addEventListener("input",()=>{
 const q=byId("search").value.trim().toLowerCase();
 if(q.length<2){byId("search-results").hidden=true;byId("search-results").innerHTML="";return}
 const found=searchIndex.map(item=>({item,rank:item.title.toLowerCase().startsWith(q)?3:item.title.toLowerCase().includes(q)?2:item.data.includes(q)?1:0})).filter(x=>x.rank).sort((a,b)=>b.rank-a.rank).slice(0,32);
 byId("search-results").hidden=false;
 byId("search-results").innerHTML=found.length?found.map(x=>'<button type="button" data-search-type="'+x.item.type+'" data-search-id="'+safe(x.item.id)+'">'+safe(x.item.title)+'<small>'+({node:"Карточка",tool:"Оборудование",term:"Словарь"})[x.item.type]+'</small></button>').join(""):'<p class="sidebar-foot">Ничего не найдено.</p>';
});
byId("search-results").addEventListener("click",e=>{
 const b=e.target.closest("[data-search-id]");if(!b)return;
 if(b.dataset.searchType==="node")toNode(b.dataset.searchId);
 else if(b.dataset.searchType==="tool")toTool(b.dataset.searchId);
 else toTerm(b.dataset.searchId);
 byId("search-results").hidden=true;byId("search").value="";
});
byId("print-current").addEventListener("click",()=>{
 document.querySelector(".cover").classList.add("printable");
 document.querySelector(".frontmatter").classList.add("printable");
 const imgs=Array.from(byId("study-content").querySelectorAll("img"));
 imgs.forEach(img=>img.loading="eager");
 const ready=Promise.all(imgs.map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true})})));
 byId("print-current").disabled=true;byId("print-current").textContent="Подготовка изображений…";
 Promise.race([ready,new Promise(resolve=>setTimeout(resolve,10000))]).then(()=>{
  byId("print-current").disabled=false;byId("print-current").textContent="Печать / PDF";window.print();
 });
});
window.addEventListener("afterprint",()=>{document.querySelector(".cover").classList.remove("printable");document.querySelector(".frontmatter").classList.remove("printable")});
render(false);
window.BOOK_DIAGNOSTICS={chapters:CHAPTERS.length,nodes:Object.keys(N).length,reachable:seenNodes.size,extra:extraNodes.length,equipment:Object.keys(T).length,terms:Object.keys(G).length};
})();
(function(){
"use strict";
var N=window.N||{}, T=window.T||{}, G=window.G||{}, LESSONS=window.BOOK_LESSONS||{};
var SECTIONS={
 lpk:{name:"Часть I. Лесопромышленный комплекс",short:"ЛПК",label:"Лесопромышленный комплекс"},
 apk:{name:"Часть II. Агропромышленный комплекс",short:"АПК",label:"Агропромышленный комплекс"},
 mix:{name:"Часть III. Межотраслевое взаимодействие",short:"Связи",label:"Межотраслевое взаимодействие"},
 extra:{name:"Приложения",short:"Справочник",label:"Дополнительные материалы"}
};
var stageNames=["Ресурсы","Производство","Переработка","Техника","Рынок","УИС","Перспективы","Идеальный цикл","Регионы"];
var sourceRoots=[
 ["lpk",["gl_res","gl_prod","gl_proc","tech_root","r_root","u_root","lf_root","il_root","rg_lpk"]],
 ["apk",["ga_res","ag_root","ga_proc","at_root","ec_root","au_root","nt_root","ia_root","rg_apk"]],
 ["mix",["mx_land","mx_root","gm_proc","gm_tech","gm_mkt","mx_uis","mx_theory","im_root","rg_mix"]]
];
var ch=[], byKey={}, owner={}, totalSeen=new Set(), deepLink=null;
var printAll=new URLSearchParams(location.search).get("print")==="all";
var $=function(id){return document.getElementById(id)};
var esc=function(v){return String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")};
var plain=function(v){return String(v||"").replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g,function(m,a,b){return b||a}).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,function(m,a,b){return b||a}).replace(/<[^>]*>/g,"")};
var arr=function(v){return Array.isArray(v)?v:[]};
var validImg=function(src){return typeof src==="string"&&!src.includes("..")&&!src.startsWith("/")&&/^[^?#]+\.(webp|png|jpe?g|svg)$/i.test(src)};
var imgUrl=function(src){return "../"+encodeURI(src)};
var types={forest:"Раздел",live:"Живой объект",part:"Часть",proc:"Процесс",prod:"Сырьё или полуфабрикат",final:"Готовая продукция",waste:"Побочный продукт или риск",place:"Место или объект",idea:"Концепция",doc:"Документы и право",info:"Справка",tech:"Оборудование"};
function rich(input){
 var s=esc(input);
 s=s.replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g,function(match,name,label){
  var key=name.trim();return G[key]?'<button type="button" class="terms-inline" data-term="'+esc(key)+'" title="Показать определение">'+(label||name)+'</button>':(label||name);
 });
 s=s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,function(match,id,label){
  var key=id.trim();return N[key]?'<a href="#node-'+esc(key)+'" data-nid="'+esc(key)+'" class="xref">'+(label||id)+'</a>':(label||id);
 });
 return s.replace(/\r?\n/g,"<br>");
}
function prepare(){
 sourceRoots.forEach(function(group){
  var sec=group[0];
  group[1].forEach(function(root,i){
   var key=sec[0]+(i+1);
   if(sec==="lpk")key=["lres","lprod","lproc","tech","real","uis","lfut","cyl","lreg"][i];
   if(sec==="apk")key=["ares","aprod","aproc","atech","econ","auis","afut","cya","areg"][i];
   if(sec==="mix")key=["mres","mprod","mproc","mtech","mmkt","muis","mfut","mcyc","mreg"][i];
   var c={key:key,sec:sec,index:i+1,title:stageNames[i],root:root,records:[],byId:{}};
   if(!N[root]){c.missing=true;ch.push(c);byKey[key]=c;return}
   var seen=new Set();
   function walk(id,depth,num){
    if(!N[id]||seen.has(id))return;
    seen.add(id);totalSeen.add(id);
    if(!owner[id])owner[id]=key;
    var rec={id:id,depth:depth,num:num};
    c.records.push(rec);c.byId[id]=rec;
    arr(N[id].c).forEach(function(k,j){walk(k,depth+1,num+"."+(j+1))});
   }
   walk(root,0,String(i+1));
   ch.push(c);byKey[key]=c;
  });
 });
 var unlinked=Object.keys(N).filter(function(id){return !totalSeen.has(id)});
 if(unlinked.length){
  var c={key:"unlinked",sec:"extra",index:1,title:"Дополнительные карточки исходного справочника",root:null,records:[],byId:{}};
  unlinked.forEach(function(id,i){var rec={id:id,depth:0,num:"Д."+(i+1)};c.records.push(rec);c.byId[id]=rec;owner[id]="unlinked"});
  ch.push(c);byKey.unlinked=c;
 }
}
function makeToc(){
 var html="",current="";
 ch.forEach(function(c){
  if(c.sec!==current){current=c.sec;html+='<div class="toc-group '+c.sec+'"><div class="group-title">'+esc(SECTIONS[current].name)+'</div>'}
  html+='<button type="button" class="toc-link" data-chapter="'+esc(c.key)+'"><span>'+c.index+'. '+esc(c.title)+'</span><span class="count">'+c.records.length+'</span></button>';
  if(ch[ch.indexOf(c)+1]&&ch[ch.indexOf(c)+1].sec===current){}else html+='</div>';
 });
 html+='<div class="toc-group extra"><div class="group-title">Справочные указатели</div>'+
 '<button type="button" class="toc-link" data-chapter="tools"><span>Каталог техники</span><span class="count">'+Object.keys(T).length+'</span></button>'+
 '<button type="button" class="toc-link" data-chapter="terms"><span>Словарь терминов</span><span class="count">'+Object.keys(G).length+'</span></button></div>';
 $("toc").innerHTML=html;
 $("stats").textContent=ch.length+" глав · "+Object.keys(N).length+" карточек · "+Object.keys(T).length+" единиц техники · "+Object.keys(G).length+" терминов";
}
function makeFigure(src,title,hotspots){
 if(!validImg(src))return "";
 var hh=arr(hotspots).map(function(a){
  if(!Array.isArray(a)||a.length<5)return "";
  var name=String(a[0]),attr="";
  if(name.indexOf("g:")===0&&G[name.slice(2)])attr='data-term="'+esc(name.slice(2))+'"';
  else if(T[name])attr='data-tid="'+esc(name)+'"';
  else if(N[name])attr='data-nid="'+esc(name)+'"';
  else return "";
  var coords=a.slice(1,5).map(Number);
  if(coords.some(function(x){return !Number.isFinite(x)}))return "";
  var css="left:"+coords[0]+"%;top:"+coords[1]+"%;width:"+coords[2]+"%;height:"+coords[3]+"%";
  var label=G[name.slice(2)]?name.slice(2):T[name]?(T[name].t||name):N[name]?(plain(N[name].t)||name):name;
  return '<button type="button" class="hotspot no-print" '+attr+' style="'+css+'" title="'+esc(label)+'" aria-label="'+esc(label)+'"></button>';
 }).join("");
 var wide=/\.svg$/i.test(src)||hotspots&&hotspots.length>8;
 return '<figure class="'+(wide?"wide":"")+'"><div class="fig-wrap"><img src="'+esc(imgUrl(src))+'" alt="'+esc(title)+'" loading="lazy" decoding="async">'+hh+'</div><figcaption>'+esc(title)+'</figcaption></figure>';
}
function figures(n,id){
 var f=[],used=new Set();
 function add(src,caption,hs){if(validImg(src)&&!used.has(src)){used.add(src);f.push(makeFigure(src,caption,hs))}}
 if(window.PHR&&window.PH&&window.PHR[id]){
  var imageKey=window.PHR[id];
  add(window.PH[imageKey],plain(n.t)+" — общая иллюстрация",window.HSX&&window.HSX[imageKey]);
 }
 if(n.im)add(n.im,plain(n.t),[]);
 arr(n.pics).forEach(function(p){if(p&&p.src)add(p.src,plain(n.t)+" — схема или иллюстрация",p.hs)});
 return f.length?'<div class="figures">'+f.join("")+'</div>':"";
}
function mapView(kind){
 var rg=window.RG;
 if(!rg||!rg.p||!rg.d||!rg.w||!rg.h)return "";
 var colors=kind==="lpk"?["#e6ece2","#b7d2aa","#74a862","#2f6b2a"]:kind==="apk"?["#f1ece0","#e8cf8f","#c99a3b","#8a5a12"]:["#ece9f2","#c6bddb","#8f7fb8","#54417f"];
 var labels=kind==="lpk"?["Лесистость: до 15%","15–40%","40–65%","Более 65%"]:kind==="apk"?["Зерновая специализация: слабая","Есть","Значительная","Выраженная"]:["Низкое сочетание","Слабое","Заметное","Высокое"];
 var polygons=Object.keys(rg.p).map(function(k){
  var d=rg.d[k];if(!d)return "";
  var val=0;
  if(kind==="lpk")val=d[1]||0;
  else if(kind==="apk")val=d[6]||0;
  else val=Math.min(d[1]||0,Math.max(d[6]||0,d[9]||0,d[10]||0));
  val=Math.max(0,Math.min(3,val));
  return '<path d="'+esc(rg.p[k])+'" fill="'+colors[val]+'"><title>'+esc(d[0])+'</title></path>';
 }).join("");
 return '<figure class="region-map"><svg viewBox="0 0 '+Number(rg.w)+' '+Number(rg.h)+'" role="img" aria-label="Учебная карта региональной специализации">'+polygons+'</svg>'+
 '<figcaption>Обобщённая учебная карта по данным приложения. Цвета обозначают ориентировочные группы, а не показатели за конкретный год.</figcaption>'+
 '<div class="map-legend">'+colors.map(function(c,i){return '<span><i style="background:'+c+'"></i>'+esc(labels[i])+'</span>'}).join("")+'</div></figure>'+
 '<p class="small-note">Контуры регионов: amCharts geodata, см. лицензию в корне репозитория. Для научных выводов используйте актуальные официальные данные.</p>';
}
function card(n,rec,chapter){
 var id=rec.id,num=rec.num,depth=rec.depth;
 var z='<article class="card depth-'+(depth>2?"more":depth)+'" id="node-'+esc(chapter.key)+'-'+esc(id)+'" data-card-id="'+esc(id)+'">';
 z+='<div class="card-head"><span class="card-number">'+esc(num)+'</span><span class="card-type">'+esc(types[n.k]||"Материал")+' · ID: '+esc(id)+'</span></div>';
 z+='<h4>'+rich(n.t||id)+'</h4>';
 if(n.s)z+='<p class="lead">'+rich(n.s)+'</p>';
 z+=figures(n,id);
 if(n.n)z+='<p><strong>Наименования и термины.</strong> '+rich(n.n)+'</p>';
 if(n.w)z+='<p>'+rich(n.w)+'</p>';
 if(n.map)z+=mapView(n.map);
 if(n.h)z+='<div class="methods"><div class="mini-label">Технология / порядок действий</div>'+rich(n.h)+'</div>';
 if(arr(n.f).length)z+='<div class="mini-label">Подробности и пояснения</div><ul>'+n.f.map(function(x){return '<li>'+rich(x)+'</li>'}).join("")+'</ul>';
 if(arr(n.y).length)z+='<div class="mini-label">Результат / варианты использования</div><ul>'+n.y.map(function(x){return '<li>'+rich(x)+'</li>'}).join("")+'</ul>';
 if(arr(n.c).length){
  var descendants=arr(n.c).filter(function(k){return chapter.byId[k]});
  if(descendants.length)z+='<div class="children-summary"><strong>Дочерние пункты:</strong> '+descendants.map(function(k){return '<a href="#node-'+esc(chapter.key)+'-'+esc(k)+'" data-nid="'+esc(k)+'">'+esc(chapter.byId[k].num)+" "+esc(plain(N[k].t))+'</a>'}).join("")+'</div>';
 }
 var tlist=arr(n.tl).filter(function(k){return T[k]});
 if(tlist.length)z+='<div class="mini-label">Инструменты и оборудование</div><div class="toolrefs">'+tlist.map(function(k){return '<button type="button" data-tid="'+esc(k)+'">'+esc(T[k].t)+'</button>'}).join("")+'</div>';
 var linkList=arr(n.ln).filter(function(k){return N[k]});
 if(linkList.length)z+='<div class="mini-label">Смежные темы и переходы</div><div class="crossrefs">'+linkList.map(function(k){return '<a href="#node-'+esc(k)+'" data-nid="'+esc(k)+'">'+esc(plain(N[k].t))+'</a>'}).join("")+'</div>';
 return z+'</article>';
}
function chapterView(c){
 var n=N[c.root]||{},lesson=LESSONS[c.key];
 var header='<section class="chapter '+c.sec+'" data-chapter-id="'+esc(c.key)+'"><div class="chapter-front">'+
 '<div class="chapter-index">'+esc(SECTIONS[c.sec].name)+' · Глава '+c.index+'</div><h2>'+esc(c.title)+'</h2>'+
 '<p class="chapter-deck">'+esc(plain(n.t||c.title))+(n.s?" — "+esc(plain(n.s)):"")+'</p>'+
 '<p class="small-note">Содержит '+c.records.length+' карточек. Иерархическая нумерация и изображения перенесены из приложения. Текст занятия дополняет исходный материал.</p></div>';
 if(lesson){
  header+='<section class="chapter-section"><h3 class="lesson-title">Учебная лекция. '+esc(lesson.question)+'</h3>'+
  arr(lesson.theory).map(function(p){return '<p class="lesson-abstract">'+esc(p)+'</p>'}).join("")+
  '<div class="mini-label">Логика производственной цепочки</div><div class="chain">'+esc(lesson.chain)+'</div>'+
  '<h3>Практический разбор</h3><p class="case">'+esc(lesson.case)+'</p>'+
  '<h3>Вопросы для самопроверки</h3><ol class="study-questions">'+arr(lesson.questions).map(function(q){return '<li>'+esc(q)+'</li>'}).join("")+'</ol></section>';
 }
 if(c.records.length){
  var primary=c.records.filter(function(rec){return rec.depth<=1});
  header+='<section class="chapter-section"><h3>Структура главы</h3><p class="section-intro">Ниже представлены первичные и вложенные пункты в порядке исходного дерева. Номер показывает положение в иерархии.</p><nav class="hierarchy-overview" aria-label="Узлы главы">'+primary.map(function(rec){return '<a href="#node-'+esc(c.key)+'-'+esc(rec.id)+'">'+esc(rec.num)+' '+esc(plain(N[rec.id].t))+'</a>'}).join("")+'</nav></section>';
 }
 header+=c.records.map(function(rec){return card(N[rec.id],rec,c)}).join("");
 return header+'</section>';
}
function toolAppendix(){
 var list=Object.keys(T).sort(function(a,b){return String(T[a].g||"").localeCompare(String(T[b].g||""),"ru")||String(T[a].t||"").localeCompare(String(T[b].t||""),"ru")});
 var out='<section class="appendix" data-chapter-id="tools"><h2>Приложение. Каталог машин и оборудования</h2><p>Указаны назначения, варианты использования и изображения техники, соответствующие исходным карточкам.</p>';
 var group="";
 list.forEach(function(k){var t=T[k];if((t.g||"Разное")!==group){group=t.g||"Разное";out+='<h3>'+esc(group)+'</h3>'}
  out+='<section class="tool-entry" id="tool-'+esc(k)+'"><h3>'+esc(t.t||k)+'</h3>';
  if(validImg(t.im))out+='<img src="'+esc(imgUrl(t.im))+'" loading="lazy" alt="'+esc(t.t||k)+'">';
  ["w","use","perf","n","h"].forEach(function(f){if(t[f])out+='<p>'+rich(t[f])+'</p>'});
  if(arr(t.f).length)out+='<ul>'+t.f.map(function(x){return '<li>'+rich(x)+'</li>'}).join("")+'</ul>';
  out+='<div class="small-note">ID: '+esc(k)+'</div></section>';
 });
 return out+'</section>';
}
function glossaryAppendix(){
 var keys=Object.keys(G).sort(function(a,b){return a.localeCompare(b,"ru")});
 return '<section class="appendix" data-chapter-id="terms"><h2>Приложение. Терминологический словарь</h2><p>Термины и определения из исходного приложения.</p><div class="dictionary">'+keys.map(function(k){return '<div class="dict-entry" id="term-'+esc(k)+'"><strong>'+esc(k)+'</strong><p>'+rich(G[k])+'</p></div>'}).join("")+'</div></section>';
}
function navActive(key){
 document.querySelectorAll(".toc-link").forEach(function(b){b.classList.toggle("active",b.dataset.chapter===key)});
}
function showChapter(key,anchor){
 if(printAll)return;
 var c=byKey[key],where=$("chapters");if(!where)return;
 where.innerHTML=key==="tools"?toolAppendix():key==="terms"?glossaryAppendix():c?chapterView(c):"<p>Раздел не найден.</p>";
 navActive(key);document.body.dataset.activeChapter=key;
 $("status").textContent=key==="tools"?"Каталог техники":key==="terms"?"Словарь терминов":c?SECTIONS[c.sec].label+" · "+c.title:"";
 var target=anchor?document.getElementById(anchor):null;
 if(target)target.scrollIntoView({block:"start",behavior:"instant"});else window.scrollTo(0,0);
}
function goNode(id){
 var key=owner[id];if(!key){return}
 if(!printAll)showChapter(key);
 var el=document.getElementById("node-"+key+"-"+id);
 if(!el){el=document.querySelector('[data-card-id="'+CSS.escape(id)+'"]')}
 if(el){el.scrollIntoView({block:"start",behavior:"smooth"});el.setAttribute("tabindex","-1");el.focus({preventScroll:true})}
 if(!printAll)history.replaceState(null,"","#node-"+encodeURIComponent(id));
}
function toolDialog(id){
 var t=T[id];if(!t)return;
 var dialog=$("tool-dialog");
 if(!dialog){dialog=document.createElement("dialog");dialog.id="tool-dialog";document.body.appendChild(dialog)}
 dialog.innerHTML='<button class="dialog-close" data-close-dialog type="button">Закрыть ×</button><h2>'+esc(t.t||id)+'</h2>'+
 (validImg(t.im)?'<img src="'+esc(imgUrl(t.im))+'" alt="'+esc(t.t||id)+'">':"")+
 (t.g?'<p><strong>Группа:</strong> '+esc(t.g)+'</p>':"")+
 ["w","use","perf","h"].map(function(k){return t[k]?'<p>'+rich(t[k])+'</p>':""}).join("")+
 (arr(t.f).length?'<ul>'+t.f.map(function(x){return '<li>'+rich(x)+'</li>'}).join("")+'</ul>':"");
 if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
}
function termDialog(k){
 if(!G[k])return;
 var dialog=$("tool-dialog");
 if(!dialog){dialog=document.createElement("dialog");dialog.id="tool-dialog";document.body.appendChild(dialog)}
 dialog.innerHTML='<button class="dialog-close" data-close-dialog type="button">Закрыть ×</button><h2>'+esc(k)+'</h2><p>'+rich(G[k])+'</p>';
 if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
}
function search(q){
 q=q.trim().toLocaleLowerCase("ru");var target=$("results");target.replaceChildren();
 if(q.length<2)return;
 var results=[];
 Object.keys(N).forEach(function(id){var n=N[id];if((plain(n.t)+" "+plain(n.s||"")+" "+id).toLocaleLowerCase("ru").includes(q))results.push({type:"card",id:id,title:plain(n.t),meta:"Карточка · "+(owner[id]||"Древо")})});
 Object.keys(T).forEach(function(id){var n=T[id];if((n.t+" "+(n.g||"")).toLocaleLowerCase("ru").includes(q))results.push({type:"tool",id:id,title:n.t,meta:"Оборудование"})});
 Object.keys(G).forEach(function(k){if(k.toLocaleLowerCase("ru").includes(q))results.push({type:"term",id:k,title:k,meta:"Словарь"})});
 results.slice(0,60).forEach(function(r){var button=document.createElement("button");button.type="button";button.className="result";button.dataset.searchType=r.type;button.dataset.searchId=r.id;button.innerHTML=esc(r.title)+"<small>"+esc(r.meta)+"</small>";target.appendChild(button)});
 if(results.length>60){var more=document.createElement("div");more.className="small-note";more.textContent="Показаны первые 60 из "+results.length+" совпадений";target.appendChild(more)}
 if(!results.length)target.textContent="Совпадений нет";
}
function bind(){
 document.body.addEventListener("click",function(ev){
  var b=ev.target.closest("[data-chapter],[data-nid],[data-tid],[data-term],[data-close-dialog],[data-search-type]");
  if(!b)return;
  if(b.hasAttribute("data-chapter")){ev.preventDefault();showChapter(b.dataset.chapter);history.replaceState(null,"","#"+b.dataset.chapter);return}
  if(b.hasAttribute("data-nid")){ev.preventDefault();goNode(b.dataset.nid);return}
  if(b.hasAttribute("data-tid")){ev.preventDefault();toolDialog(b.dataset.tid);return}
  if(b.hasAttribute("data-term")){ev.preventDefault();termDialog(b.dataset.term);return}
  if(b.hasAttribute("data-close-dialog")){ev.preventDefault();var d=$("tool-dialog");if(d&&d.close)d.close();else if(d)d.removeAttribute("open");return}
  if(b.hasAttribute("data-search-type")){ev.preventDefault();var t=b.dataset.searchType,id=b.dataset.searchId;if(t==="card")goNode(id);else if(t==="tool")toolDialog(id);else termDialog(id);return}
 });
 $("search").addEventListener("input",function(e){search(e.target.value)});
 $("print-chapter").addEventListener("click",function(){window.print()});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"){var d=$("tool-dialog");if(d&&d.open&&d.close)d.close()}});
}
function chooseInitial(){
 var raw=decodeURIComponent(location.hash.slice(1));
 if(raw.indexOf("node-")===0&&owner[raw.slice(5)]){showChapter(owner[raw.slice(5)]);goNode(raw.slice(5))}
 else if(byKey[raw]||raw==="tools"||raw==="terms")showChapter(raw);
 else showChapter("lres");
}
function renderAll(){
 document.body.dataset.activeChapter="all";
 $("chapters").innerHTML=ch.map(chapterView).join("")+toolAppendix()+glossaryAppendix();
 $("status").textContent="Полная версия для печати: "+ch.length+" глав, каталог техники и словарь. Откройте меню браузера → Печать → Сохранить в PDF. Большой документ может потребовать значительных ресурсов.";
 $("print-chapter").textContent="Печать всей книги / PDF";
 $("print-all").textContent="Вернуться к чтению";
 $("print-all").href="index.html";
}
try{
 prepare();makeToc();bind();
 if(printAll)renderAll();else chooseInitial();
 var missing=ch.filter(function(c){return c.missing}).map(function(c){return c.title});
 if(missing.length)$("status").textContent+=" · В источнике не найдены корни: "+missing.join(", ");
}catch(err){$("status").textContent="Не удалось собрать содержание. Проверьте подключение исходных файлов. "+String(err);console.error(err)}
})();
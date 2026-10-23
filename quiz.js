/* Тест на знание пунктов справочника (кроме «Для игры») */
(function(){
const KEY="les-quiz-v1";
let stats={};try{stats=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){stats={}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(stats))}catch(e){}};
const QS=SCH.filter(s=>s.id!=="tech"&&s.id!=="atech");
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,n)=>shuf(a).slice(0,n);
const title=id=>plain(N[id].t);
const ids=sid=>Object.keys(N).filter(id=>tabOf(id)===sid);
function firstSent(s,max=240){s=plain(s).replace(/\s+/g," ").trim();const m=s.match(/^.{25,}?[.!?](\s|$)/);let r=m?m[0]:s;if(r.length<60){const m2=s.slice(r.length).match(/^.*?[.!?](\s|$)/);if(m2)r+=m2[0]}return r.length>max?r.slice(0,max).replace(/\s\S*$/,"")+"…":r.trim()}
function redact(text,t){let out=text;plain(t).toLowerCase().split(/[^а-яёa-z0-9-]+/i).filter(w=>w.length>=4).forEach(w=>{const stem=(w.length>4?w.slice(0,4):w).replace(/[-]/g,"\\-");out=out.replace(new RegExp("(^|[^а-яёa-z])("+stem+")[а-яёa-z]*","gi"),"$1…")});return out}
function uniqTitles(arr,ans){const seen=new Set([ans.toLowerCase()]);return arr.filter(x=>{const k=x.toLowerCase();if(seen.has(k))return false;seen.add(k);return true})}
function mk(prompt,answer,pool,id,sid,type,extra){const d=uniqTitles(shuf(pool),answer).slice(0,3);if(d.length<3)return null;return {prompt,answer,opts:shuf([answer,...d]),id,sid,type,extra}}
/* варианты вопросов по одному пункту */
function qDef(id){const n=N[id],src=n.w||(n.f||[])[0]||"",w=plain(src);if(!w||w.length<30)return null;const sid=tabOf(id);let same=ids(sid).filter(x=>x!==id&&N[x].k===n.k);if(same.length<3)same=ids(sid).filter(x=>x!==id);
 return mk(`О чём это?<br><q>${redact(firstSent(src),n.t)}</q>`,title(id),same.map(title),id,sid,"def")}
function qFrom(id){const n=N[id],p=P[id];if(!p||!n.e||!["prod","final","waste","part","live"].includes(n.k))return null;const sid=tabOf(id);
 const pool=ids(sid).filter(x=>x!==id&&x!==p&&["part","prod","live","waste"].includes(N[x].k)).map(title);
 return mk(`Из чего получают «${title(id)}»?`,title(p),pool,id,sid,"from")}
function qTool(id){const n=N[id];if(!n.tl||!n.tl.length)return null;const ans=n.tl[Math.floor(Math.random()*n.tl.length)];
 const pool=Object.keys(T).filter(t=>!n.tl.includes(t)).map(t=>T[t].t);
 return mk(`Какое оборудование используют здесь: «${title(id)}»?`,T[ans].t,pool,id,tabOf(id),"tool")}
function qSub(id){const n=N[id];if(!n.s||n.s.length<8)return null;const sid=tabOf(id);const pool=ids(sid).filter(x=>x!==id&&N[x].s).map(x=>N[x].s);
 return mk(`Как коротко описать «${title(id)}»?`,n.s,pool,id,sid,"sub")}
function qGloss(k){const others=Object.keys(G).filter(x=>x!==k).map(x=>G[x]);const q=mk(`Что означает «${k}»?`,G[k],others,"g:"+k,"gloss","gl");return q}
function qTerm(k){const others=Object.keys(G).filter(x=>x!==k).map(cap);return mk(`Какое слово подходит?<br><q>${redact(G[k],k)}</q>`,cap(k),others,"g:"+k,"gloss","term")}
function qToolDef(k){const x=T[k];if(!x.w)return null;const same=Object.keys(T).filter(o=>o!==k&&T[o].g===x.g).map(o=>T[o].t);const rest=Object.keys(T).filter(o=>o!==k&&T[o].g!==x.g).map(o=>T[o].t);const pool=same.length>=3?same:same.concat(rest);return mk(`Что это за оборудование?<br><q>${redact(firstSent(x.w),x.t)}</q>`,x.t,pool,"t:"+k,"tools","tdef")}
function qToolUse(k){const u=Object.keys(N).filter(id=>N[id].k!=="tech"&&(N[id].tl||[]).includes(k)&&tabOf(id));if(!u.length)return null;const id=u[Math.floor(Math.random()*u.length)];const pool=Object.keys(N).filter(x=>tabOf(x)&&N[x].k!=="tech"&&!(N[x].tl||[]).includes(k)&&(N[x].tl||[]).length).map(x=>plain(N[x].t));return mk(`Где применяют «${T[k].t}»?`,plain(N[id].t),pool,"t:"+k,"tools","tuse")}
function forItem(id,random){if(id.startsWith("t:")){const k=id.slice(2);return (random&&Math.random()<.4?qToolUse(k):null)||qToolDef(k)}
 if(id.startsWith("g:")){const k=id.slice(2);return (random&&Math.random()<.5?qTerm(k):qGloss(k))||qGloss(k)}
 const fns=random?shuf([qDef,qFrom,qTool,qSub]):[qDef,qFrom,qSub,qTool];for(const f of fns){const q=f(id);if(q)return q}return null}
function items(scope){let a=[];scope.forEach(s=>{a=a.concat(s==="gloss"?Object.keys(G).map(k=>"g:"+k):s==="tools"?Object.keys(T).map(k=>"t:"+k):ids(s))});return a}
/* интерфейс */
const pane=document.getElementById("pane-quiz");let run=null;
function mastered(list){return list.filter(i=>(stats[i]||0)>0).length}
function setup(){const rows=[...QS.map(s=>({id:s.id,t:({lpk:"ЛПК · ",apk:"АПК · ",mix:"ЛПК + АПК · "}[s.sec]||"")+s.t})),{id:"tools",t:"Техника и оборудование (ЛПК и АПК)"},{id:"gloss",t:"Словарь терминов"}];
 pane.innerHTML=`<p class="lead-s">Вопросы собираются из карточек справочника: узнать пункт по описанию, из чего его получают, какое оборудование нужно, что значит термин. Прогресс сохраняется на этом устройстве.</p>
 <div class="quiz-box"><h2 class="qh">Что проверяем</h2><div class="qscope">${rows.map(r=>{const l=items([r.id]).filter(i=>i.startsWith("g:")||i.startsWith("t:")||forItem(i,false));return `<label class="qchk"><input type="checkbox" value="${r.id}" ${r.id!=="gloss"&&r.id!=="tools"?"checked":""}><span>${r.t}</span><small>${mastered(l)} из ${l.length} освоено</small></label>`}).join("")}</div>
 <h2 class="qh">Сколько вопросов</h2><div class="qcount">${[10,20,50].map(n=>`<label class="qradio"><input type="radio" name="qn" value="${n}" ${n===10?"checked":""}><span>${n}</span></label>`).join("")}<label class="qradio"><input type="radio" name="qn" value="all"><span>Каждый пункт по порядку</span></label><label class="qradio"><input type="radio" name="qn" value="weak"><span>Только неосвоенные</span></label></div>
 <div class="qact"><button type="button" class="qbtn primary" id="qstart">Начать тест</button><button type="button" class="qbtn" id="qreset">Сбросить прогресс</button></div></div>`;
 pane.querySelector("#qstart").onclick=()=>{const scope=[...pane.querySelectorAll(".qscope input:checked")].map(i=>i.value);if(!scope.length)return;const mode=pane.querySelector("input[name=qn]:checked").value;start(scope,mode)};
 const rb=pane.querySelector("#qreset");rb.onclick=()=>{if(rb.dataset.sure){stats={};save();setup()}else{rb.dataset.sure=1;rb.textContent="Точно сбросить? Нажми ещё раз"}}}
function start(scope,mode){let list=items(scope);
 if(mode==="weak")list=list.filter(i=>!(stats[i]>0));
 let qs;if(mode==="all"||mode==="weak")qs=(mode==="all"?list:shuf(list)).map(i=>forItem(i,false)).filter(Boolean);
 else{const n=+mode;qs=[];const pool=shuf(list);for(const i of pool){if(qs.length>=n)break;const q=forItem(i,true);if(q)qs.push(q)}}
 if(!qs.length){pane.innerHTML=`<div class="quiz-box"><p>Здесь всё уже освоено. Выбери другие разделы или сбрось прогресс.</p><button type="button" class="qbtn" id="qback">Назад</button></div>`;pane.querySelector("#qback").onclick=setup;return}
 run={qs,i:0,ok:0,wrong:[]};ask()}
function explain(q){if(q.id.startsWith("t:")){const x=T[q.id.slice(2)];return `<b>${x.t}</b> — ${firstSent(x.w,320)}`}
 if(q.id.startsWith("g:"))return `<b>${cap(q.id.slice(2))}</b> — ${G[q.id.slice(2)]}`;const n=N[q.id];return `<b>${title(q.id)}</b>${n.s?` — ${n.s}`:""}. ${plain(n.w)?firstSent(n.w,320):""}`}
function ask(){const q=run.qs[run.i];const sname=q.sid==="gloss"?"Словарь":q.sid==="tools"?"Техника":SCH.find(s=>s.id===q.sid).t;
 pane.innerHTML=`<div class="quiz-box"><div class="qprog"><span>Вопрос ${run.i+1} из ${run.qs.length} · ${sname}</span><span>Верно: ${run.ok}</span></div><div class="qbar"><i style="width:${run.i/run.qs.length*100}%"></i></div>
 <p class="qprompt">${q.prompt}</p><div class="qopts">${q.opts.map((o,i)=>`<button type="button" class="qopt" data-i="${i}">${o}</button>`).join("")}</div><div class="qfb" id="qfb" hidden></div></div>`;
 pane.querySelectorAll(".qopt").forEach(b=>b.onclick=()=>answer(b))}
function answer(b){const q=run.qs[run.i];const right=q.opts[+b.dataset.i]===q.answer;
 pane.querySelectorAll(".qopt").forEach(x=>{x.disabled=true;if(q.opts[+x.dataset.i]===q.answer)x.classList.add("right")});if(!right)b.classList.add("wrong");
 if(right){run.ok++;stats[q.id]=(stats[q.id]||0)+1}else{stats[q.id]=0;run.wrong.push(q)}save();
 const fb=pane.querySelector("#qfb");fb.hidden=false;
 fb.innerHTML=`<p class="${right?"okm":"errm"}">${right?"Верно.":"Неверно. Правильный ответ: «"+q.answer+"»."}</p><p>${explain(q)}</p><div class="qact">${q.id.startsWith("g:")?"":q.id.startsWith("t:")?`<button type="button" class="qbtn" data-tool="${q.id.slice(2)}">Открыть карточку</button>`:`<button type="button" class="qbtn" data-go="${q.id}">Открыть карточку</button>`}<button type="button" class="qbtn primary" id="qnext">${run.i+1<run.qs.length?"Дальше":"Итоги"}</button></div>`;
 fb.querySelector("#qnext").onclick=()=>{run.i++;run.i<run.qs.length?ask():finish()};fb.scrollIntoView({block:"nearest"})}
function finish(){const pct=Math.round(run.ok/run.qs.length*100);
 pane.innerHTML=`<div class="quiz-box"><h2 class="qh">Результат: ${run.ok} из ${run.qs.length} (${pct}%)</h2>${run.wrong.length?`<p>Повтори эти пункты:</p><ul class="qwrong">${run.wrong.map(q=>`<li>${q.id.startsWith("t:")?`<button type="button" class="nlink" data-tool="${q.id.slice(2)}">${T[q.id.slice(2)].t}</button> — правильный ответ: «${q.answer}»`:q.id.startsWith("g:")?`<b>${cap(q.id.slice(2))}</b> — ${G[q.id.slice(2)]}`:`<button type="button" class="nlink" data-go="${q.id}">${title(q.id)}</button> — правильный ответ: «${q.answer}»`}</li>`).join("")}</ul>`:"<p>Без ошибок.</p>"}
 <div class="qact">${run.wrong.length?`<button type="button" class="qbtn primary" id="qretry">Пройти ошибки ещё раз</button>`:""}<button type="button" class="qbtn" id="qnew">Новый тест</button></div></div>`;
 const r=pane.querySelector("#qretry");if(r)r.onclick=()=>{const w=run.wrong.map(q=>forItem(q.id,true)||q);run={qs:shuf(w),i:0,ok:0,wrong:[]};ask()};
 pane.querySelector("#qnew").onclick=setup}
window.quizSetup=setup;setup();
})();

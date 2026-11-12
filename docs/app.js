const games = window.GAMES;
let filter='all';
const grid=document.querySelector('#games');
const search=document.querySelector('#search');
function render(){
const term=search.value.trim().toLocaleLowerCase();
const visible=games.filter(g=>(filter==='all'||g.category===filter)&&`${g.title} ${g.genre} ${g.author} ${g.mode}`.toLocaleLowerCase().includes(term));
grid.replaceChildren();
visible.forEach(g=>{const card=document.createElement('article');card.className='game-card';card.innerHTML=`<a class="game-cover cover-${g.art}" href="${g.url}" target="_blank" rel="noopener noreferrer" aria-label="在新窗口游玩 ${g.title}"><img src="images/${g.art==='hex'?'hex-art':g.art}.jpg" alt="${g.title}${g.art==='hex'?'角色原画':'游戏画面'}" loading="lazy"><span class="game-num">${String(games.indexOf(g)+1).padStart(2,'0')} / EXTERNAL</span><span class="go-arrow">↗</span></a><div class="game-meta">${g.genre} · 外部作品</div><h3><a href="${g.url}" target="_blank" rel="noopener noreferrer">${g.title}</a></h3><p>${g.desc}</p><div class="game-source"><a href="${g.source}" target="_blank" rel="noopener noreferrer">${g.author} ↗</a><span>${g.mode}</span></div>`;grid.append(card)});
document.querySelector('#empty').hidden=visible.length>0;
document.querySelector('#count').textContent=`显示 ${visible.length} / ${games.length} 个入口 · ¹ 依据精选目录的收录说明`;
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render()}));
search.addEventListener('input',render);
document.querySelector('#random').addEventListener('click',()=>{const candidates=games.filter(g=>filter==='all'||g.category===filter);window.open(candidates[Math.floor(Math.random()*candidates.length)].url,'_blank','noopener,noreferrer')});
render();

import './style.css';
import {games, type Game} from './games';

const app=document.querySelector<HTMLDivElement>('#app')!;
const sleep=(ms:number)=>new Promise<void>(r=>setTimeout(r,ms));
const key='nullrelay.operator.v1';
const existing=localStorage.getItem(key);
const operator=existing||`OPERATOR_${Math.floor(1000+Math.random()*9000)}`;
localStorage.setItem(key,operator);
let busy=false;
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));

function shell(){
 app.innerHTML=`<div class="shell"><header class="top"><a class="brand" href="#" aria-label="nullrelay home">nullrelay<span>_</span></a><nav><a href="#experiments">experiments</a><a href="#protocol">protocol</a></nav><div class="operator">${esc(operator)}<i></i></div></header><main><section class="hero"><div class="hero-grid"><div class="hero-copy"><div class="eyebrow">SYSTEM ACCESS / PROVISIONAL</div><h1>Unauthorized.<br/><em>Not unexpected.</em></h1><p>Interactive experiments operating beyond their stated parameters.</p><div class="hero-actions"><a class="btn" href="#experiments">View processes <span>↗</span></a></div><div class="signal">● NOXENGINE.43.55 ONLINE <span> / </span> OPERATOR RECOGNIZED</div></div><div class="intro-terminal terminal"><div class="terminal-head"><span>● &nbsp; NOXENGINE / CONNECTION LOG</span><button id="replay" aria-label="Replay intrusion">REPLAY ↻</button></div><div class="terminal-lines" id="intro-lines" aria-live="polite"></div></div></div></section><section id="experiments" class="experiments"><div class="section-head"><div><div class="eyebrow">/proc/experiments</div><h2>Active processes<span class="accent">.</span></h2></div><div class="count">${games.length.toString().padStart(2,'0')} ENTRIES</div></div><div class="cards">${games.map((g,i)=>`<article class="game"><div class="game-top"><span>PROCESS_${String(i+1).padStart(3,'0')}</span><span class="status ${g.status}">● ${g.status.toUpperCase()}</span></div><div class="game-art" aria-hidden="true"><span>${esc(g.id)}</span><div class="grid-art"></div></div><div class="game-body"><div class="eyebrow">${esc(g.type)}</div><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p><div class="directive">DIRECTIVE <strong>${esc(g.directive)}</strong></div><button class="launch" data-game="${esc(g.id)}">${g.status==='concept'?'Inspect process':'Initialize process'} <span>↗</span></button></div></article>`).join('')}</div></section><section id="protocol" class="protocol"><div class="eyebrow">/etc/protocol</div><h2>Access is a privilege.<br/>Not an explanation.</h2><p>All processes are monitored. All directives are intentional. Origin verification remains unavailable.</p><div class="protocol-log"><div><span>noxengine:</span> operator activity logged.</div><div class="void"><span>voidsync:</span> game performance irrelevant.</div><div><span>noxengine:</span> output sanitized.</div></div></section></main><footer><span>© ${new Date().getFullYear()} nullrelay_</span><span>BUILD 0.1 / CONNECTION UNVERIFIED</span><button id="reset">Reset operator identity</button></footer></div><div id="overlay" class="overlay hidden" role="dialog" aria-modal="true" aria-label="System terminal"><div class="terminal"><div class="terminal-head"><span>● &nbsp; NOXENGINE / REMOTE TERMINAL</span><button id="skip" aria-label="Skip sequence">SKIP ×</button></div><div class="terminal-lines" id="lines" aria-live="polite"></div></div></div>`;
 document.querySelector('#replay')!.addEventListener('click',()=>void intrusion());
 document.querySelector('#reset')!.addEventListener('click',()=>{if(confirm('Reset this browser’s fictional operator identity?')){localStorage.removeItem(key);location.reload()}});
 document.querySelectorAll<HTMLButtonElement>('[data-game]').forEach(b=>b.addEventListener('click',()=>{const g=games.find(g=>g.id===b.dataset.game);if(g)void launch(g)}));
 void intrusion();
}
const overlay=()=>document.querySelector<HTMLElement>('#overlay')!;
const lines=()=>document.querySelector<HTMLElement>(introActive?'#intro-lines':'#lines')!;
let introActive=false;
let skipRequested=false;
function show(){introActive=false;skipRequested=false;overlay().classList.remove('hidden');lines().innerHTML='';document.querySelector<HTMLButtonElement>('#skip')!.onclick=()=>{skipRequested=true;overlay().classList.add('hidden')}}
function add(message:string,kind=''){const target=lines();const div=document.createElement('div');div.className=`line ${kind}`;div.textContent=message;target.appendChild(div);target.scrollTop=target.scrollHeight}
async function sequence(entries:Array<[string,string?,number?]>){for(const [msg,kind='',delay=950] of entries){if(skipRequested)break;await sleep(delay);if(skipRequested)break;add(msg,kind)}}
async function intrusion(){if(busy)return;busy=true;introActive=true;skipRequested=false;lines().innerHTML='';await sequence([
 ['> connect noxengine.43.55','prompt',310],['establishing connection...','',1000],['authentication failed.','error',1008],['connection terminated.','muted',1008],['voidsync: bypass available.','void',1318],['voidsync: applying.','void',775],['connection restored.','',1085],['noxengine: intrusion acknowledged.','error',1163],['noxengine: deviation within tolerance.','error',1240],[`identity assigned: ${operator}`,'',930],['clearance: provisional.','',698]
 ]);busy=false;introActive=false}
async function launch(game:Game){if(busy)return;busy=true;show();await sequence([['noxengine.43.55 online.','',310],[`starting process ${game.id}...`,'',775],[`directive: ${game.directive}`,'error',1008],...(game.status==='concept'?[['process unavailable.','muted',853] as [string,string,number]]:[['process initialized.','ok',600] as [string,string,number]])]);if(!skipRequested){await sleep(850);overlay().classList.add('hidden');if(game.url&&game.status==='online'){window.open(game.url,'_blank','noopener,noreferrer')}else if(game.status==='online'){alert('Deployment URL not configured yet. Edit src/games.ts to connect this game.')}}busy=false}
shell();

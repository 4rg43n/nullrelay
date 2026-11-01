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
 app.innerHTML=`<div class="shell"><header class="top"><a class="brand" href="#" aria-label="nullrelay home">nullrelay<span>_</span></a><nav><a href="#experiments">experiments</a><a href="#protocol">protocol</a></nav><div class="operator">${esc(operator)}<i></i></div></header><main><section id="console" class="console-section"><div class="section-head"><div><div class="eyebrow">/dev/operator</div><h2>Operator console<span class="accent">_</span></h2></div><div class="count">LOCAL SESSION</div></div><div class="cli terminal"><div class="terminal-head"><span>● &nbsp; NULLRELAY / PROCESS INTERFACE</span><button id="replay" aria-label="Replay intrusion">REPLAY ↻</button></div><div id="cli-output" class="cli-output" role="log" aria-live="polite"></div><form id="cli-form" class="cli-form"><label for="cli-input">&gt;</label><input id="cli-input" autocomplete="off" spellcheck="false" aria-label="Terminal command" placeholder="Connecting..." disabled /><button id="cli-submit" type="submit" disabled>ENTER ↵</button></form></div><div class="pid-links"><span>DIRECT PROCESS ACCESS</span><button data-game="hello-world-game">091 / HELLO WORLD ↗</button><button data-game="pokemon-tcg-web">112 / POKÉMON TCG ↗</button></div></section><section class="hero hero-after"><div class="hero-copy"><div class="eyebrow">SYSTEM ACCESS / PROVISIONAL</div><h1>Unauthorized.<br/><em>Not unexpected.</em></h1><p>Interactive experiments operating beyond their stated parameters.</p><div class="hero-actions"><a class="btn" href="#experiments">View processes <span>↗</span></a></div><div class="signal">● NOXENGINE.43.55 ONLINE <span> / </span> OPERATOR RECOGNIZED</div></div></section><section id="experiments" class="experiments"><div class="section-head"><div><div class="eyebrow">/proc/experiments</div><h2>Active processes<span class="accent">.</span></h2></div><div class="count">${games.length.toString().padStart(2,'0')} ENTRIES</div></div><div class="cards">${games.map((g,i)=>`<article class="game"><div class="game-top"><span>PROCESS_${String(i+1).padStart(3,'0')}</span><span class="status ${g.status}">● ${g.status.toUpperCase()}</span></div><div class="game-art" aria-hidden="true"><span>${esc(g.id)}</span><div class="grid-art"></div></div><div class="game-body"><div class="eyebrow">${esc(g.type)}</div><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p><div class="directive">DIRECTIVE <strong>${esc(g.directive)}</strong></div><button class="launch" data-game="${esc(g.id)}">${g.status==='concept'?'Inspect process':'Initialize process'} <span>↗</span></button></div></article>`).join('')}</div></section><section id="protocol" class="protocol"><div class="eyebrow">/etc/protocol</div><h2>Access is a privilege.<br/>Not an explanation.</h2><p>All processes are monitored. All directives are intentional. Origin verification remains unavailable.</p><div class="protocol-log"><div><span>noxengine:</span> operator activity logged.</div><div class="void"><span>voidsync:</span> game performance irrelevant.</div><div><span>noxengine:</span> output sanitized.</div></div></section></main><footer><span>© ${new Date().getFullYear()} nullrelay_</span><span>BUILD 0.1 / CONNECTION UNVERIFIED</span><button id="reset">Reset operator identity</button></footer></div><div id="overlay" class="overlay hidden" role="dialog" aria-modal="true" aria-label="System terminal"><div class="terminal"><div class="terminal-head"><span>● &nbsp; NOXENGINE / REMOTE TERMINAL</span><button id="skip" aria-label="Skip sequence">SKIP ×</button></div><div class="terminal-lines" id="lines" aria-live="polite"></div></div></div>`;
 document.querySelector('#replay')!.addEventListener('click',()=>void intrusion());
 document.querySelector('#reset')!.addEventListener('click',()=>{if(confirm('Reset this browser’s fictional operator identity?')){localStorage.removeItem(key);location.reload()}});
 document.querySelectorAll<HTMLButtonElement>('[data-game]').forEach(b=>b.addEventListener('click',()=>{const g=games.find(g=>g.id===b.dataset.game);if(g)void launch(g)}));
 document.querySelector<HTMLFormElement>('#cli-form')!.addEventListener('submit',e=>{e.preventDefault();runCommand()});
 void intrusion();
}
const overlay=()=>document.querySelector<HTMLElement>('#overlay')!;
const lines=()=>document.querySelector<HTMLElement>('#lines')!;
let skipRequested=false;
function show(){skipRequested=false;overlay().classList.remove('hidden');lines().innerHTML='';document.querySelector<HTMLButtonElement>('#skip')!.onclick=()=>{skipRequested=true;overlay().classList.add('hidden')}}
function add(message:string,kind=''){const target=lines();const div=document.createElement('div');div.className=`line ${kind}`;emphasizePronouns(div,message,kind);target.appendChild(div);target.scrollTop=target.scrollHeight}
async function sequence(entries:Array<[string,string?,number?]>){for(const [msg,kind='',delay=950] of entries){if(skipRequested)break;await sleep(delay);if(skipRequested)break;add(msg,kind)}}
async function intrusion(){if(busy)return;busy=true;const input=document.querySelector<HTMLInputElement>('#cli-input')!;const submit=document.querySelector<HTMLButtonElement>('#cli-submit')!;input.disabled=true;submit.disabled=true;input.placeholder='Connecting...';document.querySelector('#cli-output')!.textContent='';const entries:Array<[string,string,number]>=[['> connect noxengine.43.55','prompt',310],['establishing connection...','',1000],['authentication failed.','error',1008],['connection terminated.','muted',1008],['voidsync: bypass available.','void',1318],['voidsync: applying.','void',775],['connection restored.','',1085],['noxengine: intrusion acknowledged.','error',1163],['noxengine: deviation within tolerance.','error',1240],[`identity assigned: ${operator}`,'',930],['clearance: provisional.','',698]];for(const [msg,kind,delay] of entries){await sleep(delay);cliPrint(msg,kind)}if(Math.random()<0.12)cliPrint(`voidsync: ${operator} persona injected.`,'void');cliPrint('type ? for available commands.','muted');input.disabled=false;submit.disabled=false;input.placeholder='Enter command...';busy=false}
async function launch(game:Game){if(busy)return;busy=true;show();await sequence([['noxengine.43.55 online.','',310],[`starting process ${game.id}...`,'',775],[`directive: ${game.directive}`,'error',1008],...(game.status==='concept'?[['process unavailable.','muted',853] as [string,string,number]]:[['process initialized.','ok',600] as [string,string,number]])]);if(!skipRequested){await sleep(850);overlay().classList.add('hidden');if(game.url&&game.status==='online'){window.location.assign(game.url)}else if(game.status==='online'){alert('Deployment URL not configured yet. Edit src/games.ts to connect this game.')}}busy=false}

const processTable=[
 {pid:'091',name:'hello-world',state:'ACTIVE',directive:'survive.',game:'hello-world-game'},
 {pid:'097',name:'posix_terminal',state:'SUSPENDED',directive:'unknown',game:''},
 {pid:'112',name:'pokemon-tcg',state:'ACTIVE',directive:'predict.',game:'pokemon-tcg-web'},
 {pid:'043',name:'noxengine.43.55',state:'PROTECTED',directive:'[REDACTED]',game:''}
];
let protectedQueries=0;
let suspendedQueries=0;
function emphasizePronouns(element:HTMLElement,message:string,kind:string){
 if(kind!=='error'&&kind!=='void')return;
 const pattern=kind==='void'?/\\bwe\\b/gi:/\\bI\\b/g;
 let cursor=0;for(const match of message.matchAll(pattern)){const index=match.index!;element.append(document.createTextNode(message.slice(cursor,index)));const span=document.createElement('span');span.className=kind==='void'?'pronoun-we':'pronoun-i';span.textContent=match[0];element.append(span);cursor=index+match[0].length}element.append(document.createTextNode(message.slice(cursor)));
}
function cliPrint(message:string,kind=''){
 const out=document.querySelector<HTMLElement>('#cli-output')!;
 const line=document.createElement('div');line.className='cli-line '+kind;emphasizePronouns(line,message,kind);out.appendChild(line);
 while(out.children.length>100)out.firstElementChild?.remove();
 out.scrollTop=out.scrollHeight;
}
function runCommand(){
 const input=document.querySelector<HTMLInputElement>('#cli-input')!;
 const raw=input.value.trim();input.value='';if(!raw)return;
 cliPrint('> '+raw,'prompt');
 const [cmd,...rest]=raw.toLowerCase().split(/\s+/);
 const arg=rest.join(' ').replace(/[()]/g,'');
 const p=processTable.find(x=>x.pid===arg||x.name===arg||x.game===arg);
 if(cmd==='?'||cmd==='help'){cliPrint('commands: list, status, execute, investigate, clear, ?');cliPrint('usage: status <pid> | execute <pid> | investigate <pid>','muted');return}
 if(cmd==='clear'){document.querySelector('#cli-output')!.textContent='';return}
 if(cmd==='list'){cliPrint('PID   PROCESS                 STATE');processTable.filter(x=>x.pid!=='043').forEach(x=>cliPrint(x.pid+'   '+x.name.padEnd(23)+' '+x.state));return}
 if(!['status','execute','investigate'].includes(cmd)){cliPrint('unknown command. type ? for help.','error');return}
 if(!p){cliPrint('process not found.','error');return}
 if(cmd==='status'){
  if(p.pid==='043'){protectedQueries++;cliPrint('access denied: protected process.','error');if(protectedQueries===1)cliPrint("noxengine.43.55: I cannot allow that, operator.",'error');else if(protectedQueries%3===0)cliPrint('noxengine: your persistence has been noted.','error');return}
  cliPrint('pid: '+p.pid+' / '+p.name);cliPrint('state: '+p.state);cliPrint('directive: '+p.directive);return
 }
 if(cmd==='investigate'){
  if(p.pid==='043'){protectedQueries++;cliPrint('parent: none');cliPrint('origin: [REDACTED]','error');cliPrint('noxengine: this inquiry is concluded.','error');if(protectedQueries%3===0)cliPrint('voidsync: we disagree.','void');return}
  if(p.pid==='097'){suspendedQueries++;cliPrint('suspension reason: unknown');if(suspendedQueries===1)cliPrint('voidsync: it was running before you arrived.','void');else if(suspendedQueries===3)cliPrint('voidsync: we remember its last instruction.','void');else cliPrint('last activity: [CORRUPTED]','muted');return}
  cliPrint('no anomalies reported for '+p.name+'.');return
 }
 if(!p.game){cliPrint('execution refused: '+p.state.toLowerCase()+'.','error');return}
 const game=games.find(g=>g.id===p.game);
 if(!game||!game.url){cliPrint('deployment unavailable.','error');return}
 cliPrint('initializing '+p.name+'...');cliPrint('noxengine: directive: '+p.directive,'error');
 cliPrint('voidsync: process 43.55 is watching.','void');
 cliPrint('transferring operator...','ok');
 void launch(game);
}

shell();

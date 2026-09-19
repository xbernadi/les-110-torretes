const fallbackEntries=[
  {date:'04.01.2026',comment:'Primera de l’any. Fred a les mans i Martorell despertant a sota.',pos:'50% 42%'},
  {date:'11.01.2026',comment:'Boira baixa. La torre ha aparegut just al final.',pos:'33% 72%'},
  {date:'24.01.2026',comment:'Pujada curta abans de dinar. Les cames ja recorden el camí.',pos:'68% 36%'},
  {date:'07.02.2026',comment:'Sol d’hivern i silenci a la carena.',pos:'45% 64%'},
  {date:'18.02.2026',comment:'Avui costava sortir. Per això compta el doble.',pos:'62% 52%'},
  {date:'05.03.2026',comment:'Primera pujada amb llum de tarda.',pos:'18% 82%'},
  {date:'17.03.2026',comment:'Vent fort al cim i baixada ràpida.',pos:'73% 61%'},
  {date:'29.03.2026',comment:'El verd ja ha canviat. La primavera ha arribat.',pos:'40% 45%'}
];
const map='assets/ruta-torretes.png';
function render(entries){
const grid=document.querySelector('#summitGrid');
grid.replaceChildren();
for(let i=1;i<=110;i++){
  const e=entries[i-1];
  const el=document.createElement(e?'button':'div');
  el.className='summit'+(e?' done':'');
  el.innerHTML=e?`<img src="${e.photo||map}" alt=""><span>${String(i).padStart(3,'0')}</span><i class="shade"></i><b>${e.date}</b>`:`<span>${String(i).padStart(3,'0')}</span>`;
  if(e)el.title=e.comment;
  grid.append(el);
}
const logbook=document.querySelector('#logbook');
logbook.replaceChildren();
entries.slice().reverse().slice(0,6).forEach((e,idx)=>{
  const n=entries.length-idx;
  logbook.insertAdjacentHTML('beforeend',`<article class="log-entry"><span class="num">${String(n).padStart(3,'0')}</span><img src="${e.photo||map}" alt=""><div><time>${e.date}</time><p>${e.comment}</p></div></article>`)
});
const postcardGrid=document.querySelector('#postcardGrid');
postcardGrid.replaceChildren();
entries.forEach((e,i)=>postcardGrid.insertAdjacentHTML('beforeend',`<article class="postcard"><img src="${e.photo||map}" alt="Fotografia de la pujada ${i+1}" style="object-position:${e.pos||'50% 50%'}"><div class="post-info"><time>№ ${String(i+1).padStart(3,'0')} · ${e.date}</time><p>${e.comment}</p></div></article>`));
document.querySelector('#doneCount').textContent=entries.length;
document.querySelector('#remainingCount').textContent=111-entries.length;
}

fetch('data/pujades.json').then(r=>r.ok?r.json():Promise.reject()).then(render).catch(()=>render(fallbackEntries));

const labels={bosc:['Mockup 01 · Graella Trail','Un any.<br>Una muntanya.'],trail:['Mockup 02 · Quadern de trail','111 COPS.<br>SENSE DRECERES.'],postals:['Mockup 03 · Àlbum de postals','Un paisatge.<br>111 records.']};
document.querySelectorAll('.theme-btn').forEach(btn=>btn.addEventListener('click',()=>{
  const theme=btn.dataset.theme;
  document.body.dataset.theme=theme;
  document.querySelectorAll('.theme-btn').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',b===btn)});
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  document.querySelector(`#${theme}View`).classList.add('active-view');
  document.querySelector('#viewLabel').textContent=labels[theme][0];
  document.querySelector('.theme-title').innerHTML=labels[theme][1];
}));

const dialog=document.querySelector('#addDialog');
document.querySelector('#openAdd').addEventListener('click',()=>dialog.showModal());
document.querySelector('#postcardAdd').addEventListener('click',()=>dialog.showModal());
document.querySelector('#addForm').addEventListener('submit',e=>{
  if(e.submitter?.value==='cancel')return;
  e.preventDefault();dialog.close();
  const toast=document.querySelector('#toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)
});


const tree = document.getElementById('tree');
function childCount(n){return (n.children||[]).reduce((a,c)=>a+1+childCount(c),0)}
function personNode(node, depth=1){
  const wrap=document.createElement('div'); wrap.className='person'; wrap.dataset.name=node.name.toLowerCase();
  const line=document.createElement('div'); line.innerHTML=`<span class="name">${node.name}</span>${node.children?` <span class="relation">(${childCount(node)} descendants)</span>`:''}`; wrap.appendChild(line);
  if(node.children?.length){ const kids=document.createElement('div'); kids.className='children'; node.children.forEach(c=>kids.appendChild(personNode(c, depth+1))); wrap.appendChild(kids); }
  return wrap;
}
window.familyData.children.forEach((branch,i)=>{
  const d=document.createElement('details'); d.className='branch'; d.open=true; d.dataset.name=branch.name.toLowerCase();
  const s=document.createElement('summary'); s.innerHTML=`<span class="badge">${i+1}</span><span><span class="name">${branch.name}</span><br><span class="relation">${childCount(branch)} descendants</span></span>`;
  d.appendChild(s); const kids=document.createElement('div'); kids.className='children'; (branch.children||[]).forEach(c=>kids.appendChild(personNode(c))); d.appendChild(kids); tree.appendChild(d);
});
document.getElementById('expandAll').onclick=()=>document.querySelectorAll('details').forEach(d=>d.open=true);
document.getElementById('collapseAll').onclick=()=>document.querySelectorAll('details').forEach(d=>d.open=false);
document.getElementById('search').addEventListener('input', e=>{
  const q=e.target.value.trim().toLowerCase(); document.querySelectorAll('.match').forEach(x=>x.classList.remove('match'));
  document.querySelectorAll('.hidden').forEach(x=>x.classList.remove('hidden'));
  if(!q) return;
  document.querySelectorAll('.person,.branch').forEach(el=>{ if(el.dataset.name?.includes(q)){ el.classList.add('match'); el.closest('details')?.setAttribute('open',''); }});
});

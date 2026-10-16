/* Pengaturan pribadi pemilik. Tersembunyi: buka dengan #pengaturan di alamat, atau ketuk logo 5x. Dikunci kata sandi. */
(()=>{
const KT='zui-teks',KP='zui-pin',SS='zui-ok';
const F=[['h1','Judul utama'],['.hero p.l','Teks pengantar'],['#aplikasi h2','Judul Aplikasi'],['#cara h2','Judul Cara pakai'],['#cara .w>p.sub','Keterangan Cara pakai'],['#kontrol h2','Judul Kontrol'],['#harga h2','Judul Harga'],['.fin h2','Judul penutup'],['.fin p','Teks penutup']];
const q=s=>document.querySelector(s),esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const orig=F.map(([s])=>{const e=q(s);return e?e.textContent:''});
const st=document.createElement('style');
st.textContent='.gg{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:32px}.gg figure{margin:0;background:var(--pn);border:1px solid var(--ln)}.gg img,.gg video{display:block;width:100%;max-height:360px;object-fit:cover;background:#0F2A3D}.gg figcaption{padding:10px 14px;color:var(--mu);font-size:14.5px}'+
'dialog.adm{max-width:640px;max-height:90vh;overflow:auto}.adm h3{margin:0 0 12px}.adm h4{font:600 15px var(--sn);margin:22px 0 8px}.adm label{display:block;font-size:13px;color:var(--mu);margin:12px 0 4px}.adm input[type=text],.adm input[type=password],.adm textarea{width:100%;font:15px var(--sn);padding:9px 11px;border:1px solid var(--ln);background:var(--pn);color:var(--ink);border-radius:3px}.adm textarea{min-height:70px;resize:vertical}.adm .r{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.adm .mi2{display:grid;grid-template-columns:72px 1fr auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--ln)}.adm .mi2 img,.adm .mi2 video{width:72px;height:54px;object-fit:cover;background:#0F2A3D}.adm .tb{display:flex;gap:6px;border-bottom:1px solid var(--ln)}.adm .tb button{border:0;border-bottom:3px solid transparent;background:none;color:var(--mu);font:500 15px var(--sn);padding:10px 12px;cursor:pointer}.adm .tb button[aria-selected=true]{color:var(--ink);border-color:var(--ac)}.adm .er{color:#B3261E;font-size:14px;margin-top:8px}';
document.head.appendChild(st);

/* penyimpanan: teks di localStorage, gambar dan video di IndexedDB (hanya di peramban ini) */
const db=new Promise((res,rej)=>{const r=indexedDB.open('zui-pengaturan',1);r.onupgradeneeded=()=>r.result.createObjectStore('m',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const tx=(m,f)=>db.then(d=>new Promise((res,rej)=>{const t=d.transaction('m',m),q2=f(t.objectStore('m'));t.oncomplete=()=>res(q2&&q2.result);t.onerror=()=>rej(t.error)}));
const all=()=>tx('readonly',s=>s.getAll()).then(a=>(a||[]).sort((x,y)=>x.o-y.o));
const put=m=>tx('readwrite',s=>s.put(m)),del=id=>tx('readwrite',s=>s.delete(id));
const gt=()=>{try{return JSON.parse(localStorage.getItem(KT)||'{}')}catch(e){return{}}};
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('zui:'+s)))].map(b=>b.toString(16).padStart(2,'0')).join('');

function applyT(){const t=gt();F.forEach(([s],i)=>{const e=q(s);if(e)e.textContent=t[i]||orig[i]})}
let urls=[];
async function render(){urls.forEach(u=>URL.revokeObjectURL(u));urls=[];let s=document.getElementById('galeri');const a=await all().catch(()=>[]);
if(!a.length){if(s)s.remove();return}
if(!s){s=document.createElement('section');s.id='galeri';(document.getElementById('kontrol')||document.body).before(s)}
s.innerHTML='<div class="w"><h2>Galeri</h2><div class="gg">'+a.map(m=>{const u=URL.createObjectURL(m.b);urls.push(u);return'<figure>'+(m.k==='v'?`<video src="${u}" controls playsinline preload="metadata"></video>`:`<img src="${u}" alt="${esc(m.c)}" loading="lazy">`)+(m.c?`<figcaption>${esc(m.c)}</figcaption>`:'')+'</figure>'}).join('')+'</div></div>'}

/* dialog */
let D=document.createElement('dialog');D.className='adm';document.body.appendChild(D);
const lockedUI=()=>{const baru=!localStorage.getItem(KP);
D.innerHTML=`<h3>${baru?'Buat kata sandi pengaturan':'Pengaturan pribadi'}</h3><p>${baru?'Kata sandi ini hanya tersimpan di peramban ini. Jika lupa, hapus data situs di peramban untuk mengatur ulang.':'Masukkan kata sandi untuk melanjutkan.'}</p><input type="password" id="ap1" autocomplete="${baru?'new-password':'current-password'}" placeholder="Kata sandi${baru?' (minimal 6 karakter)':''}"><div class="er" id="aer"></div><div class="r"><button class="b p" id="aok">${baru?'Simpan dan masuk':'Masuk'}</button><button class="b" id="atp">Tutup</button></div>`;
const go=async()=>{const v=D.querySelector('#ap1').value,er=D.querySelector('#aer');
if(baru){if(v.length<6){er.textContent='Minimal 6 karakter.';return}localStorage.setItem(KP,await sha(v))}
else if(await sha(v)!==localStorage.getItem(KP)){er.textContent='Kata sandi salah.';return}
sessionStorage.setItem(SS,'1');panel()};
D.querySelector('#aok').onclick=go;D.querySelector('#ap1').onkeydown=e=>{if(e.key==='Enter')go()};D.querySelector('#atp').onclick=()=>D.close()};

function panel(tab){tab=tab||'t';const t=gt();
D.innerHTML=`<h3>Pengaturan pribadi</h3><div class="tb" role="tablist"><button data-t="t" aria-selected="${tab==='t'}">Teks</button><button data-t="m" aria-selected="${tab==='m'}">Gambar dan video</button><button data-t="k" aria-selected="${tab==='k'}">Keamanan</button></div><div id="pb"></div><div class="r"><button class="b" id="atp">Tutup</button></div>`;
D.querySelectorAll('.tb button').forEach(b=>b.onclick=()=>panel(b.dataset.t));D.querySelector('#atp').onclick=()=>D.close();
const pb=D.querySelector('#pb');
if(tab==='t'){pb.innerHTML=F.map(([s,l],i)=>`<label>${l}</label><textarea data-i="${i}">${esc(t[i]||orig[i])}</textarea>`).join('')+'<div class="r"><button class="b p" id="asv">Simpan teks</button><button class="b" id="ars">Kembalikan teks asli</button></div><div class="er" id="aer" style="color:var(--ok)"></div>';
pb.querySelector('#asv').onclick=()=>{const o={};pb.querySelectorAll('textarea').forEach(x=>{const i=+x.dataset.i;if(x.value.trim()&&x.value!==orig[i])o[i]=x.value});localStorage.setItem(KT,JSON.stringify(o));applyT();pb.querySelector('#aer').textContent='Tersimpan.'};
pb.querySelector('#ars').onclick=()=>{localStorage.removeItem(KT);applyT();panel('t')}}
else if(tab==='m'){pb.innerHTML='<label>Pilih gambar atau video (boleh banyak)</label><input type="file" id="afl" accept="image/*,video/*" multiple><label>Keterangan (opsional, untuk berkas yang dipilih)</label><input type="text" id="acp" placeholder="Contoh: Gudang baru"><div class="r"><button class="b p" id="aad">Tambahkan ke galeri</button></div><div class="er" id="aer"></div><h4>Isi galeri</h4><div id="aml"></div>';
const lst=async()=>{const a=await all().catch(()=>[]),box=pb.querySelector('#aml'),us=[];
box.innerHTML=a.length?a.map((m,i)=>{const u=URL.createObjectURL(m.b);us.push(u);return`<div class="mi2" data-id="${m.id}">${m.k==='v'?`<video src="${u}" muted preload="metadata"></video>`:`<img src="${u}" alt="">`}<input type="text" value="${esc(m.c)}" placeholder="Keterangan" aria-label="Keterangan"><span><button class="b sm" data-a="u" ${i?'':'disabled'}>↑</button> <button class="b sm" data-a="d" ${i<a.length-1?'':'disabled'}>↓</button> <button class="b sm" data-a="x">Hapus</button></span></div>`}).join(''):'<p>Belum ada. Galeri baru tampil di situs setelah ada isinya.</p>';
box.querySelectorAll('.mi2').forEach((r,i)=>{const m=a[i];r.querySelector('input').onchange=async e=>{m.c=e.target.value;await put(m);render()};
r.querySelectorAll('button').forEach(b=>b.onclick=async()=>{const x=b.dataset.a;
if(x==='x'){if(!confirm('Hapus item ini?'))return;await del(m.id)}else{const n=a[x==='u'?i-1:i+1],o=m.o;m.o=n.o;n.o=o;await put(m);await put(n)}
us.forEach(u=>URL.revokeObjectURL(u));await render();lst()})})};
pb.querySelector('#aad').onclick=async()=>{const fs=[...pb.querySelector('#afl').files],er=pb.querySelector('#aer'),c=pb.querySelector('#acp').value.trim();
if(!fs.length){er.textContent='Pilih berkas dulu.';return}er.textContent='';
try{let n=Date.now();for(const f of fs){const k=f.type.startsWith('video')?'v':f.type.startsWith('image')?'i':'';if(!k)continue;await put({id:'m'+n+Math.random().toString(36).slice(2,6),k,b:f,c,o:n++})}
await render();pb.querySelector('#afl').value='';pb.querySelector('#acp').value='';lst()}catch(e){er.textContent='Gagal menyimpan. Penyimpanan peramban mungkin penuh atau mode pribadi aktif.'}};
lst()}
else{pb.innerHTML='<h4>Ganti kata sandi</h4><label>Kata sandi baru</label><input type="password" id="anp" autocomplete="new-password"><div class="r"><button class="b p" id="agp">Ganti</button><button class="b" id="akn">Kunci sekarang</button></div><div class="er" id="aer"></div>';
pb.querySelector('#agp').onclick=async()=>{const v=pb.querySelector('#anp').value,er=pb.querySelector('#aer');if(v.length<6){er.textContent='Minimal 6 karakter.';return}localStorage.setItem(KP,await sha(v));er.style.color='var(--ok)';er.textContent='Kata sandi diganti.'};
pb.querySelector('#akn').onclick=()=>{sessionStorage.removeItem(SS);D.close()}}}

function bukaPengaturan(){sessionStorage.getItem(SS)?panel():lockedUI();if(!D.open)D.showModal()}
/* pemicu tersembunyi */
const chk=()=>{if(location.hash==='#pengaturan'){history.replaceState(null,'',location.pathname+location.search);bukaPengaturan()}};
addEventListener('hashchange',chk);
let tp=[];document.querySelectorAll('.top .lg').forEach(a=>a.addEventListener('click',e=>{const n=Date.now();tp=tp.filter(x=>n-x<3000);tp.push(n);if(tp.length>=5){tp=[];e.preventDefault();bukaPengaturan()}}));
applyT();render();chk();
})();

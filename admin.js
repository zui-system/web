/* Pengaturan pribadi pemilik (Firebase). Buka dengan #pengaturan di alamat, atau ketuk logo 5x. Login Google; hanya email pemilik (di aturan Firebase) yang bisa menyimpan. */
(()=>{
const CFG={apiKey:"AIzaSyC5SzHo8hf-nJoJogI3thTJKiulxvdkZ3E",authDomain:"web-zuisystem.firebaseapp.com",projectId:"web-zuisystem",storageBucket:"web-zuisystem.firebasestorage.app",messagingSenderId:"507512716156",appId:"1:507512716156:web:b9806f4db7704ecfdd42f9"};
const B='https://www.gstatic.com/firebasejs/13.0.0/firebase-',KC='zui-teks-cache',imp=m=>import(B+m+'.js');
const F=[['h1','Judul utama'],['.hero p.l','Teks pengantar'],['#aplikasi h2','Judul Aplikasi'],['#cara h2','Judul Cara pakai'],['#cara .w>p.sub','Keterangan Cara pakai'],['#kontrol h2','Judul Kontrol'],['#harga h2','Judul Harga'],['.fin h2','Judul penutup'],['.fin p','Teks penutup']];
const q=s=>document.querySelector(s),esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const orig=F.map(([s])=>{const e=q(s);return e?e.textContent:''});
const st=document.createElement('style');
st.textContent='.gg{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:32px}.gg figure{margin:0;background:var(--pn);border:1px solid var(--ln)}.gg img,.gg video{display:block;width:100%;max-height:360px;object-fit:cover;background:#0F2A3D}.gg figcaption{padding:10px 14px;color:var(--mu);font-size:14.5px}'+
'dialog.adm{max-width:640px;max-height:90vh;overflow:auto}.adm h3{margin:0 0 12px}.adm h4{font:600 15px var(--sn);margin:22px 0 8px}.adm label{display:block;font-size:13px;color:var(--mu);margin:12px 0 4px}.adm input[type=text],.adm textarea{width:100%;font:15px var(--sn);padding:9px 11px;border:1px solid var(--ln);background:var(--pn);color:var(--ink);border-radius:3px}.adm textarea{min-height:70px;resize:vertical}.adm .r{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.adm .mi2{display:grid;grid-template-columns:72px 1fr auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--ln)}.adm .mi2 img,.adm .mi2 video{width:72px;height:54px;object-fit:cover;background:#0F2A3D}.adm .tb{display:flex;gap:6px;border-bottom:1px solid var(--ln)}.adm .tb button{border:0;border-bottom:3px solid transparent;background:none;color:var(--mu);font:500 15px var(--sn);padding:10px 12px;cursor:pointer}.adm .tb button[aria-selected=true]{color:var(--ink);border-color:var(--ac)}.adm .er{color:#B3261E;font-size:14px;margin-top:8px}.adm .er.ok{color:var(--ok)}';
document.head.appendChild(st);

/* Firebase dimuat saat dibutuhkan */
let FB,AU,SG;
const core=async()=>FB||(FB=await(async()=>{const[a,f]=await Promise.all([imp('app'),imp('firestore')]),app=a.initializeApp(CFG);return{app,f,db:f.getFirestore(app)}})());
const auth=async()=>AU||(AU=await(async()=>{const c=await core(),m=await imp('auth');return{m,a:m.getAuth(c.app)}})());
const stor=async()=>SG||(SG=await(async()=>{const c=await core(),m=await imp('storage');return{m,s:m.getStorage(c.app)}})());
const msg=e=>/permission|insufficient/i.test(e&&(e.code+e.message))?'Akun ini bukan pemilik, atau aturan Firebase belum dipasang.':(e&&e.message)||'Gagal.';

/* tampilan publik */
const gc=()=>{try{return JSON.parse(localStorage.getItem(KC)||'{}')}catch(e){return{}}};
function applyT(){const t=gc();F.forEach(([s],i)=>{const e=q(s);if(e)e.textContent=t[i]||orig[i]})}
let GAL=[];
function render(){let s=document.getElementById('galeri');
if(!GAL.length){if(s)s.remove();return}
if(!s){s=document.createElement('section');s.id='galeri';(document.getElementById('kontrol')||document.body).before(s)}
s.innerHTML='<div class="w"><h2>Galeri</h2><div class="gg">'+GAL.map(m=>'<figure>'+(m.k==='v'?`<video src="${esc(m.url)}" controls playsinline preload="metadata"></video>`:`<img src="${esc(m.url)}" alt="${esc(m.c)}" loading="lazy">`)+(m.c?`<figcaption>${esc(m.c)}</figcaption>`:'')+'</figure>').join('')+'</div></div>'}
async function muat(){try{const c=await core(),f=c.f,t=await f.getDoc(f.doc(c.db,'situs','teks'));
localStorage.setItem(KC,JSON.stringify(t.exists()?t.data().t||{}:{}));applyT();
const g=await f.getDocs(f.query(f.collection(c.db,'galeri'),f.orderBy('o')));GAL=g.docs.map(d=>({id:d.id,...d.data()}));render()}catch(e){console.warn('Zui:',e)}}

/* panel pemilik */
const D=document.createElement('dialog');D.className='adm';document.body.appendChild(D);
const tutup=()=>D.querySelector('#atp').onclick=()=>D.close();
function loginUI(er){D.innerHTML=`<h3>Pengaturan pribadi</h3><p>Masuk dengan akun Google pemilik.</p><div class="er">${esc(er)}</div><div class="r"><button class="b p" id="aok">Masuk dengan Google</button><button class="b" id="atp">Tutup</button></div>`;tutup();
D.querySelector('#aok').onclick=async()=>{try{const A=await auth();await A.m.signInWithPopup(A.a,new A.m.GoogleAuthProvider());panel()}catch(e){loginUI(e.code==='auth/unauthorized-domain'?'Domain ini belum ditambahkan di Firebase: Authentication > Settings > Authorized domains.':msg(e))}}}

function panel(tab){tab=tab||'t';
D.innerHTML=`<h3>Pengaturan pribadi</h3><div class="tb" role="tablist"><button data-t="t" aria-selected="${tab==='t'}">Teks</button><button data-t="m" aria-selected="${tab==='m'}">Gambar dan video</button><button data-t="k" aria-selected="${tab==='k'}">Akun</button></div><div id="pb"></div><div class="r"><button class="b" id="atp">Tutup</button></div>`;
D.querySelectorAll('.tb button').forEach(b=>b.onclick=()=>panel(b.dataset.t));tutup();
const pb=D.querySelector('#pb'),t=gc(),say=(m,ok)=>{const e=pb.querySelector('#aer');e.textContent=m;e.className='er'+(ok?' ok':'')};
if(tab==='t'){pb.innerHTML=F.map(([s,l],i)=>`<label>${l}</label><textarea data-i="${i}">${esc(t[i]||orig[i])}</textarea>`).join('')+'<div class="r"><button class="b p" id="asv">Simpan teks</button><button class="b" id="ars">Kembalikan teks asli</button></div><div class="er" id="aer"></div>';
const simpan=async o=>{try{const c=await core(),f=c.f;await f.setDoc(f.doc(c.db,'situs','teks'),{t:o});localStorage.setItem(KC,JSON.stringify(o));applyT();return 1}catch(e){say(msg(e))}};
pb.querySelector('#asv').onclick=async()=>{const o={};pb.querySelectorAll('textarea').forEach(x=>{const i=+x.dataset.i;if(x.value.trim()&&x.value!==orig[i])o[i]=x.value});if(await simpan(o))say('Tersimpan dan tampil untuk semua pengunjung.',1)};
pb.querySelector('#ars').onclick=async()=>{if(await simpan({}))panel('t')}}
else if(tab==='m'){pb.innerHTML='<label>Pilih gambar atau video (boleh banyak)</label><input type="file" id="afl" accept="image/*,video/*" multiple><label>Keterangan (opsional)</label><input type="text" id="acp" placeholder="Contoh: Gudang baru"><div class="r"><button class="b p" id="aad">Unggah ke galeri</button></div><div class="er" id="aer"></div><h4>Isi galeri</h4><div id="aml"></div>';
const lst=()=>{const box=pb.querySelector('#aml');
box.innerHTML=GAL.length?GAL.map((m,i)=>`<div class="mi2">${m.k==='v'?`<video src="${esc(m.url)}" muted preload="metadata"></video>`:`<img src="${esc(m.url)}" alt="">`}<input type="text" value="${esc(m.c)}" placeholder="Keterangan" aria-label="Keterangan"><span><button class="b sm" data-a="u" ${i?'':'disabled'}>↑</button> <button class="b sm" data-a="d" ${i<GAL.length-1?'':'disabled'}>↓</button> <button class="b sm" data-a="x">Hapus</button></span></div>`).join(''):'<p>Belum ada isi.</p>';
box.querySelectorAll('.mi2').forEach((r,i)=>{const m=GAL[i];
r.querySelector('input').onchange=async e=>{try{const c=await core();await c.f.updateDoc(c.f.doc(c.db,'galeri',m.id),{c:e.target.value});m.c=e.target.value;render()}catch(x){say(msg(x))}};
r.querySelectorAll('button').forEach(b=>b.onclick=async()=>{const x=b.dataset.a;try{const c=await core(),f=c.f,d=n=>f.doc(c.db,'galeri',n.id);
if(x==='x'){if(!confirm('Hapus item ini?'))return;await f.deleteDoc(d(m));try{const s=await stor();await s.m.deleteObject(s.m.ref(s.s,m.p))}catch(e){}}
else{const n=GAL[x==='u'?i-1:i+1];await f.updateDoc(d(m),{o:n.o});await f.updateDoc(d(n),{o:m.o})}
await muat();lst()}catch(e){say(msg(e))}})})};
pb.querySelector('#aad').onclick=async()=>{const fs=[...pb.querySelector('#afl').files].filter(f=>/^(image|video)\//.test(f.type)),c=pb.querySelector('#acp').value.trim();
if(!fs.length){say('Pilih gambar atau video dulu.');return}
try{const k0=await core(),s=await stor();let n=0;
for(const f of fs){n++;const id='m'+Date.now()+Math.random().toString(36).slice(2,6),p='galeri/'+id,r=s.m.ref(s.s,p),task=s.m.uploadBytesResumable(r,f,{contentType:f.type});
await new Promise((ok,no)=>task.on('state_changed',sn=>say(`Mengunggah ${n}/${fs.length}: ${Math.round(sn.bytesTransferred/sn.totalBytes*100)}%`,1),no,ok));
await k0.f.setDoc(k0.f.doc(k0.db,'galeri',id),{k:f.type.startsWith('video')?'v':'i',url:await s.m.getDownloadURL(r),p,c,o:Date.now()+n})}
await muat();pb.querySelector('#afl').value='';pb.querySelector('#acp').value='';say('Selesai diunggah.',1);lst()}catch(e){say(msg(e))}};
lst()}
else{const A=AU;pb.innerHTML=`<h4>Akun</h4><p>Masuk sebagai ${esc(A.a.currentUser&&A.a.currentUser.email)}</p><div class="r"><button class="b" id="akn">Keluar</button></div>`;
pb.querySelector('#akn').onclick=async()=>{await A.m.signOut(A.a);D.close()}}}

async function buka(){D.innerHTML='<h3>Pengaturan pribadi</h3><p>Memuat…</p>';if(!D.open)D.showModal();
try{const A=await auth();await A.a.authStateReady();A.a.currentUser?panel():loginUI('')}catch(e){loginUI(msg(e))}}
const chk=()=>{if(location.hash==='#pengaturan'){history.replaceState(null,'',location.pathname+location.search);buka()}};
addEventListener('hashchange',chk);
let tp=[];document.querySelectorAll('.top .lg').forEach(a=>a.addEventListener('click',e=>{const n=Date.now();tp=tp.filter(x=>n-x<3000);tp.push(n);if(tp.length>=5){tp=[];e.preventDefault();buka()}}));
applyT();muat();chk();
})();

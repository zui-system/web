/* Zui System — skrip kecil bersama: menu HP, tahun footer, demo alur Zui ERP */
(function(){
var hb=document.getElementById('hb'),mm=document.getElementById('mm');
function mmx(o){mm.hidden=!o;hb.setAttribute('aria-expanded',o);hb.setAttribute('aria-label',o?'Tutup menu':'Buka menu');document.body.classList.toggle('mo',o)}
if(hb&&mm){hb.onclick=function(){mmx(mm.hidden)};mm.addEventListener('click',function(e){if(e.target.closest('a'))mmx(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')mmx(false)});
matchMedia('(min-width:901px)').addEventListener('change',function(e){if(e.matches)mmx(false)})}
var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
/* demo alur persetujuan (hanya di halaman Zui ERP) */
var tl=document.getElementById('tl'),da=document.getElementById('da'),ds=document.getElementById('ds');
if(tl&&da&&ds){
var ST=[{r:'Pembelian',t:'PO dibuat',s:'Menunggu persetujuan Admin',b:null},{r:'Admin',t:'Menyetujui pembelian',s:'Menunggu konfirmasi Keuangan',b:'Setujui sebagai Admin'},{r:'Keuangan',t:'Mengonfirmasi pembelian',s:'Menunggu barang di gudang',b:'Konfirmasi sebagai Keuangan'},{r:'Gudang',t:'Menerima barang',s:'Selesai',b:'Terima sebagai Gudang'}],k=0;
function dr(){tl.innerHTML=ST.map(function(x,i){return '<li class="'+(i<=k?'dn':i===k+1?'nx':'')+'"><div>'+x.r+'<small>'+(i<=k?x.t:'menunggu')+'</small></div></li>'}).join('');ds.textContent=ST[k].s;
da.innerHTML=k<3?'<span class="m">Giliran '+ST[k+1].r+'. Langkah berikutnya terkunci sampai ini selesai.</span><button type="button" class="b p" id="nx">'+ST[k+1].b+'</button>':'<span class="m">Stok bertambah 200 botol dan utang Rp 12.400.000 tercatat di Keuangan.</span><button type="button" class="b" id="nx">Ulangi</button>';
document.getElementById('nx').onclick=function(){k=k<3?k+1:0;dr()}}
dr()}
})();

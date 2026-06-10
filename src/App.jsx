import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronRight, Flame, Leaf, MapPin, Clock, Phone, Instagram, MessageCircle, ShoppingBag } from 'lucide-react';
import margherita from './assets/margherita.webp';
import marinara from './assets/marinara.webp';
import diavola from './assets/diavola.webp';
import napoli from './assets/napoli.webp';
import tartufo from './assets/tartufo.webp';
import contadina from './assets/contadina.webp';
import burrata from './assets/burrata.webp';
import parma from './assets/parma.webp';
import quattro from './assets/quattro.webp';
import funghi from './assets/funghi.webp';
import margherita45 from './assets/margherita-45.webp';
import diavola45 from './assets/diavola-45.webp';
import parma45 from './assets/parma-45.webp';
import tartufo45 from './assets/tartufo-45.webp';
import logo from './assets/logo.webp';

/* ============================ IMAGENS ============================ */
const IMG = { margherita, marinara, diavola, napoli, tartufo, contadina, burrata, parma, quattro, funghi, margherita45, diavola45, parma45, tartufo45, logo };

/* ============================ DADOS ============================ */
const MENU = [
  { id:'margherita', cat:'classicas', name:'Margherita', desc:'San Marzano, mozzarella di bufala, manjericão, azeite extravirgem', price:58, veg:true, img:IMG.margherita },
  { id:'marinara', cat:'classicas', name:'Marinara', desc:'Molho de tomate, alho laminado, orégano, azeite', price:46, veg:true, img:IMG.marinara },
  { id:'diavola', cat:'classicas', name:'Diavola', desc:'Fior di latte, salame calabrês picante, pimenta', price:64, hot:true, img:IMG.diavola },
  { id:'napoli', cat:'classicas', name:'Napoli', desc:'Mozzarella, anchovas, alcaparras, azeitona, orégano', price:62, img:IMG.napoli },
  { id:'tartufo', cat:'especiais', name:'Tartufo', desc:'Creme de trufa negra, fior di latte, funghi, parmesão 24 meses', price:92, veg:true, img:IMG.tartufo },
  { id:'contadina', cat:'especiais', name:'Contadina', desc:'Linguiça artesanal, cebola caramelizada, gorgonzola, mel', price:78, img:IMG.contadina },
  { id:'burrata', cat:'especiais', name:'Burrata', desc:'Tomate confit, burrata cremosa, pesto, redução de balsâmico', price:84, veg:true, img:IMG.burrata },
  { id:'parma', cat:'especiais', name:'Parma', desc:'Presunto de Parma, rúcula, lascas de parmesão, azeite', price:88, img:IMG.parma },
  { id:'quattro', cat:'brancas', name:'Quattro Formaggi', desc:'Mozzarella, gorgonzola, provolone, parmesão', price:72, veg:true, img:IMG.quattro },
  { id:'funghi', cat:'brancas', name:'Funghi', desc:'Mix de cogumelos, fior di latte, tomilho, azeite trufado', price:76, veg:true, img:IMG.funghi },
];
const CATS = [{id:'all',label:'Tudo'},{id:'classicas',label:'Clássicas'},{id:'especiais',label:'Especiais'},{id:'brancas',label:'Brancas'}];
const SIG = [{id:'tartufo',img:IMG.tartufo45},{id:'parma',img:IMG.parma45},{id:'diavola',img:IMG.diavola45}];
const GALLERY = ['margherita','diavola','tartufo','burrata','parma','napoli','quattro','funghi','contadina','marinara'];
const brl = (n) => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const find = (id) => MENU.find(m=>m.id===id);

/* ============================ ESTILO ============================ */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap');

.lt{
  --bg:#15110D; --bg2:#1C1611; --surface:#241D16; --surface2:#2E251B;
  --cream:#F3EADB; --cream-dim:#C9BBA8; --soft:#A1917C; --muted:#857764;
  --line:rgba(243,234,219,0.11); --line2:rgba(243,234,219,0.06);
  --terra:#D2653A; --terra-deep:#B5472A; --gold:#CBA45B; --green:#83A55F; --basil:#83A55F;
  --serif:'Fraunces',Georgia,serif; --sans:'Hanken Grotesk',system-ui,sans-serif;
  font-family:var(--sans); color:var(--cream); min-height:100vh; position:relative; overflow-x:hidden; line-height:1.6; -webkit-font-smoothing:antialiased;
  background:radial-gradient(120% 80% at 85% -10%, rgba(210,101,58,0.10), transparent 55%), radial-gradient(100% 60% at 10% 110%, rgba(131,165,95,0.05), transparent 60%), var(--bg);
}
.lt *{ box-sizing:border-box; }
.lt button{ font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
.lt h1,.lt h2,.lt h3,.lt h4,.lt p{ margin:0; }
.lt img{ display:block; max-width:100%; }
.container{ width:100%; max-width:1200px; margin:0 auto; padding:0 30px; }
.grain{ position:fixed; inset:0; z-index:60; pointer-events:none; opacity:0.04; mix-blend-mode:soft-light;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:200px; }

/* NAV */
.nav{ position:fixed; top:0; left:0; right:0; z-index:50; transition:all .4s ease; padding:20px 0; }
.nav.scrolled{ padding:11px 0; background:rgba(21,17,13,0.8); backdrop-filter:blur(16px); border-bottom:1px solid var(--line); }
.nav-in{ max-width:1200px; margin:0 auto; padding:0 30px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
.brand{ display:flex; align-items:center; gap:12px; cursor:pointer; }
.brand img{ width:42px; height:42px; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5)); transition:transform .3s; }
.brand:hover img{ transform:rotate(-6deg); }
.brand-tx{ display:flex; flex-direction:column; line-height:1; }
.brand-tx b{ font-family:var(--serif); font-size:1.35rem; font-weight:600; letter-spacing:0.01em; }
.brand-tx span{ font-size:0.56rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--muted); margin-top:4px; }
.nav-links{ display:flex; align-items:center; gap:32px; }
.nav-links button{ font-size:0.84rem; letter-spacing:0.04em; color:var(--cream-dim); position:relative; padding:6px 0; transition:color .25s; }
.nav-links button:hover, .nav-links button.active{ color:var(--cream); }
.nav-links button::after{ content:''; position:absolute; left:0; bottom:0; height:1.5px; width:0; background:var(--terra); transition:width .3s; }
.nav-links button:hover::after, .nav-links button.active::after{ width:100%; }
.nav-cta{ padding:10px 20px; border-radius:100px; background:linear-gradient(135deg,var(--terra),var(--terra-deep)); color:#fff; font-size:0.82rem; font-weight:600; letter-spacing:0.02em; transition:all .25s; box-shadow:0 8px 24px -10px rgba(210,101,58,0.6); }
.nav-cta:hover{ transform:translateY(-2px); box-shadow:0 14px 30px -10px rgba(210,101,58,0.75); }
.burger{ display:none; width:42px; height:42px; border-radius:12px; border:1px solid var(--line); align-items:center; justify-content:center; }
.mnav{ position:fixed; inset:0; z-index:70; background:rgba(18,14,11,0.97); backdrop-filter:blur(10px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; opacity:0; pointer-events:none; transition:opacity .35s; }
.mnav.open{ opacity:1; pointer-events:auto; }
.mnav button.ml{ font-family:var(--serif); font-size:2rem; color:var(--cream); padding:10px; font-weight:500; }
.mnav button.ml.active{ color:var(--terra); }
.mnav .btn{ margin-top:20px; }
.mnav-x{ position:absolute; top:24px; right:26px; width:46px; height:46px; border-radius:50%; border:1px solid var(--line); display:grid; place-items:center; }

/* BUTTONS */
.btn{ display:inline-flex; align-items:center; gap:9px; font-size:0.92rem; font-weight:500; padding:15px 30px; border-radius:100px; transition:all .28s cubic-bezier(.2,.7,.3,1); letter-spacing:0.01em; }
.btn-primary{ background:linear-gradient(135deg,var(--terra),var(--terra-deep)); color:#fff; box-shadow:0 12px 30px -12px rgba(210,101,58,0.6); }
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 40px -14px rgba(210,101,58,0.8); }
.btn-ghost{ border:1px solid var(--line); color:var(--cream); }
.btn-ghost:hover{ border-color:var(--cream-dim); background:rgba(243,234,219,0.05); }

/* PAGE */
.page{ animation:pageIn .55s cubic-bezier(.2,.7,.3,1); }
.page-top{ padding-top:140px; }

/* HERO */
.hero{ position:relative; min-height:94vh; display:flex; align-items:center; overflow:hidden; }
.hero-bg{ position:absolute; inset:0; z-index:0; }
.hero-bg img{ width:100%; height:100%; object-fit:cover; object-position:75% center; }
.hero-bg::after{ content:''; position:absolute; inset:0; background:linear-gradient(95deg, rgba(21,17,13,0.97) 0%, rgba(21,17,13,0.82) 34%, rgba(21,17,13,0.32) 64%, rgba(21,17,13,0.55) 100%), linear-gradient(0deg, rgba(21,17,13,0.85), transparent 38%); }
.hero-c{ position:relative; z-index:2; width:100%; }
.hero-logo{ width:78px; height:78px; margin-bottom:24px; filter:drop-shadow(0 8px 22px rgba(0,0,0,0.55)); animation:fadeUp .9s both; }
.hero h1{ font-family:var(--serif); font-weight:500; font-size:clamp(3rem,7.2vw,6rem); line-height:1.0; letter-spacing:-0.02em; max-width:13ch; }
.hero h1 em{ font-style:italic; color:var(--terra); }
.eyebrow{ display:inline-block; font-size:0.74rem; letter-spacing:0.34em; text-transform:uppercase; color:var(--terra); margin-bottom:22px; }
.hero p{ margin:26px 0 38px; max-width:34rem; color:var(--cream-dim); font-size:1.1rem; font-weight:300; line-height:1.7; }
.hero-cta{ display:flex; gap:14px; flex-wrap:wrap; }

/* SECTION */
.section{ padding:120px 0; position:relative; }
.sec-head{ margin-bottom:54px; }
.sec-eyebrow{ font-size:0.74rem; letter-spacing:0.34em; text-transform:uppercase; color:var(--terra); display:block; margin-bottom:16px; }
.sec-title{ font-family:var(--serif); font-weight:500; font-size:clamp(2.1rem,4.6vw,3.5rem); line-height:1.04; letter-spacing:-0.015em; max-width:16ch; }
.sec-title em{ font-style:italic; color:var(--terra); }
.sec-title.center{ margin:0 auto; text-align:center; }

/* ASSINATURAS */
.sig-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
.sig{ border-radius:20px; overflow:hidden; background:var(--surface); border:1px solid var(--line); transition:transform .35s cubic-bezier(.2,.7,.3,1), border-color .35s; }
.sig:hover{ transform:translateY(-6px); border-color:rgba(210,101,58,0.4); }
.sig-img{ aspect-ratio:4/3; overflow:hidden; position:relative; }
.sig-img img{ width:100%; height:100%; object-fit:cover; object-position:70% center; transition:transform .6s cubic-bezier(.2,.7,.3,1); }
.sig:hover .sig-img img{ transform:scale(1.07); }
.sig-b{ padding:24px 24px 26px; }
.sig-b h3{ font-family:var(--serif); font-size:1.55rem; font-weight:500; }
.sig-b p{ color:var(--soft); font-size:0.9rem; font-weight:300; margin:8px 0 16px; line-height:1.55; }
.sig-foot{ display:flex; align-items:center; justify-content:space-between; }
.sig-foot .pr{ font-family:var(--serif); color:var(--gold); font-size:1.15rem; }
.sig-foot button{ font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--terra); display:inline-flex; align-items:center; gap:5px; transition:gap .2s; }
.sig-foot button:hover{ gap:9px; }

/* CASA TEASER */
.casa-t{ display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
.casa-t .tx p{ color:var(--cream-dim); font-size:1.06rem; font-weight:300; line-height:1.85; margin:22px 0 30px; }
.casa-im{ border-radius:22px; overflow:hidden; border:1px solid var(--line); aspect-ratio:1; position:relative; }
.casa-im img{ width:100%; height:100%; object-fit:cover; }
.casa-im::after{ content:''; position:absolute; inset:0; box-shadow:inset 0 0 80px rgba(21,17,13,0.5); }

/* STATS */
.stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:18px; overflow:hidden; }
.stat{ background:var(--bg2); padding:34px 26px; text-align:center; }
.stat .n{ font-family:var(--serif); font-size:2.7rem; font-weight:500; color:var(--terra); line-height:1; }
.stat .n small{ font-size:1.2rem; color:var(--gold); }
.stat .l{ font-size:0.74rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); margin-top:12px; }

/* DELIVERY BAND */
.delivery{ position:relative; padding:64px 0; background:linear-gradient(120deg, rgba(210,101,58,0.12), rgba(181,71,42,0.05)); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.delivery-in{ display:flex; align-items:center; justify-content:space-between; gap:34px; flex-wrap:wrap; }
.delivery h3{ font-family:var(--serif); font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:500; }
.delivery p{ color:var(--cream-dim); font-weight:300; margin-top:10px; }
.dbtns{ display:flex; gap:14px; flex-wrap:wrap; }
.dbtn{ display:inline-flex; align-items:center; gap:10px; padding:15px 26px; border-radius:100px; font-weight:600; font-size:0.92rem; transition:transform .25s, box-shadow .25s; }
.dbtn:hover{ transform:translateY(-2px); }
.dbtn.ifood{ background:#EA1D2C; color:#fff; box-shadow:0 10px 26px -12px rgba(234,29,44,0.7); }
.dbtn.wa{ background:#25D366; color:#0b3d22; box-shadow:0 10px 26px -12px rgba(37,211,102,0.7); }
.demo-note{ text-align:center; margin-top:24px; font-size:0.76rem; letter-spacing:0.08em; color:var(--muted); }

/* MENU PAGE */
.filters{ display:flex; flex-wrap:wrap; gap:10px; margin-bottom:40px; }
.filters button{ padding:10px 20px; border-radius:100px; border:1px solid var(--line); font-size:0.84rem; color:var(--cream-dim); transition:all .22s; }
.filters button:hover{ color:var(--cream); border-color:var(--cream-dim); }
.filters button.active{ background:var(--cream); color:var(--bg); border-color:var(--cream); font-weight:600; }
.menu-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:22px; }
.card{ border-radius:20px; overflow:hidden; background:var(--surface); border:1px solid var(--line); transition:transform .35s cubic-bezier(.2,.7,.3,1), border-color .35s, box-shadow .35s; }
.card.reveal{ opacity:0; animation:fadeUp .8s cubic-bezier(.2,.7,.3,1) forwards; }
.card:hover{ transform:translateY(-6px); border-color:rgba(210,101,58,0.4); box-shadow:0 26px 50px -28px rgba(0,0,0,0.8); }
.card-img{ aspect-ratio:1; overflow:hidden; position:relative; }
.card-img img{ width:100%; height:100%; object-fit:cover; transition:transform .6s cubic-bezier(.2,.7,.3,1); }
.card:hover .card-img img{ transform:scale(1.06); }
.ph{ width:100%; height:100%; display:grid; place-content:center; justify-items:center; gap:10px; background:linear-gradient(135deg,#26201A,#1A150F); color:var(--muted); }
.ph svg{ opacity:0.55; color:var(--terra); }
.ph span{ font-size:0.68rem; letter-spacing:0.22em; text-transform:uppercase; }
.card-tags{ position:absolute; top:14px; right:14px; display:flex; gap:7px; }
.tag{ width:30px; height:30px; border-radius:50%; display:grid; place-items:center; backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.18); }
.tag.veg{ background:rgba(131,165,95,0.32); color:#cfe6b3; }
.tag.hot{ background:rgba(210,101,58,0.34); color:#ffd2bd; }
.card-body{ padding:22px 22px 24px; }
.card-row{ display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
.card-name{ font-family:var(--serif); font-size:1.4rem; font-weight:500; line-height:1.15; }
.card-price{ font-family:var(--serif); font-size:1.15rem; color:var(--gold); white-space:nowrap; }
.card-desc{ color:var(--soft); font-size:0.88rem; font-weight:300; line-height:1.6; margin-top:9px; }

/* SOBRE */
.banner{ position:relative; height:52vh; min-height:380px; display:flex; align-items:flex-end; overflow:hidden; }
.banner img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 35%; z-index:0; }
.banner::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(21,17,13,0.95) 4%, rgba(21,17,13,0.35) 60%, rgba(21,17,13,0.6)); z-index:1; }
.banner .container{ position:relative; z-index:2; padding-bottom:46px; }
.banner h1{ font-family:var(--serif); font-size:clamp(2.6rem,6vw,4.6rem); font-weight:500; letter-spacing:-0.02em; line-height:1.02; max-width:16ch; }
.banner h1 em{ font-style:italic; color:var(--terra); }
.story p{ color:var(--cream-dim); font-size:1.08rem; font-weight:300; line-height:1.9; margin-bottom:22px; }
.story p.lead{ font-family:var(--serif); font-style:italic; font-size:1.5rem; color:var(--cream); line-height:1.5; }
.gallery{ display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:14px; }
.gitem{ aspect-ratio:1; border-radius:14px; overflow:hidden; border:1px solid var(--line); }
.gitem img{ width:100%; height:100%; object-fit:cover; transition:transform .6s cubic-bezier(.2,.7,.3,1); }
.gitem:hover img{ transform:scale(1.08); }

/* CONTATO */
.info-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:40px; }
.info{ background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:30px 28px; }
.info .ic{ width:46px; height:46px; border-radius:13px; display:grid; place-items:center; color:var(--terra); background:rgba(210,101,58,0.12); border:1px solid rgba(210,101,58,0.28); margin-bottom:18px; }
.info h4{ font-family:var(--serif); font-size:1.25rem; font-weight:500; margin-bottom:8px; }
.info p{ color:var(--cream-dim); font-weight:300; line-height:1.7; font-size:0.96rem; }
.map-ph{ border-radius:18px; border:1px solid var(--line); background:repeating-linear-gradient(45deg,#1B150F,#1B150F 12px,#1E1812 12px,#1E1812 24px); height:240px; display:grid; place-items:center; gap:10px; color:var(--muted); margin-bottom:40px; }
.map-ph .pin{ color:var(--terra); }
.callout{ text-align:center; border:1px dashed var(--line); border-radius:16px; padding:26px; color:var(--soft); font-size:0.92rem; max-width:560px; margin:0 auto; }
.callout b{ color:var(--cream); font-weight:600; }

/* FOOTER */
.footer{ border-top:1px solid var(--line); padding:72px 0 36px; background:linear-gradient(180deg, transparent, rgba(210,101,58,0.04)); }
.foot-grid{ display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:44px; }
.foot-brand{ display:flex; align-items:center; gap:14px; margin-bottom:18px; }
.foot-brand img{ width:54px; height:54px; }
.foot-brand b{ font-family:var(--serif); font-size:1.8rem; font-weight:600; }
.f-tag{ color:var(--muted); font-size:0.94rem; font-weight:300; line-height:1.7; max-width:30ch; }
.f-col h5{ font-size:0.72rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--terra); margin-bottom:18px; font-weight:600; }
.f-col button, .f-col p, .f-col a{ display:block; color:var(--cream-dim); font-size:0.95rem; font-weight:300; line-height:1.95; text-decoration:none; transition:color .2s; text-align:left; }
.f-col button:hover, .f-col a:hover{ color:var(--terra); }
.f-bottom{ margin-top:58px; padding-top:24px; border-top:1px solid var(--line); display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; font-size:0.8rem; color:var(--muted); }

.dlv-overlay{ position:fixed; inset:0; z-index:80; display:grid; place-items:center; padding:24px; background:rgba(12,9,7,0.72); backdrop-filter:blur(6px); animation:fadeIn .3s ease; }
.dlv-modal{ position:relative; width:100%; max-width:420px; background:var(--bg2); border:1px solid var(--line); border-radius:24px; padding:46px 36px 34px; text-align:center; animation:popIn .45s cubic-bezier(.2,1.3,.4,1); }
.dlv-modal.ifood{ border-color:rgba(234,29,44,0.35); box-shadow:0 30px 70px -24px rgba(234,29,44,0.5); }
.dlv-modal.wa{ border-color:rgba(37,211,102,0.32); box-shadow:0 30px 70px -24px rgba(37,211,102,0.45); }
.dlv-ic{ width:74px; height:74px; border-radius:50%; display:grid; place-items:center; margin:0 auto 22px; }
.dlv-modal.ifood .dlv-ic{ background:rgba(234,29,44,0.14); color:#EA1D2C; border:1px solid rgba(234,29,44,0.4); }
.dlv-modal.wa .dlv-ic{ background:rgba(37,211,102,0.14); color:#25D366; border:1px solid rgba(37,211,102,0.4); }
.dlv-modal h3{ font-family:var(--serif); font-size:1.7rem; font-weight:500; margin-bottom:12px; }
.dlv-modal.ifood h3{ color:#EA1D2C; }
.dlv-modal.wa h3{ color:#25D366; }
.dlv-modal p{ color:var(--cream-dim); font-weight:300; line-height:1.65; font-size:0.98rem; max-width:32ch; margin:0 auto; }
.dlv-modal p b{ color:var(--cream); font-weight:600; }
.dlv-btn{ margin-top:26px; padding:13px 32px; border-radius:100px; font-weight:600; font-size:0.9rem; color:#fff; transition:transform .2s, box-shadow .2s; }
.dlv-btn:hover{ transform:translateY(-2px); }
.dlv-modal.ifood .dlv-btn{ background:#EA1D2C; box-shadow:0 10px 24px -10px rgba(234,29,44,0.7); }
.dlv-modal.wa .dlv-btn{ background:#25D366; color:#0b3d22; box-shadow:0 10px 24px -10px rgba(37,211,102,0.7); }
.dlv-x{ position:absolute; top:16px; right:16px; width:38px; height:38px; border-radius:50%; display:grid; place-items:center; color:var(--muted); border:1px solid var(--line); transition:all .2s; }
.dlv-x:hover{ color:var(--cream); border-color:var(--cream-dim); }
@keyframes fadeIn{ from{opacity:0;} to{opacity:1;} }
@keyframes popIn{ from{opacity:0; transform:scale(0.92) translateY(12px);} to{opacity:1; transform:none;} }

/* REVEAL + ANIM */
[data-reveal]{ opacity:0; transform:translateY(28px); transition:opacity .8s ease, transform .8s cubic-bezier(.2,.7,.3,1); }
[data-reveal].in{ opacity:1; transform:none; }
@keyframes fadeUp{ from{opacity:0; transform:translateY(30px);} to{opacity:1; transform:none;} }
@keyframes pageIn{ from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:none;} }

/* RESPONSIVE */
@media (max-width:980px){
  .nav-links{ display:none; } .burger{ display:flex; } .nav-cta{ display:none; }
  .sig-grid{ grid-template-columns:1fr; } .casa-t{ grid-template-columns:1fr; gap:36px; }
  .stats{ grid-template-columns:1fr 1fr; } .foot-grid{ grid-template-columns:1fr 1fr; }
  .info-grid{ grid-template-columns:1fr; }
}
@media (max-width:560px){
  .container,.nav-in{ padding:0 20px; } .section{ padding:80px 0; } .page-top{ padding-top:120px; }
  .hero{ min-height:90vh; } .menu-grid{ grid-template-columns:1fr; } .stats{ grid-template-columns:1fr; }
  .foot-grid{ grid-template-columns:1fr; } .delivery-in{ flex-direction:column; align-items:flex-start; }
}
`;

/* ============================ COMPONENTES ============================ */
function MenuCard({ m, i }) {
  return (
    <article className="card reveal" style={{ animationDelay: `${(i % 3) * 70}ms` }}>
      <div className="card-img">
        <img src={m.img} alt={m.name} loading="lazy" />
        <div className="card-tags">
          {m.veg && <span className="tag veg" title="Vegetariana"><Leaf size={13} /></span>}
          {m.hot && <span className="tag hot" title="Picante"><Flame size={13} /></span>}
        </div>
      </div>
      <div className="card-body">
        <div className="card-row"><h3 className="card-name">{m.name}</h3><span className="card-price">{brl(m.price)}</span></div>
        <p className="card-desc">{m.desc}</p>
      </div>
    </article>
  );
}

function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <div className="foot-brand"><img src={IMG.logo} alt="La Tavola" /><b>La Tavola</b></div>
          <p className="f-tag">O sabor de estar junto. Pizza napolitana de fermentação natural, assada no forno a lenha. São Vicente · SP.</p>
        </div>
        <div className="f-col">
          <h5>Navegar</h5>
          <button onClick={() => go('home')}>Home</button>
          <button onClick={() => go('menu')}>Cardápio</button>
          <button onClick={() => go('sobre')}>Sobre</button>
          <button onClick={() => go('contato')}>Contato</button>
        </div>
        <div className="f-col">
          <h5>A casa</h5>
          <p>Terça a domingo</p>
          <p>18h às 23h30</p>
          <a href="#"><Instagram size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />@latavola.pizza</a>
        </div>
      </div>
      <div className="container f-bottom">
        <span>© 2025 Pizzaria La Tavola — feito com fogo e companhia.</span>
        <span>Site fictício · peça de portfólio</span>
      </div>
    </footer>
  );
}

function Home({ go, onDelivery }) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-bg"><img src={IMG.margherita45} alt="Pizza Margherita" /></div>
        <div className="container hero-c">
          <img className="hero-logo" src={IMG.logo} alt="La Tavola" />
          <span className="eyebrow reveal" style={{ animationDelay: '.1s' }}>Pizzaria Napoletana · São Vicente</span>
          <h1 className="reveal" style={{ animationDelay: '.2s' }}>O sabor de estar <em>junto.</em></h1>
          <p className="reveal" style={{ animationDelay: '.36s' }}>Massa de fermentação natural, forno a lenha a 450°C e ingredientes de verdade. Pra dividir na mesa — e ficar mais um pouco.</p>
          <div className="hero-cta reveal" style={{ animationDelay: '.5s' }}>
            <button className="btn btn-primary" onClick={() => go('menu')}>Ver cardápio <ArrowRight size={17} /></button>
            <button className="btn btn-ghost" onClick={() => go('sobre')}>Conheça a casa</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-eyebrow">Assinaturas</span>
            <h2 className="sec-title">As estrelas <em>da casa.</em></h2>
          </div>
          <div className="sig-grid">
            {SIG.map((s, i) => {
              const m = find(s.id);
              return (
                <article className="sig" data-reveal style={{ transitionDelay: `${i * 90}ms` }} key={s.id}>
                  <div className="sig-img"><img src={s.img} alt={m.name} loading="lazy" /></div>
                  <div className="sig-b">
                    <h3>{m.name}</h3>
                    <p>{m.desc}</p>
                    <div className="sig-foot">
                      <span className="pr">{brl(m.price)}</span>
                      <button onClick={() => go('menu')}>No cardápio <ChevronRight size={14} /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container casa-t">
          <div className="tx" data-reveal>
            <span className="sec-eyebrow">A Casa</span>
            <h2 className="sec-title">Fogo, tempo e <em>ingrediente bom.</em></h2>
            <p>Massa viva, fermentada por 48 horas, assada na lenha a 450°C. Farinha tipo 00, tomate San Marzano e mozzarella di bufala. Nada de pressa — só o que faz a pizza valer a mesa.</p>
            <button className="btn btn-ghost" onClick={() => go('sobre')}>Nossa história <ArrowRight size={16} /></button>
          </div>
          <div className="casa-im" data-reveal style={{ transitionDelay: '120ms' }}><img src={IMG.burrata} alt="Pizza Burrata" loading="lazy" /></div>
        </div>
      </section>

      <DeliveryBand onDelivery={onDelivery} />
      <Footer go={go} />
    </div>
  );
}

function DeliveryBand({ onDelivery }) {
  return (
    <section className="delivery">
      <div className="container">
        <div className="delivery-in">
          <div data-reveal>
            <span className="sec-eyebrow">Delivery</span>
            <h3>Receba na sua mesa</h3>
            <p>Peça pelos apps e receba quentinho, direto do forno.</p>
          </div>
          <div className="dbtns" data-reveal style={{ transitionDelay: '100ms' }}>
            <button className="dbtn ifood" onClick={() => onDelivery('ifood')}>Pedir no iFood</button>
            <button className="dbtn wa" onClick={() => onDelivery('wa')}><MessageCircle size={18} /> WhatsApp</button>
          </div>
        </div>
        <p className="demo-note">Projeto fictício · botões ilustrativos</p>
      </div>
    </section>
  );
}

function DeliveryModal({ kind, onClose }) {
  if (!kind) return null;
  const ifood = kind === 'ifood';
  return (
    <div className="dlv-overlay" onClick={onClose}>
      <div className={`dlv-modal ${ifood ? 'ifood' : 'wa'}`} onClick={(e) => e.stopPropagation()}>
        <button className="dlv-x" onClick={onClose} aria-label="fechar"><X size={18} /></button>
        <div className="dlv-ic">{ifood ? <ShoppingBag size={32} /> : <MessageCircle size={32} />}</div>
        <h3>Obrigado pela visita!</h3>
        <p>Este é um site <b>fictício</b>, feito apenas para fins de aprendizado — não há pedidos, entregas nem estabelecimento real.</p>
        <button className="dlv-btn" onClick={onClose}>Entendi</button>
      </div>
    </div>
  );
}

function MenuPage({ cat, setCat, onDelivery }) {
  const list = cat === 'all' ? MENU : MENU.filter(m => m.cat === cat);
  return (
    <div className="page">
      <section className="page-top section" style={{ paddingBottom: 60 }}>
        <div className="container">
          <div className="sec-head">
            <span className="sec-eyebrow">Il Menù</span>
            <h2 className="sec-title">Do forno, <em>direto pra mesa.</em></h2>
          </div>
          <div className="filters">
            {CATS.map(c => <button key={c.id} className={cat === c.id ? 'active' : ''} onClick={() => setCat(c.id)}>{c.label}</button>)}
          </div>
          <div className="menu-grid">
            {list.map((m, i) => <MenuCard key={m.id} m={m} i={i} />)}
          </div>
        </div>
      </section>
      <DeliveryBand onDelivery={onDelivery} />
      <Footer go={() => {}} />
    </div>
  );
}

function Sobre({ go, onDelivery }) {
  return (
    <div className="page">
      <div className="banner">
        <img src={IMG.tartufo45} alt="Forno a lenha La Tavola" />
        <div className="container">
          <span className="eyebrow">A Casa</span>
          <h1>A mesa é o <em>ponto de encontro.</em></h1>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="story" data-reveal>
            <p className="lead">Massa de fermentação natural e forno a lenha a 450°C. Comida de verdade, feita pra ser dividida.</p>
            <p>A La Tavola nasceu de uma ideia simples: uma boa pizza não é só comida, é desculpa pra sentar junto. Trabalhamos com farinha tipo 00 italiana, tomate San Marzano e mozzarella di bufala — e deixamos a massa descansar 48 horas até ficar leve, digestiva e cheia de sabor.</p>
            <p>Cada pizza entra na boca do forno a lenha e sai em 90 segundos: borda alta, queimada nos pontos certos, guardando o gosto da fumaça. O resto a gente deixa a mesa resolver.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats" data-reveal>
            <div className="stat"><div className="n">48<small>h</small></div><div className="l">Fermentação</div></div>
            <div className="stat"><div className="n">450<small>°</small></div><div className="l">Forno a lenha</div></div>
            <div className="stat"><div className="n">90<small>s</small></div><div className="l">Na brasa</div></div>
            <div className="stat"><div className="n">00</div><div className="l">Farinha italiana</div></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-eyebrow">Da nossa cozinha</span>
            <h2 className="sec-title">Direto da <em>brasa.</em></h2>
          </div>
          <div className="gallery" data-reveal>
            {GALLERY.map(id => {
              const m = find(id);
              return <div className="gitem" key={id}><img src={m.img} alt={m.name} loading="lazy" /></div>;
            })}
          </div>
        </div>
      </section>

      <DeliveryBand onDelivery={onDelivery} />
      <Footer go={go} />
    </div>
  );
}

function Contato({ go, onDelivery }) {
  return (
    <div className="page">
      <section className="page-top section">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-eyebrow">Visite</span>
            <h2 className="sec-title">Venha pra <em>mesa.</em></h2>
          </div>

          <div className="info-grid">
            <div className="info" data-reveal><div className="ic"><MapPin size={22} /></div><h4>Endereço</h4><p>Av. Antônio Emmerich, 1500<br />Itararé · São Vicente — SP</p></div>
            <div className="info" data-reveal style={{ transitionDelay: '90ms' }}><div className="ic"><Clock size={22} /></div><h4>Horário</h4><p>Terça a domingo<br />18h às 23h30<br />Segunda fechado</p></div>
            <div className="info" data-reveal style={{ transitionDelay: '180ms' }}><div className="ic"><Phone size={22} /></div><h4>Contato</h4><p>(13) 99999-0000<br />@latavola.pizza<br />oi@latavola.com.br</p></div>
          </div>

          <div className="map-ph" data-reveal><MapPin className="pin" size={32} /><span style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Mapa ilustrativo</span></div>

          <div style={{ textAlign: 'center', marginBottom: 40 }} data-reveal>
            <div className="dbtns" style={{ justifyContent: 'center' }}>
              <button className="dbtn ifood" onClick={() => onDelivery('ifood')}>Pedir no iFood</button>
              <button className="dbtn wa" onClick={() => onDelivery('wa')}><MessageCircle size={18} /> WhatsApp</button>
            </div>
          </div>

          <div className="callout" data-reveal><b>Projeto fictício para portfólio.</b><br />Endereço, contato e pedidos são ilustrativos — a La Tavola não existe (ainda).</div>
        </div>
      </section>
      <Footer go={go} />
    </div>
  );
}

/* ============================ APP ============================ */
export default function App() {
  const [page, setPage] = useState('home');
  const [cat, setCat] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [dlv, setDlv] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      const els = rootRef.current?.querySelectorAll('[data-reveal]') || [];
      const io = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
        { threshold: 0.12 }
      );
      els.forEach(el => io.observe(el));
      rootRef.current._io = io;
    }, 30);
    return () => { clearTimeout(t); rootRef.current?._io?.disconnect(); };
  }, [page]);

  const go = (p) => { setNavOpen(false); setPage(p); };
  const openDelivery = (k) => setDlv(k);
  const links = [['home', 'Home'], ['menu', 'Cardápio'], ['sobre', 'Sobre'], ['contato', 'Contato']];

  return (
    <div className="lt" ref={rootRef}>
      <style>{styles}</style>
      <div className="grain" />

      <header className={`nav ${scrolled || page !== 'home' ? 'scrolled' : ''}`}>
        <div className="nav-in">
          <div className="brand" onClick={() => go('home')}>
            <img src={IMG.logo} alt="La Tavola" />
            <div className="brand-tx"><b>La Tavola</b><span>Forno a Lenha</span></div>
          </div>
          <nav className="nav-links">
            {links.map(([p, l]) => <button key={p} className={page === p ? 'active' : ''} onClick={() => go(p)}>{l}</button>)}
          </nav>
          <button className="nav-cta" onClick={() => go('contato')}>Peça agora</button>
          <button className="burger" onClick={() => setNavOpen(true)} aria-label="menu"><Menu size={22} /></button>
        </div>
      </header>

      <div className={`mnav ${navOpen ? 'open' : ''}`}>
        <button className="mnav-x" onClick={() => setNavOpen(false)} aria-label="fechar"><X size={22} /></button>
        {links.map(([p, l]) => <button key={p} className={`ml ${page === p ? 'active' : ''}`} onClick={() => go(p)}>{l}</button>)}
        <button className="btn btn-primary" onClick={() => go('contato')}>Peça agora <ArrowRight size={17} /></button>
      </div>

      {page === 'home' && <Home go={go} onDelivery={openDelivery} />}
      {page === 'menu' && <MenuPage cat={cat} setCat={setCat} onDelivery={openDelivery} />}
      {page === 'sobre' && <Sobre go={go} onDelivery={openDelivery} />}
      {page === 'contato' && <Contato go={go} onDelivery={openDelivery} />}

      <DeliveryModal kind={dlv} onClose={() => setDlv(null)} />
    </div>
  );
}

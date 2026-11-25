/* GLPro site scripts: nav, reveal, 3D bottle tilt, sticky buy bar, info toast, promo modal, order page selection. No dependencies. */
(function(){
  'use strict';
  var d=document, root=d.documentElement;
  root.classList.remove('no-js');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
  var base=(d.body.getAttribute('data-root')||'/');

  /* mobile menu */
  var burger=d.querySelector('.burger'), menu=d.getElementById('menu');
  if(burger&&menu){
    burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o?'true':'false');});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open')){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.focus();}});
  }

  /* reveal on scroll */
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('in');});}

  /* 3D pointer tilt on bottle stages */
  if(!reduce&&window.matchMedia('(pointer:fine)').matches){
    d.querySelectorAll('.stage').forEach(function(st){
      var b=st.querySelector('.bottle'); if(!b)return;
      st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;b.style.setProperty('--ry',(x*16).toFixed(2)+'deg');b.style.setProperty('--rx',(-y*10).toFixed(2)+'deg');});
      st.addEventListener('pointerleave',function(){b.style.setProperty('--ry','0deg');b.style.setProperty('--rx','0deg');});
    });
  }

  /* sticky buy bar */
  var bar=d.querySelector('.buybar');
  if(bar){
    var closed=store('glpro_bar_closed')==='1';
    var onScroll=function(){if(closed)return;bar.classList.toggle('show',window.scrollY>600);};
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
    var bx=bar.querySelector('.x'); if(bx)bx.addEventListener('click',function(){closed=true;bar.classList.remove('show');store('glpro_bar_closed','1');});
  }

  /* centered promo modal: 6s after load, 24h cooldown after dismissal */
  var modal=d.getElementById('promo-modal'), lastFocus=null, modalOpen=false;
  function focusables(){return modal.querySelectorAll('a[href],button:not([disabled])');}
  function openModal(){
    if(!modal||modalOpen)return; modalOpen=true; lastFocus=d.activeElement;
    modal.hidden=false; requestAnimationFrame(function(){modal.classList.add('open');});
    d.body.classList.add('modal-open'); hideToast();
    var f=focusables(); if(f.length)f[0].focus();
  }
  function closeModal(){
    if(!modal||!modalOpen)return; modalOpen=false; modal.classList.remove('open'); d.body.classList.remove('modal-open');
    store('glpro_modal_seen',String(Date.now()));
    setTimeout(function(){modal.hidden=true;},reduce?0:380);
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  if(modal&&!d.body.hasAttribute('data-no-modal')){
    var seen=parseInt(store('glpro_modal_seen')||'0',10);
    var cool=24*60*60*1000;
    if(!seen||Date.now()-seen>cool){
      var start=function(){setTimeout(openModal,6000);};
      /* script is deferred, so the DOM is ready here; don't wait on slow third-party assets */
      if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',start);else start();
    }
    modal.addEventListener('click',function(e){if(e.target===modal)closeModal();});
    modal.querySelectorAll('[data-close]').forEach(function(b){b.addEventListener('click',closeModal);});
    modal.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){store('glpro_modal_seen',String(Date.now()));});});
    d.addEventListener('keydown',function(e){
      if(!modalOpen)return;
      if(e.key==='Escape'){closeModal();return;}
      if(e.key==='Tab'){var f=focusables();if(!f.length)return;var a=f[0],z=f[f.length-1];
        if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus();}}
    });
  }

  /* informational toast (bottom-left): no fake purchase activity */
  var toast=d.getElementById('info-toast'), msgs=[], ti=0, toastTimer=null, toastOff=false;
  function hideToast(){if(toast)toast.classList.remove('show');}
  if(toast&&!d.body.hasAttribute('data-no-toast')){
    try{msgs=JSON.parse(toast.getAttribute('data-messages'))||[];}catch(e){msgs=[];}
    var txt=toast.querySelector('p');
    var show=function(){
      if(toastOff||!msgs.length)return;
      if(modalOpen){toastTimer=setTimeout(show,8000);return;}
      txt.innerHTML=msgs[ti%msgs.length]; ti++;
      toast.classList.add('show');
      setTimeout(hideToast,6000);
      toastTimer=setTimeout(show,6000+18000+Math.floor(Math.random()*8000));
    };
    setTimeout(show,5000);
    toast.querySelector('.close').addEventListener('click',function(){toastOff=true;hideToast();clearTimeout(toastTimer);});
  }

  /* order page: highlight the package passed as ?package= */
  var sel=d.querySelector('[data-order-page]');
  if(sel){
    var p=new URLSearchParams(location.search).get('package');
    if(p&&/^(2|3|6)$/.test(p)){var c=d.getElementById('pkg-'+p);if(c){c.classList.add('selected');setTimeout(function(){c.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});},250);}}
  }
})();

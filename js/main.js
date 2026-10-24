(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const G=!RM&&window.gsap&&window.ScrollTrigger;
const WA='917827507408';
if(!G)document.documentElement.classList.add('rm');

// Smooth scroll
let L;
if(!RM&&window.Lenis){L=new Lenis({duration:1.2});
 if(G){L.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>L.raf(t*1000));gsap.ticker.lagSmoothing(0)}
 else{const f=t=>{L.raf(t);requestAnimationFrame(f)};requestAnimationFrame(f)}}

// Render reviews
const R=[
["Anchal Taatya","Full-body PPF · Google review","Got full-body PPF done at Carzzyy and honestly couldn't be happier. The finish is flawless, no bubbles, no lifted edges, clean wrap around every corner and panel gap. You really have to look closely to tell the film is even there."],
["Ridhima Behl","PPF on a BE6 · Google review","Got PPF done for my BE6 at Carzzyy Premium and the experience was absolutely seamless. The team was professional, knowledgeable, and paid great attention to detail throughout the process."],
["Kirti Rana","Ceramic coating · Google review","Got ceramic coating done at Carzzyy Premium and the experience was excellent from start to finish. The team was professional, explained the entire process properly, and paid attention to every little detail."]];
$('#tk').innerHTML=R.map(([n,m,t])=>`<article class="card"><div class="st" aria-label="5 stars">★★★★★</div><p>${t}</p><h4>${n}</h4><small>${m}</small></article>`).join('');
$$('.rb').forEach(b=>b.onclick=()=>$('#tk').scrollBy({left:b.dataset.d*340,behavior:RM?'auto':'smooth'}));

// Hero slider
const S=$$('.sl'),N=$$('.hc b');let c=0,t;
const go=i=>{const v0=$('video',S[c]);S[c].classList.remove('on');N[c].classList.remove('on');v0&&v0.pause();
 c=(i+S.length)%S.length;S[c].classList.add('on');N[c].classList.add('on');
 const v=$('video',S[c]);if(v&&!RM)v.play().catch(()=>{});
 if(G)gsap.fromTo($$('.ln>i',S[c]),{yPercent:110},{yPercent:0,duration:1.2,ease:'power3.out',stagger:.12,delay:.15});
 clearTimeout(t);if(!RM)t=setTimeout(()=>go(c+1),7000)};
$('.hp').onclick=()=>go(c-1);$('.hn').onclick=()=>go(c+1);
S[0].classList.remove('on');N[0].classList.remove('on');go(0);

// Menu + anchors
const M=$('.menu'),B=$('.burger');
const tog=()=>{const o=M.classList.toggle('open');B.setAttribute('aria-expanded',o);L&&(o?L.stop():L.start());
 if(o&&G)gsap.fromTo($$('a',M),{y:60,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',stagger:.08,delay:.3})};
B.onclick=tog;
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');if(h.length<2)return;const el=$(h);if(!el)return;e.preventDefault();
 if(M.classList.contains('open'))tog();L?L.scrollTo(el):el.scrollIntoView({behavior:RM?'auto':'smooth'})}));

// FAQ (CSS handles the height animation)
$$('.q').forEach(q=>q.onclick=()=>{const o=q.getAttribute('aria-expanded')=='true';
 $$('.q').forEach(x=>x.setAttribute('aria-expanded',false));q.setAttribute('aria-expanded',!o);
 G&&setTimeout(()=>ScrollTrigger.refresh(),600)});

// Form
$('form').onsubmit=e=>{e.preventDefault();const f=e.target,v=n=>f[n].value.trim();let ok=true;
 const chk=(n,pass,msg)=>{f[n].closest('.fld').querySelector('.err').textContent=pass?'':msg;if(!pass)ok=false};
 chk('name',v('name').length>1,'Enter your name.');
 chk('phone',/^(\+?91)?[6-9]\d{9}$/.test(v('phone').replace(/[\s-]/g,'')),'Enter a valid 10-digit mobile number.');
 chk('car',v('car').length>1,'Enter your car model.');
 chk('service',!!v('service'),'Choose a service.');
 if(!ok)return;
 // Leads go straight to WhatsApp. Swap for Formspree/Netlify Forms if email leads are wanted.
 $('.ok').textContent='Thanks! Opening WhatsApp to confirm your slot.';
 open(`https://wa.me/${WA}?text=`+encodeURIComponent(`Hi Carzzyy Premium! I'm ${v('name')} (${v('phone')}). Car: ${v('car')}. Service: ${v('service')}. I'd like to book a slot.`),'_blank');f.reset()};

if(!G)return;

// Scroll animations
gsap.registerPlugin(ScrollTrigger);
const E='power3.out';
$$('[data-s],[data-p]').forEach(e=>{e.innerHTML=e.textContent.trim().split(/\s+/).map(w=>`<span class="w"><span>${w}</span></span>`).join(' ')});
$$('[data-s]').forEach(h=>gsap.from($$('.w>span',h),{yPercent:110,duration:1.1,ease:E,stagger:.06,scrollTrigger:{trigger:h,start:'top 85%'}}));
$$('[data-p]').forEach(p=>gsap.from($$('.w>span',p),{opacity:.12,stagger:.04,ease:'none',scrollTrigger:{trigger:p,start:'top 85%',end:'bottom 60%',scrub:true}}));
$$('.txt h3').forEach(h=>gsap.from(h.firstElementChild,{yPercent:110,duration:1.1,ease:E,scrollTrigger:{trigger:h,start:'top 88%'}}));
$$('.px').forEach(p=>{
 gsap.from(p,{opacity:0,scale:.94,duration:1.3,ease:E,scrollTrigger:{trigger:p,start:'top 88%'}});
 gsap.fromTo($('img',p),{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:p,scrub:true}})});
$$('.num').forEach((n,i)=>gsap.from(n,{x:i%2?240:-240,opacity:0,ease:E,scrollTrigger:{trigger:n.parentNode,start:'top 85%',end:'top 30%',scrub:1}}));
$$('[data-c]').forEach(e=>{const v=+e.dataset.c,d=e.dataset.d?+e.dataset.d:(v%1?1:0),o={n:0};
 gsap.to(o,{n:v,duration:2,ease:E,scrollTrigger:{trigger:e,start:'top 92%',once:true},onUpdate:()=>e.textContent=o.n.toFixed(d)+(e.dataset.u||'')})});
gsap.from('.gc',{y:60,opacity:0,duration:1.1,ease:E,stagger:.15,clearProps:'all',scrollTrigger:{trigger:'.g3',start:'top 85%'}});
gsap.from('.card',{x:60,opacity:0,duration:1,ease:E,stagger:.1,clearProps:'all',scrollTrigger:{trigger:'#tk',start:'top 85%'}});

// Signature: car drives, brand is revealed behind it
const car=$('.car'),br=$('.brand:not(.ghost)');
ScrollTrigger.create({trigger:'.road',start:'center center',end:'+=110%',pin:true,scrub:true,onUpdate:s=>{
 const x=-10+s.progress*120;car.style.left=x+'%';
 br.style.clipPath=`inset(0 ${Math.max(0,Math.min(100,100-x))}% 0 0)`}});
addEventListener('load',()=>ScrollTrigger.refresh());
})();

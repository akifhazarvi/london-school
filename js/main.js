/* London School v6 — Prof Mir Bot + Animations */
(function(){
  'use strict';

  /* Nav */
  var nav=document.getElementById('nav');
  window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>40)});

  /* Mobile */
  var ham=document.getElementById('ham'),mob=document.getElementById('mob');
  ham.addEventListener('click',function(){ham.classList.toggle('open');mob.classList.toggle('open');document.body.style.overflow=mob.classList.contains('open')?'hidden':''});
  window.closeM=function(){ham.classList.remove('open');mob.classList.remove('open');document.body.style.overflow=''};

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){var id=this.getAttribute('href');if(id==='#')return;var el=document.querySelector(id);if(el){e.preventDefault();window.scrollTo({top:el.offsetTop-72,behavior:'smooth'})}})
  });

  /* Reveal */
  var obs=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){obs.observe(el)});

  /* Counter */
  var cobs=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){var el=e.target,end=parseInt(el.dataset.count),txt=el.textContent,suf=txt.includes('%')?'%':end<=3?'':'+';count(el,0,end,1800,suf);cobs.unobserve(el)}})},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cobs.observe(el)});
  function count(el,s,e,d,suf){var t0=performance.now();function t(n){var p=Math.min((n-t0)/d,1),v=1-Math.pow(1-p,3);el.textContent=Math.round(s+(e-s)*v)+suf;if(p<1)requestAnimationFrame(t)}requestAnimationFrame(t)}

  /* ═══ PROF MIR BOT ═══ */
  var body=document.getElementById('chatBody'),inp=document.getElementById('chatIn'),go=document.getElementById('chatGo'),started=false;

  var R={
    photosynthesis:'Great question!\n\nPhotosynthesis is how plants make their own food using sunlight, water, and air.\n\nThink of it like cooking \u2014 the sun is the oven, the leaf is the kitchen, and the plant bakes its own lunch.\n\nThe recipe:\nSunlight + Water + CO\u2082 \u2192 Sugar + Oxygen\n\nThat oxygen? It\u2019s what we breathe. So every time you see a tree, say thanks for fresh air.\n\n\u2014 As I always told my students: nature is the greatest teacher.',

    gravity:'Gravity is the invisible force that pulls everything toward the ground.\n\nHere\u2019s a fun way to think about it:\n\n\u2022 Drop a ball \u2192 gravity pulls it down\n\u2022 Jump \u2192 gravity brings you back\n\u2022 The Moon stays near Earth \u2192 gravity holds it there\n\nIsaac Newton saw an apple fall and understood something the whole world had missed. That\u2019s the power of curiosity.\n\n\u2014 Never stop asking \u201cwhy.\u201d',

    python:'Let\u2019s write your first Python program!\n\nType this:\nname = input("What is your name? ")\nprint("Hello, " + name + "!")\n\nWhat this does:\n1. Asks your name\n2. Remembers it\n3. Says hello\n\nPython reads almost like English \u2014 that\u2019s why even our Grade 3 students love it.\n\n\u2014 The best time to start learning was yesterday. The second best time is now.',

    robot:'Building a robot is like building with super-LEGO.\n\nYou need 4 things:\n1. A brain (Arduino board)\n2. Power (batteries)\n3. Legs or wheels (motors)\n4. Eyes (sensors)\n\nIn our robotics lab, Grade 4 students build their first moving robot in just 3 weeks.\n\n\u2014 The most powerful tool a child has is their imagination. A robot is just imagination made real.',

    waris:'I am inspired by Prof. Waris Mir (1938\u20131987), one of Pakistan\u2019s greatest intellectuals.\n\nHere are some things about him:\n\n\u2022 Born in Sialkot on November 22, 1938\n\u2022 Master\u2019s in Journalism from Punjab University\n\u2022 M.Phil from City University London\n\u2022 Chairman of Mass Communication at Punjab University\n\u2022 A fearless journalist who stood for democracy and press freedom\n\u2022 Authored \u201cFauj ki Syasat\u201d (Army in Politics)\n\u2022 Championed women\u2019s rights and intellectual freedom\n\u2022 Awarded Hilal-e-Imtiaz posthumously in 2013\n\u2022 Bangladesh honored him with Friends of Liberation War Honour\n\nHis philosophy was simple: education is freedom, and every child deserves both.\n\nThis school carries his name and his vision forward.',

    mir:'Prof. Waris Mir believed that asking questions is more important than memorizing answers. He was a teacher at Punjab University for over 20 years.\n\nHe wrote columns in Urdu newspapers that inspired a generation. Even under military rule, he never stopped speaking truth.\n\nAsma Jahangir called him \u201ca fiery and blunt writer\u201d whose work changed how young people and women thought about freedom.\n\nHe passed away on July 9, 1987 at just 48 years old, but his ideas live on \u2014 in this school, in our classrooms, and in every child we teach to think freely.\n\n\u2014 \u201cIntellectual liberty in light of social responsibility.\u201d \u2014 The Waris Mir way.',

    math:'I love maths questions!\n\nMaths is like a superpower \u2014 it helps you:\n\u2022 Figure out if you have enough money for ice cream\n\u2022 Build amazing structures\n\u2022 Even understand how rockets fly\n\nWhat topic are you working on? I can help with fractions, decimals, geometry, algebra.\n\nTip: The best way to get better at maths is to practise a little bit every day. Even 10 minutes helps.\n\n\u2014 As Prof Mir would say: knowledge grows the more you share it.',

    def:'Welcome! I am Prof Mir \u2014 an AI study companion inspired by Prof. Waris Mir, the visionary behind London School.\n\nI can help you with:\n\u2022 Science \u2014 photosynthesis, gravity, the solar system\n\u2022 Maths \u2014 fractions, geometry, problem solving\n\u2022 Coding \u2014 Python, Scratch, logic\n\u2022 Robotics \u2014 how to build your first robot\n\u2022 History \u2014 about Prof. Waris Mir and his legacy\n\nTry asking: \u201cWhat is photosynthesis?\u201d or \u201cWho was Waris Mir?\u201d\n\n\u2014 Remember: there is no such thing as a silly question. Asking is how wise people become wiser.'
  };

  function addMsg(type,text,delay){
    return new Promise(function(res){setTimeout(function(){
      var d=document.createElement('div');d.className='msg msg--'+type;
      var av=document.createElement('div');av.className='msg__av';
      if(type==='ai'){
        av.innerHTML='<img src="img/waris-mir.jpg" alt="Prof Mir" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      }else{
        av.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      }
      var b=document.createElement('div');b.className='msg__bub';b.innerHTML=text.replace(/\n/g,'<br>');
      d.appendChild(av);d.appendChild(b);body.appendChild(d);
      requestAnimationFrame(function(){d.classList.add('on')});
      body.scrollTop=body.scrollHeight;res();
    },delay||0)})
  }

  function typing(ms){
    return new Promise(function(res){
      var d=document.createElement('div');d.className='msg msg--ai on';
      d.innerHTML='<div class="msg__av"><img src="img/waris-mir.jpg" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div><div class="msg__bub"><span class="tp">Thinking<span>.</span><span>.</span><span>.</span></span></div>';
      body.appendChild(d);body.scrollTop=body.scrollHeight;
      setTimeout(function(){d.remove();res()},ms)
    })
  }

  var dobs=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting&&!started){started=true;demo();dobs.unobserve(e.target)}})},{threshold:.2});
  dobs.observe(document.querySelector('.demo'));

  async function demo(){
    await addMsg('ai','Assalamu Alaikum! I am <strong>Prof Mir</strong> \u2014 an AI study companion inspired by Prof. Waris Mir, the visionary behind this school.\n\nAsk me about science, maths, coding, robotics \u2014 or about Prof. Waris Mir himself. I am here to help you learn.',500);
    await addMsg('user','Who was Prof. Waris Mir?',2500);
    await typing(1500);
    await addMsg('ai',R.mir,100);
  }

  function send(){
    var v=inp.value.trim();if(!v)return;inp.value='';
    addMsg('user',v,0).then(function(){
      var l=v.toLowerCase(),k='def';
      ['photosynthesis','gravity','python','robot','math'].forEach(function(w){if(l.indexOf(w)>-1)k=w});
      if(l.indexOf('waris')>-1||l.indexOf('mir')>-1)k='waris';
      if(l.indexOf('who')>-1&&(l.indexOf('founder')>-1||l.indexOf('prof')>-1))k='waris';
      return typing(1200).then(function(){return addMsg('ai',R[k],100)})
    })
  }
  go.addEventListener('click',send);
  inp.addEventListener('keypress',function(e){if(e.key==='Enter')send()});

  /* Typing dots */
  var s=document.createElement('style');
  s.textContent='.tp span{animation:bk 1.4s infinite ease-in-out}.tp span:nth-child(1){animation-delay:0s}.tp span:nth-child(2){animation-delay:.2s}.tp span:nth-child(3){animation-delay:.4s}@keyframes bk{0%,60%,100%{opacity:.2}30%{opacity:1}}';
  document.head.appendChild(s);
})();

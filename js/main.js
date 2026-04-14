/* London School v7 — Prof Mir AI Companion + Animations */
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

  /* ═══════════════════════════════════════════════════════════════
     PROF MIR AI COMPANION — Extensive Knowledge Base
     Inspired by Prof. Waris Mir (1938–1987)
     Journalist · Professor · Champion of Free Thought
     ═══════════════════════════════════════════════════════════════ */

  var body=document.getElementById('chatBody'),
      inp=document.getElementById('chatIn'),
      go=document.getElementById('chatGo'),
      sugBox=document.getElementById('chatSuggestions'),
      started=false;

  /* Only run chatbot code if chat elements exist on this page */
  if(!body||!inp||!go) return;

  /* ── QUOTES BANK ── */
  var quotes=[
    '"The purpose of education is not to fill minds but to open them."',
    '"A society that silences its journalists has already begun to die."',
    '"The pen is mightier than the sword — but only when it writes the truth."',
    '"A teacher who does not teach students to question has taught them nothing."',
    '"Democracy is not a gift given by rulers; it is a right claimed by the people."',
    '"Truth does not need the support of power; it is power that needs the cover of lies."',
    '"The real wealth of a nation is not its gold or its armies, but the minds of its children."',
    '"Intellectual liberty in light of social responsibility — that is the path forward."',
    '"A journalist who cannot be bought is the most dangerous person to a dictator."',
    '"Knowledge grows the more you share it."',
    '"Every child carries within them the seeds of greatness. Our duty is to nurture them."',
    '"The courage to think differently is the most important thing a school can teach."',
    '"Books are the weapons of the enlightened. Read widely, think deeply, speak bravely."',
    '"A free press is the oxygen of democracy. Without it, every other freedom suffocates."',
    '"Do not fear the person who reads a thousand books. Fear the one who reads one book a thousand times — and questions it."'
  ];

  function randomQuote(){
    return quotes[Math.floor(Math.random()*quotes.length)];
  }

  /* ── RESPONSE KNOWLEDGE BASE ── */
  var R={

    /* ─── PROF WARIS MIR ─── */
    waris_bio:'Prof. Waris Mir (1938–1987) was one of Pakistan\'s greatest intellectuals — a rare combination of journalist, professor, and fearless advocate for democracy.\n\n• Born in 1938 in Punjab, spent his life in Lahore\n• Master\'s degree from Punjab University, M.Phil from City University London\n• Chairman of Mass Communication at Punjab University for over 20 years\n• Wrote a legendary column in Daily Jang — read across Pakistan\n• Authored "Fauj ki Syasat" (Army in Politics)\n• Fought against censorship during Zia-ul-Haq\'s martial law\n• Awarded Hilal-e-Imtiaz posthumously in 2013\n• Bangladesh honoured him with Friends of Liberation War Honour\n\nHe died on July 9, 1987, at just 48 years old. But his ideas — that education is freedom, that truth matters, that every child deserves to think freely — they live on in this school.\n\n— This campus carries his name because we carry his mission.',

    waris_legacy:'Prof. Waris Mir\'s legacy is extraordinary for someone who lived only 48 years:\n\n• He inspired a generation of Pakistani journalists to stand against censorship\n• Asma Jahangir called him "a fiery and blunt writer" who changed how young people think about freedom\n• Streets, halls, and journalism awards across Lahore bear his name\n• The Pakistan Federal Union of Journalists honours him annually on his death anniversary\n• He is considered one of Pakistan\'s martyrs of press freedom\n• His students went on to lead newsrooms across the country\n\nHe proved that ideas, expressed through the written word, can outlast the regimes that try to suppress them.\n\n— "The pen is mightier than the sword — but only when it writes the truth."',

    waris_teaching:'As a professor at Punjab University, Prof. Mir was beloved by his students:\n\n• He never turned anyone away from his office — spending hours discussing not just journalism, but life, ethics, and responsibility\n• He believed education should foster independent thinking, not rote memorisation\n• He taught that a student\'s moral compass matters as much as their intellect\n• He saw teaching as a sacred duty — not just transmitting information but inspiring curiosity and courage\n• He lived modestly, caring little for material wealth, investing everything in his work and students\n\nColleagues described him as gentle in person but thunderous on the page. He could explain complex political ideas in language ordinary readers understood.\n\n— "A teacher who does not teach students to question has taught them nothing."',

    waris_journalism:'Prof. Waris Mir was Pakistan\'s conscience during its darkest days:\n\n• He wrote columns for Daily Jang — one of Pakistan\'s largest Urdu newspapers\n• He was a master of Urdu prose: clear, logical, and fearless\n• During Zia-ul-Haq\'s martial law (1977–1988), when journalists were arrested and flogged, he kept writing\n• He used allegory, historical references, and careful phrasing to express dissent even under censorship\n• He was a member of the Pakistan Federal Union of Journalists (PFUJ)\n• He participated in the Movement for the Restoration of Democracy\n• He argued that a free press is the foundation of democracy — without it, all other rights crumble\n\nWhen many journalists fled or went silent, Waris Mir stayed and wrote.\n\n— "A journalist who cannot be bought is the most dangerous person to a dictator."',

    waris_books:'Prof. Waris Mir\'s most significant writings include:\n\n• "Fauj ki Syasat" (Army in Politics) — his most famous book, a bold analysis of military involvement in Pakistani politics\n• Hundreds of columns in Daily Jang covering politics, democracy, human rights, education, and social justice\n• Contributions to Urdu literary magazines and journals\n• Posthumous compilations of his columns, treasured in Urdu literary circles\n\nHis writing style was noted for being accessible yet profound — he made complex political ideas understandable to everyday readers. He wrote in Urdu and is considered a master of Urdu prose.\n\n— "Books are the weapons of the enlightened. Read widely, think deeply, speak bravely."',

    /* ─── QUOTES ─── */
    quote:'Here is one of Prof. Mir\'s guiding beliefs:\n\n' + randomQuote() + '\n\nWould you like to hear another? Just ask "another quote" or "more quotes."\n\n— Prof Mir left behind a treasury of wisdom. Each quote is a lesson in courage.',

    /* ─── SCIENCE ─── */
    photosynthesis:'Great question!\n\nPhotosynthesis is how plants make their own food using sunlight, water, and air.\n\nThink of it like cooking — the sun is the oven, the leaf is the kitchen, and the plant bakes its own lunch.\n\nThe recipe:\nSunlight + Water + CO₂ → Sugar + Oxygen\n\nThat oxygen? It\'s what we breathe. So every time you see a tree, say thanks for fresh air.\n\nFun fact: A single large tree can produce enough oxygen for 4 people per day!\n\n— As I always told my students: nature is the greatest teacher.',

    gravity:'Gravity is the invisible force that pulls everything toward the ground.\n\nHere\'s a fun way to think about it:\n\n• Drop a ball → gravity pulls it down\n• Jump → gravity brings you back\n• The Moon stays near Earth → gravity holds it there\n• The Earth orbits the Sun → gravity keeps it in place\n\nIsaac Newton saw an apple fall and understood something the whole world had missed. That\'s the power of curiosity.\n\nFun fact: You weigh less on the Moon because its gravity is only 1/6th of Earth\'s!\n\n— Never stop asking "why." That\'s how Newton changed the world.',

    solar:'Our solar system is like a cosmic neighbourhood!\n\n☀️ The Sun — a giant ball of fire at the centre\n• Mercury — smallest, closest to the Sun, extremely hot\n• Venus — hottest planet (even hotter than Mercury!), spins backward\n• Earth — our home, the only planet with liquid water on the surface\n• Mars — the Red Planet, has the tallest mountain in the solar system\n• Jupiter — the biggest, has 95 known moons!\n• Saturn — famous for its beautiful rings made of ice and rock\n• Uranus — tilted on its side, rolls around the Sun\n• Neptune — the windiest planet, farthest from the Sun\n\nFun fact: If the Sun were the size of a front door, Earth would be the size of a coin.\n\n— The universe is the greatest classroom. Look up and wonder.',

    water_cycle:'The water cycle is nature\'s amazing recycling system!\n\n1. Evaporation — The Sun heats water in oceans and rivers, turning it into invisible vapour that rises into the sky\n2. Condensation — The vapour cools high up and forms tiny water droplets → clouds\n3. Precipitation — When clouds get heavy, water falls as rain, snow, or hail\n4. Collection — Water flows into rivers, lakes, and oceans, and the cycle starts again!\n\nFun fact: The water you drink today may have been drunk by a dinosaur millions of years ago! Water is constantly recycled.\n\n— Nature wastes nothing. There\'s a lesson in that for all of us.',

    electricity:'Electricity is the flow of tiny particles called electrons!\n\nThink of it like water flowing through a pipe:\n• The pipe = a wire\n• The water = electrons moving through the wire\n• The pump = a battery or power station pushing electrons along\n\nTypes of electricity:\n• Static — like when you rub a balloon on your hair and it sticks (electrons build up)\n• Current — the kind that flows through wires to power your lights and devices\n\nWho discovered it? Benjamin Franklin flew a kite in a thunderstorm to prove lightning was electrical. (Don\'t try this at home!)\n\n— Curiosity powers discovery, just as electricity powers our world.',

    atoms:'Everything around you — your desk, your food, even the air — is made of tiny building blocks called atoms!\n\nAn atom has 3 parts:\n• Protons (positive charge, in the centre)\n• Neutrons (no charge, also in the centre)\n• Electrons (negative charge, zooming around the outside)\n\nHow small are atoms? If an atom were the size of a football stadium, the nucleus would be a marble on the pitch!\n\nFun fact: There are more atoms in a single glass of water than there are glasses of water in all the oceans on Earth.\n\n— The smallest things often hold the biggest mysteries.',

    human_body:'The human body is the most amazing machine ever built!\n\nFascinating facts:\n• Your heart beats about 100,000 times every day\n• Your brain has about 86 billion nerve cells\n• Your bones are 4 times stronger than concrete\n• You blink about 20,000 times a day\n• Your blood vessels, laid end to end, would circle Earth 2.5 times\n• You produce enough saliva in your lifetime to fill 2 swimming pools\n• Your nose can remember 50,000 different smells\n\nThe human body is proof that nature is the greatest engineer.\n\n— Take care of your body — it\'s the only place you have to live.',

    dinosaurs:'Dinosaurs ruled the Earth for over 160 million years!\n\nKey facts:\n• They first appeared about 230 million years ago\n• The biggest (Argentinosaurus) was as long as 3 school buses\n• The smallest (Microraptor) was the size of a chicken\n• T-Rex had teeth as big as bananas\n• Some dinosaurs had feathers — birds are actually living dinosaurs!\n• They went extinct 66 million years ago when a massive asteroid hit Earth\n\nThe asteroid was about 12 km wide and hit what is now Mexico. It caused fires, tsunamis, and blocked out the Sun for months.\n\n— Even the mightiest can fall. What survives is knowledge — and the curiosity to seek it.',

    /* ─── MATHS ─── */
    math:'I love maths questions!\n\nMaths is like a superpower — it helps you:\n• Figure out if you have enough money for ice cream\n• Build amazing structures\n• Understand how rockets fly\n• Solve puzzles that seem impossible\n\nWhat topic are you working on? I can help with:\n• Fractions and decimals\n• Geometry and shapes\n• Algebra basics\n• Times tables tricks\n• Word problems\n\nTip: The best way to get better at maths is to practise 10 minutes every day. Consistency beats cramming.\n\n— As Prof Mir would say: knowledge grows the more you share it.',

    fractions:'Fractions are just pieces of a whole — like slices of pizza!\n\nIf you cut a pizza into 4 equal pieces and eat 1, you\'ve eaten 1/4 (one quarter).\n\nKey rules:\n• Top number (numerator) = how many pieces you have\n• Bottom number (denominator) = how many equal pieces total\n• 1/2 = 2/4 = 3/6 (same value, different names)\n\nAdding fractions:\n• Same denominator: 1/4 + 2/4 = 3/4 (just add the tops)\n• Different denominators: find a common one first\n  1/3 + 1/4 → 4/12 + 3/12 = 7/12\n\nTip: Always simplify! 4/8 = 1/2\n\n— Every big problem becomes small when you break it into pieces.',

    times_tables:'Times tables tricks that actually work!\n\n• Multiply by 9: Hold up 10 fingers. Fold down the finger for the number you\'re multiplying. Left fingers = tens, right = ones.\n  9 × 3: fold 3rd finger → 2 and 7 = 27!\n\n• Multiply by 11: For two-digit numbers, add the digits and put the sum in the middle.\n  11 × 36: 3_(3+6)_6 = 396\n\n• Multiply by 5: Divide by 2, then multiply by 10.\n  5 × 48: 48 ÷ 2 = 24, × 10 = 240\n\n• Square numbers ending in 5: Multiply the first digit by (first digit + 1), then add 25.\n  35²: 3 × 4 = 12, add 25 = 1225!\n\n— Maths is not magic. It\'s better — it\'s patterns. And patterns can be learned.',

    /* ─── CODING ─── */
    python:'Let\'s write your first Python program!\n\nType this:\nname = input("What is your name? ")\nprint("Hello, " + name + "!")\n\nWhat this does:\n1. Asks your name\n2. Remembers it in a variable\n3. Says hello\n\nNow try this:\nfor i in range(5):\n    print("I am learning Python!")\n\nThis prints the message 5 times. That\'s a loop — one of programming\'s superpowers.\n\nPython reads almost like English — that\'s why even our Grade 3 students love it.\n\n— The best time to start learning was yesterday. The second best time is now.',

    scratch:'Scratch is an amazing way to start coding!\n\nIt works like LEGO for code — you snap colourful blocks together to make things happen.\n\nHow to start:\n1. Go to scratch.mit.edu\n2. Click "Create"\n3. Drag blocks from the left into the workspace\n4. Click the green flag to run!\n\nTry this: Make a cat walk and meow\n• "When green flag clicked"\n• "Move 10 steps"\n• "Play sound meow"\n• "Wait 1 second"\n• Put them inside "Repeat 5"\n\nYou just wrote a program! In our school, students build full games in Scratch by Grade 4.\n\n— Every expert was once a beginner. Start small, dream big.',

    robot:'Building a robot is like building with super-LEGO.\n\nYou need 4 things:\n1. A brain (Arduino or micro:bit board)\n2. Power (batteries)\n3. Movement (motors + wheels)\n4. Senses (sensors — light, distance, touch)\n\nIn our robotics lab, students learn:\n• Grade 3–4: LEGO Mindstorms, basic circuits\n• Grade 5–6: Arduino, simple sensors\n• Grade 7–8: 3D printing parts, competitions\n\nOur students have built line-following robots, obstacle avoiders, and even a robot that sorts recycling!\n\nFun fact: The word "robot" comes from the Czech word "robota" meaning forced labour.\n\n— The most powerful tool a child has is their imagination. A robot is just imagination made real.',

    ai:'Artificial Intelligence (AI) is when computers learn to do things that normally need human thinking.\n\nExamples you use every day:\n• Auto-correct on your phone\n• Netflix suggesting movies\n• Google answering questions\n• Siri and Alexa\n• This very chatbot!\n\nHow does AI learn?\nLike you! By seeing examples. Show a computer 10,000 pictures of cats and dogs, and it learns to tell them apart.\n\nAt London School, we teach students:\n• How AI works (not just how to use it)\n• AI ethics — using technology responsibly\n• Python programming that powers AI\n\n— Technology is a tool. What matters is the wisdom to use it well.',

    /* ─── HISTORY & PAKISTAN ─── */
    pakistan:'Pakistan — the land of the pure — has an incredible story!\n\nKey facts:\n• Founded on August 14, 1947, by Muhammad Ali Jinnah (Quaid-e-Azam)\n• Home to some of the world\'s oldest civilisations — the Indus Valley (Mohenjo-daro) dates back 4,500 years!\n• Has the 2nd highest mountain in the world: K2 (8,611m)\n• Languages: Urdu (national), English, Punjabi, Sindhi, Pashto, Balochi, and more\n• Rich cultural heritage: Sufi music, truck art, Mughal architecture\n\nFamous Pakistanis:\n• Allama Iqbal — the national poet\n• Abdus Salam — Nobel Prize in Physics (1979)\n• Malala Yousafzai — Nobel Peace Prize (2014)\n• And of course, Prof. Waris Mir — who fought for our freedom of thought\n\n— Know your history. It teaches you who you are and who you can become.',

    lahore:'Lahore — the Heart of Pakistan!\n\nLahore is one of the oldest cities in South Asia, with over 2,000 years of history.\n\nFamous landmarks:\n• Badshahi Mosque — one of the largest mosques in the world\n• Lahore Fort — a UNESCO World Heritage Site\n• Shalimar Gardens — built by Emperor Shah Jahan\n• Minar-e-Pakistan — where the Pakistan Resolution was passed in 1940\n• Anarkali Bazaar — one of the oldest markets in South Asia\n\nLahore is known for its food (nihari, paye, kulfi!), its literature, and its love of learning.\n\nProf. Waris Mir called Lahore home. He taught at Punjab University, wrote for Daily Jang, and is buried here. His spirit lives on in every corner of this city.\n\n— Lahore Lahore ay! (Lahore is Lahore!) — as the saying goes.',

    iqbal:'Allama Muhammad Iqbal (1877–1938) was Pakistan\'s national poet and philosopher.\n\nHe is called "Mufakkir-e-Pakistan" (The Thinker of Pakistan) and "Shair-e-Mashriq" (Poet of the East).\n\nKey facts:\n• Born in Sialkot on November 9, 1877\n• Studied in England and Germany — earned a PhD and a law degree\n• His poetry in Urdu and Persian inspired the movement for a separate Muslim state\n• His concept of "Khudi" (self-realisation) teaches us to discover our inner strength\n• Iqbal Day is celebrated on November 9 in Pakistan\n\nFamous lines:\n"Khudi ko kar buland itna ke har taqdeer se pehle / Khuda bande se khud poochhe, bata teri raza kya hai"\n(Elevate yourself so high that before every destiny, God asks you: What is your wish?)\n\n— Like Iqbal, Prof. Mir believed that a child\'s potential is limitless.',

    quaid:'Muhammad Ali Jinnah (1876–1948) — the Quaid-e-Azam (Great Leader) and founder of Pakistan.\n\nKey facts:\n• Born December 25, 1876, in Karachi\n• A brilliant lawyer who studied in London\n• Led the All-India Muslim League\n• His famous 14 Points outlined Muslim political rights\n• Pakistan was created on August 14, 1947\n• He became Pakistan\'s first Governor-General\n• He died on September 11, 1948 — just one year after independence\n\nHis most famous words:\n"With faith, discipline, and selfless devotion to duty, there is nothing worthwhile that you cannot achieve."\n\nHe also said: "You are free to go to your temples, mosques, or any other places of worship. That has nothing to do with the business of the State."\n\n— Leaders show us what is possible. The rest is up to us.',

    democracy:'Democracy means "rule by the people" — it comes from the Greek words demos (people) and kratos (rule).\n\nIn a democracy:\n• Citizens vote to choose their leaders\n• Everyone has equal rights before the law\n• Freedom of speech, press, and assembly are protected\n• Power belongs to the people, not to kings or generals\n\nProf. Waris Mir spent his life fighting for democracy in Pakistan. He wrote:\n"Democracy is not a gift given by rulers; it is a right claimed by the people."\n\nHe believed that a free press is the foundation of democracy. During martial law, when journalists were silenced, he kept writing — because he knew that if the press dies, democracy dies with it.\n\nTypes: Direct democracy (everyone votes on everything) vs. Representative democracy (you vote for someone to represent you).\n\n— Democracy starts in the classroom. When we teach children to think, question, and speak up — we are building democracy.',

    press_freedom:'Freedom of the press means journalists can report the truth without fear of punishment.\n\nWhy does it matter?\n• It holds governments accountable\n• It protects citizens from corruption\n• It allows people to make informed decisions\n• Without it, lies go unchallenged\n\nProf. Waris Mir was a champion of press freedom:\n• He wrote fearless columns during Zia-ul-Haq\'s martial law (1977–1988)\n• When newspapers were shut down and journalists arrested, he kept writing\n• He was a member of the Pakistan Federal Union of Journalists\n• He argued: "A society that silences its journalists has already begun to die"\n\nEven today, journalists around the world face threats for speaking the truth. Prof. Mir\'s courage reminds us why press freedom matters.\n\n— The truth does not need the support of power. It IS the power.',

    indus:'The Indus Valley Civilisation was one of the world\'s first great civilisations!\n\n• Flourished around 3300–1300 BCE — over 4,500 years ago!\n• Located in what is now Pakistan and northwest India\n• Major cities: Mohenjo-daro and Harappa (both in Pakistan)\n• Had advanced urban planning — grid streets, drainage systems, public baths\n• Population of about 5 million at its peak\n• They had a writing system we still haven\'t fully decoded!\n\nAmazing achievements:\n• First to use standardised weights and measures\n• Built the Great Bath at Mohenjo-daro — the world\'s first public pool!\n• Traded with Mesopotamia and Egypt\n• Peaceful civilisation — no evidence of armies or warfare\n\nThis is our heritage. These people lived right here, thousands of years ago.\n\n— The past teaches us what humans can achieve when they think and work together.',

    /* ─── LANGUAGES ─── */
    urdu:'Urdu is Pakistan\'s national language and one of the most beautiful languages in the world!\n\nFun facts:\n• Written right-to-left in the Nastaliq script\n• The word "Urdu" comes from a Turkic word meaning "army" or "camp"\n• It\'s closely related to Hindi — together they\'re sometimes called Hindustani\n• Rich literary tradition of poetry (ghazals, nazms) and prose\n\nFamous Urdu poets:\n• Mirza Ghalib — "Dil-e-nadaan tujhe hua kya hai"\n• Allama Iqbal — "Sitaron se aage jahan aur bhi hain"\n• Faiz Ahmed Faiz — "Mujh se pehli si mohabbat mere mehboob na maang"\n\nProf. Waris Mir wrote in Urdu and was considered a master of Urdu prose — clear, logical, and powerful.\n\nAt London School, we teach Urdu alongside English, Chinese, French, and German.\n\n— Language is the bridge between minds. The more bridges you build, the further you can go.',

    languages:'At London School, we believe multilingual children have a superpower!\n\nWe teach:\n• English — the global language of science and technology\n• Urdu — our national language, rich in poetry and history\n• Chinese (Mandarin) — spoken by 1.1 billion people\n• French — the language of diplomacy, spoken in 29 countries\n• German — the language of engineering and philosophy\n\nWhy learn multiple languages?\n• Your brain grows stronger (literally — more neural connections!)\n• You can talk to more people around the world\n• It helps you understand different cultures\n• Studies show multilingual children are better at problem-solving\n\nFun fact: Children who learn languages before age 10 can develop native-like pronunciation!\n\n— As Prof Mir would say: "The real wealth of a nation is the minds of its children." Languages are treasure.',

    /* ─── LIFE SKILLS & ADVICE ─── */
    study_tips:'Here are study tips that actually work:\n\n1. The Pomodoro Technique: Study 25 minutes → break 5 minutes → repeat. After 4 rounds, take a 15-minute break.\n\n2. Teach what you learn: Explain it to a friend (or a teddy bear). If you can teach it, you understand it.\n\n3. Active recall: Close your book and write down everything you remember. Then check what you missed.\n\n4. Spaced repetition: Review material at increasing intervals — after 1 day, 3 days, 1 week, 2 weeks.\n\n5. Don\'t just highlight: Write notes in your own words. Your brain learns better when it processes information.\n\n6. Sleep matters: Your brain organises memories while you sleep. 8–10 hours for school-age children.\n\n7. Move your body: A 10-minute walk before studying boosts focus.\n\n— Prof Mir believed that the best students are not the ones who study the longest, but the ones who study the smartest.',

    kindness:'Kindness is one of the most powerful forces in the world.\n\nProf. Waris Mir was known for his gentle demeanour combined with fierce intellectual conviction. He was soft-spoken in person but thunderous on the page.\n\nWays to practise kindness:\n• Listen when someone is talking — really listen\n• Include someone who is sitting alone\n• Say "thank you" and mean it\n• Help someone without being asked\n• Be patient with people who are learning\n• Stand up for someone who is being treated unfairly\n\nScience says kindness:\n• Releases feel-good chemicals in your brain\n• Reduces stress and anxiety\n• Is contagious — one kind act inspires another\n• Makes you healthier and happier\n\n— "Every child matters." That\'s not just our value — it\'s a way of life.',

    bullying:'If you or someone you know is being bullied, please know this: it is NOT your fault.\n\nWhat to do:\n• Tell a trusted adult — a teacher, parent, or counsellor\n• Don\'t fight back with fists — but DO speak up\n• Stand with friends — bullies target people who are alone\n• Keep evidence of cyberbullying (screenshots)\n• Remember: the bully\'s behaviour says everything about THEM, not about you\n\nIf you see someone being bullied:\n• Don\'t be a bystander — speak up or get help\n• Include the person being bullied\n• Tell an adult\n\nAt London School, we have zero tolerance for bullying. Every child deserves to feel safe.\n\nProf. Mir spent his life standing up against those who tried to silence others. Courage isn\'t about being fearless — it\'s about doing the right thing even when you\'re afraid.\n\n— You are braver than you think.',

    confidence:'Building confidence is like building a muscle — it gets stronger with practice!\n\nTips from Prof. Mir\'s philosophy:\n\n1. Prepare well — confidence comes from knowing your stuff\n2. Start small — give a 30-second answer in class before a 5-minute presentation\n3. Fail forward — every mistake is a lesson, not a defeat\n4. Talk to yourself kindly — "I can figure this out" beats "I\'m stupid"\n5. Celebrate small wins — finished your homework? That\'s an achievement!\n6. Ask questions — the smartest people in the room are the ones asking, not pretending to know\n7. Help others — nothing builds confidence like knowing you made a difference\n\nProf. Mir was gentle and soft-spoken, but his confidence came from his convictions. He didn\'t need to shout — his ideas spoke for themselves.\n\n— "Khudi ko kar buland itna..." — Raise yourself so high that destiny asks what you wish for. (Iqbal)',

    reading:'Reading is the single best habit you can develop!\n\nWhy read?\n• It expands your vocabulary (readers know 50% more words)\n• It improves your writing\n• It builds empathy — you live through other people\'s eyes\n• It reduces stress by 68% (more than music or walking!)\n• It makes you smarter — literally grows your brain\n\nHow to build a reading habit:\n• Start with 10 pages a day — that\'s 30+ books a year!\n• Keep a book by your bed\n• Read what you enjoy — comics count, graphic novels count\n• Join a reading challenge or book club\n\nBooks Prof Mir would recommend for young minds:\n• "The Alchemist" by Paulo Coelho\n• "A Brief History of Time" by Stephen Hawking\n• "I Am Malala" by Malala Yousafzai\n\n— "Books are the weapons of the enlightened. Read widely, think deeply, speak bravely."',

    /* ─── GEOGRAPHY ─── */
    earth:'Our planet Earth is an incredible place!\n\nFascinating facts:\n• Earth is 4.5 billion years old\n• 71% of the surface is water — that\'s why it\'s called the Blue Planet\n• Earth spins at about 1,670 km/h at the equator\n• It takes 365.25 days to orbit the Sun (that\'s why we have a leap year every 4 years)\n• The deepest point is the Mariana Trench — 11 km deep\n• The highest point is Mount Everest — 8,849m (but K2 in Pakistan at 8,611m is the more difficult climb!)\n• Earth\'s core is as hot as the surface of the Sun — about 5,500°C\n\nEarth is the only planet we know of with life. Let\'s take care of it.\n\n— We don\'t inherit the Earth from our parents — we borrow it from our children.',

    climate:'Climate change is one of the biggest challenges facing your generation.\n\nWhat\'s happening:\n• Earth\'s average temperature has risen by about 1.1°C since 1900\n• Glaciers are melting, sea levels are rising\n• Extreme weather events are becoming more frequent\n• Pakistan is especially vulnerable — floods, heatwaves, and glacier melt affect millions\n\nWhy:\n• Burning fossil fuels (coal, oil, gas) releases CO₂\n• CO₂ traps heat in the atmosphere like a blanket\n\nWhat you can do:\n• Reduce, reuse, recycle\n• Plant trees — they absorb CO₂\n• Save electricity — turn off lights and fans\n• Walk or cycle when you can\n• Learn about it — knowledge is power\n\nPakistan contributes less than 1% of global emissions but faces some of the worst impacts. That\'s why education and awareness matter so much.\n\n— The future belongs to those who prepare for it today.',

    /* ─── THE SCHOOL ─── */
    school:'Welcome to London School — Prof. Waris Mir Campus!\n\nWhat makes us special:\n• Cambridge Pathway — Checkpoint to IGCSE to O-Levels\n• Robotics Lab — LEGO, Arduino, 3D printing\n• AI-Integrated Learning — Students learn WITH technology, not just FROM it\n• 25+ Sports & Activities\n• 3 Foreign Languages — Chinese, French, German\n• Small Class Sizes — every child gets personal attention\n\nOur campus is in Lahore at Plot #8, Sector B-2, Block 1, Ali Road, Opposite Ideal Park Township.\n\nOffice hours: Mon–Sat, 8 AM – 4 PM\nPhone: 0301-0499777\n\nWe\'re named after Prof. Waris Mir because we believe in his vision: education that is both world-class and joyful.\n\n— Come visit us. Let your child see where curiosity comes alive.',

    cambridge:'The Cambridge Pathway is one of the world\'s most respected education systems.\n\nAt London School, we follow:\n• Cambridge Primary (Grades 1–5)\n• Cambridge Lower Secondary (Grades 6–8)\n• Cambridge IGCSE / O-Levels (Grades 9–10)\n\nWhy Cambridge?\n• Recognised by universities worldwide\n• Focuses on deep understanding, not rote learning\n• Develops critical thinking and problem-solving\n• Internationally benchmarked standards\n\nCambridge teaches students HOW to think, not WHAT to think — perfectly aligned with Prof. Mir\'s philosophy.\n\nOur students consistently achieve top grades in Cambridge examinations.\n\n— Education is not about filling a bucket, but lighting a fire.',

    /* ─── GREETINGS & CONVERSATION ─── */
    hello:'Assalamu Alaikum! Welcome!\n\nI am Prof Mir — an AI companion inspired by Prof. Waris Mir, the visionary behind London School.\n\nI can help you with:\n• Science — photosynthesis, gravity, the solar system, atoms\n• Maths — fractions, times tables, problem solving\n• Coding — Python, Scratch, AI concepts\n• Robotics — how to build your first robot\n• History — Pakistan, Lahore, the Indus Valley\n• Languages — Urdu, English, and more\n• Life skills — study tips, confidence, reading\n• About Prof Mir — his life, quotes, books, legacy\n\nJust type your question and I\'ll do my best to help!\n\n— Remember: there is no such thing as a silly question.',

    thanks:'You\'re very welcome! It makes me happy when students are curious and eager to learn.\n\nIs there anything else you\'d like to know? I\'m always here to help.\n\n— As Prof Mir would say: "Knowledge grows the more you share it."',

    bye:'Khuda Hafiz! It was wonderful talking with you.\n\nRemember:\n• Stay curious — always ask "why?"\n• Be kind — the world needs more kindness\n• Read every day — even 10 pages makes a difference\n• Believe in yourself — you are capable of amazing things\n\nCome back anytime you have a question. I\'ll be right here.\n\n— "Every child carries within them the seeds of greatness." Go make the world better!',

    /* ─── DEFAULT ─── */
    def:'That\'s an interesting question! Let me share what I know.\n\nI\'m Prof Mir, an AI study companion who can help with many topics:\n\n📚 Academics — Science, Maths, Coding, Robotics\n🌍 Knowledge — Pakistan, History, Geography, Languages\n💡 Life Skills — Study tips, Confidence, Reading, Kindness\n🏫 Our School — Programs, Campus, Cambridge Curriculum\n🎓 Prof Waris Mir — His life, quotes, legacy, books\n\nTry asking:\n• "What is photosynthesis?"\n• "Tell me about the solar system"\n• "Who was Waris Mir?"\n• "Share a quote from Prof Mir"\n• "How can I study better?"\n• "Tell me about Pakistan"\n\n— Remember: the only silly question is the one you don\'t ask!'
  };

  /* ── KEYWORD MATCHING ENGINE ── */
  function matchResponse(input){
    var l=input.toLowerCase();

    /* Greetings */
    if(/^(hi|hello|hey|salam|assalam|aoa)\b/.test(l)) return 'hello';
    if(/\b(thank|thanks|shukriya|jazak)\b/.test(l)) return 'thanks';
    if(/\b(bye|goodbye|khuda hafiz|allah hafiz|see you)\b/.test(l)) return 'bye';

    /* Prof Waris Mir — specific topics */
    if(/\b(book|wrote|author|writing|fauj)\b/.test(l)&&/\b(waris|mir|prof)\b/.test(l)) return 'waris_books';
    if(/\b(journalism|journalist|column|daily jang|newspaper|press)\b/.test(l)&&/\b(waris|mir|prof)\b/.test(l)) return 'waris_journalism';
    if(/\b(teach|professor|university|punjab|student)\b/.test(l)&&/\b(waris|mir|prof)\b/.test(l)) return 'waris_teaching';
    if(/\b(legacy|impact|remember|honour|award|hilal)\b/.test(l)&&/\b(waris|mir|prof)\b/.test(l)) return 'waris_legacy';
    if(/\b(legacy|impact|remember)\b/.test(l)&&/\b(founder|school)\b/.test(l)) return 'waris_legacy';

    /* Prof Waris Mir — general */
    if(/\b(waris|mir)\b/.test(l)&&/\b(who|tell|about|life|bio|born|die|death)\b/.test(l)) return 'waris_bio';
    if(/\b(who)\b/.test(l)&&/\b(founder|prof)\b/.test(l)) return 'waris_bio';
    if(/\b(waris|mir)\b/.test(l)) return 'waris_bio';

    /* Quotes */
    if(/\b(quote|quotes|saying|wisdom|inspire|inspiration|motivat)\b/.test(l)) return 'quote';

    /* Science */
    if(/\b(photosynthe)\b/.test(l)) return 'photosynthesis';
    if(/\b(gravity|fall|newton|apple)\b/.test(l)&&!/\b(new)\b/.test(l)) return 'gravity';
    if(/\b(solar system|planet|mercury|venus|mars|jupiter|saturn|uranus|neptune)\b/.test(l)) return 'solar';
    if(/\b(water cycle|evaporat|condensat|precipitat|rain cycle)\b/.test(l)) return 'water_cycle';
    if(/\b(electric|circuit|voltage|current|battery)\b/.test(l)) return 'electricity';
    if(/\b(atom|proton|neutron|electron|molecule)\b/.test(l)) return 'atoms';
    if(/\b(body|heart|brain|bone|organ|blood|muscle)\b/.test(l)&&/\b(human|our|my|the)\b/.test(l)) return 'human_body';
    if(/\b(dinosaur|t.?rex|jurassic|fossil|extinct)\b/.test(l)) return 'dinosaurs';
    if(/\b(earth|planet earth|blue planet|globe)\b/.test(l)&&!/\b(google)\b/.test(l)) return 'earth';
    if(/\b(climate|global warming|greenhouse|carbon|environment|pollution)\b/.test(l)) return 'climate';

    /* Maths */
    if(/\b(fraction|numerator|denominator|half|quarter|third)\b/.test(l)) return 'fractions';
    if(/\b(times table|multiplication|multiply|timestable)\b/.test(l)) return 'times_tables';
    if(/\b(math|maths|arithmetic|algebra|geometry|equation|calculate)\b/.test(l)) return 'math';

    /* Coding & Tech */
    if(/\b(python|programming|code|coding|program)\b/.test(l)&&!/\b(scratch)\b/.test(l)) return 'python';
    if(/\b(scratch|block.?coding|visual.?code)\b/.test(l)) return 'scratch';
    if(/\b(robot|arduino|lego|circuit|build)\b/.test(l)&&/\b(robot|build|make|how)\b/.test(l)) return 'robot';
    if(/\b(artificial intelligence|\bai\b|machine learning|chatbot|gpt)\b/.test(l)) return 'ai';

    /* History & Pakistan */
    if(/\b(pakistan|pakistani)\b/.test(l)) return 'pakistan';
    if(/\b(lahore|lahori)\b/.test(l)) return 'lahore';
    if(/\b(iqbal|allama|shair.?e.?mashriq|khudi)\b/.test(l)) return 'iqbal';
    if(/\b(jinnah|quaid|founder.*pakistan|14 august)\b/.test(l)) return 'quaid';
    if(/\b(democra|vote|election|parliament|govern)\b/.test(l)) return 'democracy';
    if(/\b(press freedom|censor|free speech|journalism|freedom of press)\b/.test(l)) return 'press_freedom';
    if(/\b(indus|mohenjo|harappa|ancient.*civili)\b/.test(l)) return 'indus';

    /* Languages */
    if(/\b(urdu|nastaliq|ghazal|nazm)\b/.test(l)) return 'urdu';
    if(/\b(language|chinese|french|german|multilingual|foreign)\b/.test(l)) return 'languages';

    /* Life Skills */
    if(/\b(study|exam|homework|revision|test prep|focus|concentrat)\b/.test(l)) return 'study_tips';
    if(/\b(kind|kindness|nice|empathy|help.?other)\b/.test(l)) return 'kindness';
    if(/\b(bully|bullying|mean|hurt|tease|cyber)\b/.test(l)) return 'bullying';
    if(/\b(confiden|shy|nervous|scared|afraid|anxious|presentat)\b/.test(l)) return 'confidence';
    if(/\b(read|book|library|novel|story)\b/.test(l)&&/\b(habit|tip|recommend|why|love|best|should)\b/.test(l)) return 'reading';

    /* School */
    if(/\b(london school|school|campus|admission|enrol|fee)\b/.test(l)) return 'school';
    if(/\b(cambridge|igcse|o.?level|checkpoint|curriculum)\b/.test(l)) return 'cambridge';

    /* Space catch-all */
    if(/\b(space|star|moon|sun|galaxy|universe|rocket|astronaut|nasa)\b/.test(l)) return 'solar';

    return 'def';
  }

  /* ── CHAT FUNCTIONS ── */
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
      body.scrollTop=body.scrollHeight;
      if(sugBox)sugBox.style.display='none';
      res();
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

  /* ── DEMO AUTO-PLAY ── */
  var dobs=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting&&!started){started=true;demo();dobs.unobserve(e.target)}})},{threshold:.2});
  dobs.observe(document.querySelector('.demo'));

  async function demo(){
    await addMsg('ai','Assalamu Alaikum! I am <strong>Prof Mir</strong> — an AI study companion inspired by Prof. Waris Mir (1938–1987), journalist, professor, and champion of free thought.\n\nI know about science, maths, coding, robotics, history, languages, and much more. I also carry the wisdom and philosophy of the great Prof. Waris Mir himself.\n\nAsk me anything — or tap a suggestion below to get started!',500);
    if(sugBox)sugBox.style.display='flex';
  }

  /* ── SEND MESSAGE ── */
  function send(text){
    var v=text||inp.value.trim();if(!v)return;inp.value='';
    addMsg('user',v,0).then(function(){
      var key=matchResponse(v);
      /* For quotes, regenerate each time so it's different */
      if(key==='quote'){
        R.quote='Here is one of Prof. Mir\'s guiding beliefs:\n\n'+randomQuote()+'\n\nWould you like to hear another? Just ask "another quote" or "more quotes."\n\n— Prof Mir left behind a treasury of wisdom. Each quote is a lesson in courage.';
      }
      var delay=800+Math.min(R[key].length*2,1200);
      return typing(delay).then(function(){return addMsg('ai',R[key],100)})
    })
  }

  /* ── EVENT LISTENERS ── */
  go.addEventListener('click',function(){send()});
  inp.addEventListener('keypress',function(e){if(e.key==='Enter')send()});

  /* Suggestion chips in chat */
  if(sugBox){
    sugBox.querySelectorAll('.chat__sug').forEach(function(btn){
      btn.addEventListener('click',function(){send(this.dataset.q)});
    });
  }

  /* Topic chips on the left panel */
  document.querySelectorAll('.demo__chip').forEach(function(btn){
    btn.addEventListener('click',function(){
      send(this.dataset.q);
      /* Scroll to chat on mobile */
      var chat=document.querySelector('.chat');
      if(window.innerWidth<=900&&chat){
        chat.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  /* Typing dots CSS */
  var s=document.createElement('style');
  s.textContent='.tp span{animation:bk 1.4s infinite ease-in-out}.tp span:nth-child(1){animation-delay:0s}.tp span:nth-child(2){animation-delay:.2s}.tp span:nth-child(3){animation-delay:.4s}@keyframes bk{0%,60%,100%{opacity:.2}30%{opacity:1}}';
  document.head.appendChild(s);
})();

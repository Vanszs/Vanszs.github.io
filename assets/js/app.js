// Data content (could be separated) - minimal initial dataset from reference
const person = {
  name: 'Bevantyo Satria Pinandhita',
  tagline: 'Vibe Coder dengan fundamental teknis yang kuat',
  location: 'Surabaya, Indonesia',
  email_primary: 'bevansatriaa@gmail.com',
  email_alt: 'bevansatria@gmail.com',
  phone: '+6285381568989',
  links: { linkedin: 'https://www.linkedin.com/in/bevansatria/', github: 'https://github.com/Vanszs'}
};

const projects = [
  {
    slug: 'lews-igs-2025',
    title: 'Landslide Early Warning System',
    org: 'PT IGS Indonesia Group',
    role: 'Flutter Dev & IoT Intern',
    problem: 'Low-signal area monitoring & early warning under budget constraints.',
    action: 'Flutter app; Next.js dashboard (Mapbox/Chart.js, JWT); Node/Express API (HMAC+JWT); multi-sensor IoT (rain gauge, soil moisture, MPU-9250), LoRa/GSM, solar.',
    metrics: 'Real-time telemetry; budget < Rp10M; field reliability (in progress).',
    stack: ['Flutter','Next.js','Node','JWT','HMAC','LoRa','GSM','Solar']
  },
  {
    slug: 'gov-apps-dashboard',
    title: 'Government Apps & Admin Dashboard',
    org: 'Surabaya City Government',
    role: 'Solo Flutter & Full-Stack Developer',
    problem: 'Need rapid delivery of mobile services & secure admin operations.',
    action: 'Built 2 Flutter apps in 14 days + Next.js admin (RBAC, REST, real-time sync) + GitHub Actions CI/CD.',
    metrics: '~60% faster release, -40% deployment time, zero post‑launch crashes.',
    stack: ['Flutter','Next.js','REST','RBAC','GitHub Actions']
  },
  {
    slug: 'iot-cv-sme-2024',
    title: 'IoT-based Computer Vision for SMEs',
    org: 'Bangkit Capstone',
    role: 'ML & Embedded',
    problem: 'Manual quality control slow & inefficient.',
    action: 'Jetson Nano + YOLOv5 + TFLite lightweight CV pipeline; dashboard integration.',
    metrics: 'Operational efficiency improvement (qualitative).',
    stack: ['Jetson Nano','YOLOv5','TFLite','Python']
  },
  {
    slug: 'nft-marketplace-diamante',
    title: 'Decentralized NFT Marketplace',
    org: 'Seeds Finance',
    role: 'Blockchain Dev',
    problem: 'Need secure & efficient NFT mint/list/trade flows on Diamante.',
    action: 'Smart contracts + integration; gas/latency optimization; extensive testing.',
    metrics: 'Qualitative adoption (metrics forthcoming).',
    stack: ['Diamante SDK','Solidity','JavaScript']
  },
  {
    slug: 'arcalis-hackathon',
    title: 'Arcalis AI Hackathon dApp',
    org: 'Arcalis AI',
    role: 'Blockchain Developer',
    problem: 'Deliver end‑to‑end dApp prototype with full smart contract integration in limited hackathon time.',
    action: 'Designed & implemented Solidity contracts; Web3 front-end integration (wallet connect, tx); outlined Solana (Rust) migration.',
    metrics: 'Functional end‑to‑end prototype delivered within deadline.',
    stack: ['Solidity','Web3.js','Rust (Solana)','dApp']
  },
  {
    slug: 'asv-robotics',
    title: 'Autonomous Surface Vessel',
    org: 'Robotics UPNVJT',
    role: 'Team Lead',
    problem: 'Autonomous navigation & obstacle avoidance for competition.',
    action: 'System integration; navigation tuning; iterative testing & documentation.',
    metrics: '2nd place KKCTBN 2023 & KKI 2024.',
    stack: ['C++','Python','Embedded','Sensors']
  }
];

const skills = [
  { group: 'Fundamentals', items: ['Algorithms & Data Structures','Distributed Systems','IoT Architecture','API Security (JWT, HMAC)','CI/CD'] },
  { group: 'AI / ML & Data', items: ['TensorFlow','YOLOv5','Evolutionary Strategies','Computer Vision','Jetson Nano','TFLite'] },
  { group: 'Blockchain', items: ['Solidity','Smart Contracts','Diamante SDK','Rust (Solana)','dApps'] },
  { group: 'Development', items: ['Flutter','Next.js','React','Node.js','Express','REST','Docker','GitHub Actions'] },
  { group: 'Mobile / Web', items: ['Flutter (Provider/BLoC/Riverpod)','Tailwind','MySQL','Mapbox','Chart.js'] },
  { group: 'Community & Leadership', items: ['Event Management (Fasilkom Talk #3 & #4)','Workshop Coordination (Loka Karya Python/ML)','Team Leadership (ASV 2 Years)','Community Moderation','AMAs & Partnerships'] },
  // Penetration Testing moved to bottom and will be centered
  { group: 'Penetration Testing', items: ['Nmap','SQLMap','Burp Suite','Nuclei','HTTPx','Metasploit','FFuf','OWASP ZAP'] }
];

const experience = [
  { role: 'Solo Flutter Developer', org: 'Surabaya City Government', date: '07/2025', stack: 'Flutter, Riverpod, REST, FCM', bullets: [
    'Built two production Flutter apps in 14 days leveraging AI pair tools (Copilot / ChatGPT).',
    'Implemented Material Design 3 dark/light theming + Lottie; achieved 4.8/5 pilot rating.',
    'Offline‑first architecture (Riverpod + local cache) for resilience under weak connectivity.',
    'Real‑time sync (REST + Socket.IO) cutting perceived data latency ~60%.',
    'Push notifications (FCM) and QA checklist delivered zero‑crash initial release.'
  ]},
  { role: 'Solo Full‑Stack Web Developer', org: 'Surabaya City Government', date: '07/2025', stack: 'Next.js, TypeScript, MySQL, CI/CD', bullets: [
    'Shipped full admin dashboard (Next.js App Router + TS) solo in 2 weeks.',
    'Designed secure REST APIs (MySQL + bcrypt + HMAC-signed sessions).',
    'Implemented RBAC (4 roles) + audit logging for governance & traceability.',
    'Added real‑time stats refresh + FCM notifications for operational visibility.',
    'Automated build/test/deploy via GitHub Actions reducing release time ~40%.'
  ]},
  { role: 'Flutter Developer & IoT Intern', org: 'PT IGS Indonesia Group', date: '01/2025–Present', stack: 'Flutter, Next.js, Node, LoRa, GSM', bullets: [
    'Developed landslide early warning mobile app with real‑time sensor visualization.',
    'Integrated multi‑sensor LEWS stack (rain gauge, soil moisture, MPU‑9250) via secure API.',
    'Built dashboard (Mapbox + Chart.js) & Node/Express backend (HMAC + JWT).',
    'Designed cost‑efficient solar + LoRa/GSM architecture (< Rp10M constraint).'
  ]},
  { role: 'AI Engineer', org: 'Arcalis AI', date: '01/2025–05/2025', stack: 'GPT, DeepSeek, OpenAI APIs', bullets: [
    'Integrated and orchestrated GPT / DeepSeek models for product features.',
    'Fine‑tuned / parameter‑optimized models improving relevance & latency.',
    'Unified OpenAI & OpenRouter API flows for maintainable inference pipeline.'
  ]},
  { role: 'Blockchain Developer (Hackathon)', org: 'Arcalis AI', date: '12/2024–05/2025', stack: 'Solidity, Web3.js, Rust (Solana)', bullets: [
    'Authored Solidity contracts (core logic, events, access control) from scratch.',
    'Delivered end‑to‑end dApp prototype (wallet connect + tx flow) within hackathon window.',
    'Outlined Solana (Rust) migration path for scalability considerations.'
  ]},
  { role: 'Blockchain Developer Intern', org: 'Seeds Finance', date: '12/2024–02/2025', stack: 'Diamante SDK, Solidity, NFT', bullets: [
    'Implemented NFT marketplace primitives: mint, list, trade with thorough tests.',
    'Optimized gas & latency on critical execution paths.',
    'Integrated contract modules with front‑end for improved UX performance.'
  ]},
  { role: 'Community Lead', org: 'Seeds Finance', date: '12/2024–04/2025', stack: 'Discord, Telegram, Partnerships', bullets: [
    'Established revenue‑sharing partnerships across Web3 communities.',
    'Published consistent multilingual updates driving engagement.',
    'Facilitated discussions to build trust & collaborative culture.'
  ]},
  { role: 'Digital Marketing Specialist', org: 'Seeds Finance', date: '12/2024–04/2025', stack: 'Content Ops, Market Research', bullets: [
    'Maintained question bank ensuring accuracy & zero critical errors.',
    'Produced bi‑weekly English & Indonesian market insight articles.',
    'Supported awareness campaigns with timely market / stock updates.'
  ]},
  { role: 'Head Moderator', org: 'Venimee (Discord / YouTube)', date: '06/2024–Present', stack: 'Community Ops, Team Leadership', bullets: [
    'Scaled community from zero with structured engagement workflows.',
    'Recruited & trained moderator team; defined clear operational roles.',
    'Negotiated partnership opportunities aligned to growth goals.',
    'Owned governance: structure, culture, daily operational decisions.'
  ]},
  { role: 'Community Moderator', org: 'CARV', date: '12/2023–05/2025', stack: 'Events, Support, Moderation', bullets: [
    'Hosted events & competitions increasing interaction (internal metrics).',
    'Resolved ~100 monthly support tickets ensuring user continuity.',
    'Collaborated cross‑team to elevate engagement & retention.'
  ]},
  { role: 'Machine Learning Cohort', org: 'Bangkit Academy', date: '08/2024–12/2024', stack: 'Python, TensorFlow, CV, IoT', bullets: [
    'Completed intensive curriculum (Python, TensorFlow, Generative AI, GANs).',
    'Deployed IoT‑based CV system (qualitative accuracy improvement).',
    'Contributed to data collection, model optimization & embedded integration.'
  ]},
  { role: 'Autonomous Team President', org: 'Robotics Community UPN Veteran Jatim', date: '11/2022–11/2024', stack: 'Robotics, Navigation', bullets: [
    'Led ASV team to 2nd place KKCTBN 2023 & KKI 2024.',
    'Coordinated cross‑discipline integration & iterative field testing.',
    'Documented processes improving reliability & knowledge transfer.'
  ]},
  { role: 'Research & Event Leadership', org: 'BEM Fasilkom UPNVJT', date: '2023–04/2024', stack: 'Event Mgmt, Education', bullets: [
    'Chaired Fasilkom Talk #4 (AI & DS) & #3 (online) end‑to‑end.',
    'Vice coordinator for "Loka Karya" Python & ML workshop.',
    'Consolidated research/event planning workflows for repeatability.'
  ]}
];

const awards = [
  '2nd Place KKCTBN 2023 (ASV) — Team Lead',
  '2nd Place KKI 2024 (ASV) — Team Lead'
];

const publications = [
  { year: 2024, title: 'Exploring the Potential of Hybrid Whale Optimization Algorithm: A Literature Review', link: 'https://ieeexplore.ieee.org/abstract/document/10845319' },
  { year: 2023, title: 'Food Optimizing for Patients with Kidney Failure Using Evolution Strategies Algorithm', link: 'https://ieeexplore.ieee.org/document/10420404/' },
  { year: 2023, title: 'Optimizing Chicken Feed Using Evolution Strategies (ES) Algorithm', link: 'https://journal.ittelkom-pwt.ac.id/index.php/ledger/article/view/1280' }
];

const community = [
  { title: 'Seeds Finance Community Lead', desc: 'Structured partnerships & multilingual updates; drove engagement & mentor support.' },
  { title: 'Seeds Finance Digital Marketing', desc: 'Maintained question bank & bi‑weekly insight posts supporting awareness growth.' },
  { title: 'Venimee Head Moderator', desc: 'Built & led moderation team; events, partnerships, governance & daily ops.' },
  { title: 'CARV Community Moderator', desc: 'Handled events, competitions & ~100 monthly support inquiries (continuity & retention).' },
  { title: 'Blockhood Mentor', desc: 'Guided dev learning, AMAs & technical workshop facilitation.' },
  { title: 'Autonomous Team President (Robotics)', desc: 'Led ASV team to multiple podiums; coordinated cross‑discipline integration.' },
  { title: 'Research & Events (BEM Fasilkom)', desc: 'Chaired tech talks & workshops; standardized planning workflows.' }
];

// Render helpers
function qSel(s, scope = document) { return scope.querySelector(s); } // shorthand
const projectsGrid = qSel('#projects-grid');
const skillsGrid = qSel('#skills-grid');
const timelineEl = qSel('#experience-timeline');
const awardsList = qSel('#awards-list');
const pubList = qSel('#pub-list');
const communityCards = qSel('#community-cards');

function renderProjects(){
  // Switch layout to subcard style similar to experience
  projectsGrid.classList.remove('cards-grid');
  projectsGrid.classList.add('exp-grid');
  projectsGrid.innerHTML = projects.map(p=>`<div class="subcard" data-reveal>
    <div class="role">${p.title}</div>
    <div class="meta">${p.org} • ${p.role}</div>
    <ul class="kvs">
      <li>${p.problem}</li>
      <li>${p.action}</li>
      <li>${p.metrics}</li>
    </ul>
    <div class="stack" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.4rem;">${p.stack.map(s=>`<span class="badge">${s}</span>`).join('')}</div>
  </div>`).join('');
}
function renderSkills(){
  // Penetration Testing now same size; just keep order with it last
  skillsGrid.innerHTML = skills.map(g=>
    `<div class="skill-group" data-reveal><h3>${g.group}</h3><div class="skill-tags">${g.items.map(i=>`<span class="tag">${i}</span>`).join('')}</div></div>`
  ).join('');
}
function renderExperience(){
  // Replace timeline styling with grid subcards
  timelineEl.classList.remove('timeline');
  timelineEl.classList.add('exp-grid');
  timelineEl.innerHTML = experience.map(item=>`<div class="subcard" data-reveal>
    <div class="role">${item.role}</div>
    <div class="meta">${item.org} • ${item.date}</div>
    <ul class="kvs">${item.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
    <div style="margin-top:4px;font-size:0.65rem;letter-spacing:0.05em;color:var(--text-muted);">${item.stack}</div>
  </div>`).join('');
}
function renderAwards(){
  awardsList.innerHTML = awards.map(a=>`<li class="badge">${a}</li>`).join('');
}
function renderPublications(){
  pubList.innerHTML = publications.map(p=>`<li data-reveal><strong>${p.year}</strong> — <a href="${p.link}" target="_blank" rel="noopener">${p.title}</a></li>`).join('');
}
function renderCommunity(){
  communityCards.innerHTML = community.map(c=>`<div class="card" data-reveal><h3>${c.title}</h3><p>${c.desc}</p></div>`).join('');
}

function injectJSONLD(){
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: 'AI & Blockchain Innovator | IoT Engineer',
    url: location.href,
    email: `mailto:${person.email_primary}`,
    sameAs: [ person.links.github, person.links.linkedin ]
  };
  qSel('#jsonld-person').textContent = JSON.stringify(data);
}

// Nav toggle
const navToggle = qSel('.nav-toggle');
const navList = qSel('#nav-list');
navToggle?.addEventListener('click', ()=>{
  const shown = navList.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', shown);
});

// Enhanced scroll reveal with better performance
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

function initReveal() {
  // Use requestIdleCallback for better performance
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      revealElements.forEach(el => revealObserver.observe(el));
    });
  } else {
    setTimeout(() => {
      revealElements.forEach(el => revealObserver.observe(el));
    }, 100);
  }
}

// Enhanced form handler with better UX
const form = qSel('#contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const status = qSel('#form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const honeypot = qSel('#hp');
    
    // Honeypot check
    if (honeypot.value) {
      return;
    }
    
    // Visual feedback
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    form.classList.add('loading');
    status.textContent = 'Mengirim pesan...';
    status.className = 'form-status';
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        status.textContent = 'Pesan berhasil dikirim! Terima kasih.';
        status.classList.add('success');
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      status.textContent = 'Terjadi kesalahan. Silakan coba lagi atau hubungi langsung via email/WhatsApp.';
      status.classList.add('error');
    } finally {
      submitBtn.textContent = 'Kirim';
      submitBtn.disabled = false;
      form.classList.remove('loading');
    }
  });
}

// Language fixed to English
let currentLang = 'en';

// Simple i18n dictionary (can be expanded)
const translations = {
  en: {
    'brand': 'Vibe Coder',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.awards': 'Awards',
    'nav.publications': 'Publications',
    'nav.community': 'Community',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'hero.title': 'I\'m Bevantyo, Vibe Coder with strong technical fundamentals.',
  'hero.subtitle': 'AI & Blockchain Engineer • Smart Contracts & PenTest • Flutter & Next.js Full-Stack • IoT & Computer Vision • Web3 Community Builder.',
    'cta.projects': 'View Projects',
    'cta.contact': 'Contact Me',
    'cta.cv': 'Download CV',
    'cta.linkedin': 'Visit LinkedIn',
    'section.projects': 'Selected Projects',
    'section.projects.desc': 'Case studies focused on Problem → Action → Metrics → Stack.',
    'section.skills': 'Skills & Fundamentals',
    'section.skills.desc': 'Emphasizing strong fundamentals & breadth across the stack.',
    'section.experience': 'Experience',
    'section.experience.desc': 'Concise (HAMS): Highlight, Action, Metrics, Stack.',
    'section.awards': 'Awards',
    'section.publications': 'Publications',
    'section.community': 'Community & Leadership',
    'section.contact': 'Contact',
    'contact.tagline': "Let's build from first principles—clean, fast, and impactful.",
    'form.name': 'Name',
    'form.message': 'Message',
    'form.send': 'Send'
  }
};

function updateLanguage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations.en[key]) el.textContent = translations.en[key];
  });
  document.documentElement.lang = 'en';
}
updateLanguage();

// Enhanced Canvas animation with better performance
function initOrb(){
  const canvas = document.getElementById('orb-canvas');
  if(!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let particles = [];
  
  function resize() { 
    canvas.width = canvas.clientWidth * devicePixelRatio; 
    canvas.height = canvas.clientHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Reinitialize particles on resize
    initParticles();
  }
  
  function initParticles() {
    particles = [];
    const numParticles = Math.min(150, Math.floor(canvas.width / 8));
    
    for(let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: 200 + Math.random() * 60
      });
    }
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  let time = 0;
  
  function animate() {
    time += 0.008;
    
    // Clear canvas with trail effect
    ctx.fillStyle = 'rgba(10, 14, 19, 0.1)';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
      // Update position with smooth movement
      particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.2;
      particle.y += particle.vy + Math.cos(time + index * 0.15) * 0.2;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.clientWidth;
      if (particle.x > canvas.clientWidth) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.clientHeight;
      if (particle.y > canvas.clientHeight) particle.y = 0;
      
      // Pulsing opacity
      const pulseOpacity = particle.opacity + Math.sin(time * 2 + index) * 0.1;
      
      // Draw particle with glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${pulseOpacity})`);
      gradient.addColorStop(0.5, `hsla(${particle.hue}, 60%, 50%, ${pulseOpacity * 0.3})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Connect nearby particles
    for(let i = 0; i < particles.length; i++) {
      for(let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if(distance < 100) {
          const opacity = (100 - distance) / 100 * 0.2;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
  
  // Pause animation when not visible for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) animate();
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  });
  
  observer.observe(canvas);
}

// Init
function init(){
  renderProjects();
  renderSkills();
  renderExperience();
  renderAwards();
  renderPublications();
  renderCommunity();
  injectJSONLD();
  initReveal();
  initOrb();
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);

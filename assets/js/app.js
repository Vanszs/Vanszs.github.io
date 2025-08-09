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
    problem: 'Early warning & monitoring di area sinyal rendah + constraint biaya.',
    action: 'Flutter app; dashboard Next.js (Mapbox/Chart.js, JWT); backend Node/Express (HMAC+JWT); IoT sensor (rain gauge, soil moisture, MPU-9250), LoRa/GSM, solar.',
    metrics: 'Monitoring real-time; budget < Rp10 juta; reliability teruji (placeholder).',
    stack: ['Flutter','Next.js','Node','JWT','HMAC','LoRa','GSM','Solar']
  },
  {
    slug: 'gov-apps-dashboard',
    title: 'Government Apps & Admin Dashboard',
    org: 'Pemerintah Kota Surabaya',
    role: 'Solo Flutter & Full-Stack Developer',
    problem: 'Perlu rilis cepat layanan mobile & operasi admin yang aman.',
    action: 'Bangun 2 aplikasi Flutter dalam 14 hari + dashboard admin Next.js (RBAC, REST, real-time sync) + CI/CD GitHub Actions.',
    metrics: 'Percepatan rilis ~60%, deployment time -40%, zero crash pasca rilis.',
    stack: ['Flutter','Next.js','REST','RBAC','GitHub Actions']
  },
  {
    slug: 'iot-cv-sme-2024',
    title: 'IoT-based Computer Vision for SMEs',
    org: 'Bangkit Capstone',
    role: 'ML & Embedded',
    problem: 'Quality control manual lambat / tidak efisien.',
    action: 'Jetson Nano + YOLOv5 + TFLite; pipeline CV ringan; integrasi dashboard monitoring.',
    metrics: 'Efisiensi operasional meningkat (qualitative).',
    stack: ['Jetson Nano','YOLOv5','TFLite','Python']
  },
  {
    slug: 'nft-marketplace-diamante',
    title: 'Decentralized NFT Marketplace',
    org: 'Seeds Finance',
    role: 'Blockchain Dev',
    problem: 'Kebutuhan mint/list/trade NFT aman & efisien di Diamante.',
    action: 'Smart contract + integrasi; testing & optimisasi gas/latensi.',
    metrics: 'Outcome kualitatif (tanpa angka baru).',
    stack: ['Diamante SDK','Solidity','JavaScript']
  },
  {
    slug: 'arcalis-hackathon',
    title: 'Arcalis AI Hackathon dApp',
    org: 'Arcalis AI',
    role: 'Blockchain Developer',
    problem: 'Membangun prototipe dApp dengan smart contract Solidity terintegrasi penuh dalam waktu terbatas (hackathon).',
    action: 'Rancang & implementasi kontrak; integrasi front-end Web3 (wallet connect, transaksi); desain arah migrasi Solana (Rust).',
    metrics: 'Prototipe Web3 end-to-end berfungsi; integrasi penuh meski tidak menang hackathon.',
    stack: ['Solidity','Web3.js','Rust (Solana)','dApp']
  },
  {
    slug: 'asv-robotics',
    title: 'Autonomous Surface Vessel',
    org: 'Robotics UPNVJT',
    role: 'Team Lead',
    problem: 'Navigasi otonom & obstacle avoidance untuk kompetisi.',
    action: 'Integrasi sistem; tuning navigasi; iterasi pengujian; dokumentasi.',
    metrics: '2nd place KKCTBN 2023 & KKI 2024.',
    stack: ['C++','Python','Embedded','Sensors']
  }
];

const skills = [
  { group: 'Fundamental', items: ['Algoritma & Struktur Data','Sistem Terdistribusi','Arsitektur IoT','API Security (JWT, HMAC)','CI/CD'] },
  { group: 'AI / ML & Data', items: ['TensorFlow','YOLOv5','Evolutionary Strategies','Computer Vision','Jetson Nano','TFLite'] },
  { group: 'Blockchain', items: ['Solidity','Smart Contracts','Diamante SDK','Rust (Solana)','dApps'] },
  { group: 'Development', items: ['Flutter','Next.js','React','Node.js','Express','REST','Docker','GitHub Actions'] },
  { group: 'Mobile / Web', items: ['Flutter (Provider/BLoC/Riverpod)','Tailwind','MySQL','Mapbox','Chart.js'] },
  { group: 'Community', items: ['Moderation','AMA','Workshops','Partnership Building'] }
];

const experience = [
  { role: 'Solo Flutter & Full-Stack Developer', org: 'Pemerintah Kota Surabaya', date: '07/2025', stack: 'Flutter, Next.js, REST, RBAC, GitHub Actions', bullets: [
    'Bangun 2 app Flutter dalam 14 hari (pair dengan AI); percepat rilis ~60%.',
    'Dashboard admin Next.js (RBAC, REST APIs) + real-time sync.',
    'CI/CD (GitHub Actions) turunkan waktu deploy ~40%; zero crash pasca rilis.'
  ]},
  { role: 'Flutter Developer & IoT Intern', org: 'PT IGS Indonesia Group', date: '01/2025–07/2025', stack: 'Flutter, Next.js, Node, Mapbox, Chart.js, JWT, HMAC, LoRa, GSM, Solar', bullets: [
    'LEWS: Integrasi sensor (rain gauge, soil moisture, MPU-9250) + LoRa/GSM + solar 20Wp.',
    'Dashboard Web (Mapbox, Chart.js) realtime; backend Node/Express (HMAC + JWT).',
    'Rancang arsitektur IoT biaya < Rp10 juta.'
  ]},
  { role: 'Blockchain Developer', org: 'Arcalis AI', date: '12/2024–05/2025', stack: 'Solidity, Rust, Solana, dApp patterns', bullets: [
    'Hackathon: deliver smart contracts & integrasi Web3 end-to-end (wallet connect, tx).',
    'Desain migrasi Solana (Rust) sebagai opsi skalabilitas; prototipe siap iterasi.'
  ]},
  { role: 'Blockchain Developer Intern', org: 'Seeds Finance', date: '12/2024–04/2025', stack: 'Diamante SDK, Solidity/Go/JS', bullets: [
    'Marketplace NFT: mint, listing, jual/beli.',
    'Testing & optimisasi kontrak.'
  ]},
  { role: 'Blockchain Developer', org: 'Seeds Finance', date: '12/2024–Present', stack: 'Solidity, Integrations', bullets: [
    'Integrasi NFT + front-end; optimisasi performa (latency -15%).'
  ]},
  { role: 'Community Manager & Developer Mentor', org: 'Blockhood', date: '04/2025–Present', stack: 'Moderation, Mentorship', bullets: [
    'Moderasi, mentorship, AMA/workshops; perjelas learning path; kurangi beban core dev.'
  ]},
  { role: 'Head Moderator', org: 'Venimee Discord/YouTube', date: '04/2024–Present', stack: 'Community Ops', bullets: [
    'Pimpin tim moderator; bot & guideline; partnership & event.',
    '↑ engagement (placeholder X%).'
  ]},
  { role: 'Community Moderator', org: 'CARV', date: '12/2023–Present', stack: 'Community Ops', bullets: [
    'Weekly event & kompetisi; +40% retention Discord, +25% MoM interaction.',
    '~100 tiket support/bulan.'
  ]},
  { role: 'President', org: 'Autonomous Team Robotics UPN Veteran Jatim', date: '11/2022–11/2024', stack: 'Robotics, Navigation', bullets: [
    'Lead ASV projects; 2nd place KKCTBN 2023 & KKI 2024.',
    'Peningkatan reliability ~25% (frasa hati-hati).'  
  ]},
  { role: 'Event Coordinator & Research Staff', org: 'BEM Fasilkom UPNVJT', date: '2023–04/2024', stack: 'Event, AI/DS', bullets: [
    'EO “Fasilkom Talk #4” (offline AI & DS); kurasi speaker & logistik.',
    'Vice “Loka Karya” (Python & ML).',
    'EO “Fasilkom Talk #3” (online) end-to-end.'
  ]}
];

const awards = [
  '2nd Place KKCTBN 2023 (ASV)',
  '2nd Place KKI 2024 (ASV)'
];

const publications = [
  { year: 2024, title: 'Exploring the Potential of Hybrid Whale Optimization Algorithm: A Literature Review', link: 'https://ieeexplore.ieee.org/abstract/document/10845319' },
  { year: 2023, title: 'Food Optimizing for Patients with Kidney Failure Using Evolution Strategies Algorithm', link: 'https://ieeexplore.ieee.org/document/10420404/' },
  { year: 2023, title: 'Optimizing Chicken Feed Using Evolution Strategies (ES) Algorithm', link: 'https://journal.ittelkom-pwt.ac.id/index.php/ledger/article/view/1280' }
];

const community = [
  { title: 'Seeds Finance Community Lead', desc: 'Partnership Web3, konten multibahasa, AMA, mentoring moderator junior.' },
  { title: 'Venimee Head Moderator', desc: 'Optimasi moderation, event, partnership, content calendar.' },
  { title: 'Blockhood Mentor', desc: 'Mentorship developer, AMA, workshop technical.' }
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
  projectsGrid.innerHTML = projects.map(p=>`<article class="card" data-reveal>
    <h3>${p.title}</h3>
    <p><strong>${p.org}</strong> • ${p.role}</p>
    <p>${p.problem}</p>
    <p><em>Aksi:</em> ${p.action}</p>
    <p><em>Hasil:</em> ${p.metrics}</p>
    <div class="stack">${p.stack.map(s=>`<span class="badge">${s}</span>`).join('')}</div>
  </article>`).join('');
}
function renderSkills(){
  skillsGrid.innerHTML = skills.map(g=>`<div class="skill-group" data-reveal><h3>${g.group}</h3><div class="skill-tags">${g.items.map(i=>`<span class="tag">${i}</span>`).join('')}</div></div>`).join('');
}
function renderExperience(){
  timelineEl.innerHTML = experience.map(item=>`<div class="timeline-item" data-reveal>
    <h3>${item.role} — <span style="color:#60a5fa">${item.org}</span></h3>
    <div class="meta">${item.date} · ${item.stack}</div>
    <ul>${item.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
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

// Enhanced language toggle with smooth transitions
const langToggle = qSel('#lang-toggle');
let currentLang = 'id';

// Simple i18n dictionary (can be expanded)
const translations = {
  id: {
    'brand': 'Vibe Coder',
    'hero.title': 'Saya Bevantyo, Vibe Coder dengan fundamental teknis yang kuat.',
    'hero.subtitle': 'Saya membangun solusi AI/ML, blockchain, dan IoT — dari konsep sampai produksi — serta menggerakkan komunitas Web3.',
    'cta.projects': 'Lihat Proyek',
    'cta.contact': 'Hubungi Saya',
    'cta.cv': 'Unduh CV'
  },
  en: {
    'brand': 'Vibe Coder',
    'hero.title': 'I\'m Bevantyo, Vibe Coder with strong technical fundamentals.',
    'hero.subtitle': 'I build AI/ML, blockchain, and IoT solutions — from concept to production — while fostering Web3 communities.',
    'cta.projects': 'View Projects',
    'cta.contact': 'Contact Me',
    'cta.cv': 'Download CV'
  }
};

function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

langToggle?.addEventListener('click', () => {
  currentLang = currentLang === 'id' ? 'en' : 'id';
  langToggle.textContent = currentLang === 'id' ? 'EN' : 'ID';
  document.documentElement.lang = currentLang;
  updateLanguage(currentLang);
  
  // Save preference
  localStorage.setItem('preferred-language', currentLang);
});

// Load saved language preference
const savedLang = localStorage.getItem('preferred-language');
if (savedLang && savedLang !== currentLang) {
  currentLang = savedLang;
  langToggle.textContent = currentLang === 'id' ? 'EN' : 'ID';
  document.documentElement.lang = currentLang;
  updateLanguage(currentLang);
}

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

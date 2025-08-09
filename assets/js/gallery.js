// Gallery functionality with automatic image loading
// Uses global functions from shared.js

// Gallery state
let allImages = [];
let filteredImages = [];
let currentImageIndex = 0;

// Gallery translations
const galleryTranslations = {
  id: {
    'gallery.title': 'Galeri',
    'gallery.subtitle': 'Dokumentasi perjalanan sebagai Vibe Coder — momen penting dalam pengembangan teknologi, membangun komunitas, dan menciptakan inovasi.',
    'gallery.filter.all': 'Semua',
    'gallery.filter.projects': 'Proyek',
    'gallery.filter.events': 'Acara', 
    'gallery.filter.community': 'Komunitas',
    'gallery.filter.tech': 'Teknologi',
    'gallery.loading': 'Memuat galeri...',
    'nav.gallery': 'Galeri',
    'cta.linkedin': 'Kunjungi LinkedIn'
  },
  en: {
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Documentation of the Vibe Coder journey — important moments in technology development, community building, and creating innovation.',
    'gallery.filter.all': 'All',
    'gallery.filter.projects': 'Projects',
    'gallery.filter.events': 'Events',
    'gallery.filter.community': 'Community', 
    'gallery.filter.tech': 'Technology',
    'gallery.loading': 'Loading gallery...',
    'nav.gallery': 'Gallery',
    'cta.linkedin': 'Visit LinkedIn'
  }
};

// Supported image formats
const imageFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// ===== Removed GitHub API (local pattern scan only) =====
// Konfigurasi opsional: jika ingin memastikan semua file muncul tanpa tebakan,
// buat file script sebelum gallery.js dengan:
// <script>window.GALLERY_IMAGE_LIST = ['1731736478597.jpg','1731736512560.jpg','1737432761763.jpg'];</script>
// atau update array itu saat menambah gambar baru.

const IMG_DIR_PATH = 'img';
const IMAGE_EXTENSIONS = ['jpg','jpeg','png','webp','gif','svg'];
const MANIFEST_CACHE_KEY = 'gallery-image-manifest-v1';
const MANIFEST_CACHE_TTL = 1000 * 60 * 30; // 30 menit cache nama file yang sudah terdeteksi sukses
const MANIFEST_FILE = `${IMG_DIR_PATH}/manifest.json`;

// Override: jika user menyediakan daftar manual, sistem akan memakai daftar itu langsung.
function hasManualList() {
  return Array.isArray(window.GALLERY_IMAGE_LIST) && window.GALLERY_IMAGE_LIST.length > 0;
}

// Auto-detect images from img folder (LOCAL ONLY)
async function loadImagesFromFolder() {
  try {
    console.log('🔍 Local image detection start');

    // 0. Try manifest.json (paling akurat)
    const manifestList = await loadManifestList();
    if (manifestList && manifestList.length) {
      console.log(`📄 Using manifest.json (${manifestList.length} files)`);
      allImages = manifestList.filter(isSupportedImageName).map(buildImageObjectFromName);
      filteredImages = [...allImages];
      renderGallery();
      cacheManifest(manifestList);
      return;
    }

    // 1. Manual list override
    if (hasManualList()) {
      console.log('📝 Using manual window.GALLERY_IMAGE_LIST');
      allImages = window.GALLERY_IMAGE_LIST.filter(isSupportedImageName).map(n => buildImageObjectFromName(n));
      filteredImages = [...allImages];
      renderGallery();
      cacheManifest(window.GALLERY_IMAGE_LIST);
      return;
    }

    // 2. Cache
    const cached = getCachedManifest();
    if (cached) {
      console.log(`🗃 Using cached manifest (${cached.length})`);
      allImages = cached.map(buildImageObjectFromName);
      filteredImages = [...allImages];
      renderGallery();
      return;
    }

    // 3. Heuristic scan fallback
    const possible = await generateHeuristicList();
    console.log(`📋 Heuristic candidates: ${possible.length}`);
    const results = await Promise.allSettled(possible.map(checkImageExists));
    allImages = results.filter(r => r.status === 'fulfilled' && r.value).map(r => r.value);

    console.log(`✅ Detected ${allImages.length} images locally`);

    if (allImages.length === 0) {
      showEmptyState();
    } else {
      filteredImages = [...allImages];
      renderGallery();
      cacheManifest(allImages.map(i => extractFileName(i.src)));
    }
  } catch (e) {
    console.error('💥 Local load error', e);
    showErrorState();
  }
}

async function loadManifestList() {
  try {
    console.log('🔍 Mencoba memuat manifest dari:', MANIFEST_FILE + `?v=${Date.now()}`);
    const res = await fetch(MANIFEST_FILE + `?v=${Date.now()}`); // cache buster dev
    if (!res.ok) {
      console.error('❌ Gagal memuat manifest:', res.status, res.statusText);
      return null;
    }
    console.log('✅ Manifest ditemukan, memproses data');
    const data = await res.json();
    console.log('📊 Data manifest:', data);
    if (Array.isArray(data)) {
      console.log('✅ Data manifest valid (array)');
      return data;
    }
    console.error('❌ Data manifest bukan array:', typeof data);
    return null;
  } catch (err) {
    console.error('💥 Error memuat manifest:', err);
    return null;
  }
}

// Support helpers (clean versions)
function isSupportedImageName(name) {
  const ext = name.split('.').pop().toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function extractFileName(path) { return path.split('/').pop(); }

function buildImageObjectFromName(name, directUrl = null) {
  return { src: directUrl || `${IMG_DIR_PATH}/${name}`, title: '', description: '', tags: [], category: 'all' };
}

function getCachedManifest() {
  try {
    const raw = localStorage.getItem(MANIFEST_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > MANIFEST_CACHE_TTL) { localStorage.removeItem(MANIFEST_CACHE_KEY); return null; }
    if (!Array.isArray(parsed.files)) return null;
    return parsed.files;
  } catch { return null; }
}

function cacheManifest(fileNames) {
  try { localStorage.setItem(MANIFEST_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), files: fileNames })); } catch {}
}

// Heuristic list (dipadatkan agar tidak terlalu banyak 404)
async function generateHeuristicList() {
  const list = [];
  const exts = ['.jpg','.jpeg','.png','.webp'];

  // 1) Angka 1..30
  for (let i=1;i<=30;i++) for (const e of exts) list.push({ src: `${IMG_DIR_PATH}/${i}${e}`, name: `${i}${e}` });

  // 2) Timestamp 13 digit yang sudah ada di cache localStorage (jika pernah terdeteksi)
  const previous = getCachedManifest() || [];
  previous.forEach(fn => { list.push({ src: `${IMG_DIR_PATH}/${fn}`, name: fn }); });

  // 3) Pola generik: file yang sudah benar-benar ada (jika user menambahkan <img hidden> sebagai hint)
  document.querySelectorAll('img[data-gallery-hint]')
    .forEach(h => { const n = extractFileName(h.getAttribute('src')||''); if (n && isSupportedImageName(n)) list.push({ src: `${IMG_DIR_PATH}/${n}`, name: n }); });

  // 4) Nama panjang 13 digit umum (prefiks 17 / 18 / 19) terbatas 10 percobaan masing-masing
  const prefixes = ['17','18','19'];
  prefixes.forEach(p => { for (let i=0;i<10;i++) { const stub = p + String(Date.now()).slice(2, 13 - p.length); for (const e of exts) list.push({ src: `${IMG_DIR_PATH}/${stub}${e}`, name: `${stub}${e}` }); }});

  // 5) Huruf a-f
  for (const l of ['a','b','c','d','e','f']) for (const e of exts) list.push({ src: `${IMG_DIR_PATH}/${l}${e}`, name: `${l}${e}` });

  // Deduplicate by src
  const seen = new Set();
  return list.filter(item => { if (seen.has(item.src)) return false; seen.add(item.src); return true; });
}

// Check if image exists by trying to load it
function checkImageExists(imageInfo) {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`✅ Image found: ${imageInfo.src}`);
      // Generate metadata based on filename
      const metadata = generateImageMetadata(imageInfo.name);
      resolve({
        src: imageInfo.src,
        title: metadata.title,
        description: metadata.description,
        tags: metadata.tags,
        category: metadata.category
      });
    };
    
    img.onerror = () => {
      // Silently fail - this is expected for most attempts
      resolve(null);
    };
    
    img.src = imageInfo.src;
  });
}

// Generate metadata (simplified for visual focus)
function generateImageMetadata(filename) {
  const metadata = {
    title: '', // No titles needed - pure visual
    description: '',
    tags: [],
    category: 'all'
  };
  
  // Simple category assignment for variety
  const hash = filename.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const categories = ['all', 'visual', 'moments', 'gallery'];
  metadata.category = categories[Math.abs(hash) % categories.length];
  
  return metadata;
}

// Format title from filename
function formatTitle(filename) {
  return filename
    .replace(/[0-9]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Render gallery grid (clean visual focus)
function renderGallery() {
  const galleryGrid = qSel('#gallery-grid');
  
  galleryGrid.innerHTML = filteredImages.map((image, index) => `
    <div class="gallery-item" data-category="${image.category}" data-index="${index}" data-reveal>
      <img class="gallery-image" src="${image.src}" alt="Gallery Image ${index + 1}" loading="lazy" />
    </div>
  `).join('');
  
  // Add click listeners for modal
  galleryGrid.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
  });
  
  // Initialize reveal animations
  initReveal();
}

// Filter functionality
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter images
      const filter = btn.dataset.filter;
      if (filter === 'all') {
        filteredImages = [...allImages];
      } else {
        filteredImages = allImages.filter(img => img.category === filter);
      }
      
      // Re-render gallery
      renderGallery();
    });
  });
}

// Modal functionality
function initModal() {
  const modal = qSel('#image-modal');
  const modalImage = qSel('#modal-image');
  const modalTitle = qSel('#modal-title');
  const modalDescription = qSel('#modal-description');
  const modalTags = qSel('#modal-tags');
  const closeBtn = qSel('.modal-close');
  const prevBtn = qSel('.modal-prev');
  const nextBtn = qSel('.modal-next');
  const backdrop = qSel('.modal-backdrop');
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Open modal
  window.openModal = function(index) {
    currentImageIndex = index;
    showImageInModal(filteredImages[index]);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  
  // Show image in modal (simplified)
  function showImageInModal(image) {
    modalImage.src = image.src;
    modalImage.alt = 'Gallery Image';
    modalTitle.textContent = '';
    modalDescription.textContent = '';
    modalTags.innerHTML = '';
  }
  
  // Navigation
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    showImageInModal(filteredImages[currentImageIndex]);
  }
  
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    showImageInModal(filteredImages[currentImageIndex]);
  }
  
  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  });
}

// Show empty state when no images found
function showEmptyState() {
  const galleryGrid = qSel('#gallery-grid');
  galleryGrid.innerHTML = `
    <div class="gallery-loading">
      <div style="font-size: 3rem; margin-bottom: 1rem;">📷</div>
      <h3>Mencari gambar...</h3>
      <p>Sistem sedang mencari gambar di folder <code>img/</code>...</p>
      <p style="font-size: 0.875rem; margin-top: 1rem; color: var(--text-muted);">
        Format yang didukung: JPG, PNG, WebP, GIF, SVG<br>
        Periksa console browser untuk detail deteksi.
      </p>
    </div>
  `;
}

// Show error state
function showErrorState() {
  const galleryGrid = qSel('#gallery-grid');
  galleryGrid.innerHTML = `
    <div class="gallery-loading">
      <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
      <h3>Gagal memuat galeri</h3>
      <p>Terjadi kesalahan saat memuat gambar. Silakan coba refresh halaman.</p>
    </div>
  `;
}

// Reveal animation
function initReveal() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
      });
    });
  } else {
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
      });
    }, 100);
  }
}

// Language support
function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (galleryTranslations[lang] && galleryTranslations[lang][key]) {
      el.textContent = galleryTranslations[lang][key];
    }
  });
}

// Navigation toggle
function initNavigation() {
  const navToggle = qSel('.nav-toggle');
  const navList = qSel('#nav-list');
  
  navToggle?.addEventListener('click', () => {
    const shown = navList.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', shown);
  });
  
  // Language toggle
  const langToggle = qSel('#lang-toggle');
  let currentLang = localStorage.getItem('preferred-language') || 'id';
  
  if (langToggle) {
    langToggle.textContent = currentLang === 'id' ? 'EN' : 'ID';
    updateLanguage(currentLang);
    
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'id' ? 'en' : 'id';
      langToggle.textContent = currentLang === 'id' ? 'EN' : 'ID';
      document.documentElement.lang = currentLang;
      updateLanguage(currentLang);
      localStorage.setItem('preferred-language', currentLang);
    });
  }
}

// Initialize everything
function init() {
  loadImagesFromFolder();
  initFilters();
  initModal();
  initNavigation();
  
  // Set current year
  const yearEl = qSel('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);

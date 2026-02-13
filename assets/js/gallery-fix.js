// Gallery fix script
// Auto-detection fallback for when main gallery.js fails

document.addEventListener('DOMContentLoaded', function() {
  console.log('Gallery fix script loaded');
  
  // Check if gallery has loaded after 3 seconds
  setTimeout(function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Gallery fix: Found ' + galleryItems.length + ' gallery items');
    
    // If no gallery items found, try to create them manually
    if (galleryItems.length === 0) {
      console.log('Gallery fix: No items found, starting auto-detection fallback');
      createAutoDetectedGallery();
    }
  }, 3000);
  
  // Function to auto-detect and create gallery
  async function createAutoDetectedGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    console.log('Starting auto-detection of images...');
    
    // Try to detect images automatically
    const detectedImages = await autoDetectImages();
    
    if (detectedImages.length === 0) {
      showNoImagesMessage();
      return;
    }
    
    console.log(`Auto-detected ${detectedImages.length} images`);
    
    // Clear loading indicator
    galleryGrid.innerHTML = '';
    
    // Create items for each detected image
    detectedImages.forEach((imageSrc, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.index = index;
      item.setAttribute('data-reveal', '');
      
      const img = document.createElement('img');
      img.className = 'gallery-image';
      img.src = imageSrc;
      img.alt = `Gallery Image ${index + 1}`;
      img.loading = 'lazy';
      
      // Calculate row span for masonry effect based on actual dimensions
      img.addEventListener('load', function() {
        if (CSS.supports('display', 'grid') && this.naturalHeight && this.naturalWidth) {
          const aspectRatio = this.naturalHeight / this.naturalWidth;
          const containerWidth = 280;
          const imageHeight = containerWidth * aspectRatio;
          const rowSpan = Math.ceil(imageHeight / 5) + 4; // 5px per row + padding
          item.style.setProperty('--row-span', Math.max(20, Math.min(100, rowSpan)));
        }
      });
      
      item.appendChild(img);
      galleryGrid.appendChild(item);
      
      // Add click event for modal
      item.addEventListener('click', () => {
        if (typeof openModal === 'function') {
          openModal(index);
        } else if (typeof openImageModal === 'function') {
          openImageModal(index);
        } else {
          // Fallback modal
          const modalImage = document.querySelector('#modal-image');
          const modal = document.querySelector('#image-modal');
          
          if (modalImage && modal) {
            modalImage.src = img.src;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });
    
    // Initialize animation
    if (typeof initReveal === 'function') {
      initReveal();
    } else if (typeof revealObserver !== 'undefined') {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
      });
    } else {
      document.querySelectorAll('.gallery-item').forEach(el => {
        el.classList.add('revealed');
      });
    }
    
    console.log('Gallery fix: Auto-detected gallery created with ' + detectedImages.length + ' images');
  }
  
  // Auto-detect images - use predefined list if available
  async function autoDetectImages() {
    const foundImages = [];
    const imageDir = 'img';
    
    // Use auto-generated list if available
    let filesToTest = [];
    if (window.GALLERY_IMAGES && window.GALLERY_IMAGES.length > 0) {
      filesToTest = window.GALLERY_IMAGES;
      console.log('Using auto-generated image list');
    } else if (window.GALLERY_IMAGE_LIST && window.GALLERY_IMAGE_LIST.length > 0) {
      filesToTest = window.GALLERY_IMAGE_LIST;
      console.log('Using predefined image list');
    } else {
      // Fallback to known files
      filesToTest = [
        '1731736478597.jpg',
        '1731736512560.jpg', 
        '1737432761763.jpg',
        '1731736478597 - Copy.jpg',
        '1731736512560 - Copy.jpg',
        '1737432761763 - Copy.jpg',
        '1731736478597 - Copy (2).jpg',
        '1731736512560 - Copy (2).jpg',
        '1737432761763 - Copy (2).jpg',
        '1731736478597 - Copy (3).jpg',
        '1731736512560 - Copy (3).jpg',
        '1737432761763 - Copy (3).jpg'
      ];
      console.log('Using fallback image list');
    }
    
    console.log(`Testing ${filesToTest.length} image files...`);
    
    // Test each file
    for (const filename of filesToTest) {
      try {
        const response = await fetch(`${imageDir}/${filename}`, { method: 'HEAD' });
        if (response.ok) {
          foundImages.push(`${imageDir}/${filename}`);
          console.log(`✅ Found: ${filename}`);
        }
      } catch (e) {
        console.log(`❌ Error checking: ${filename}`);
      }
    }
    
    console.log(`Found ${foundImages.length} images total`);
    return foundImages.sort();
  }
  
  function showNoImagesMessage() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = `
      <div class="gallery-loading">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📸</div>
        <h3>Tidak ada gambar ditemukan</h3>
        <p>Letakkan gambar Anda di folder <code>img/</code> dan refresh halaman.</p>
        <p style="font-size: 0.875rem; margin-top: 1rem; color: var(--text-dim);">
          Format yang didukung: JPG, PNG, WebP, GIF<br>
          Sistem akan otomatis mendeteksi gambar baru.
        </p>
      </div>
    `;
  }
});

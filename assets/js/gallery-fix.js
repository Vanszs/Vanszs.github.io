// Gallery fix script
// This is a lightweight fallback to ensure gallery displays properly

document.addEventListener('DOMContentLoaded', function() {
  console.log('Gallery fix script loaded');
  
  // Check if gallery has loaded after 3 seconds
  setTimeout(function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Gallery fix: Found ' + galleryItems.length + ' gallery items');
    
    // If no gallery items found, try to create them manually
    if (galleryItems.length === 0) {
      console.log('Gallery fix: No items found, creating fallback gallery');
      createFallbackGallery();
    }
  }, 3000);
  
  // Function to create a fallback gallery
  function createFallbackGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    const imageFiles = ["1731736478597.jpg", "1731736512560.jpg", "1737432761763.jpg"];
    const imageDir = 'img';
    
    // Clear loading indicator
    galleryGrid.innerHTML = '';
    
    // Create items
    imageFiles.forEach((file, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.category = 'all';
      item.dataset.index = index;
      item.setAttribute('data-reveal', '');
      
      const img = document.createElement('img');
      img.className = 'gallery-image';
      img.src = `${imageDir}/${file}`;
      img.alt = `Gallery Image ${index + 1}`;
      img.loading = 'lazy';
      
      item.appendChild(img);
      galleryGrid.appendChild(item);
      
      // Add click event
      item.addEventListener('click', () => {
        if (typeof openModal === 'function') {
          openModal(index);
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
    
    console.log('Gallery fix: Fallback gallery created with ' + imageFiles.length + ' images');
  }
});

// Smart Balanced Gallery
(function(){
  
  function getImageFiles(){
    if (window.GALLERY_IMAGES?.length) return window.GALLERY_IMAGES;
    if (window.GALLERY_IMAGE_LIST?.length) return window.GALLERY_IMAGE_LIST;
    return [
      '1731736478597.jpg','1731736512560.jpg','1737432761763.jpg',
      'id card-04.jpg', 'IMG_0409.jpg', 'IMG_0789.JPG', 'IMG_1478.jpg',
      '1731736478597 - Copy.jpg','1731736512560 - Copy.jpg','1737432761763 - Copy.jpg',
      '1731736478597 - Copy (2).jpg','1731736512560 - Copy (2).jpg','1737432761763 - Copy (2).jpg',
      '1731736478597 - Copy (3).jpg','1731736512560 - Copy (3).jpg','1737432761763 - Copy (3).jpg'
    ];
  }

  function verifyImages(files){
    const dir = 'img';
    return Promise.all(files.map(f => 
      fetch(`${dir}/${f}`, {method: 'HEAD'})
        .then(r => r.ok ? `${dir}/${f}` : null)
        .catch(() => null)
    )).then(results => results.filter(Boolean));
  }

  function getImageDimensions(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        let sizeClass = 'medium';
        
        // Lebih presisi: horizontal lebar = aspect ratio > 1.6
        if (aspectRatio > 1.6) {
          sizeClass = 'wide';
        } else if (aspectRatio < 0.75) {
          sizeClass = 'tall';
        }
        
        resolve({ aspectRatio, sizeClass });
      };
      img.onerror = () => resolve({ aspectRatio: 1, sizeClass: 'medium' });
      img.src = src;
    });
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function distributeImages(imageData) {
    // Simple sequential distribution to prevent clustering
    const tall = imageData.filter(img => img.sizeClass === 'tall');
    const wide = imageData.filter(img => img.sizeClass === 'wide');
    const medium = imageData.filter(img => img.sizeClass === 'medium');
    
    console.log(`Image distribution: ${medium.length} medium, ${tall.length} tall, ${wide.length} wide`);
    
    // Safer pattern: more medium images as spacers
    const distributed = [];
    let tallIndex = 0, wideIndex = 0, mediumIndex = 0;
    
    // Sequential placement: medium → medium → tall → medium → wide
    const safePattern = ['medium', 'medium', 'tall', 'medium', 'wide'];
    let patternIndex = 0;
    
    while (tallIndex < tall.length || wideIndex < wide.length || mediumIndex < medium.length) {
      const currentType = safePattern[patternIndex % safePattern.length];
      
      if (currentType === 'tall' && tallIndex < tall.length) {
        distributed.push(tall[tallIndex++]);
      } else if (currentType === 'wide' && wideIndex < wide.length) {
        distributed.push(wide[wideIndex++]);
      } else if (mediumIndex < medium.length) {
        distributed.push(medium[mediumIndex++]);
      } else if (tallIndex < tall.length) {
        distributed.push(tall[tallIndex++]);
      } else if (wideIndex < wide.length) {
        distributed.push(wide[wideIndex++]);
      }
      patternIndex++;
    }
    
    console.log('Distribution pattern created:', distributed.map(img => `${img.sizeClass}:${img.src.split('/').pop()}`));
    return distributed;
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async function buildSmartGallery(imageList){
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Get dimensions for each image
    const imageData = await Promise.all(
      imageList.map(async (src, index) => {
        const dimensions = await getImageDimensions(src);
        return { src, index, ...dimensions };
      })
    );
    
    // Smart distribution for balanced layout
    const distributedImages = distributeImages(imageData);
    
    // ENHANCED collision detection system
    const gridCols = 4;
    const gridMap = new Map(); // Track what's at each position
    
    function isPositionFree(col, row, colSpan, rowSpan) {
      // Check bounds
      if (col < 1 || row < 1 || col + colSpan - 1 > gridCols) {
        return false;
      }
      
      // Check each cell in the span
      for (let c = col; c < col + colSpan; c++) {
        for (let r = row; r < row + rowSpan; r++) {
          const key = `${c}-${r}`;
          if (gridMap.has(key)) {
            return false; // Cell is occupied
          }
        }
      }
      return true;
    }
    
    function markOccupied(col, row, colSpan, rowSpan, imageName) {
      for (let c = col; c < col + colSpan; c++) {
        for (let r = row; r < row + rowSpan; r++) {
          const key = `${c}-${r}`;
          gridMap.set(key, imageName);
        }
      }
    }
    
    function findNextPosition(colSpan, rowSpan, imageName) {
      for (let row = 1; row <= 50; row++) {
        for (let col = 1; col <= gridCols - colSpan + 1; col++) {
          if (isPositionFree(col, row, colSpan, rowSpan)) {
            return { col, row };
          }
        }
      }
      console.error(`❌ NO POSITION FOUND for ${imageName} (${colSpan}x${rowSpan})`);
      return null;
    }
    
    // Process images with collision detection
    distributedImages.forEach((data, index) => {
      const imageName = data.src.split('/').pop();
      const item = document.createElement('div');
      item.className = `gallery-item ${data.sizeClass}`;
      item.dataset.index = index;
      item.dataset.image = imageName;
      item.setAttribute('data-reveal', '');
      
      // Unique z-index for each item to prevent stacking
      item.style.zIndex = 10 + index;
      
      // Determine span
      let colSpan = 1, rowSpan = 1;
      if (data.sizeClass === 'wide') {
        colSpan = 2;
        rowSpan = 1;
      } else if (data.sizeClass === 'tall') {
        colSpan = 1;
        rowSpan = 2;
      }
      
      // Find position with collision detection
      const position = findNextPosition(colSpan, rowSpan, imageName);
      
      if (position) {
        // Set explicit grid position with clear boundaries
        item.style.gridColumn = `${position.col} / ${position.col + colSpan}`;
        item.style.gridRow = `${position.row} / ${position.row + rowSpan}`;
        item.style.gridColumnStart = position.col;
        item.style.gridColumnEnd = position.col + colSpan;
        item.style.gridRowStart = position.row;
        item.style.gridRowEnd = position.row + rowSpan;
        
        // Mark as occupied
        markOccupied(position.col, position.row, colSpan, rowSpan, imageName);
        
        console.log(`✅ ${imageName} placed at [${position.col},${position.row}] size ${colSpan}x${rowSpan} z-index:${10 + index}`);
        
        // Special logging for problematic images
        if (imageName === '1737432761763.jpg' || imageName === 'IMG_0409.jpg') {
          console.warn(`🔍 SPECIAL: ${imageName} at [${position.col},${position.row}] ${colSpan}x${rowSpan} z:${10 + index}`);
          // Force higher z-index for problematic image
          item.style.zIndex = 100 + index;
        }
      } else {
        // Emergency fallback with unique position
        console.error(`❌ EMERGENCY: ${imageName} using fallback positioning`);
        item.style.gridColumn = 'auto';
        item.style.gridRow = 'auto';
        item.style.zIndex = 200 + index; // Very high z-index for fallback
      }
      
      const img = document.createElement('img');
      img.className = 'gallery-image';
      img.src = data.src;
      img.alt = `Gallery Photo ${index + 1}`;
      img.loading = 'lazy';
      
      // Modal click handler
      item.addEventListener('click', () => {
        if (window.openModal) openModal(index);
      });
      
      item.appendChild(img);
      grid.appendChild(item);
    });
    
    console.log(`✨ Gallery created with ${distributedImages.length} images`);
    console.log('🗺️ Final grid map:', Object.fromEntries(gridMap));
    
    // Verify no overlaps with detailed logging
    const positions = Array.from(gridMap.entries());
    const conflicts = positions.filter(([key, img1], i) => 
      positions.slice(i + 1).some(([key2, img2]) => key === key2 && img1 !== img2)
    );
    
    if (conflicts.length > 0) {
      console.error('❌ CONFLICTS DETECTED:', conflicts);
      console.error('🚨 OVERLAPPING POSITIONS:', conflicts.map(([key]) => key));
    } else {
      console.log('✅ NO CONFLICTS - All images positioned safely');
    }
    
    // Additional check for 1737432761763.jpg visibility
    const problemImage = document.querySelector('[data-image="1737432761763.jpg"]');
    if (problemImage) {
      console.log('🔍 Problem image element:', problemImage);
      console.log('🔍 Problem image styles:', {
        gridColumn: problemImage.style.gridColumn,
        gridRow: problemImage.style.gridRow,
        zIndex: problemImage.style.zIndex
      });
    }
  }

  function initializeGallery() {
    const files = getImageFiles();
    verifyImages(files).then(foundImages => {
      if (!foundImages.length) {
        console.warn('[gallery] No images found');
        showEmptyState();
        return;
      }
      buildSmartGallery(foundImages);
    });
  }

  function showEmptyState() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = `
      <div class="gallery-loading">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📸</div>
        <h3>Tidak ada gambar ditemukan</h3>
        <p>Letakkan gambar Anda di folder <code>img/</code> dan refresh halaman.</p>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', initializeGallery);
})();

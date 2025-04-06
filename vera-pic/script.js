document.addEventListener('DOMContentLoaded', () => {
    // Debug message to confirm script is loading 
    console.log('Vera-pic gallery script loaded!');
    
    // IMPORTANT: Define placeholder images first - before any function calls
    // Add a default placeholder image that will be used throughout the app
    const defaultPlaceholderImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300"><rect width="300" height="300" fill="%23ffb3c1"/><circle cx="150" cy="120" r="50" fill="%23fff"/><circle cx="150" cy="260" r="90" fill="%23fff"/><path d="M150,195 a95,95 0 0,1 95,95 h-190 a95,95 0 0,1 95,-95z" fill="%23ffb3c1"/></svg>';
    
    // Local image path that will be used for all photos - use ONLY vera.jpg
    const localImagePath = 'images/vera.jpg';
    
    // Initialize elements and variables
    const gallery = document.getElementById('photo-gallery');
    const galleryLoader = document.getElementById('gallery-loader');
    const photoModal = document.getElementById('photo-modal');
    const uploadModal = document.getElementById('upload-modal');
    const modalImg = document.getElementById('modal-img');
    const photoTitle = document.getElementById('photo-title');
    const photoDate = document.getElementById('photo-date');
    const photoDesc = document.getElementById('photo-description');
    const addPhotoBtn = document.getElementById('add-photo');
    const uploadForm = document.getElementById('upload-form');
    const searchInput = document.getElementById('search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toast = document.getElementById('toast');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const loadingOverlay = document.querySelector('.loading-overlay');
    const yearSpan = document.getElementById('current-year');
    const photoInput = document.getElementById('photo');
    const imagePreview = document.getElementById('image-preview');
    
    // Set current year in footer
    yearSpan.textContent = new Date().getFullYear();
    
    let currentFilter = 'all';
    let currentPhotoIndex = 0;
    let filteredPhotos = [];
    
    // Now we can safely load photos since localImagePath is defined
    let photos = loadPhotos();
    
    // Create floating hearts for background decoration
    createFloatingHearts();
    
    // Add logging to debug image loading issues
    console.log('Using image path:', localImagePath);
    
    // Create and preload test image to verify path is correct
    const testImage = new Image();
    testImage.onload = function() {
        console.log('Test image loaded successfully');
        // Image loaded successfully, force the gallery to render
        renderPhotos();
    };
    testImage.onerror = function() {
        console.error('Failed to load image. Check if "vera.jpg" exists in the images folder');
        alert('Failed to load image "vera.jpg" - using placeholder instead');
        // Fall back to inline SVG if local image fails
        photos.forEach(photo => {
            photo.src = defaultPlaceholderImage;
        });
        renderPhotos();
    };
    testImage.src = localImagePath;
    
    // Debug message to confirm script is loading
    console.log('Vera-pic gallery script loaded!');
    
    // Function to render photos in the gallery with animation delay
    function renderPhotos() {
        // Show loader and clear any previous content
        gallery.style.display = 'none';
        galleryLoader.style.display = 'flex';
        gallery.innerHTML = '';
        
        console.log('Rendering photos, filtering from total:', photos.length);
        
        // Force minimal delay for better performance
        setTimeout(() => {
            const searchTerm = searchInput.value.toLowerCase();
            
            // Filter photos based on search term and current filter
            filteredPhotos = photos.filter(photo => {
                const matchesSearch = photo.title.toLowerCase().includes(searchTerm) || 
                                   photo.description.toLowerCase().includes(searchTerm);
                
                if (currentFilter === 'all') return matchesSearch;
                if (currentFilter === 'favorites') return matchesSearch && photo.favorite;
                if (currentFilter === 'recent') {
                    const photoDate = new Date(photo.date);
                    const threeMonthsAgo = new Date();
                    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                    return matchesSearch && photoDate >= threeMonthsAgo;
                }
                
                return matchesSearch;
            });
            
            console.log('Filtered photos:', filteredPhotos.length);
            
            // Hide loader and show gallery
            galleryLoader.style.display = 'none';
            gallery.style.display = 'grid';
            
            if (filteredPhotos.length === 0) {
                gallery.innerHTML = `<div class="no-photos">No photos found</div>`;
                return;
            }
            
            // FIX: Simplified card creation logic for better compatibility
            filteredPhotos.forEach((photo, index) => {
                // Create a full HTML string instead of DOM manipulation
                const cardHTML = `
                    <div class="photo-card" data-id="${photo.id}" style="animation-delay: ${index * 0.05}s">
                        <img src="${photo.src}" 
                            alt=""
                            loading="lazy"
                            onerror="this.src='${defaultPlaceholderImage}'">
                        <button class="favorite ${photo.favorite ? 'active' : ''}"
                            aria-label="${photo.favorite ? 'Remove from favorites' : 'Add to favorites'}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <div class="photo-info">
                            <h3>${photo.title}</h3>
                            <p>${formatDate(photo.date)}</p>
                        </div>
                    </div>
                `;
                
                // Insert HTML directly
                gallery.insertAdjacentHTML('beforeend', cardHTML);
            });
            
            // Add event handlers after HTML has been inserted
            document.querySelectorAll('.photo-card').forEach(card => {
                const id = parseInt(card.dataset.id);
                
                // Add click event to favorite button
                card.querySelector('.favorite').addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(id);
                });
                
                // Add click event to the whole card
                card.addEventListener('click', () => {
                    const photoIndex = filteredPhotos.findIndex(p => p.id === id);
                    if (photoIndex !== -1) {
                        currentPhotoIndex = photoIndex;
                        openPhotoModal(filteredPhotos[photoIndex]);
                    }
                });
            });
            
            console.log('Gallery rendered with', filteredPhotos.length, 'photos');
            
        }, 50); // Minimal delay
    }
    
    // Format date in a nice way
    function formatDate(dateString) {
        if (!dateString) return 'Unknown date';
        
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (error) {
            console.error("Date formatting error:", error);
            return 'Unknown date';
        }
    }
    
    // Toggle favorite status
    function toggleFavorite(id) {
        const photo = photos.find(p => p.id === id);
        if (photo) {
            photo.favorite = !photo.favorite;
            
            if (photo.favorite) {
                showToast('Added to favorites ❤️', 'success');
            }
            
            savePhotos();
            renderPhotos();
        }
    }
    
    // Open photo modal with animation
    function openPhotoModal(photo) {
        // Show loading state
        modalImg.style.opacity = '0.3';
        loadingOverlay.style.opacity = '1';
        loadingOverlay.style.visibility = 'visible';
        
        // Set initial content
        modalImg.src = photo.src;
        photoTitle.textContent = photo.title;
        photoDate.textContent = `Date: ${formatDate(photo.date)}`;
        photoDesc.textContent = photo.description || 'No description available';
        
        // Set favorite button state
        const heartBtn = photoModal.querySelector('.heart-btn i');
        heartBtn.className = photo.favorite ? 'fas fa-heart' : 'far fa-heart';
        
        // Handle favorite toggle
        heartBtn.parentElement.onclick = () => {
            toggleFavorite(photo.id);
            heartBtn.className = photo.favorite ? 'fas fa-heart' : 'far fa-heart';
        };
        
        // Show modal with animation
        photoModal.style.display = 'block';
        setTimeout(() => {
            photoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
        
        // When image loads, hide loading state
        modalImg.onload = () => {
            modalImg.style.opacity = '1';
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.visibility = 'hidden';
        };
        
        // If image fails to load, use our default placeholder
        modalImg.onerror = function() {
            this.src = defaultPlaceholderImage;
            this.alt = "";  // Ensure empty alt text
            modalImg.style.opacity = '1';
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.visibility = 'hidden';
        };
        
        // Update navigation button visibility
        updateNavigationButtons();
    }
    
    // Update navigation buttons visibility
    function updateNavigationButtons() {
        // Show/hide previous button
        if (currentPhotoIndex <= 0) {
            prevBtn.style.visibility = 'hidden';
        } else {
            prevBtn.style.visibility = 'visible';
        }
        
        // Show/hide next button
        if (currentPhotoIndex >= filteredPhotos.length - 1) {
            nextBtn.style.visibility = 'hidden';
        } else {
            nextBtn.style.visibility = 'visible';
        }
    }
    
    // Navigate to previous photo
    function prevPhoto() {
        if (currentPhotoIndex > 0) {
            currentPhotoIndex--;
            openPhotoModal(filteredPhotos[currentPhotoIndex]);
        }
    }
    
    // Navigate to next photo
    function nextPhoto() {
        if (currentPhotoIndex < filteredPhotos.length - 1) {
            currentPhotoIndex++;
            openPhotoModal(filteredPhotos[currentPhotoIndex]);
        }
    }
    
    // Close modals with animation
    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Load photos from local storage or use defaults
    function loadPhotos() {
        const savedPhotos = localStorage.getItem('veraGalleryPhotos');
        if (savedPhotos) {
            try {
                const parsed = JSON.parse(savedPhotos);
                
                // Make sure all photos have valid image paths
                parsed.forEach(photo => {
                    if (!photo.src || photo.src.indexOf('http') !== 0) {
                        photo.src = localImagePath;
                    }
                });
                
                return parsed;
            } catch (error) {
                console.error("Error parsing saved photos:", error);
                return getSamplePhotos();
            }
        }
        return getSamplePhotos();
    }
    
    // Save photos to local storage
    function savePhotos() {
        try {
            localStorage.setItem('veraGalleryPhotos', JSON.stringify(photos));
        } catch (error) {
            console.error("Error saving photos:", error);
            showToast('Failed to save photos locally', 'error');
        }
    }
    
    // Get sample photos for first time users
    function getSamplePhotos() {
        console.log('Creating sample photos with image path:', localImagePath);
        
        // Create a simpler data structure for the initial photos
        const samples = [];
        
        const titles = [
            "Beautiful Smile", "Sunset Dreams", "Coffee Date",
            "Birthday Celebration", "Spring Picnic", "Movie Night"
        ];
        
        const descriptions = [
            "A candid moment with that gorgeous smile that brightens up even the darkest days.",
            "Watching the sunset together at the beach. The colors in the sky matched the warmth in our hearts.",
            "Our weekend coffee ritual at the cute café around the corner. Your laughter is my favorite melody.",
            "Happy birthday to the most amazing person! The cake was sweet, but your smile was sweeter.",
            "Enjoying the spring flowers and sunshine. A perfect day with my favorite person.",
            "Cozy night in with popcorn and your favorite film. The way your eyes light up during your favorite scenes is magical."
        ];
        
        const dates = [
            "2023-08-15", "2023-07-22", "2023-06-10",
            "2023-05-05", "2023-04-18", "2023-03-27" 
        ];
        
        // For testing - use the SVG placeholder initially
        for (let i = 0; i < 6; i++) {
            samples.push({
                id: i + 1,
                title: titles[i],
                src: defaultPlaceholderImage, // Use placeholder initially for guaranteed display
                date: dates[i],
                description: descriptions[i],
                favorite: i % 2 === 0 // Mark even entries as favorites
            });
        }
        
        return samples;
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        // Set message and icon based on type
        toastMessage.textContent = message;
        
        if (type === 'success') {
            toastIcon.className = 'toast-icon fas fa-check-circle';
            toastIcon.style.color = '#4CAF50';
        } else if (type === 'error') {
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            toastIcon.style.color = '#F44336';
        } else {
            toastIcon.className = 'toast-icon fas fa-info-circle';
            toastIcon.style.color = '#2196F3';
        }
        
        // Show the toast
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Create floating hearts animation
    function createFloatingHearts() {
        const particlesContainer = document.querySelector('.particles-container');
        const colors = ['#ff8fa3', '#ffb3c1', '#ff5c8a', '#ff3d73'];
        
        // Create initial hearts
        for (let i = 0; i < 15; i++) {
            createHeart(particlesContainer, colors);
        }
        
        // Continue creating hearts at intervals
        setInterval(() => {
            createHeart(particlesContainer, colors);
        }, 2000);
    }
    
    // Create individual floating heart
    function createHeart(container, colors) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        
        // Random position, size, and color
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 8 + 10) + 's'; // 10-18s
        heart.style.opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
        heart.style.fontSize = Math.random() * 15 + 10 + 'px'; // 10-25px
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart && heart.parentNode === container) {
                container.removeChild(heart);
            }
        }, 18000); // slightly longer than longest animation
    }
    
    // Handle image upload preview
    photoInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.style.backgroundImage = `url('${e.target.result}')`;
                imagePreview.classList.add('has-image');
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // Close modals when clicking the close button
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.closest('#photo-modal')) {
                closeModal(photoModal);
            } else if (btn.closest('#upload-modal')) {
                closeModal(uploadModal);
            }
        });
    });
    
    // Close modals when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === photoModal || e.target.classList.contains('modal-background')) {
            closeModal(photoModal);
        }
        if (e.target === uploadModal || e.target.classList.contains('modal-background')) {
            closeModal(uploadModal);
        }
    });
    
    // Open upload modal when clicking the add photo button
    addPhotoBtn.addEventListener('click', () => {
        uploadModal.style.display = 'block';
        setTimeout(() => {
            uploadModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
    });
    
    // Handle photo upload form submission - use ONLY vera.jpg path
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        
        // Always use vera.jpg
        let photoUrl = localImagePath;
        
        // Add the new photo to our array
        const newPhoto = {
            id: Date.now(), // Simple way to generate a unique ID
            title: title,
            src: photoUrl,
            date: date || new Date().toISOString().split('T')[0],
            description: description,
            favorite: false
        };
        
        photos.unshift(newPhoto); // Add to the beginning of the array
        savePhotos();
        
        // Close the modal and render the updated gallery
        closeModal(uploadModal);
        uploadForm.reset();
        imagePreview.classList.remove('has-image');
        imagePreview.style.backgroundImage = '';
        
        renderPhotos();
        
        // Show a success message
        showToast('Your beautiful memory has been added!', 'success');
    });
    
    // Handle search input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(renderPhotos, 300);
    });
    
    // Handle filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderPhotos();
        });
    });
    
    // Handle keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (photoModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal(photoModal);
            } else if (e.key === 'ArrowLeft') {
                prevPhoto();
            } else if (e.key === 'ArrowRight') {
                nextPhoto();
            }
        } else if (uploadModal.style.display === 'block' && e.key === 'Escape') {
            closeModal(uploadModal);
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', prevPhoto);
    nextBtn.addEventListener('click', nextPhoto);
    
    // File drop zone
    const dropZone = document.querySelector('.file-upload-wrapper');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.style.borderColor = 'var(--accent-color)';
        dropZone.style.backgroundColor = 'rgba(255, 140, 163, 0.15)';
    }
    
    function unhighlight() {
        dropZone.style.borderColor = '';
        dropZone.style.backgroundColor = '';
    }
    
    // Handle file drop
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files && files.length) {
            photoInput.files = files;
            
            // Trigger change event manually
            const event = new Event('change');
            photoInput.dispatchEvent(event);
        }
    }
    
    // Share functionality
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const currentPhoto = filteredPhotos[currentPhotoIndex];
            
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: currentPhoto.title,
                        text: currentPhoto.description,
                        url: window.location.href
                    });
                    showToast('Shared successfully!', 'success');
                } catch (error) {
                    console.error('Error sharing:', error);
                    copyToClipboard(window.location.href);
                    showToast('Link copied to clipboard!', 'info');
                }
            } else {
                // Fallback to copy to clipboard
                copyToClipboard(window.location.href);
                showToast('Link copied to clipboard!', 'info');
            }
        });
    }
    
    // Download functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const currentPhoto = filteredPhotos[currentPhotoIndex];
            const link = document.createElement('a');
            
            // Use fetch to convert data URI to blob
            fetch(currentPhoto.src)
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    link.href = url;
                    link.download = `vera-pic-${currentPhoto.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    showToast('Download started', 'success');
                })
                .catch(error => {
                    console.error('Download error:', error);
                    showToast('Unable to download image', 'error');
                });
        });
    }
    
    // Copy to clipboard helper
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    
    // Use IntersectionObserver for lazy loading
    if ('IntersectionObserver' in window) {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    lazyLoadObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        // Apply to new cards when added to DOM
        const observeNewCards = () => {
            document.querySelectorAll('.photo-card').forEach(card => {
                lazyLoadObserver.observe(card);
            });
        };
        
        // Hook into our renderPhotos function
        const originalRenderPhotos = renderPhotos;
        renderPhotos = function() {
            originalRenderPhotos();
            setTimeout(observeNewCards, 650); // After render + delay
        };
    }
    
    // Performance optimization - debounce window resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Update layout if needed on resize
            updateNavigationButtons();
        }, 250);
    });
    
    // Preload next and previous images for smoother navigation
    function preloadAdjacentImages() {
        if (filteredPhotos.length > 0) {
            const preloadNext = (index) => {
                if (index < filteredPhotos.length) {
                    const img = new Image();
                    img.src = filteredPhotos[index].src;
                }
            };
            
            if (currentPhotoIndex > 0) {
                preloadNext(currentPhotoIndex - 1);
            }
            if (currentPhotoIndex < filteredPhotos.length - 1) {
                preloadNext(currentPhotoIndex + 1);
            }
        }
    }
    
    // Add swipe gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    function checkSwipeDirection() {
        if (touchEndX < touchStartX - 50) { // Swiped left
            nextPhoto();
        }
        if (touchEndX > touchStartX + 50) { // Swiped right
            prevPhoto();
        }
    }
    
    if (photoModal) {
        photoModal.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        photoModal.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            checkSwipeDirection();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize by clearing any outdated localStorage
    localStorage.removeItem('veraGalleryPhotos');
    
    // After your initialization is complete, try loading the real image
    const imageLoader = new Image();
    imageLoader.onload = function() {
        console.log('Successfully loaded vera.jpg');
        // Replace placeholder images with real image
        photos.forEach(photo => photo.src = localImagePath);
        renderPhotos();
    };
    imageLoader.onerror = function() {
        console.error('Failed to load vera.jpg - keeping placeholder images');
    };
    imageLoader.src = localImagePath;
    
    // Initialize the gallery - with explicit error handling
    try {
        console.log('Starting gallery initialization');
        renderPhotos();
        console.log('Gallery initialization complete');
    } catch (err) {
        console.error('Error initializing gallery:', err);
        // alert('Error initializing gallery: ' + err.message);
    }
});

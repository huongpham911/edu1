// Main JavaScript for SMA Negeri 1 Ketambe Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('SMA Negeri 1 Ketambe website loaded successfully!');
    
    // Initialize all functions
    initSmoothScrolling();
    initFormValidation();
    initAnimations();
    initNavbarScroll();
    initImageHandling();
    // initGallerySlideshow(); // Disabled - using gallery-fix.js instead
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation and submission
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            } else {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim...';
                    submitBtn.disabled = true;
                    
                    // Reset button after 3 seconds (in case of server delay)
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            }
        });
    });
}

// Form validation helper
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Clear previous error messages
    form.querySelectorAll('.invalid-feedback').forEach(error => {
        error.remove();
    });
    
    form.querySelectorAll('.is-invalid').forEach(field => {
        field.classList.remove('is-invalid');
    });
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Field ini wajib diisi');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Format email tidak valid');
            isValid = false;
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .stat-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Image handling and upload
function initImageHandling() {
    // Handle image upload if upload form exists
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleImageUpload);
    }
    
    // Handle broken images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/img/placeholder.jpg';
            this.alt = 'Image not available';
        });
        
        // Add loading placeholder
        if (!this.complete) {
            this.style.opacity = '0.5';
            this.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
}

// Handle image upload
function handleImageUpload(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const uploadBtn = this.querySelector('button[type="submit"]');
    const originalText = uploadBtn.innerHTML;
    
    // Show loading state
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Uploading...';
    uploadBtn.disabled = true;
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Image uploaded successfully!', 'success');
            this.reset();
        } else {
            showNotification('Upload failed: ' + data.error, 'error');
        }
    })
    .catch(error => {
        console.error('Upload error:', error);
        showNotification('Upload failed. Please try again.', 'error');
    })
    .finally(() => {
        uploadBtn.innerHTML = originalText;
        uploadBtn.disabled = false;
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Search functionality (if needed)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            performSearch(searchTerm);
        }, 300));
    }
}

function performSearch(term) {
    // Implementation depends on content structure
    console.log('Searching for:', term);
}

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            });
        }
    }
}

// Back to top functionality
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        opacity: 0.8;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
            setTimeout(() => backToTopBtn.style.opacity = '1', 10);
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => backToTopBtn.style.display = 'none', 300);
        }
    }, 100));
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
    initBackToTop();
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments if needed
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
}, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Initialize gallery slideshow
function initGallerySlideshow() {
    console.log('Initializing gallery slideshow...');
    const galleryCarousel = document.getElementById('schoolGalleryCarousel');
    if (!galleryCarousel) {
        console.log('Gallery carousel element not found');
        return;
    }
    
    console.log('Fetching images from /api/gallery...');
    // Fetch images from server
    fetch('/api/gallery')
        .then(response => {
            console.log('Gallery API response:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Gallery data received:', data);
            if (data.images && data.images.length > 0) {
                console.log(`Creating slideshow with ${data.images.length} images`);
                createGallerySlides(data.images);
            } else {
                console.log('No images found, showing no images message');
                showNoImagesMessage();
            }
        })
        .catch(error => {
            console.error('Error loading gallery images:', error);
            showNoImagesMessage();
        });
}

// Create gallery slides from image list
function createGallerySlides(images) {
    console.log('createGallerySlides called with:', images);
    const slidesContainer = document.getElementById('gallerySlides');
    const indicatorsContainer = document.getElementById('galleryIndicators');
    
    if (!slidesContainer || !indicatorsContainer) {
        console.log('Slides or indicators container not found');
        return;
    }
    
    // Clear existing content
    slidesContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Image descriptions (can be customized)
    const imageDescriptions = {
        'logo.jpg': 'Logo SMA Negeri 1 Ketambe',
        '516511116': 'Kegiatan Sekolah',
        '517406943': 'Pembelajaran di Kelas',
        '518069306': 'Aktivitas Siswa',
        '518199903': 'Kegiatan Ekstrakurikuler',
        '518287361': 'Fasilitas Sekolah',
        '520010985': 'Lingkungan Sekolah',
        '524209772': 'Upacara Bendera',
        '524429151': 'Kegiatan MPLS',
        '524590713': 'Makan Siang Bergizi',
        '533843692': 'Kebersamaan Siswa',
        '534989396': 'Pembelajaran Interaktif',
        '536269446': 'Kegiatan Sekolah',
        '536275644': 'Program Sekolah',
        '536288511': 'Prestasi Siswa'
    };
    
    images.forEach((imagePath, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = index === 0 ? 'carousel-item active' : 'carousel-item';
        
        const filename = imagePath.split('/').pop();
        const filenameWithoutExt = filename.split('.')[0];
        const description = imageDescriptions[filenameWithoutExt] || 
                          imageDescriptions[Object.keys(imageDescriptions).find(key => filenameWithoutExt.includes(key))] || 
                          'Kegiatan SMA Negeri 1 Ketambe';
        
        slide.innerHTML = `
            <div class="position-relative">
                <img src="${imagePath}" class="d-block w-100" alt="${description}" 
                     loading="${index < 3 ? 'eager' : 'lazy'}" 
                     onload="console.log('Image loaded:', '${imagePath}');"
                     onerror="console.log('Image failed to load:', '${imagePath}'); this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="d-none align-items-center justify-content-center" style="height: 350px; background: linear-gradient(135deg, #2563eb, #1e40af);">
                    <div class="text-center text-white">
                        <i class="fas fa-image fa-2x mb-2"></i>
                        <p>Gambar tidak dapat dimuat</p>
                    </div>
                </div>
                <div class="gallery-overlay">
                    <h5>${description}</h5>
                    <p>SMA Negeri 1 Ketambe</p>
                </div>
            </div>
        `;
        
        slidesContainer.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#schoolGalleryCarousel');
        indicator.setAttribute('data-bs-slide-to', index);
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        
        if (index === 0) {
            indicator.className = 'active';
            indicator.setAttribute('aria-current', 'true');
        }
        
        indicatorsContainer.appendChild(indicator);
    });
    
    // Initialize carousel with custom options
    setTimeout(() => {
        if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            const carouselElement = document.getElementById('schoolGalleryCarousel');
            if (carouselElement) {
                const carousel = new bootstrap.Carousel(carouselElement, {
                    interval: 5000,
                    wrap: true,
                    touch: true
                });
                console.log('Bootstrap carousel initialized successfully');
            }
        } else {
            console.error('Bootstrap not available for carousel initialization');
        }
    }, 100);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            carousel.prev();
        } else if (e.key === 'ArrowRight') {
            carousel.next();
        }
    });
    
    console.log(`Gallery slideshow initialized with ${images.length} images`);
}

// Show message when no images are available
function showNoImagesMessage() {
    const slidesContainer = document.getElementById('gallerySlides');
    const indicatorsContainer = document.getElementById('galleryIndicators');
    
    if (slidesContainer) {
        slidesContainer.innerHTML = `
            <div class="carousel-item active">
                <div class="d-flex align-items-center justify-content-center" style="height: 350px; background: linear-gradient(135deg, #f8fafc, #e2e8f0);">
                    <div class="text-center text-muted">
                        <i class="fas fa-images fa-2x mb-3"></i>
                        <h4>Tidak ada gambar</h4>
                        <p>Belum ada gambar yang tersedia di galeri</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
    }
}

// Lazy loading for gallery images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

// Export functions for external use if needed
window.schoolWebsite = {
    showNotification,
    printPage,
    shareContent,
    validateForm,
    initGallerySlideshow
};

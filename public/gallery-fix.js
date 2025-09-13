// Simple Gallery Fix - Manual image list
// This bypasses the API and uses a hardcoded list of images

function initSimpleGallery() {
    console.log('Initializing simple gallery...');
    
    // Manual list of images (update this when adding new images)
    const images = [
        '/img/516511116_122145640058771210_4298189710777537475_n.jpg',
        '/img/517406943_122142901556771210_3915854332728665203_n.jpg',
        '/img/518069306_122142913508771210_2613490789893639168_n.jpg',
        '/img/518199903_122142913502771210_6670914619667540790_n.jpg',
        '/img/518287361_122142913562771210_1699410403199920608_n.jpg',
        '/img/520010985_122142901628771210_746660456903415177_n.jpg',
        '/img/524209772_122145639926771210_361015631389345027_n.jpg',
        '/img/524429151_122145639920771210_1045875018790364335_n.jpg',
        '/img/524590713_122145640040771210_7877366091091993461_n.jpg',
        '/img/533843692_122149897274771210_911631607220238109_n.jpg',
        '/img/534989396_122149897040771210_8853680822634957745_n.jpg',
        '/img/536269446_122149897304771210_574828381212733202_n.jpg',
        '/img/536275644_122149897286771210_4867299291000736883_n.jpg',
        '/img/536288511_122149897322771210_1433332725880212362_n.jpg'
    ];
    
    const descriptions = {
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
    
    const slidesContainer = document.getElementById('gallerySlides');
    const indicatorsContainer = document.getElementById('galleryIndicators');
    
    if (!slidesContainer || !indicatorsContainer) {
        console.log('Gallery containers not found');
        return;
    }
    
    console.log(`Creating simple gallery with ${images.length} images`);
    
    // Clear existing content
    slidesContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Create slides
    images.forEach((imagePath, index) => {
        const filename = imagePath.split('/').pop();
        const filenameWithoutExt = filename.split('.')[0];
        const description = descriptions[filenameWithoutExt] || 
                          descriptions[Object.keys(descriptions).find(key => filenameWithoutExt.includes(key))] || 
                          'Kegiatan SMA Negeri 1 Ketambe';
        
        // Create slide
        const slide = document.createElement('div');
        slide.className = index === 0 ? 'carousel-item active' : 'carousel-item';
        slide.innerHTML = `
            <div class="position-relative">
                <img src="${imagePath}" class="d-block w-100" alt="${description}" 
                     style="height: 350px; object-fit: cover;"
                     onload="console.log('✅ Image loaded:', '${imagePath}');"
                     onerror="console.log('❌ Image failed:', '${imagePath}'); this.parentElement.innerHTML='<div class=\\"d-flex align-items-center justify-content-center\\" style=\\"height: 350px; background: #f8f9fa;\\"><div class=\\"text-center text-muted\\"><i class=\\"fas fa-image fa-2x mb-2\\"></i><p>Gambar tidak dapat dimuat</p></div></div>';">
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
    
    console.log('Simple gallery created successfully');
    
    // Initialize Bootstrap carousel
    setTimeout(() => {
        if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            const carouselElement = document.getElementById('schoolGalleryCarousel');
            if (carouselElement) {
                new bootstrap.Carousel(carouselElement, {
                    interval: 5000,
                    wrap: true
                });
                console.log('✅ Bootstrap carousel initialized');
            }
        }
    }, 500);
}

// Replace the existing gallery initialization
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSimpleGallery, 1000); // Wait for Bootstrap to load
});

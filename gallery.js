// Gallery data
const galleryImages = [
  {
    id: 1,
    src: "Maple1.jpg",
    alt: "Hostel Room Interior",
    category: "rooms"
  },
  {
    id: 2,
    src: "Maple3.jpg",
    alt: "Hostel Building Exterior",
    category: "rooms"
  },
  {
    id: 3,
    src: "Maple4.jpg",
    alt: "Common Study Area",
    category: "rooms"
  },
  {
    id: 4,
    src: "codeBuilding.jpg",
    alt: "Building",
    category: "building"
  },
  {
    id: 5,
    src: "Asepen1.jpg",
    alt: "Bathroom",
    category: "rooms"
  },
  {
    id: 6,
    src: "Asepen4.jpg",
    alt: "Recreation Area",
    category: "rooms"
  },
  {
    id: 7,
    src: "AspenImage.jpg",
    alt: "Kitchen Facilities",
    category: "building"
  },
  {
    id: 8,
    src: "AspenImage1.jpg",
    alt: "Security Entrance",
    category: "building"
  },
  {
    id: 9,
    src: "dinningImage.jpg",
    alt: "Security Entrance",
    category: "dining"
  },
  {
    id: 10,
    src: "Games1.jpg",
    alt: "Security Entrance",
    category: "indoorGames"
  },
  {
    id: 11,
    src: "Games3.jpg",
    alt: "Security Entrance",
    category: "indoorGames"
  },
  {
    id: 12,
    src: "Games4.jpg",
    alt: "Security Entrance",
    category: "indoorGames"
  },
  {
    id: 13,
    src: "e3.jpg",
    alt: "Security Entrance",
    category: "socialEvents"
  },
  {
    id: 14,
    src: "e4.jpg",
    alt: "Security Entrance",
    category: "socialEvents"
  },
  {
    id: 15,
    src: "e5.jpg",
    alt: "Security Entrance",
    category: "socialEvents"
  },
  {
    id: 16,
    src: "e6.jpg",
    alt: "Security Entrance",
    category: "socialEvents"
  },
  {
    id: 17,
    src: "e7.jpg",
    alt: "Security Entrance",
    category: "socialEvents"
  },
  {
    id: 18,
    src: "Asepen3.jpg",
    alt: "Security Entrance",
    category: "rooms"
  },
  {
    id: 19,
    src: "Asepen4.jpg",
    alt: "Security Entrance",
    category: "rooms"
  },
  {
    id: 20,
    src: "Asepen6.jpg",
    alt: "Security Entrance",
    category: "rooms"
  }
];

let selectedImageId = null;
let activeFilter = "all";
let filteredImages = [...galleryImages];

// Function to safely get DOM elements
function getDomElements() {
  return {
    galleryGrid: document.getElementById('galleryGrid'),
    filterButtons: document.querySelectorAll('.filter-button'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxClose: document.getElementById('lightboxClose'),
    lightboxPrev: document.getElementById('lightboxPrev'),
    lightboxNext: document.getElementById('lightboxNext'),
    galleryTitle: document.querySelector('.gallery-title'),
    galleryDescription: document.querySelector('.gallery-description'),
    filterContainer: document.querySelector('.filter-container'),
    gallerySection: document.getElementById('gallery')
  };
}

// DOM elements
let galleryGrid, filterButtons, lightbox, lightboxImage, lightboxClose, 
    lightboxPrev, lightboxNext, galleryTitle, galleryDescription, filterContainer, gallerySection;

// Initialize gallery
function initGallery() {
  if (!galleryGrid) {
    console.error('Gallery grid element not found');
    return;
  }
  
  // Initial filter (show all by default)
  filterGallery('all');
  setupEventListeners();
  setupIntersectionObserver();
}

// Render gallery items
function renderGalleryItems() {
  galleryGrid.innerHTML = '';
  
  filteredImages.forEach((image, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.transitionDelay = `${index * 0.075}s`;
    galleryItem.dataset.id = image.id;
    
    galleryItem.innerHTML = `
      <div class="gallery-item-inner">
        <img src="${image.src}" alt="${image.alt}">
        <div class="gallery-item-overlay">
          <div class="gallery-item-text">Click to expand</div>
        </div>
      </div>
    `;
    
    galleryGrid.appendChild(galleryItem);
  });
  
  // Add animation with a slight delay to allow DOM to update
  setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.classList.add('in-view');
    });
  }, 10);
}

// Filter gallery items
function filterGallery(filter) {
  activeFilter = filter;
  
  filterButtons.forEach(button => {
    if (button.dataset.filter === filter) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  filteredImages = filter === 'all' 
    ? [...galleryImages] 
    : galleryImages.filter(img => img.category === filter);
  
  renderGalleryItems();
  
  // Apply animation to newly rendered items
  setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.classList.add('in-view');
    });
  }, 10);
  
  // Reset selected image when filter changes
  selectedImageId = null;
}

// Open lightbox
function openLightbox(imageId) {
  selectedImageId = parseInt(imageId);
  const image = galleryImages.find(img => img.id === selectedImageId);
  
  if (image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
  selectedImageId = null;
}

// Navigate lightbox images
function navigateImage(direction) {
  if (selectedImageId === null || filteredImages.length === 0) return;
  
  const currentIndex = filteredImages.findIndex(img => img.id === selectedImageId);
  if (currentIndex === -1) return;
  
  let newIndex = currentIndex;
  
  if (direction === 'next') {
    newIndex = (currentIndex + 1) % filteredImages.length;
  } else {
    newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  }
  
  selectedImageId = filteredImages[newIndex].id;
  lightboxImage.src = filteredImages[newIndex].src;
  lightboxImage.alt = filteredImages[newIndex].alt;
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      filterGallery(button.dataset.filter);
    });
  });
  
  // Gallery item click
  galleryGrid.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
      openLightbox(galleryItem.dataset.id);
    }
  });
  
  // Lightbox controls
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateImage('prev'));
  lightboxNext.addEventListener('click', () => navigateImage('next'));
  
  // Close lightbox on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    }
  });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  if (!gallerySection) return;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      galleryTitle?.classList.add('in-view');
      galleryDescription?.classList.add('in-view');
      filterContainer?.classList.add('in-view');
      
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.add('in-view');
      });
    }
  }, { threshold: 0.1 });
  
  observer.observe(gallerySection);
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get all DOM elements
  const elements = getDomElements();
  
  // Assign to variables
  galleryGrid = elements.galleryGrid;
  filterButtons = elements.filterButtons;
  lightbox = elements.lightbox;
  lightboxImage = elements.lightboxImage;
  lightboxClose = elements.lightboxClose;
  lightboxPrev = elements.lightboxPrev;
  lightboxNext = elements.lightboxNext;
  galleryTitle = elements.galleryTitle;
  galleryDescription = elements.galleryDescription;
  filterContainer = elements.filterContainer;
  gallerySection = elements.gallerySection;
  
  // Initialize gallery
  initGallery();
});
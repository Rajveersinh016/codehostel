// Initialize slideshows when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all slideshow containers
    const slideshows = document.querySelectorAll('.slideshow');
    
    // Store intervals for each slideshow
    const slideshowIntervals = {};
    
    // Initialize each slideshow
    slideshows.forEach(slideshow => {
      // Get the room name from data attribute
      const room = slideshow.getAttribute('data-room');
      
      // Initialize the slideshow
      initializeSlideshow(slideshow, room);
    });
    
    // Function to set up slideshow functionality
    function initializeSlideshow(slideshow, room) {
      // Get all slides and dots for this slideshow
      const slides = slideshow.querySelectorAll('.slide');
      const dotsContainer = slideshow.querySelector('.slide-dots');
      let dots = slideshow.querySelectorAll('.dot');
      
      // If no dots are found, create them programmatically
      if (dots.length === 0 && slides.length > 0 && dotsContainer) {
        slides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.className = 'dot';
          dot.setAttribute('data-index', index);
          dotsContainer.appendChild(dot);
        });
        // Update dots collection after creation
        dots = slideshow.querySelectorAll('.dot');
      }
      
      let currentIndex = 0;
      
      // Make sure the first slide is active
      if (slides.length > 0) {
        // Find the currently active slide index (if any)
        let activeIndex = 0;
        slides.forEach((slide, index) => {
          if (slide.classList.contains('active')) {
            activeIndex = index;
          }
        });
        
        // Ensure the active slide and dot match
        showSlide(activeIndex);
      }
      
      // Add click event to dots
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          showSlide(index);
          
          // Reset the interval when manually changing slides
          if (slideshowIntervals[room]) {
            clearInterval(slideshowIntervals[room]);
            slideshowIntervals[room] = setInterval(nextSlide, 5000);
          }
        });
      });
      
      // Function to display a specific slide
      function showSlide(index) {
        // Validate index range
        if (index < 0 || index >= slides.length) {
          return;
        }
        
        // Hide all slides and deactivate all dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected slide and activate corresponding dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
      }
      
      // Function to advance to next slide
      function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
          nextIndex = 0;
        }
        showSlide(nextIndex);
      }
      
      // Add keyboard navigation for accessibility
      slideshow.setAttribute('tabindex', '0');
      slideshow.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          let prevIndex = currentIndex - 1;
          if (prevIndex < 0) {
            prevIndex = slides.length - 1;
          }
          showSlide(prevIndex);
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      });
      
      // Set automatic slideshow interval
      if (slides.length > 1) {
        slideshowIntervals[room] = setInterval(nextSlide, 2000);
        
        // Pause slideshow when mouse hovers over it
        slideshow.addEventListener('mouseenter', function() {
          clearInterval(slideshowIntervals[room]);
        });
        
        // Resume slideshow when mouse leaves
        slideshow.addEventListener('mouseleave', function() {
          slideshowIntervals[room] = setInterval(nextSlide, 2000);
        });
      }
    }
  });
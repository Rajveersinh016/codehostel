// Testimonial data
const testimonials = [
    {
      id: 1,
      name: "Feba Saji",
      course: "",
      image: "feddbackIcon.png",
      quote: "Excellent Stay at code Hostel I had a wonderful experience staying at [Code Hostel ]. The facilities are well-maintained, and the atmosphere is warm and welcoming. The rooms are spacious, clean, and comfortable, providing a perfect environment for study and relaxation. A special mention to the manager who is not only incredibly supportive and approachable but also ensures that all residents feel safe and comfortable. Her prompt attention to any concerns and the friendly nature of the hostel staff really adds to the homely feel. The food here is absolutely amazing! There’s a great variety of meals that are nutritious and delicious, catering to different tastes. The dining area is always kept clean, and the meals are served on time, making it easy to maintain a good routine. Overall, I highly recommend this hostel for anyone looking for a secure, comfortable, and nurturing environment during their stay.",
      rating: 5
    },
    {
      id: 2,
      name: "Bittu Kumar",
      course: "",
      image: "feddbackIcon.png",
      quote: "Maple House is an ideal choice for students looking for a comfortable and budget-friendly stay! The hostel provides a perfect balance of study-friendly environments and a lively social atmosphere. The rooms are well-maintained, with comfortable beds and ample storage space, making it feel like a home away from home. Highly recommend for students who looking for budget friendly hostel❤️",
      rating: 5
    },
    {
      id: 3,
      name: "Anushka Jain",
      course: "",
      image: "feddbackIcon.png",
      quote: "I am currently staying at maple house. Everything about the hostel exceeded my expectations, especially the cleanliness, staff, and amenities. The hostel is impeccably clean, from the rooms to the common areas. It is evident that the staff took great care in maintaining the space.The staff is incredibly friendly and accommodating. They are always available to help and made me feel welcome throughout my stay. I highly recommend it to anyone looking for a clean, comfortable, and well-managed place to stay.",
      rating: 5
    },
    {
      id: 4,
      name: "Meenakshi Sharma",
      course: "",
      image: "feddbackIcon.png",
      quote: "I'm currently staying at this hostel, and I have to say, the staff really went above and beyond. I asked if they could provide a table fan due to the heat, and within no time, they had one set up in my room. It made a huge difference and really improved my comfort during my stay. The staff has been super responsive and attentive, which has made the whole experience even better. It's those little touches that show they truly care about their guests. Highly recommend this place for its great service and welcoming atmosphere!",
      rating: 5
    }
  ];
  
  // Initialize variables and elements when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Animation elements
    const elementsToAnimate = [
      document.querySelector('.testimonials-title'),
      document.querySelector('.testimonials-description'),
      document.querySelector('.testimonials-carousel-container'),
      document.querySelector('.testimonials-footer')
    ];
    
    // State
    let activeIndex = 0;
    
    // Create star HTML based on rating
    function createStarsHTML(rating) {
      let starsHTML = '';
      for (let i = 0; i < 5; i++) {
        const isFilled = i < rating;
        starsHTML += `
          <svg class="star ${isFilled ? 'star-filled' : 'star-empty'}" 
               xmlns="http://www.w3.org/2000/svg" 
               width="20" height="20" 
               viewBox="0 0 24 24" 
               fill="${isFilled ? 'currentColor' : 'none'}" 
               stroke="currentColor" 
               stroke-width="2" 
               stroke-linecap="round" 
               stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        `;
      }
      return starsHTML;
    }
    
    // Render testimonial slides
    function renderTestimonials() {
      carouselTrack.innerHTML = '';
      
      testimonials.forEach(testimonial => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        slide.innerHTML = `
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="testimonial-image">
                <img src="${testimonial.image}" alt="${testimonial.name}">
              </div>
              <div class="testimonial-body">
                <div class="testimonial-stars">
                  ${createStarsHTML(testimonial.rating)}
                </div>
                <blockquote class="testimonial-quote">
                  "${testimonial.quote}"
                </blockquote>
                <div class="testimonial-name">${testimonial.name}</div>
                <div class="testimonial-course">${testimonial.course}</div>
              </div>
            </div>
          </div>
        `;
        
        carouselTrack.appendChild(slide);
      });
    }
    
    // Render navigation dots
    function renderDots() {
      carouselDots.innerHTML = '';
      
      testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === activeIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.dataset.index = index;
        
        carouselDots.appendChild(dot);
      });
    }
    
    // Update carousel position and active dot
    function updateCarousel() {
      if (!carouselTrack) return;
      
      carouselTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
      
      // Update dots
      const dots = carouselDots.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }
    
    // Navigation functions
    function goToSlide(index) {
      activeIndex = index;
      updateCarousel();
    }
    
    function nextSlide() {
      activeIndex = (activeIndex + 1) % testimonials.length;
      updateCarousel();
    }
    
    function prevSlide() {
      activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
      updateCarousel();
    }
    
    // Set up event listeners
    function setupListeners() {
      // Button navigation
      if (nextBtn) nextBtn.addEventListener('click', nextSlide);
      if (prevBtn) prevBtn.addEventListener('click', prevSlide);
      
      // Dots navigation
      carouselDots.addEventListener('click', (e) => {
        const dot = e.target.closest('.carousel-dot');
        if (dot) {
          goToSlide(parseInt(dot.dataset.index));
        }
      });
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      });
    }
    
    // Add animation with Intersection Observer
    function setupAnimations() {
      const testimonialsSection = document.getElementById('testimonials');
      if (!testimonialsSection) return;
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          elementsToAnimate.forEach(element => {
            if (element) element.classList.add('in-view');
          });
        }
      }, { threshold: 0.1 });
      
      observer.observe(testimonialsSection);
    }
    
    // Initialize everything
    function init() {
      if (!carouselTrack || !carouselDots) return;
      
      renderTestimonials();
      renderDots();
      updateCarousel();
      setupListeners();
      setupAnimations();
    }
    
    // Start the carousel
    init();
  });
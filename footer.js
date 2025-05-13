 // Set current year in copyright
 document.getElementById('current-year').textContent = new Date().getFullYear();
        
 // Scroll to top button functionality
 const scrollTopButton = document.getElementById('scroll-top-btn');
 
 scrollTopButton.addEventListener('click', function() {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });
 
 // Show/hide scroll button based on scroll position
 window.addEventListener('scroll', function() {
     if (window.pageYOffset > 300) {
         scrollTopButton.style.display = 'block';
     } else {
         scrollTopButton.style.display = 'none';
     }
 });
 
 // Initially hide the button
 scrollTopButton.style.display = 'none';
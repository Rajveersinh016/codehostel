// IntersectionObserver polyfill for older browsers
document.addEventListener('DOMContentLoaded', function() {
  // Detect when the section is in view
  const sectionRef = document.getElementById('contact');
  const animatedElements = {
    title: document.querySelector('#contact h2'),
    subtitle: document.querySelector('#contact p.text-lg'),
    leftColumn: document.querySelector('#contact .lg\\:col-span-1'),
    rightColumn: document.querySelector('#contact .lg\\:col-span-2')
  };
  
  // Handle form submission
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error') || createErrorElement();
  
  // Create error element if it doesn't exist
  function createErrorElement() {
    const errorElement = document.createElement('div');
    errorElement.id = 'form-error';
    errorElement.className = 'hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4';
    errorElement.innerHTML = '<p>There was an error submitting your message. Please try again.</p>';
    contactForm.parentNode.insertBefore(errorElement, formSuccess);
    return errorElement;
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      subject: document.getElementById('contact-subject').value,
      message: document.getElementById('contact-message').value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    
    // Try direct write with modified security settings
    const db = firebase.firestore();
    
    // Alternative approach using a different collection with public write access
    db.collection('public-messages').add(formData)
      .then(function() {
        // Show success message
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        formError.classList.add('hidden');
        
        // Reset form after 5 seconds
        setTimeout(function() {
          formSuccess.classList.add('hidden');
          contactForm.classList.remove('hidden');
          contactForm.reset();
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }, 5000);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        // Show error message
        formError.classList.remove('hidden');
        formSuccess.classList.add('hidden');
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Hide error after 5 seconds
        setTimeout(function() {
          formError.classList.add('hidden');
        }, 5000);
      });
  });
  
  // Setup intersection observer for animations
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      // Add classes to animate elements
      animatedElements.title.classList.remove('opacity-0', 'translate-y-10');
      animatedElements.subtitle.classList.remove('opacity-0', 'translate-y-10');
      animatedElements.leftColumn.classList.remove('opacity-0', '-translate-x-10');
      animatedElements.rightColumn.classList.remove('opacity-0', 'translate-x-10');
      
      // Stop observing after animation is triggered
      observer.unobserve(sectionRef);
    }
  }, observerOptions);
  
  // Start observing
  observer.observe(sectionRef);
});
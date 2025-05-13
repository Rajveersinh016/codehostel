// Room options
const roomOptions = [
  { id: "2B-standard-maple", name: "2 Boys", location: "Maple House" },
  { id: "3B-standard-maple", name: "3 Boys", location: "Maple House" },
  { id: "4B-standard-maple", name: "4 Boys", location: "Maple House" },
  { id: "2G-standard-maple", name: "2 Girls", location: "Maple House" },
  { id: "3G-standard-maple", name: "3 Girls", location: "Maple House" },
  { id: "4G-standard-maple", name: "4 Girls", location: "Maple House" },
  { id: "1B-premium-aspen", name: "1 Boy", location: "Aspen House" },
  { id: "2B-premium-aspen", name: "2 Boys", location: "Aspen House" },
  { id: "3B-premium-aspen", name: "3 Boys", location: "Aspen House" },
  { id: "4B-premium-aspen", name: "4 Boys", location: "Aspen House" },
];

// Store form data separately without affecting page scope
const bookingFormState = {
  formData: {
    name: '',
    email: '',
    phone: '',
    gender: '',
    roomType: '',
    moveInDate: '',
    duration: '',
    message: ''
  },
  isSubmitted: false,
  lastBookingRef: ''
};

// SVG icons
const bookingIcons = {
  user: `<svg class="lucide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M20 19v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6z"/></svg>`,
  mail: `<svg class="lucide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg class="lucide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  home: `<svg class="lucide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  calendar: `<svg class="lucide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>`
};

/**
 * Renders either the booking form or success message
 */
function renderBookingForm() {
  const bookingFormContainer = document.getElementById('bookingFormContainer');
  if (!bookingFormContainer) return;
  
  if (bookingFormState.isSubmitted) {
    renderSuccessMessage(bookingFormContainer);
  } else {
    renderForm(bookingFormContainer);
  }
}

/**
 * Renders the booking form
 * @param {HTMLElement} container - The container element for the form
 */
function renderForm(container) {
  const formData = bookingFormState.formData;
  
  container.innerHTML = `
<form id="bookingForm">
  <!-- Web3Forms Required Hidden Inputs -->
 <input type="hidden" name="access_key" value="6b13ea92-8ae5-4b13-91c0-78520b71f365" />
  <input type="hidden" name="from_name" value="Room Booking Form" />
  <input type="hidden" name="replyto" value="codehostelsinfo@gmail.com" />

  <div class="form-grid">
    <div class="form-group">
      <label for="name" class="form-label">Full Name*</label>
      <div class="form-control-icon">
        <div class="icon">${bookingIcons.user}</div>
        <input
          type="text"
          id="name"
          name="name"
          class="form-control"
          placeholder="Your full name"
          required
          value="${formData.name}"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="email" class="form-label">Email Address*</label>
      <div class="form-control-icon">
        <div class="icon">${bookingIcons.mail}</div>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          placeholder="Your email address"
          required
          value="${formData.email}"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="phone" class="form-label">Phone Number*</label>
      <div class="form-control-icon">
        <div class="icon">${bookingIcons.phone}</div>
        <input
          type="tel"
          id="phone"
          name="phone"
          class="form-control"
          placeholder="Your phone number"
          required
          value="${formData.phone}"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="gender" class="form-label">Gender*</label>
      <select
        id="gender"
        name="gender"
        class="form-control"
        required
      >
        <option value="" ${formData.gender === '' ? 'selected' : ''}>Select Gender</option>
        <option value="male" ${formData.gender === 'male' ? 'selected' : ''}>Male</option>
        <option value="female" ${formData.gender === 'female' ? 'selected' : ''}>Female</option>
      </select>
    </div>

    <div class="form-group">
      <label for="roomType" class="form-label">Room Type*</label>
      <div class="form-control-icon">
        <div class="icon">${bookingIcons.home}</div>
        <select
          id="roomType"
          name="roomType"
          class="form-control"
          required
        >
          <option value="" ${formData.roomType === '' ? 'selected' : ''}>Select Room Type</option>
          ${roomOptions.map(room => `
            <option value="${room.id}" ${formData.roomType === room.id ? 'selected' : ''}>
              ${room.name} - ${room.location}
            </option>
          `).join('')}
        </select>
      </div>
    </div>

    <div class="form-group">
      <label for="duration" class="form-label">Duration of Stay*</label>
      <select
        id="duration"
        name="duration"
        class="form-control"
        required
      >
        <option value="" ${formData.duration === '' ? 'selected' : ''}>Select Duration</option>
        <option value="6 Months" ${formData.duration === '6 Months' ? 'selected' : ''}>6 Months</option>
        <option value="1 Year" ${formData.duration === '1 Year' ? 'selected' : ''}>1 Year</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="message" class="form-label">Additional Requirements (Optional)</label>
    <textarea
      id="message"
      name="message"
      class="form-control"
      rows="4"
      placeholder="Any special requests or information you'd like us to know..."
    >${formData.message}</textarea>
  </div>

  <div class="form-group">
    <div class="terms-checkbox-container">
      <input
        type="checkbox"
        id="terms"
        name="terms"
        required
      />
      <label for="terms" class="terms-label">
        I agree to the <a href="#">Terms and Conditions</a>*
      </label>
    </div>
  </div>

  <div>
    <button
      type="submit"
      class="btn"
    >
      Submit Booking Request
    </button>
    <p class="form-hint">
      You'll be contacted shortly after submission to confirm your booking
    </p>
  </div>
</form>
  `;


  // Web3form

document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  // Add required Web3Forms hidden fields
  formData.append("access_key", "6b13ea92-8ae5-4b13-91c0-78520b71f365");

  // Optionally add a reply-to field if email is present
  const email = form.querySelector('input[name="email"]')?.value;
  if (email) {
    formData.append("replyto", email);
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert("Booking request sent successfully!");
      form.reset();
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    alert("Submission failed. Please try again.");
    console.error("Web3Forms error:", error);
  }
});


  // Add event listeners
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
    
    // Add change listeners to form elements
    form.querySelectorAll('input, select, textarea').forEach(element => {
      if (element.name) {
        element.addEventListener('change', handleFormChange);
      }
    });
  }
}

/**
 * Renders the success message
 * @param {HTMLElement} container - The container element for the message
 */
function renderSuccessMessage(container) {
  container.innerHTML = `
    <div class="success-message">
      <div class="success-icon">
        ${bookingIcons.check}
      </div>
      <h3 class="success-title">Booking Request Sent!</h3>
      <p class="success-text">
        Thank you for your booking request. Your booking reference number is: 
        <strong>${bookingFormState.lastBookingRef}</strong>. We'll contact you shortly to confirm your reservation.
      </p>
      <button class="btn" id="newBookingButton">Make Another Booking</button>
      <p class="success-note">
        Your booking information has been saved to our database.
      </p>
    </div>
  `;
  
  // Add event listener for the new booking button
  const newBookingButton = document.getElementById('newBookingButton');
  if (newBookingButton) {
    newBookingButton.addEventListener('click', function() {
      // Reset form data
      Object.keys(bookingFormState.formData).forEach(key => {
        bookingFormState.formData[key] = '';
      });
      
      // Show the form again
      bookingFormState.isSubmitted = false;
      renderBookingForm();
    });
  }
}

/**
 * Handles form input changes
 * @param {Event} event - The change event
 */
function handleFormChange(event) {
  const { name, value } = event.target;
  if (name && bookingFormState.formData.hasOwnProperty(name)) {
    bookingFormState.formData[name] = value;
  }
}

/**
 * Handles form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form data from elements
  const form = event.target;
  if (!form) return;
  
  // Update form data from all named elements
  Array.from(form.elements).forEach(element => {
    if (element.name && bookingFormState.formData.hasOwnProperty(element.name)) {
      bookingFormState.formData[element.name] = element.value;
    }
  });
  
  // We'll let the Firebase code handle the submission now
  // The Firebase event handler is attached in setupFirebase()
}

/**
 * Sets up animation when booking section becomes visible
 * This function only affects the booking section elements
 */
function setupBookingSectionAnimation() {
  const bookingSection = document.getElementById('booking');
  if (!bookingSection) return;
  
  // Only get elements within the booking section
  const sectionTitle = bookingSection.querySelector('.section-title');
  const sectionDescription = bookingSection.querySelector('.section-description');
  const bookingCard = bookingSection.querySelector('.booking-card');
  
  // Skip if any element is missing
  if (!sectionTitle || !sectionDescription || !bookingCard) return;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      sectionTitle.classList.add('in-view');
      sectionDescription.classList.add('in-view');
      bookingCard.classList.add('in-view');
    }
  }, { threshold: 0.1 });
  
  observer.observe(bookingSection);
}

// Initialize booking form when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize booking form if the container exists
  const bookingFormContainer = document.getElementById('bookingFormContainer');
  if (bookingFormContainer) {
    renderBookingForm();
  }
  
  // Only setup animations if booking section exists
  setupBookingSectionAnimation();
  
  // Initialize Firebase
  setupFirebase();
});

// Firebase integration
function setupFirebase() {
  console.log("Setting up Firebase...");
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDQ6CqLq7uqSm15CnFKuaVYJQzp1AU91MM",
    authDomain: "maplehouse-97100.firebaseapp.com",
    projectId: "maplehouse-97100",
    storageBucket: "maplehouse-97100.firebasestorage.app",
    messagingSenderId: "919705503218",
    appId: "1:919705503218:web:aa1fb90bc2fa09052b976b",
    measurementId: "G-Z0HRMC8CP0"
  };

  try {
    // Initialize Firebase
    console.log("Initializing Firebase...");
    firebase.initializeApp(firebaseConfig);
    
    // Initialize Analytics if available
    if (firebase.analytics) {
      const analytics = firebase.analytics();
      console.log("Firebase Analytics initialized");
    }
    
    // Initialize Firestore
    const db = firebase.firestore();
    console.log("Firebase Firestore initialized successfully");
    
    // Set up form elements
    const form = document.getElementById('bookingForm');
    if (!form) {
      console.error("Form with ID 'bookingForm' not found");
      return;
    }
    
    // Generate unique booking reference
    function generateBookingReference() {
      const timestamp = new Date().getTime().toString().slice(-6);
      const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
      return `BK-${randomChars}${timestamp}`;
    }
    
    // Show loading state
    function setLoading(isLoading) {
      const submitButton = form.querySelector('button[type="submit"]');
      if (!submitButton) return;
      
      if (isLoading) {
        submitButton.innerHTML = `<span class="spinner"></span> Processing...`;
        submitButton.disabled = true;
      } else {
        submitButton.innerHTML = `Submit Booking Request`;
        submitButton.disabled = false;
      }
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log("Form submitted, processing...");
      setLoading(true);
      
      // Get current timestamp and generate reference
      const timestamp = new Date().toISOString();
      const bookingRef = generateBookingReference();
      
      // Get form data
      try {
        const formData = {
          name: form.name ? form.name.value : "",
          email: form.email ? form.email.value : "",
          phone: form.phone ? form.phone.value : "",
          gender: form.gender ? form.gender.value : "",
          roomType: form.roomType ? form.roomType.value : "",
          duration: form.duration ? form.duration.value : "",
          message: form.message && form.message.value ? form.message.value : "No additional requirements",
          timestamp: timestamp,
          status : "pending",
          bookingRef: bookingRef
        };
        
        // Log the data we're sending
        console.log("Sending booking data:", formData);
        
        // Add the booking to Firestore
        db.collection("bookings").add(formData)
          .then(function(docRef) {
            console.log("Booking saved successfully with ID: ", docRef.id);
            
            // Store the booking reference
            bookingFormState.lastBookingRef = bookingRef;
            
            // Show success message
            bookingFormState.isSubmitted = true;
            renderBookingForm();
          })
          .catch(function(error) {
            console.error("Error adding booking: ", error);
            alert(`Error saving your booking: ${error.message}. Please try again or contact support.`);
          })
          .finally(function() {
            setLoading(false);
          });
          
      } catch (error) {
        console.error("Error collecting form data:", error);
        alert("There was an error processing your form. Please try again.");
        setLoading(false);
      }
    });
    
  } catch (error) {
    console.error("Fatal error during initialization:", error);
    alert("Could not initialize the booking system. Please refresh the page or contact support.");
  }
}



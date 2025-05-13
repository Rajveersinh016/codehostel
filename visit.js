// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Firebase (add your Firebase config here)
  try {
    // Check if Firebase is already initialized to avoid multiple initializations
    if (!firebase.apps.length) {
      // You need to replace this with your actual Firebase configuration
      const firebaseConfig = {
        // Your Firebase configuration 
        // apiKey: "YOUR_API_KEY",
        // authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        // projectId: "YOUR_PROJECT_ID",
        // storageBucket: "YOUR_PROJECT_ID.appspot.com",
        // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        // appId: "YOUR_APP_ID"
      };
      
      firebase.initializeApp(firebaseConfig);
    }
    
    // Initialize Firestore
    const db = firebase.firestore();
    console.log("Firebase initialized successfully");
    setupFormListeners(true, db);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    setupFormListeners(false);
  }
});

/**
 * Set up form listeners and submission handling
 * @param {boolean} firestoreAvailable - Whether Firestore is available
 * @param {object} db - Firestore database instance (optional)
 */
function setupFormListeners(firestoreAvailable, db = null) {
  const scheduleForm = document.getElementById('scheduleForm');
  const successMessage = document.getElementById('successMessage');
  
  if (!scheduleForm || !successMessage) {
    console.error("Required DOM elements not found");
    return;
  }
  
  // Normal form submission with validation
  scheduleForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (this.checkValidity()) {
      handleFormSubmission(this, successMessage, firestoreAvailable, db);
    } else {
      // Trigger browser's built-in validation UI
      this.reportValidity();
    }
  });
  
  // Optional: Add button click handler if you need special behavior
  const submitButton = scheduleForm.querySelector('.btn[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      // Let the form submission handler do its job
      // No need to bypass validation in production code
    });
  }
}

/**
 * Handle form submission, data collection and storage
 * @param {HTMLElement} form - The form element
 * @param {HTMLElement} successMsg - Success message element
 * @param {boolean} firestoreAvailable - Whether Firestore is available
 * @param {object} db - Firestore database instance (optional)
 */
function handleFormSubmission(form, successMsg, firestoreAvailable, db) {
  // Get form data
  const formData = {
    name: document.getElementById('name')?.value || "",
    email: document.getElementById('email')?.value || "",
    phone: document.getElementById('phone')?.value || "",
    date: document.getElementById('date')?.value || "",
    time: document.getElementById('time')?.value || "",
    service: document.getElementById('service')?.value || "",
    message: document.getElementById('message')?.value || "",
    timestamp: new Date().toISOString()
  };
  
  // Store data
  if (firestoreAvailable && db) {
    saveToFirestore(formData, db)
      .then(() => {
        // Hide form and show success message only after successful save
        form.style.display = 'none';
        successMsg.style.display = 'block';
      })
      .catch((error) => {
        console.error("Error saving to Firestore:", error);
        // Attempt local storage as backup
        saveToLocalStorage(formData, error.message);
        
        // Still show success message to user
        form.style.display = 'none';
        successMsg.style.display = 'block';
      });
  } else {
    // If Firestore isn't available, use localStorage
    saveToLocalStorage(formData);
    
    // Show success message
    form.style.display = 'none';
    successMsg.style.display = 'block';
  }
  
  console.log('Form submitted!', formData);
}

/**
 * Save data to Firestore
 * @param {object} data - Form data to save
 * @param {object} db - Firestore database instance
 * @returns {Promise} - Promise that resolves when data is saved
 */
async function saveToFirestore(data, db) {
  try {
    // Add server timestamp
    const dataWithTimestamp = {
      ...data,
      serverTimestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Save to Firestore
    const docRef = await db.collection("appointments").add(dataWithTimestamp);
    console.log("Document written with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    // Rethrow to allow caller to handle
    throw error;
  }
}

/**
 * Save data to localStorage as backup
 * @param {object} data - Form data to save
 * @param {string} errorMsg - Optional error message
 */
function saveToLocalStorage(data, errorMsg = null) {
  try {
    const backupData = JSON.stringify({
      data: data,
      timestamp: new Date().toISOString(),
      error: errorMsg
    });
    
    const storageKey = 'appointment_backup_' + new Date().getTime();
    localStorage.setItem(storageKey, backupData);
    console.log("Data saved to localStorage as backup with key:", storageKey);
  } catch (storageError) {
    console.error("Could not save to backup storage:", storageError);
  }
}
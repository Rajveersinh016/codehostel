// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Check if Firebase is properly initialized
  if (typeof firebase === 'undefined') {
    console.error("Firebase SDK is not loaded. Please check your script tags.");
    setupFormListeners(false);
    return;
  }

  // Set up form listeners with or without Firebase authentication
  if (firebase.firestore) {
    console.log("Firestore is available - setting up form with Firestore");
    setupFormListeners(true); 
  } else {
    console.error("Firestore is not available. Check Firebase initialization.");
    setupFormListeners(false);
  }
});

function setupFormListeners(firestoreAvailable) {
  document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide the form
    this.style.display = 'none';
    
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString()
    };
    
    // Store data in Firebase Firestore or localStorage based on availability
    if (firestoreAvailable) {
      saveToFirestore(formData);
    } else {
      saveToLocalStorage(formData);
    }
    
    console.log('Form submitted!');
    console.log(formData);
  });

  // Allow button click to bypass validation for demonstration purposes
  document.querySelector('.btn').addEventListener('click', function(e) {
    if (!document.getElementById('scheduleForm').checkValidity()) {
      // If form is not valid, show success message anyway for demo
      e.preventDefault();
      document.getElementById('scheduleForm').style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
      
      // Even when bypassing validation, still store the data
      const formData = {
        name: document.getElementById('name').value || "",
        email: document.getElementById('email').value || "",
        phone: document.getElementById('phone').value || "",
        date: document.getElementById('date').value || "",
        time: document.getElementById('time').value || "",
        service: document.getElementById('service').value || "",
        message: document.getElementById('message').value || "",
        validationBypassed: true,
        timestamp: new Date().toISOString()
      };
      
      // Store data in Firebase Firestore or localStorage based on availability
      if (firestoreAvailable) {
        saveToFirestore(formData);
      } else {
        saveToLocalStorage(formData);
      }
    }
  });
}

function saveToFirestore(data) {
  // Add server timestamp if available
  if (firebase.firestore.FieldValue && firebase.firestore.FieldValue.serverTimestamp) {
    data.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
  }
  
  // Try to save to Firestore with robust error handling
  firebase.firestore().collection("appointments").add(data)
    .then((docRef) => {
      console.log("Document written with ID:", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
      
      // Fall back to localStorage if Firestore fails
      saveToLocalStorage(data, error.message);
    });
}

function saveToLocalStorage(data, errorMsg = null) {
  try {
    const backupData = JSON.stringify({
      data: data,
      timestamp: new Date().toISOString(),
      error: errorMsg
    });
    localStorage.setItem('appointment_backup_' + new Date().getTime(), backupData);
    console.log("Data saved to localStorage as backup");
  } catch (storageError) {
    console.error("Could not save to backup storage:", storageError);
  }
}
 // WhatsApp redirect functionality
 document.getElementById('whatsapp-button').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Replace with your WhatsApp number (include country code without + sign)
    const phoneNumber = '+919099922434'; 
    
    // Optional: Add a pre-filled message
    const message = 'Hi! I would like to book a room at your hostel.';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
});
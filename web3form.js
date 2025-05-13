
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        form.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    });
  });

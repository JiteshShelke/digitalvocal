
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('quoteSuccessMsg');
    const statusDiv = document.getElementById('contactFormStatus');
    const sendBtn = document.getElementById('sendMessageButton');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sendBtn.disabled = true;
      sendBtn.textContent = "Sending...";

      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          successMsg.style.display = 'block';
          statusDiv.innerHTML = '';
        } else {
          return response.json().then(data => {
            if (data.errors) {
              statusDiv.innerHTML = data.errors.map(error =>
                `<div class="alert alert-danger">${error.message}</div>`
              ).join('');
            } else {
              statusDiv.innerHTML = `<div class="alert alert-danger">Oops! Something went wrong.</div>`;
            }
          });
        }
      }).catch(() => {
        statusDiv.innerHTML = `<div class="alert alert-danger">Network error. Please try again.</div>`;
      }).finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Message";
      });
    });
  });



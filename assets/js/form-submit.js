// <!-- Contact Form AJAX Script -->

document.addEventListener("DOMContentLoaded", function () {
  function handleFormSubmit(formId, successMsgId) {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successMsgId);
    if (!form || !successMsg) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.disabled = true;

      fetch("https://formsubmit.co/ajax/jitesh.trueview@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(res => {
          if (res.ok) {
            successMsg.style.display = "block";
            form.reset();
            setTimeout(() => successMsg.style.display = "none", 3000);
          } else {
            alert("❌ Something went wrong. Please try again.");
          }
        })
        .catch(() => {
          alert("⚠️ Network error. Please check your internet connection.");
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }

  handleFormSubmit("contactForm", "quoteSuccessMsg");
});


// contact form with dropdown list 

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("quoteSuccessMsg");
  const statusMsg = document.getElementById("contactFormStatus");
  const submitBtn = document.getElementById("sendMessageButton");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate required fields
    const service = form.querySelector("select[name='service']");
    if (!service.value) {
      alert("Please select a service before submitting.");
      service.focus();
      return;
    }

    const formData = new FormData(form);
    submitBtn.disabled = true;

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          form.reset();
          service.value = ""; // Reset dropdown manually
          successMsg.style.display = "block";
          statusMsg.innerHTML = "";

          setTimeout(() => {
            successMsg.style.display = "none";
          }, 3000);
        } else {
          return response.json().then(data => {
            throw new Error(data.message || "Form submission failed.");
          });
        }
      })
      .catch(error => {
        statusMsg.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
});
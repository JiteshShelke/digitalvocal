document.addEventListener("DOMContentLoaded", function () {
  // Utility: Handles AJAX form submission for one form
  function setupAjaxForm(formId, successMsgId, statusMsgId, submitBtnId) {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successMsgId);
    const statusMsg = document.getElementById(statusMsgId);
    const submitBtn = document.getElementById(submitBtnId);

    if (!form || !successMsg || !statusMsg || !submitBtn) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Validate required dropdown manually
      const serviceSelect = form.querySelector("select[name='service']");
      if (!serviceSelect || !serviceSelect.value) {
        alert("Please select a service before submitting.");
        serviceSelect?.focus();
        return;
      }

      // Disable submit button to avoid duplicates
      submitBtn.disabled = true;
      statusMsg.innerHTML = ""; // Clear previous status

      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method || "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          // Reset the dropdown selection manually since resetting form sometimes keeps select value
          if (serviceSelect) serviceSelect.value = "";

          successMsg.style.display = "block";
          // Hide success after 3 seconds
          setTimeout(() => successMsg.style.display = "none", 3000);
        } else {
          return response.json().then(data => {
            throw new Error(data.message || "Form submission failed.");
          });
        }
      }).catch(error => {
        statusMsg.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
      }).finally(() => {
        submitBtn.disabled = false;
      });
    });
  }

  // IMPORTANT: Call the function for each form on your page with their respective IDs
  // Assuming both forms have IDs and success/status/submission button IDs unique for each

  // Example for first form:
  setupAjaxForm("contactForm1", "quoteSuccessMsg1", "contactFormStatus1", "sendMessageButton1");

  // Example for second form:
  setupAjaxForm("contactForm2", "quoteSuccessMsg2", "contactFormStatus2", "sendMessageButton2");
});

// === COOKIE HELPER FUNCTIONS ===
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// === COOKIE POPUP AND LOGGING ===
window.onload = function () {
  const consent = getCookie("cookie_consent");

  if (!consent) {
    document.getElementById("cookie-popup").style.display = "block";
  } else if (consent === "accepted") {
    logPageVisit(); // Log visit after consent
  }
};

function acceptCookies() {
  setCookie("cookie_consent", "accepted", 365);
  document.getElementById("cookie-popup").style.display = "none";
  sendConsentToServer("accepted");
  logPageVisit(); // Log first visit immediately
}

function rejectCookies() {
  setCookie("cookie_consent", "rejected", 365);
  document.getElementById("cookie-popup").style.display = "none";
  sendConsentToServer("rejected");
}

function sendConsentToServer(choice) {
  fetch("forms/save_consent.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "consent=" + choice + "&page=" + encodeURIComponent(window.location.pathname)
  });
}

function logPageVisit() {
  fetch("forms/log_visit.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "page=" + encodeURIComponent(window.location.pathname)
  });
}

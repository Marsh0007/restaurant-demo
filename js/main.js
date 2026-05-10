document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupFakeFormSubmission();
});

function setupSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

function setupFakeFormSubmission() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      showToast("Thank you! Your message has been received.");

      form.reset();
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("customToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "customToast";
    toast.className = "custom-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
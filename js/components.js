async function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const response = await fetch(filePath);
    const data = await response.text();
    element.innerHTML = data;

    if (elementId === "navbar") {
      highlightActiveLink();
      setupNavbarScroll();
      setupMobileNavbarClose();
    }
  } catch (error) {
    console.error(`Error loading component ${filePath}:`, error);
  }
}

function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active-link");
    }
  });
}

function setupNavbarScroll() {
  const navbar = document.querySelector(".custom-navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);
}

function setupMobileNavbarClose() {
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (!navbarCollapse) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse)
          || new bootstrap.Collapse(navbarCollapse, { toggle: false });

        bsCollapse.hide();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("navbar", "components/navbar.html");
  await loadComponent("footer", "components/footer.html");
});
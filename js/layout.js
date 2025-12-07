async function loadHeader() {
  const headerContainer = document.createElement("div");
  document.body.prepend(headerContainer);

  const res = await fetch("components/header.html");
  const html = await res.text();
  headerContainer.innerHTML = html;

  // Maintenant que le header est là, on peut initialiser
  initializeAuthUI();
  initializeThemeToggle();
  highlightActiveLink();
}

loadHeader();

function initializeAuthUI() {
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.querySelector('a[href="login.html"]');
  const adminLink = document.getElementById("adminLink");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (logoutBtn) {
      logoutBtn.classList.remove("hidden");
      logoutBtn.addEventListener("click", logout);
    }

    if (loginLink && loginLink.parentElement) {
      loginLink.parentElement.classList.add("hidden");
    }

    // Show admin link only for admin role
    if (adminLink) {
      if (role !== "admin") {
        adminLink.parentElement.style.display = "none";
      }
    }

  } else {
    if (logoutBtn) {
      logoutBtn.classList.add("hidden");
    }

    // Hide admin link for not logged users
    if (adminLink) {
      adminLink.parentElement.style.display = "none";
    }
  }
}

function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop(); // e.g. "visual.html"

  document.querySelectorAll(".nav-links a").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active-link");
    }
  });
}

function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  // Appliquer le thème sauvegardé
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

async function loadHeader() {
  const headerContainer = document.createElement("div");
  document.body.prepend(headerContainer);

  const res = await fetch("components/header.html");
  const html = await res.text();
  headerContainer.innerHTML = html;

  // Maintenant que le header est là, on peut initialiser
  initializeAuthUI();
  initializeThemeToggle();
}

loadHeader();

function initializeAuthUI() {
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.querySelector('a[href="login.html"]');

  const token = localStorage.getItem("token");

  if (token) {
    if (logoutBtn) {
      logoutBtn.classList.remove("hidden");
      logoutBtn.addEventListener("click", logout);
    }

    if (loginLink && loginLink.parentElement) {
      loginLink.parentElement.classList.add("hidden");
    }

  } else {
    if (logoutBtn) {
      logoutBtn.classList.add("hidden");
    }
  }
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

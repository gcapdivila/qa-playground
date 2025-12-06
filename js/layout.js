async function loadHeader() {
  const headerContainer = document.createElement("div");
  document.body.prepend(headerContainer);

  const res = await fetch("components/header.html");
  const html = await res.text();
  headerContainer.innerHTML = html;

  initializeAuthUI();
}

loadHeader();


function initializeAuthUI() {
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.querySelector('a[href="login.html"]');

  const token = localStorage.getItem("token");

  if (token) {
    // Logged in
    logoutBtn.classList.remove("hidden");
    logoutBtn.addEventListener("click", logout);

    if (loginLink) loginLink.parentElement.classList.add("hidden");

  } else {
    // Not logged in
    logoutBtn.classList.add("hidden");
  }
}

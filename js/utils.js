function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "login.html?redirect=protected";
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

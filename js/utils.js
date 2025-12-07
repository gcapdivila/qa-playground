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

function requireRole(...allowedRoles) {
  const role = localStorage.getItem("role");
  console.log(role);

  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  if (!allowedRoles.includes(role)) {
    window.location.href = "403.html";
  }
}

function currentUser() {
  return {
    username: localStorage.getItem("user"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token")
  };
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

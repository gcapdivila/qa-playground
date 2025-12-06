const urlParams = new URLSearchParams(window.location.search);
const redirected = urlParams.get("redirect");

if (redirected) {
  const error = document.getElementById("error");
  error.textContent = "Please login to access this page.";
  error.classList.remove("hidden");
}

document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  errorBox.classList.add("hidden");
  errorBox.textContent = "";

  if (!username || !password) {
    errorBox.textContent = "Please enter both username and password.";
    errorBox.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Store token for future protected routes
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "actions.html";
    } else {
      errorBox.textContent = data.error || "Login failed.";
      errorBox.classList.remove("hidden");
    }

  } catch (err) {
    errorBox.textContent = "Network error. Please try again.";
    errorBox.classList.remove("hidden");
  }
});

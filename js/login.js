document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = await apiCall("login", "POST", { username, password });

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "actions.html";
  } else {
    document.getElementById("error").textContent = data.error;
    document.getElementById("error").classList.remove("hidden");
  }
});

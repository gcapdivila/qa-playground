const output = document.getElementById("output");

// Utility to display error messages
function showError(message) {
  output.textContent = message;
  output.classList.remove("hidden");
}

// Utility to display success messages
function showSuccess(message) {
  output.textContent = message;
  output.classList.remove("hidden");
  output.style.color = "green";
}


// -----------------------------------------
// Button 1: Trigger JS runtime error
// -----------------------------------------
document.getElementById("throwError").addEventListener("click", () => {
  try {
    // Deliberate undefined reference → runtime error
    nonexistentFunctionCall();
  } catch (err) {
    showError("A JavaScript error occurred: " + err.message);
  }
});


// -----------------------------------------
// Button 2: Call failing API
// -----------------------------------------
document.getElementById("badRequest").addEventListener("click", async () => {
  output.textContent = "Calling failing API...";
  output.classList.remove("hidden");

  try {
    const res = await fetch("/api/fail");
    const data = await res.json();

    if (!res.ok) {
      showError("API Error: " + data.error);
      return;
    }

    showSuccess("Unexpected success.");

  } catch (err) {
    showError("Network error: " + err.message);
  }
});


// -----------------------------------------
// Button 3: Call slow API (3 sec delay)
// -----------------------------------------
document.getElementById("timeoutRequest").addEventListener("click", async () => {
  output.textContent = "Waiting for slow API (3s)...";
  output.classList.remove("hidden");

  try {
    const res = await fetch("/api/slow");
    const data = await res.json();

    showSuccess("Success: " + data.message);

  } catch (err) {
    showError("Network error: " + err.message);
  }
});

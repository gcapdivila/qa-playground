// ======================================================
// Utility functions
// ======================================================

function showError(element, message) {
  element.textContent = message;
  element.classList.remove("hidden");
  element.style.color = "var(--danger)";
}

function showMessage(element, message) {
  element.textContent = message;
  element.classList.remove("hidden");
  element.style.color = "var(--text)";
}


// ======================================================
// 1. JavaScript Errors
// ======================================================

// Elements
const jsErrorOutput = document.getElementById("jsErrorOutput");

// Throw runtime JS error
document.getElementById("throwJsError").addEventListener("click", () => {
  try {
    nonExistingFunction(); // intentional error
  } catch (err) {
    showError(jsErrorOutput, "JavaScript error: " + err.message);
  }
});

// Call undefined function
document.getElementById("undefinedFunction").addEventListener("click", () => {
  try {
    window.thisFunctionDoesNotExist();
  } catch (err) {
    showError(jsErrorOutput, "Undefined function: " + err.message);
  }
});


// ======================================================
// 2. API Error Simulation
// ======================================================

// Elements
const apiErrorOutput = document.getElementById("apiErrorOutput");

// Fake API endpoints simulation
async function mockFetch(url) {
  return new Promise((resolve, reject) => {
    if (url === "/api/500") {
      return setTimeout(() => {
        resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ error: "Internal Server Error" })
        });
      }, 500);
    }

    if (url === "/api/timeout") {
      return setTimeout(() => reject(new Error("Connection timeout")), 3000);
    }

    if (url === "/api/bad-json") {
      return setTimeout(() => {
        resolve({
          ok: true,
          json: () => { throw new Error("Invalid JSON") }
        });
      }, 600);
    }
  });
}

// Simulate 500 error
document.getElementById("api500").addEventListener("click", async () => {
  showMessage(apiErrorOutput, "Calling API (expecting 500 error)...");

  try {
    const res = await mockFetch("/api/500");
    const data = await res.json();

    if (!res.ok) {
      showError(apiErrorOutput, `API 500 Error: ${data.error}`);
      return;
    }

  } catch (err) {
    showError(apiErrorOutput, "Unexpected network error: " + err.message);
  }
});

// Simulate timeout
document.getElementById("apiTimeout").addEventListener("click", async () => {
  showMessage(apiErrorOutput, "Waiting for slow API...");

  try {
    await mockFetch("/api/timeout");
    showMessage(apiErrorOutput, "Unexpected success.");
  } catch (err) {
    showError(apiErrorOutput, "API timeout: " + err.message);
  }
});

// Simulate invalid JSON
document.getElementById("apiInvalidJson").addEventListener("click", async () => {
  showMessage(apiErrorOutput, "Calling API returning invalid JSON...");

  try {
    const res = await mockFetch("/api/bad-json");
    const data = await res.json();
    showMessage(apiErrorOutput, "Unexpected success: " + data);
  } catch (err) {
    showError(apiErrorOutput, "Invalid JSON: " + err.message);
  }
});


// ======================================================
// 3. Slow UI Response
// ======================================================

const slowOutput = document.getElementById("slowUiOutput");

document.getElementById("slowUi").addEventListener("click", () => {
  showMessage(slowOutput, "Processing…");

  setTimeout(() => {
    showMessage(slowOutput, "UI update completed after delay.");
  }, 2500);
});

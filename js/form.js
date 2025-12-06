const formContainer = document.getElementById("formContainer");

// Data storage during the steps
let formData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: ""
};

let currentStep = 1;

// ----------------------
// Step definitions
// ----------------------
function getStepContent(step) {
  switch (step) {
    case 1:
      return `
        <div class="form-step" role="form" aria-labelledby="step1-title">
          <h2 id="step1-title">Step 1: Personal Information</h2>

          <label for="firstName">First Name *</label>
          <input id="firstName" aria-required="true" />

          <label for="lastName">Last Name *</label>
          <input id="lastName" aria-required="true" />

          <div id="errorStep1" class="error hidden" aria-live="assertive"></div>

          <div class="form-nav">
            <span></span>
            <button id="nextBtn">Next</button>
          </div>
        </div>
      `;

    case 2:
      return `
        <div class="form-step" role="form" aria-labelledby="step2-title">
          <h2 id="step2-title">Step 2: Contact Information</h2>

          <label for="email">Email *</label>
          <input id="email" aria-required="true" />

          <label for="phone">Phone (optional)</label>
          <input id="phone" />

          <div id="errorStep2" class="error hidden" aria-live="assertive"></div>

          <div class="form-nav">
            <button id="prevBtn">Previous</button>
            <button id="nextBtn">Next</button>
          </div>
        </div>
      `;

    case 3:
      return `
        <div class="form-step" role="form" aria-labelledby="step3-title">
          <h2 id="step3-title">Step 3: Address</h2>

          <label for="country">Country *</label>
          <select id="country" aria-required="true">
            <option value="">Select country</option>
            <option value="Belgium">Belgium</option>
            <option value="France">France</option>
            <option value="UK">United Kingdom</option>
          </select>

          <label for="city">City *</label>
          <input id="city" aria-required="true" />

          <div id="errorStep3" class="error hidden" aria-live="assertive"></div>

          <div class="form-nav">
            <button id="prevBtn">Previous</button>
            <button id="nextBtn">Submit</button>
          </div>
        </div>
      `;

    case 4:
      return `
        <div class="form-step" role="region" aria-labelledby="summary-title">
          <h2 id="summary-title">Summary</h2>

          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || "N/A"}</p>
          <p><strong>Country:</strong> ${formData.country}</p>
          <p><strong>City:</strong> ${formData.city}</p>

          <button id="restartBtn">Start Over</button>
        </div>
      `;
  }
}

// ----------------------
// Rendering logic
// ----------------------
function renderStep() {
  formContainer.innerHTML = getStepContent(currentStep);
  attachEvents();
}

renderStep();

// ----------------------
// Navigation + validation
// ----------------------
function attachEvents() {
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const restartBtn = document.getElementById("restartBtn");

  if (nextBtn) nextBtn.addEventListener("click", handleNext);
  if (prevBtn) prevBtn.addEventListener("click", handlePrevious);
  if (restartBtn) restartBtn.addEventListener("click", () => {
    currentStep = 1;
    formData = {};
    renderStep();
  });
}

function handleNext() {
  if (!validateStep(currentStep)) return;

  if (currentStep < 4) {
    currentStep++;
    renderStep();
  }
}

function handlePrevious() {
  if (currentStep > 1) {
    currentStep--;
    renderStep();
  }
}

// ----------------------
// Step validation
// ----------------------
function validateStep(step) {
  switch (step) {
    case 1:
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const error1 = document.getElementById("errorStep1");

      if (!firstName || !lastName) {
        error1.textContent = "First name and last name are required.";
        error1.classList.remove("hidden");
        return false;
      }

      formData.firstName = firstName;
      formData.lastName = lastName;
      return true;

    case 2:
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const error2 = document.getElementById("errorStep2");

      if (!email || !email.includes("@")) {
        error2.textContent = "Please enter a valid email.";
        error2.classList.remove("hidden");
        return false;
      }

      formData.email = email;
      formData.phone = phone;
      return true;

    case 3:
      const country = document.getElementById("country").value;
      const city = document.getElementById("city").value.trim();
      const error3 = document.getElementById("errorStep3");

      if (!country || !city) {
        error3.textContent = "Country and city are required.";
        error3.classList.remove("hidden");
        return false;
      }

      formData.country = country;
      formData.city = city;
      return true;
  }

  return true;
}

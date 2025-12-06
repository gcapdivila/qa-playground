// Modal behaviour
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.focus(); // For accessibility
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Loader behaviour
const loader = document.getElementById("loader");
const showLoaderBtn = document.getElementById("showLoader");

showLoaderBtn.addEventListener("click", async () => {
  loader.classList.remove("hidden");

  // Simulate a 2-second delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  loader.classList.add("hidden");
});

// Random message behaviour
const randomMessageBtn = document.getElementById("randomMessage");
const messageOutput = document.getElementById("messageOutput");

const messages = [
  "Hello tester 👋",
  "Automation is awesome!",
  "Keep going 🚀",
  "This is a random message",
  "QA rules!"
];

randomMessageBtn.addEventListener("click", () => {
  const random = messages[Math.floor(Math.random() * messages.length)];
  messageOutput.textContent = random;
});

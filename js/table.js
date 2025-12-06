const loadBtn = document.getElementById("loadUsers");
const table = document.getElementById("userTable");
const tableBody = document.getElementById("tableBody");
const tableError = document.getElementById("tableError");

loadBtn.addEventListener("click", async () => {
  table.classList.add("hidden");
  tableError.classList.add("hidden");
  tableError.textContent = "";
  tableBody.innerHTML = "";

  try {
    const res = await fetch("/api/users");
    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    data.forEach(user => {
      const row = document.createElement("tr");
      row.setAttribute("role", "row");

      row.innerHTML = `
        <td role="cell">${user.id}</td>
        <td role="cell">${user.name}</td>
        <td role="cell">${user.role}</td>
      `;

      tableBody.appendChild(row);
    });

    table.classList.remove("hidden");

  } catch (err) {
    tableError.textContent = "Failed to load user data.";
    tableError.classList.remove("hidden");
  }
});

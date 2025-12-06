// ===============================
// DATA
// ===============================

const INITIAL_USERS = [
  { id: 1, name: "Anna Smith", role: "Admin" },
  { id: 2, name: "John Doe", role: "User" },
  { id: 3, name: "Maria Lopez", role: "Guest" },
  { id: 4, name: "David Johnson", role: "User" },
  { id: 5, name: "Sophie Turner", role: "Admin" },
  { id: 6, name: "Liam Brown", role: "User" },
  { id: 7, name: "Emma Wilson", role: "Guest" },
  { id: 8, name: "Noah Miller", role: "User" },
  { id: 9, name: "Olivia Davis", role: "Admin" },
  { id: 10, name: "James Clark", role: "User" },
  { id: 11, name: "Ava Lewis", role: "Guest" },
  { id: 12, name: "William Hall", role: "User" }
];

let users = [...INITIAL_USERS];

let filters = {
  name: "",
  role: ""
};

let sortState = {
  field: null, // "id" | "name" | "role"
  direction: null // "asc" | "desc" | null
};

let pageSize = 5;
let currentPage = 1;
let editingId = null;

// ===============================
// DOM ELEMENTS
// ===============================

const tableBody = document.getElementById("tableBody");
const pageInfo = document.getElementById("pageInfo");
const filterNameInput = document.getElementById("filterName");
const filterRoleSelect = document.getElementById("filterRole");
const pageSizeSelect = document.getElementById("pageSize");
const resetFiltersBtn = document.getElementById("resetFilters");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const tableError = document.getElementById("tableError");

const addNameInput = document.getElementById("addName");
const addRoleSelect = document.getElementById("addRole");
const addUserBtn = document.getElementById("addUserBtn");

// ===============================
// HELPERS
// ===============================

function setError(message) {
  if (!tableError) return;
  if (!message) {
    tableError.textContent = "";
    tableError.classList.add("hidden");
    return;
  }
  tableError.textContent = message;
  tableError.classList.remove("hidden");
}

function applyFilters(data) {
  let result = [...data];

  if (filters.name) {
    const term = filters.name.toLowerCase();
    result = result.filter(u => u.name.toLowerCase().includes(term));
  }

  if (filters.role) {
    result = result.filter(u => u.role === filters.role);
  }

  return result;
}

function applySort(data) {
  const { field, direction } = sortState;
  if (!field || !direction) return data;

  const sorted = [...data].sort((a, b) => {
    let v1 = a[field];
    let v2 = b[field];

    if (typeof v1 === "string") v1 = v1.toLowerCase();
    if (typeof v2 === "string") v2 = v2.toLowerCase();

    if (v1 < v2) return direction === "asc" ? -1 : 1;
    if (v1 > v2) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
}

function getProcessedData() {
  let data = applyFilters(users);
  data = applySort(data);
  return data;
}

function getNextId() {
  return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

// toggle sort: null -> asc -> desc -> null
function toggleSort(field) {
  if (sortState.field !== field) {
    sortState.field = field;
    sortState.direction = "asc";
  } else {
    if (sortState.direction === "asc") sortState.direction = "desc";
    else if (sortState.direction === "desc") {
      sortState.field = null;
      sortState.direction = null;
    } else {
      sortState.direction = "asc";
    }
  }
}

// ===============================
// RENDER
// ===============================

function renderTable() {
  const data = getProcessedData();

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * pageSize;
  const pageSlice = data.slice(startIndex, startIndex + pageSize);

  tableBody.innerHTML = "";

  if (!pageSlice.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No users match the current filters.";
    cell.style.opacity = "0.8";
    row.appendChild(cell);
    tableBody.appendChild(row);
  } else {
    pageSlice.forEach(user => {
      const row = document.createElement("tr");
      row.dataset.id = user.id;

      if (editingId === user.id) {
        row.classList.add("editable-row");

        // ID (non éditable)
        const idCell = document.createElement("td");
        idCell.textContent = user.id;
        row.appendChild(idCell);

        // Name (input)
        const nameCell = document.createElement("td");
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = user.name;
        nameInput.name = "editName";
        nameCell.appendChild(nameInput);
        row.appendChild(nameCell);

        // Role (select)
        const roleCell = document.createElement("td");
        const roleSelect = document.createElement("select");
        roleSelect.name = "editRole";
        ["Admin", "User", "Guest"].forEach(role => {
          const opt = document.createElement("option");
          opt.value = role;
          opt.textContent = role;
          if (role === user.role) opt.selected = true;
          roleSelect.appendChild(opt);
        });
        roleCell.appendChild(roleSelect);
        row.appendChild(roleCell);

        // Actions (Save / Cancel)
        const actionsCell = document.createElement("td");
        actionsCell.classList.add("edit-actions");

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.className = "primary-btn";
        saveBtn.dataset.action = "save";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.className = "secondary-btn";
        cancelBtn.dataset.action = "cancel";

        actionsCell.appendChild(saveBtn);
        actionsCell.appendChild(cancelBtn);
        row.appendChild(actionsCell);

      } else {
        // ID
        const idCell = document.createElement("td");
        idCell.textContent = user.id;
        row.appendChild(idCell);

        // Name
        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        // Role
        const roleCell = document.createElement("td");
        roleCell.textContent = user.role;
        row.appendChild(roleCell);

        // Actions
        const actionsCell = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "secondary-btn";
        editBtn.dataset.action = "edit";
        actionsCell.appendChild(editBtn);
        row.appendChild(actionsCell);
      }

      tableBody.appendChild(row);
    });
  }

  pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${totalItems} item${totalItems !== 1 ? "s" : ""})`;

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
}

// ===============================
// EVENTS
// ===============================

// Filters
filterNameInput.addEventListener("input", () => {
  filters.name = filterNameInput.value.trim();
  currentPage = 1;
  renderTable();
});

filterRoleSelect.addEventListener("change", () => {
  filters.role = filterRoleSelect.value;
  currentPage = 1;
  renderTable();
});

resetFiltersBtn.addEventListener("click", () => {
  filters.name = "";
  filters.role = "";
  filterNameInput.value = "";
  filterRoleSelect.value = "";
  pageSizeSelect.value = "5";
  pageSize = 5;
  currentPage = 1;
  setError("");
  renderTable();
});

// Page size
pageSizeSelect.addEventListener("change", () => {
  pageSize = parseInt(pageSizeSelect.value, 10) || 5;
  currentPage = 1;
  renderTable();
});

// Pagination
prevPageBtn.addEventListener("click", () => {
  currentPage--;
  renderTable();
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  renderTable();
});

// Sorting
document.querySelectorAll("th[data-sort]").forEach(th => {
  th.style.cursor = "pointer";
  th.addEventListener("click", () => {
    const field = th.getAttribute("data-sort");
    toggleSort(field);
    currentPage = 1;
    renderTable();
  });
});

// Add user
addUserBtn.addEventListener("click", () => {
  const name = addNameInput.value.trim();
  const role = addRoleSelect.value;

  if (!name) {
    setError("Name is required to add a user.");
    return;
  }

  setError("");
  const newUser = {
    id: getNextId(),
    name,
    role
  };

  users.push(newUser);

  addNameInput.value = "";
  addRoleSelect.value = "User";

  currentPage = Math.ceil(getProcessedData().length / pageSize);
  renderTable();
});

// Inline edit (delegation on tbody)
tableBody.addEventListener("click", (event) => {
  const btn = event.target;
  if (!(btn instanceof HTMLElement)) return;

  const action = btn.dataset.action;
  if (!action) return;

  const row = btn.closest("tr");
  if (!row) return;
  const id = parseInt(row.dataset.id, 10);

  if (action === "edit") {
    editingId = id;
    setError("");
    renderTable();
  }

  if (action === "cancel") {
    editingId = null;
    renderTable();
  }

  if (action === "save") {
    const nameInput = row.querySelector('input[name="editName"]');
    const roleSelect = row.querySelector('select[name="editRole"]');

    const newName = nameInput.value.trim();
    const newRole = roleSelect.value;

    if (!newName) {
      setError("Name cannot be empty.");
      return;
    }

    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx] = {
        ...users[idx],
        name: newName,
        role: newRole
      };
    }

    editingId = null;
    setError("");
    renderTable();
  }
});

// ===============================
// INIT
// ===============================
renderTable();

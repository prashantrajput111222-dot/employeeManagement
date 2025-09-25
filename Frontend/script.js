const API_URL = "http://localhost:8080/employees"; // backend URL
let employees = [];
let editIndex = -1;

const form = document.getElementById('employeeForm');
const cardsContainer = document.getElementById('employeeCards');
const cancelBtn = document.getElementById('cancelEdit');

// Load employees from backend
async function loadEmployees() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        employees = data;
        renderCards();
    } catch(err) {
        console.error("Error fetching employees:", err);
    }
}

// Render cards
function renderCards() {
    cardsContainer.innerHTML = '';
    employees.forEach((emp, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${emp.imageUrl || 'https://via.placeholder.com/80'}" alt="Employee Image">
            <h3>${emp.name}</h3>
            <p>Email: ${emp.email}</p>
            <p>Job: ${emp.jobTitle}</p>
            <p>Phone: ${emp.phone}</p>
            <button class="action-btn edit-btn" onclick="editEmployee(${index})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteEmployee(${index})">Delete</button>
        `;
        cardsContainer.appendChild(card);
    });
}

// Form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('employeeId').value || undefined;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const phone = document.getElementById('phone').value;
    const imageUrl = document.getElementById('imageUrl').value;

    const employeeData = { id, name, email, jobTitle, phone, imageUrl };

    try {
        if(editIndex === -1){
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData)
            });
            const newEmployee = await res.json();
            employees.push(newEmployee);
        } else {
            const empId = employees[editIndex].id;
            const res = await fetch(`${API_URL}/${empId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData)
            });
            const updated = await res.json();
            employees[editIndex] = updated;
            editIndex = -1;
            cancelBtn.style.display = 'none';
        }
        form.reset();
        renderCards();
    } catch(err){
        console.error("Error saving employee:", err);
    }
});

// Cancel edit
cancelBtn.addEventListener('click', () => {
    form.reset();
    editIndex = -1;
    cancelBtn.style.display = 'none';
});

// Edit
function editEmployee(index){
    const emp = employees[index];
    document.getElementById('employeeId').value = emp.id;
    document.getElementById('name').value = emp.name;
    document.getElementById('email').value = emp.email;
    document.getElementById('jobTitle').value = emp.jobTitle;
    document.getElementById('phone').value = emp.phone;
    document.getElementById('imageUrl').value = emp.imageUrl;
    editIndex = index;
    cancelBtn.style.display = 'inline';
}

// Delete
async function deleteEmployee(index){
    if(confirm('Are you sure?')){
        const empId = employees[index].id;
        try {
            await fetch(`${API_URL}/${empId}`, { method: "DELETE" });
            employees.splice(index,1);
            renderCards();
        } catch(err){
            console.error("Error deleting employee:", err);
        }
    }
}

// Initial load
loadEmployees();

// Get elements
const form = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const regnoInput = document.getElementById('regno');
const deptInput = document.getElementById('dept');
const yearInput = document.getElementById('year');
const marksInput = document.getElementById('marks');
const editIndexInput = document.getElementById('edit-index');
const cancelEditBtn = document.getElementById('cancel-edit');
const tableBody = document.querySelector('#student-table tbody');
const searchInput = document.getElementById('search');

let students = JSON.parse(localStorage.getItem('students')) || [];

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function renderTable(filter = '') {
    tableBody.innerHTML = '';
    let filtered = students.filter(student => {
        const search = filter.toLowerCase();
        return (
            student.name.toLowerCase().includes(search) ||
            student.regno.toLowerCase().includes(search)
        );
    });
    filtered.forEach((student, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.regno}</td>
            <td>${student.dept}</td>
            <td>${student.year}</td>
            <td>${student.marks}</td>
            <td>
                <button class="actions-btn edit" onclick="editStudent(${idx})">Edit</button>
                <button class="actions-btn delete" onclick="deleteStudent(${idx})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

window.editStudent = function(idx) {
    const student = students[idx];
    nameInput.value = student.name;
    regnoInput.value = student.regno;
    deptInput.value = student.dept;
    yearInput.value = student.year;
    marksInput.value = student.marks;
    editIndexInput.value = idx;
    form.querySelector('button[type="submit"]').textContent = 'Update Student';
    cancelEditBtn.style.display = '';
};

window.deleteStudent = function(idx) {
    if (confirm('Delete this student?')) {
        students.splice(idx, 1);
        saveStudents();
        renderTable(searchInput.value);
    }
};

form.onsubmit = function(e) {
    e.preventDefault();
    const student = {
        name: nameInput.value.trim(),
        regno: regnoInput.value.trim(),
        dept: deptInput.value.trim(),
        year: yearInput.value,
        marks: marksInput.value
    };
    const idx = editIndexInput.value;
    if (idx === '') {
        students.push(student);
    } else {
        students[idx] = student;
    }
    saveStudents();
    renderTable(searchInput.value);
    form.reset();
    editIndexInput.value = '';
    form.querySelector('button[type="submit"]').textContent = 'Add Student';
    cancelEditBtn.style.display = 'none';
};

cancelEditBtn.onclick = function() {
    form.reset();
    editIndexInput.value = '';
    form.querySelector('button[type="submit"]').textContent = 'Add Student';
    cancelEditBtn.style.display = 'none';
};

searchInput.oninput = function() {
    renderTable(searchInput.value);
};

// Initial render
renderTable(); 
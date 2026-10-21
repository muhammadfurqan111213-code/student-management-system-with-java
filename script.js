
  // Array of objects
  let students = [
    { id: 1, name: "Ali", age: 20, course: "BS Computer Science" },
    { id: 2, name: "Ayesha", age: 21, course: "Web Development" }
  ];

  let editingId = null;
  const addBtn = document.getElementById('addBtn');
  const container = document.getElementById('studentsContainer');

  // 1. DISPLAY - using forEach and DOM manipulation
  function displayStudents() {
    container.innerHTML = "";
    students.forEach((student) => {
      const card = document.createElement('div');
      card.className = 'student-card';
      card.innerHTML = `
        <h3>${student.name}</h3>
        <p><b>Age:</b> ${student.age}</p>
        <p><b>Course:</b> ${student.course}</p>
        <div class="card-actions">
          <button class="edit" onclick="editStudent(${student.id})">Edit</button>
          <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // 2. ADD - using push()
  function addStudent() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const course = document.getElementById('course').value.trim();

    if (!name || !age || !course) return alert("Fill all fields");

    if (editingId === null) {
      // Add new
      const newStudent = { id: Date.now(), name, age, course };
      students.push(newStudent);
    } else {
      // Update existing
      updateStudent(name, age, course);
    }

    clearForm();
    displayStudents();
  }

  // 3. EDIT - using find()
  function editStudent(id) {
    const student = students.find(s => s.id === id);
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('course').value = student.course;
    editingId = id;
    addBtn.textContent = "Update";
    addBtn.style.background = "#2196F3";
  }

  // UPDATE Helper - using findIndex()
  function updateStudent(name, age, course) {
    const index = students.findIndex(s => s.id === editingId);
    if (index !== -1) {
      students[index] = { ...students[index], name, age, course };
    }
    editingId = null;
    addBtn.textContent = "Add";
    addBtn.style.background = "#4CAF50";
  }

  // 4. DELETE - using findIndex() + splice()
  function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      if(confirm("Delete this student?")){
        students.splice(index, 1);
        displayStudents();
      }
    }
  }

  function clearForm() {
    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('course').value = "";
  }

  displayStudents();

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

async function loadStudents() {
  const response = await fetch("/api/students");
  const students = await response.json();

  studentList.innerHTML = "";

  students.forEach((student) => {
    const div = document.createElement("div");

    div.className = "student";

    const info = document.createElement("span");
    info.textContent = student.name + " - " + student.email;

    const button = document.createElement("button");
    button.textContent = "Delete";

    button.onclick = () => deleteStudent(student.id);

    div.appendChild(info);
    div.appendChild(button);

    studentList.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  form.reset();

  loadStudents();
});

async function deleteStudent(id) {
  await fetch(`/api/students/${id}`, {
    method: "DELETE",
  });

  loadStudents();
}

loadStudents();

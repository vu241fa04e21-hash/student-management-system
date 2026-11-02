import { getStudents, deleteStudent } from "./service/studentService.js";
import { handleApiError } from "../exception/apiException.js";

const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");


// Display students in the table
function displayStudents(students) {

    studentTable.innerHTML = "";

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.age}</td>

            <td>${student.city}</td>

            <td>${student.course}</td>

            <td>

                <a href="./details.html?id=${student.id}">
                    View
                </a>

                &nbsp;

                <a href="./edit_student.html?id=${student.id}">
                    Edit
                </a>

                &nbsp;

                <button
                    class="delete-btn"
                    data-id="${student.id}"
                >
                    Delete
                </button>

            </td>
        `;

        studentTable.appendChild(row);

    });

    addDeleteEvents();
}


// Add delete event to all delete buttons
function addDeleteEvents() {

    const deleteButtons =
        document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {

        button.addEventListener("click", async function () {

            const studentId = this.dataset.id;

            const confirmDelete = confirm(
                "Are you sure you want to delete this student?"
            );

            if (!confirmDelete) {
                return;
            }

            try {

                await deleteStudent(studentId);

                alert("Student deleted successfully!");

                loadStudents();

            } catch (error) {

                alert(
                    handleApiError(
                        error,
                        "Failed to delete student."
                    )
                );

            }

        });

    });

}


// Load all students
async function loadStudents() {

    try {

        const response = await getStudents();

        displayStudents(response.data);

    } catch (error) {

        alert(
            handleApiError(
                error,
                "Failed to load students."
            )
        );

    }

}


// Search and filter students
async function filterStudents() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedCourse =
        courseFilter.value;

    try {

        const response = await getStudents();

        const filteredStudents =
            response.data.filter(student => {

                const matchesName =
                    student.name
                        .toLowerCase()
                        .includes(searchText);

                const matchesCourse =
                    selectedCourse === "" ||
                    student.course === selectedCourse;

                return matchesName && matchesCourse;

            });

        displayStudents(filteredStudents);

    } catch (error) {

        alert(
            handleApiError(
                error,
                "Failed to filter students."
            )
        );

    }

}


// Search when user types
searchInput.addEventListener(
    "input",
    filterStudents
);


// Filter when course changes
courseFilter.addEventListener(
    "change",
    filterStudents
);


// Load students when page opens
loadStudents();
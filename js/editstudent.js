import { getStudentById, updateStudent } from "./service/studentService.js";
import { handleApiError } from "../exception/apiException.js";
import { validateStudent } from "../exception/validationException.js";

const editStudentForm = document.getElementById("editStudentForm");

// Get student ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get("id");

async function loadStudent() {

    try {

        const response = await getStudentById(studentId);

        const student = response.data;

        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("phone").value = student.phone;
        document.getElementById("age").value = student.age;
        document.getElementById("city").value = student.city;
        document.getElementById("course").value = student.course;

    } catch (error) {

        alert(handleApiError(error, "Failed to load student."));

    }
}

editStudentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const updatedStudent = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        age: Number(document.getElementById("age").value),
        city: document.getElementById("city").value,
        course: document.getElementById("course").value

    };

    try {

        // Check the updated data before sending it
        validateStudent(updatedStudent);

        // Update student through the API
        await updateStudent(studentId, updatedStudent);

        alert("Student updated successfully!");

        window.location.href = "./index.html";

    } catch (error) {

        if (error.name === "ValidationException") {
            alert(error.message);
        } else {
            alert(handleApiError(error, "Failed to update student."));
        }

    }

});

loadStudent();
import { getStudents, addStudent } from "./service/studentService.js";
import { handleApiError } from "../exception/apiException.js";
import { validateStudent } from "../exception/validationException.js";

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get student information from the form
    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        age: Number(document.getElementById("age").value),
        city: document.getElementById("city").value,
        course: document.getElementById("course").value
    };

    try {

        // Validate student information
        validateStudent(student);

        // Get all existing students
        const response = await getStudents();
        const students = response.data;

        // Get only valid numeric IDs
        const numericIds = students
            .map(student => Number(student.id))
            .filter(id => Number.isInteger(id) && id > 0);

        // Find the highest numeric ID
        const highestId = numericIds.length > 0
            ? Math.max(...numericIds)
            : 0;

        // Create the next ID
        student.id = String(highestId + 1);

        // Check what is being sent
        console.log("Student being sent:", student);

        // Add student to JSON Server
        await addStudent(student);

        // Show success message
        alert("Student added successfully!");

        // Clear the form
        studentForm.reset();

    } catch (error) {

        // Handle validation errors
        if (error.name === "ValidationException") {

            alert(error.message);

        } else {

            // Handle API errors
            alert(
                handleApiError(
                    error,
                    "Failed to add student."
                )
            );

        }

    }

});
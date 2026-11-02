import { getStudentById } from "./service/studentService.js";

const studentDetails = document.getElementById("studentDetails");

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);

const studentId = urlParams.get("id");

console.log("Student ID:", studentId);


// Load student details
async function loadStudentDetails() {

    // Check if ID exists
    if (!studentId) {

        studentDetails.innerHTML = `
            <h2>Student ID not found</h2>
            <p>Please go back and select a student.</p>
        `;

        return;
    }


    try {

        // Get student from JSON Server
        const response = await getStudentById(studentId);

        console.log("Response:", response);

        const student = response.data;

        console.log("Student:", student);


        // Display student information
        studentDetails.innerHTML = `

            <h2>${student.name}</h2>

            <p>
                <strong>ID:</strong>
                ${student.id}
            </p>

            <p>
                <strong>Name:</strong>
                ${student.name}
            </p>

            <p>
                <strong>Email:</strong>
                ${student.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${student.phone}
            </p>

            <p>
                <strong>Age:</strong>
                ${student.age}
            </p>

            <p>
                <strong>City:</strong>
                ${student.city}
            </p>

            <p>
                <strong>Course:</strong>
                ${student.course}
            </p>

        `;

    } catch (error) {

        console.error(
            "Error loading student:",
            error
        );

        studentDetails.innerHTML = `

            <h2>Error</h2>

            <p>
                Failed to load student details.
            </p>

        `;

    }
}


// Run the function
loadStudentDetails();
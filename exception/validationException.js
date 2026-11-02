export class ValidationException extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationException";
    }
}

export function validateStudent(student) {
    if (!student.name.trim()) {
        throw new ValidationException("Name is required.");
    }

    if (!student.email.trim()) {
        throw new ValidationException("Email is required.");
    }

    if (!student.phone.trim()) {
        throw new ValidationException("Phone is required.");
    }

    if (!student.age) {
        throw new ValidationException("Age is required.");
    }

    if (!student.city.trim()) {
        throw new ValidationException("City is required.");
    }

    if (!student.course.trim()) {
        throw new ValidationException("Course is required.");
    }
}
export function handleApiError(error, message) {
    console.error("API Error:", error);

    if (error.response) {
        return `${message} Server error: ${error.response.status}`;
    }

    if (error.request) {
        return `${message} Unable to connect to the server.`;
    }

    return message;
}
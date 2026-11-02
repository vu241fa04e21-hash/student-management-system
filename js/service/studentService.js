import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";

import { API_URL } from "./apiConfig.js";


export function getStudents() {

    return axios.get(API_URL);

}


export function getStudentById(id) {

    return axios.get(`${API_URL}/${id}`);

}


export function addStudent(student) {

    return axios.post(API_URL, student);

}


export function updateStudent(id, student) {

    return axios.put(`${API_URL}/${id}`, student);

}


export function deleteStudent(id) {

    return axios.delete(`${API_URL}/${id}`);

}
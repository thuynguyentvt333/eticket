import axios from "axios";

const registerNewUser = (email, phone, username, password) => {
    return axios.post("http://localhost:8080/api/v1/users/register", {
        email, phone, username, password
    });
}

const loginUser = (email, password) => {
    console.log("Email:", email);
    console.log("Password:", password);
    return axios.post("http://localhost:8080/api/v1/users/login", {
        email, password
    });
}

export { registerNewUser, loginUser };

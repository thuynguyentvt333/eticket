import axios from "axios";

const registerNewUser = (email, phone, username, password) => {
    return axios.post("http://localhost:8080/account/sign-up", {
        email, phone, username, password,
    });
}

const loginUser = (username, password) => {
    console.log("Email:", username);
    console.log("Password:", password);
    return axios.post("http://localhost:8080/account/sign-in", {
        username, password, role: "user"
    });
}

export { registerNewUser, loginUser };

import axios from "axios";

export const registerUserApi = (data) => axios.post("/auth/register", data)
export const loginUserApi = (data) => axios.post("/auth/login", data)

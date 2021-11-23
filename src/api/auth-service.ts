import axios from "./inst";
import { UserData } from "../interfaces/user.type";

const register = (email: string, password: string, name: string) => {
  return axios.post("/users", {
    email,
    password,
    name,
  });
};

const getUser = () => axios.get<UserData>("/auth/user");

const login = (email: string, password: string) => {
  return axios.post<{ token: string }>("/auth", {
    email,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  getUser,
  login,
  logout,
};

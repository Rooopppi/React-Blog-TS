/* eslint-disable camelcase */
import axios from "./inst";
import { UserData, EditUserData } from "../interfaces/user.type";

interface AllUsers {
  data: UserData[];
}

const getUser = (userId: string) => {
  return axios.get<UserData>(`/users/${userId}`);
};

const getAllUsers = (limit = 100, skip = 200) => {
  return axios.get<AllUsers>("/users", { params: { limit, skip } });
};

const deleteUser = (userId: string) => {
  return axios.delete(`/users/${userId}`);
};

const editUser = (userId: string, values: EditUserData) => {
  return axios.patch(`/users/${userId}`, {
    ...values,
  });
};

const uploadAvatar = (userId: string, imageData: string | Blob) => {
  const formData = new FormData();
  formData.append("avatar", imageData);
  return axios.put(`/users/upload/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getUser,
  getAllUsers,
  deleteUser,
  editUser,
  uploadAvatar,
};

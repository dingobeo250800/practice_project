// import axios from "axios";
import instance_axios from "./customize-axios";
const getUsers = (page) => {
  const url = `/api/users?page=${page}`;
  const request = instance_axios.request({
    url: url,
    method: "GET",
  });
  return request;
};
const addUsers = (data) => {
  const url = `/api/users`;
  const request = instance_axios.request({
    url: url,
    method: "POST",
    data: data,
  });
  return request;
};
const updateUsers = (data) => {
  const url = `/api/users2`;
  const request = instance_axios.request({
    url: url,
    method: "POST",
    data: data,
  });
  return request;
};
const deleteUser = (id) => {
  const url = `/api/users/${id}`;
  const request = instance_axios.request({
    url: url,
    method: "DELETE",
  });
  return request;
};
export { getUsers, addUsers, updateUsers, deleteUser };

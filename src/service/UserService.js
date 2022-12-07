// import axios from "axios";
import instance_axios from "./customize-axios";
const getUsers = (page) => {
  const url = `/api/users?page=${page}`;
  const request = instance_axios.request({
    method: "GET",
    url: url,
  });
  return request;
};
export { getUsers };

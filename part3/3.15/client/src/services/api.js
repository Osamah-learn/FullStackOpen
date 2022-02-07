import axios from "axios";
const baseUrl = "api/persons";
console.log("Base URL: " + baseUrl);

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      alert("fail" + error);
    });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      alert("fail" + error);
    });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  console.log("update", request);
  return request
    .then((response) => response.data)
    .catch((error) => {
      alert("fail" + error);
    });
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
     alert("fail" + error);
    });
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
};

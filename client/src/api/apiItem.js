/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import axios from "../config/endpoint";
import Swal from "sweetalert2";

const getItems = async () => {
  return axios.get("/items");
};

const addItems = async (data) => {
  await axios.post("/items/create", data);
};

const deleteItems = async (id) => {
  await axios.delete(`/items/delete/${id}`);
};

const updateItems = async (id, data) => {
  await axios.put(`/items/update/${id}`, data);
};

const getDetails = async (id) => {
  await axios.get(`/items/details/${id}`);
};

export default {
  getItems,
  addItems,
  deleteItems,
  updateItems,
  getDetails,
};

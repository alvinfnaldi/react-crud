import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiItem from "../api/apiItem";

const AddItems = () => {
  const [form, setForm] = useState({
    name:"",
    category:"",
    price: +0,
    stock: +0,
  });

  const navigateTo = useNavigate();

  const submitHandler = async () => {
    apiItem.addItems(form);
    navigateTo("/items");
    await Swal.fire("Item added!");
  };

  return (
    <>
      <h1>Add Items</h1>
      <div>
        <label>Name :</label>
        <input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <label>Category :</label>
        <input
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <label>Price :</label>
        <input
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <label>Stock :</label>
        <input
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <button onClick={submitHandler} type="button" class="btn btn-primary">
          Submit
        </button>
      </div>
    </>
  );
};

export default AddItems;

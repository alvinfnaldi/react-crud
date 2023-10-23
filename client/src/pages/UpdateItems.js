import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apiItem from "../api/apiItem";

const UpdateItems = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: +0,
    stock: +0,
  });

  const navigateTo = useNavigate();
  const params = useParams();

  const getInfoItems =()=>{
    const { id } = params;
    apiItem.getDetails(id, (result) => {
      setForm({
        name: result.name,
        category: result.category,
        price: result.price,
        stock: result.stock
      });
      console.log(result)
    });
  }

  useEffect(() => {
    getInfoItems()
  }, []);

  const submitHandler = async() => {
    apiItem.updateItems(params.id, form)
    navigateTo("/items")
    await Swal.fire('Item edited!')
  }

  return (
    <>
      <h1>Edit Items</h1>
      <h4>
        {
            
        }
      </h4>
      <div>
        <label>Name :</label>
        <input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <label>Type :</label>
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

export default UpdateItems;

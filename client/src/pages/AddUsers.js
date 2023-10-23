import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiUser from "../api/apiUser";

const AddUsers = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const navigateTo = useNavigate();

  const submitHandler = async() => {
    await apiUser.registerUsers(form);
      Swal.fire("Register berhasil");
      navigateTo("/users/login");
    }

  return (
    <>
      <h1>Register</h1>
      <div>
        <label>Username :</label>
        <input
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          className="form-control"
        />
      </div>
      <div>
        <label>Password :</label>
        <input
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          className="form-control"
        />
      </div>
      <div>
        <label>Role :</label>
        <input
          onChange={(e) => setForm({ ...form, role: e.target.value })}
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

export default AddUsers;

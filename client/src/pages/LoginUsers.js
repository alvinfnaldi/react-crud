import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiUser from "../api/apiUser";

const LoginUsers = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigateTo = useNavigate();

  const submitHandler = async () => {
    const login = await apiUser.loginUsers(form);
    console.log(login)
    // if (login) {
    //   Swal.fire("Login berhasil");
    //   navigateTo("/");
    // } else {
    //   Swal.fire("Login gagal");
    // }
  };

  return (
    <>
      <h1>Login</h1>
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
        <button onClick={submitHandler} type="button" class="btn btn-primary">
          Submit
        </button>
      </div>
    </>
  );
};

export default LoginUsers;

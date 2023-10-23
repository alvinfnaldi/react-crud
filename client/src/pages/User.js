/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import apiUser from "../api/apiUser";
import { Link } from "react-router-dom";
import LoadingBar from "../helper/LoadingBar";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const User = () => {
  const [user, setUser] = useState([]);

  const getData = async () => {
    const result = await apiUser.getUsers();
    console.log(result.data);
    setUser(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h3>Table User</h3>
      {/* <button onClick={buttonHandler} className="btn btn-sm btn-success">Click Me</button> */}

      <Link to="/users/register">
        <button type="button" class="btn btn-success">
          Add Users
        </button>
      </Link>

      <Link to="/items">
      <button type="button" class="btn btn-light">
          Items
        </button>
      </Link>

      <Link to="/users/login">
      <button type="button" class="btn btn-primary">
          Login
        </button>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Image</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.length > 0 ? (
            user.map((item, index) => {
              const { id, username, email, password, image, role, createdAt, updatedAt } = item;

              return (
                <tr key={id}>
                  <td>{index+1}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{password}</td>
                  <td><img src={image}/>
                    </td>
                  <td>{role}</td>
                  <td>
                    <button
                      onClick={()=>{apiUser.deleteUsers(id)}} 
                      className="btn btn-sm btn-danger"
                    >
                      <MdDeleteOutline className="me-2" />
                      Delete
                    </button>
                    <Link to={`/users/update/${id}`}>
                    <button className="btn btn-sm btn-info">
                      <MdOutlineEdit />
                      Edit
                    </button>
                    </Link>
                    
                  </td>
                </tr>
              );
            })
          ) : (
            <LoadingBar />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;

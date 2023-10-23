import React, { useState, useEffect } from "react";
import apiItem from "../api/apiItem";
import { Link } from "react-router-dom";
import LoadingBar from "../helper/LoadingBar";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import DeleteItems from "./DeleteItems";

const Item = () => {
  const [item, setItem] = useState([]);

  const getData = async () => {
    const result = await apiItem.getItems();
    console.log(result.data);
    setItem(result.data);
  };

  const navigateTo = useNavigate();

  const deleteHandler = (id) => {
    DeleteItems(id);
    getData();
    navigateTo("/items");
  };

  // const deleteHandler = async (id) => {
  //   try {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         await axios({
  //           method: "DELETE",
  //           url: `http://localhost:3000/items/${id}`,
  //         });
  //         // getItems();
  //         getData()
  //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h3>Table Item</h3>
      {/* <button onClick={buttonHandler} className="btn btn-sm btn-success">Click Me</button> */}

      <Link to="/items/create">
        <button type="button" class="btn btn-success">
          Add Items
        </button>
      </Link>

      <Link to="/users">
        <button type="button" class="btn btn-light">
          Users
        </button>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {item.length > 0 ? (
            item.map((item, index) => {
              const { id, name, category, price, stock } = item;

              const idr = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price);

              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>{idr}</td>
                  <td>{stock} pcs</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteHandler(id);
                      }}
                      className="btn btn-sm btn-danger"
                    >
                      <MdDeleteOutline className="me-2" />
                      Delete
                    </button>
                    <Link to={`/items/update/${id}`}>
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

export default Item;

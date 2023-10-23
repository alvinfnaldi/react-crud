import React from "react";
import Swal from "sweetalert2";
import apiItem from "../api/apiItem";

const DeleteItems = async (id) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await apiItem.deleteItems(id);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });

  return <div>DeleteItems</div>;
};

export default DeleteItems;

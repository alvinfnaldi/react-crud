/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const sweetAlert = () => {
    const navigateTo = useNavigate()
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
              await Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            navigateTo("/users")
          });
    }

    export {sweetAlert}
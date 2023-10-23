import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
  return (
    <div>
        <Nav/>
      Home
      <Link to="/items">
      <button>Items</button>
      </Link>
      <Link to="/users">
      <button>Users</button>
      </Link>
    </div>
  );
};

export default Home;

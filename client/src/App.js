import "./App.css";
import Item from "./pages/Item";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Home from "./pages/Home";
import AddItems from "./pages/AddItems";
import UpdateItems from "./pages/UpdateItems";
import AddUsers from "./pages/AddUsers";
import LoginUsers from "./pages/LoginUsers";
import UpdateUsers from "./pages/UpdateUsers";

function App() {
  return (
    <div className="App">
      <h1>Test</h1>

      <Router>
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/items" element={<Item />}></Route>
          <Route path="/users" element={<User />}></Route>

          <Route path="/items/create" element={<AddItems />}></Route>
          <Route path="/items/update/:id" element={<UpdateItems />}></Route>

          <Route path="/users/register" element={<AddUsers />}></Route>
          <Route path="/users/login" element={<LoginUsers />}></Route>
          <Route path="/users/update/:id" element={<UpdateUsers />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

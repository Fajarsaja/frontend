import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Inventory from "./pages/Inventory";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddInventory from "./pages/AddInventory";
import EditInventory from "./pages/EditInventory";
import Register from "./pages/Register";



function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login/>}/> 
         <Route path="/Register" element={<Register/>}/> 
         <Route path="/users" element={<User/>}/> 
         <Route path="/users/add" element={<AddUser/>}/> 
         <Route path="/users/edit/:id" element={<EditUser/>}/> 
         <Route path="/dashboard" element={<Dashboard/>}/> 
         <Route path="/inventory" element={<Inventory/>}/> 
         <Route path="inventory/add" element={<AddInventory/>}/> 
         <Route path="inventory/edit/:id" element={<EditInventory/>}/> 
      </Routes>
      
    </BrowserRouter>
      
    
  );
}

export default App;

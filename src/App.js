import AddInventory from "./components/AddInventory";
import EditInventory from "./components/EditInventory";
import InventoryList from "./components/InventoryList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<InventoryList/>}/> 
         <Route path="Add" element={<AddInventory/>}/> 
         <Route path="Edit/:id" element={<EditInventory/>}/> 
      </Routes>
      
    </BrowserRouter>
      
    
  );
}

export default App;

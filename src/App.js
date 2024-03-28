import {BrowserRouter, Routes, Route} from "react-router-dom";
import DataList from "./component/DataList"
import AddPenjualan from "./component/AddPenjualan";
import EditPenjualan from "./component/EditPenjualan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataList/>}/>
        <Route path="add" element={<AddPenjualan/>}/>
        <Route path="edit/:id" element={<EditPenjualanPenjualan/>}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

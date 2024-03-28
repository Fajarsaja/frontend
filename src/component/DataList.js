import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const DataList = () => {
const [users,setUsers] = useState([]);

useEffect(()=>{
    getUsers()
},[])
const getUsers = async () =>{
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
}

const deletePenjualan = async (id) =>{
    try {
        await axios.delete(`http://localhost:5000/users${id}`)
        getUsers();
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={`add`} className="button is-success">add new</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>nomor penjualan</th>
                        <th>tanggal penjualan</th>
                        <th>nama barang</th>
                        <th>Qty</th>
                        <th>harga</th>
                        <th>subtotal</th>
                        <th>keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((penjualan,index) => (
                    <tr key={penjualan.id}>
                        <td>{index + 1}</td>
                        <td>{penjualan.no_penjualan}</td>
                        <td>{penjualan.tgl_penjualan}</td>
                        <td>{penjualan.nama_barang}</td>
                        <td>{penjualan.qty}</td>
                        <td>{penjualan.harga}</td>
                        <td>{penjualan.subtotal}</td>
                        <td>{penjualan.keterangan}</td>
                        <td>
                            <Link to={`edit/${penjualan.id}`} className="buttton is-small is-info">edit</Link>
                            <button onClick={()=> deletePenjualan(penjualan.id)} className="buttton is-small is-danger">delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default DataList

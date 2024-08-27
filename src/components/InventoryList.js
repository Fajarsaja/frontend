import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        getInventory()
    },[]);

    const getInventory = async () => {
        const response = await axios.get("http://localhost:5000/t_penjualan");
        setInventory(response.data);
        
    };

    const deleteInventory = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/t_penjualan/${id}`)
            getInventory();
        }
        catch (error) {
            console.log(error);
            
        }
    }

 
    
    

  return (
    <div className='columns mt-5 is-justify-content-center'>
        <div className="column is-half ">
            <Link to={`Add`} className='button is-success mb-5'>Tambah data</Link>
            <table className='table is-center is-hoverable is-triped is-fullwitdh is-1 table-cell-padding table-cell-border-width'>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>nomor penjualan</th>
                        <th>tanggal</th>
                        <th>nama barang</th>
                        <th>qty</th>
                        <th>subtotal</th>
                        <th>harga</th>
                        <th>keterangan</th>
                        <th>action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {inventory.length > 0 ? (
                    inventory.map((inventory, index) => (
                         <tr key={inventory.id}>
                         <td>{index +1}</td>
                         <td>{inventory.no_penjualan}</td>
                         <td>{inventory.tgl_penjualan}</td>
                         <td>{inventory.nama_barang}</td>
                         <td>{inventory.qty}</td>
                         <td>{inventory.subtotal}</td>
                         <td>{inventory.harga}</td>
                         <td>{inventory.keterangan}</td>
                         <td>
                            <Link to={`Edit/${inventory.id}`} className='button is-small is-info'>edit</Link>
                         </td>
                         <td>
                            <button onClick={() => deleteInventory(inventory.id)} className='button is-small is-danger'>delete</button>
                         </td>
                     </tr>
                     
                    ) )
                        ) : (
                            <tr>
                                <td colSpan="10">Data tidak ada</td>
                            </tr>
                )}
                   
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default InventoryList

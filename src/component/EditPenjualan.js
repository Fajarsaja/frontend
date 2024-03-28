import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditPenjualan = () => {
const [no_penjualan, setNo_penjualan] =useState("");
const [tgl_penjualan, setTgl_penjualan] =useState("");
const [nama_barang, setNama_barang] =useState("");
const [qty, setQty] =useState("");
const [harga, setHarga] =useState("");
const [subtotal, setSubtotal] =useState("");
const [keterangan, setKeteragan] =useState("");
const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {
    getUserById();
}, []);

const updatePenjualan = async (e) =>{
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/users/${id}`,{
            no_penjualan,
            tgl_penjualan,
            nama_barang,
            qty,
            harga,
            subtotal,
            keterangan
        });
    } catch (error) {
        console.log(error)
    }
}

const getUserById = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${id}`)
    setNo_penjualan(response.data.no_penjualan);
    setTgl_penjualan(response.data.tgl_penjualan);
    setNama_barang(response.data.nama_barang);
    setQty(response.data.qty);
    setHarga(response.data.harga);
    setSubtotal(response.data.subtotal);
    setKeteragan(response.data.keterangan);
}

  return (
    <div className="columns mt-5 is-center">
      <div className="columns is-half">
            <form onSubmit={updatePenjualan}>
                <div className="field">
                    <label className="label"></label>
                         <div className="control"> 
                            <input type="text" className="input" value={no_penjualan} onChange={(e)=> setNo_penjualan(e.target.value)} placeholder=''/>
                         </div>    
                </div>    
                <div className="field">
                    <label className="label"></label>
                         <div className="control"> 
                            <input type="text" className="input" value={tgl_penjualan} onChange={(e)=> setTgl_penjualan(e.target.value)} placeholder=''/>
                         </div>    
                </div>    
                <div className="field">
                    <label className="label"></label>
                         <div className="control"> 
                            <input type="text" className="input"  value={nama_barang} onChange={(e)=> setNama_barang(e.target.value)} placeholder=''/>
                         </div>    
                </div>    
                <div className="field">
                    <label className="label"></label>
                         <div className="control"> 
                            <input type="text" className="input"  value={qty} onChange={(e)=> setQty(e.target.value)} placeholder=''/>
                         </div>    
                </div>    
                <div className="field">
                    <label className="label"></label>
                         <div className="control"> 
                            <input type="text" className="input"  value={harga} onChange={(e)=> setHarga(e.target.value)} placeholder=''/>
                         </div>    
                </div>    
                <div className="field">
                    <label className="label"></label>
                         <div className="control"> 
                            <input type="text" className="input" value={subtotal} onChange={(e)=> setSubtotal(e.target.value)} placeholder=''/>
                         </div>    
                </div>    
                <div className="field">
                    <label className="label"></label>
                         <div className="control"> 
                            <input type="text" className="input" value={keterangan} onChange={(e)=> setKeteragan(e.target.value)} placeholder=''/>
                         </div>    
                </div>   
                <div className="field">
                    <button type="submit" className='button is-success'>update</button>    
                </div> 
            </form>
      </div>  
    </div>
  )
}

export default EditPenjualan;

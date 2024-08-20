import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



const EditInventory = () => {

    const [no_penjualan, setNoPenjualan] = useState("");
    const [tgl_penjualan, setTangal] = useState("");
    const [nama_barang, setNamaBarang] = useState("");
    const [qty, setQty] = useState("");
    const [harga, setHarga] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getInventoryById();
    },[]);

    const updateInventory = async (e) =>{
        e.preventDefault();
        try{
            await axios.patch(`http://localhost:5000/t_penjualan/${id}`,{
                no_penjualan,
                tgl_penjualan,
                nama_barang,
                qty,
                harga,
                subtotal,
                keterangan,
        });
        navigate("/");
    }  catch(error){
            console.log(error);
            
        }
    }
        
    const getInventoryById = async () => {
        const response = await axios.get(`http://localhost:5000/t_penjualan/${id}`)
        setNoPenjualan(response.data.no_penjualan)
        setTangal(response.data.tgl_penjualan)
        setNamaBarang(response.data.nama_barang)
        setQty(response.data.qty)
        setHarga(response.data.harga)
        setSubtotal(response.data.subtotal)
        setKeterangan(response.data.keterangan)
    }


  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateInventory}>
                <div className='field'>
                    <label className='label'>nomor penjualan</label>
                    <div className='control'>
                        <input type="text" className="input" placeholder='no penjualan'
                        value={no_penjualan} onChange={(e) => setNoPenjualan(e.target.value)} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>tanggal</label>
                    <div className='control'>
                        <input type="date" className="input" placeholder='tanggal penjualan'
                         value={tgl_penjualan} onChange={(e) => setTangal(e.target.value)} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>nama barang</label>
                    <div className='control'>
                        <input type="text" className="input" placeholder='nama barang'
                         value={nama_barang} onChange={(e) => setNamaBarang(e.target.value)} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>QTY</label>
                    <div className='control'>
                        <input type="number" className="input" placeholder='qty'
                         value={qty} onChange={(e) => setQty(e.target.value)} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>harga </label>
                    <div className='control'>
                        <input type="number" className="input" placeholder='harga' 
                         value={harga} onChange={(e) => setHarga(e.target.value)}/>
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>subtotal</label>
                    <div className='control'>
                        <input type="number" className="input" placeholder='subtotal'
                         value={subtotal} onChange={(e) => setSubtotal(e.target.value)} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>keterangan</label>
                    <div className='control'>
                        <input type="text" className="input" placeholder='keterangan' 
                         value={keterangan} onChange={(e) => setKeterangan(e.target.value)}/>
                    </div>
                </div>
                <div className='field'>
                   <button type='submit' className='button is-success'>update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditInventory


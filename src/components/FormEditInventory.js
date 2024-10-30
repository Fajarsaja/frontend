import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



const FormEditInventory = () => {

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

    useEffect(() => {
        if (qty && harga) {
            setSubtotal(Number(qty) * Number(harga));
        } else {
            setSubtotal(0); 
        }
    }, [qty, harga, tgl_penjualan]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID').format(value);
    };
    
    const handleHargaChange = (e) => {
        const input = e.target.value.replace(/\./g, ''); 
        const numericValue = Number(input);
        setHarga(numericValue); 
    };
    
   
    const formattedSubtotal = formatCurrency(subtotal);
    const displayHarga = formatCurrency(harga)

    const updateInventory = async (e) =>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('accessToken');
            await axios.patch(`http://localhost:5000/t_penjualan/${id}`,{
                no_penjualan,
                tgl_penjualan,
                nama_barang,
                qty,
                harga,
                subtotal,
                keterangan,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        navigate("/inventory");
    }  catch(error){
            console.log(error);
            
        }
    }
        
    const getInventoryById = async () => {
        const response = await axios.get(`http://localhost:5000/t_penjualan/${id}`)
        setNoPenjualan(response.data.no_penjualan)
        const formattedDate = new Date(response.data.tgl_penjualan).toISOString().split('T')[0];
        setTangal(formattedDate);
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
                        <input 
                        type="text" 
                        placeholder='no penjualan'
                        value={String(no_penjualan).padStart(4, '0')}
                        onChange={(e) => setNoPenjualan(e.target.value)}   
                        readOnly
                        disabled  />
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
                <div className='columns is-mobile'>
                    <div className='column'>
                        <label className='label'>QTY</label>
                        <div className='control'>
                            <input 
                                type="number" 
                                className="input" 
                                placeholder='QTY'
                                value={qty} 
                                onChange={(e) => setQty(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className='column'>
                        <label className='label'>Harga</label>
                        <div className='control'>
                            <input 
                                type="text" 
                                className="input" 
                                placeholder='Harga' 
                                value={displayHarga} 
                                onChange={handleHargaChange}
                            />
                        </div>
                    </div>
                    <div className='column'>
                        <label className='label'>Subtotal</label>
                        <div className='control'>
                            <input  
                                type="text"
                                placeholder='Subtotal'
                                value={formattedSubtotal}
                                readOnly
                                disabled 
                            />
                        </div>
                    </div>
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

export default FormEditInventory


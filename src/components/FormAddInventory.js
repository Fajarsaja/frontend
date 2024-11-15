import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const FormAddInventory = () => {

    const [no_penjualan, setNoPenjualan] = useState("");
    const [tgl_penjualan, setTangal] = useState("");
    const [nama_barang, setNamaBarang] = useState("");
    const [qty, setQty] = useState("");
    const [harga, setHarga] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [keterangan, setKeterangan] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const getNewNoPenjualan = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/new_no_penjualan`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNoPenjualan(response.data.newNoPenjualan);
            } catch (error) {
                console.error("Failed to get new no_penjualan:", error);
            }
        };

        getNewNoPenjualan();
    }, []);

    useEffect(() => {
        if (qty && harga) {
            setSubtotal(Number(qty) * Number(harga));
        } else {
            setSubtotal(0); 
        }
    }, [qty, harga]);

   
    
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID').format(value);
    };
    
    const handleHargaChange = (e) => {
        const input = e.target.value.replace(/\./g, '');
        const numericValue = Number(input);
        setHarga(numericValue); 
    };
    
    // Tampilkan subtotal diformat di input
    const formattedSubtotal = formatCurrency(subtotal);
    const displayHarga = formatCurrency(harga)
    

    const checkNoPenjualanExists = async (noPenjualan) => {
        try {
            const token = localStorage.getItem('accessToken'); 
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/t_penjualan/check/${noPenjualan}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.exists;
        } catch (error) {
            console.error('Error checking no_penjualan:', error);
            return false;
        }
    };
    
    
    const saveInventory = async (e) => {
        e.preventDefault();
    
        if (!no_penjualan || !tgl_penjualan || !nama_barang || !qty || !harga || !subtotal || !keterangan) {
            alert('Pastikan semua kolom sudah diisi...');
            return;
        }
    
        const exists = await checkNoPenjualanExists(no_penjualan);
        if (exists) {
            alert('Nomor penjualan sudah ada');
            return;
        }
    
        try {
            const token = localStorage.getItem('accessToken'); 
            await axios.post(
                `${process.env.REACT_APP_API_URL}/t_penjualan`,
                {
                    no_penjualan,
                    tgl_penjualan,
                    nama_barang,
                    qty,
                    harga,
                    subtotal,
                    keterangan,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            navigate("/inventory");
        } catch (error) {
            console.log(error);
            alert('Terjadi kesalahan saat menyimpan data');
        }
    }
        
    


  return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
        <form onSubmit={saveInventory}>
            <div className='field'>
                <label className='label'>Nomor Penjualan</label>
                <div className='control'>
                    <input 
                        type="text"
                        placeholder='No Penjualan'
                        value={no_penjualan}
                        onChange={(e) => setNoPenjualan(e.target.value)}
                        readOnly
                        disabled 
                    />
                </div>
            </div>

            <div className='field'>
                <label className='label'>Tanggal</label>
                <div className='control'>
                    <input 
                        type="date" 
                        className="input" 
                        placeholder='Tanggal Penjualan'
                        value={tgl_penjualan} 
                        onChange={(e) => setTangal(e.target.value)} 
                    />
                </div>
            </div>

            <div className='field'>
                <label className='label'>Nama Barang</label>
                <div className='control'>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder='Nama Barang'
                        value={nama_barang} 
                        onChange={(e) => setNamaBarang(e.target.value)} 
                    />
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
                <label className='label'>Keterangan</label>
                <div className='control'>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder='Keterangan' 
                        value={keterangan} 
                        onChange={(e) => setKeterangan(e.target.value)}
                    />
                </div>
            </div>

            <div className='field'>
                <button type='submit' className='button is-success'>Save</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default FormAddInventory

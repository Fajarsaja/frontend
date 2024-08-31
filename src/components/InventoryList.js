import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(7);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("")

    useEffect(() => {
        getPaginate()
    },[page, keyword]);

    const getPaginate = async () => {
        const response = await axios.get(
            `http://localhost:5000/t_penjualan?search_query=${keyword}&page=${page}&limit=${limit}`
        )
        setInventory(response.data.result)
        setPage(response.data.page)
        setPages(response.data.totalPage)
        setRows(response.data.totalRows)
    }

   

    const deleteInventory = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/t_penjualan/${id}`)
            getPaginate();
        }
        catch (error) {
            console.log(error);
            
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0)
        setKeyword(query);
    };

 
    const handlePageClick = ({selected}) => {
        setPage(selected);
    };
    

  return (
    <div className='columns mt-2 mx-auto'>
        <div className="column is-half ">
            <Link to={`Add`} className='button is-success '>Tambah data</Link>
            <div className='container mt-3 mb-3'>
                <div className='columns'>
                    <div className='column is-centered'>
                        <form onSubmit={handleSearch}>
                            <div className='field has-addons is-fullwitdh'>
                                <div className='control is-expanded'>
                                    <input
                                    type='text'
                                    className='input' 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder='cari berdasarkan nomor penjualan atau nama barang..'/>
                                </div>
                                <div className='control'>
                                <button type='submit' className='button is-info'>Search</button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <table className='table is-center  is-triped is-fullwitdh is-1 table-cell-padding table-cell-border-width'>
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
                        <td colSpan="10">No data available</td>
                    </tr>
                )
               }
                   
                </tbody>
            </table>
            {/* <p>total rows: {rows} page: {rows ? page + 1 : 0} of {pages} </p> */}
            <nav 
            key={rows}
            className='pagination is-centered'
            role='navigation'
            aria-label='pagination'>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={Math.min(5, pages)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination-list'}
                    pageLinkClassName={'pagination-link'}
                    previousClassName={'pagination-previous'}
                    nextLinkClassName={'pagination-next'}
                    activeLinkClassName={'pagination-link is-current'}
                    disabledLinkClassName={'pagination-link is-disabled'}
                />
            </nav>
        </div>
    </div>
  )
}

export default InventoryList

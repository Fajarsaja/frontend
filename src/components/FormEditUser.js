import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const FormEditUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [role, setRole] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const {id} = useParams()

    
    useEffect(() => {
        getUsersById();
    },[]);

    const updateUser = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confPassword || !role) {
            alert('Pastikan semua kolom sudah diisi...');
            return;
        }
        if (password !== confPassword) {
            alert('Password dan Konfirmasi Password tidak cocok!');
            return;
        }
        try {
            const token = localStorage.getItem('accessToken');
            await axios.patch(`http://localhost:5000/users/${id}`, {
                name,
                email,
                password,
                confPassword,
                role
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/users");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setMsg(error.response.data.msg);
            } else {
                setMsg('Terjadi kesalahan, silakan coba lagi.');
            }
        }
    };
    

    const getUsersById = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`http://localhost:5000/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data) {
                setName(response.data.name); 
                setEmail(response.data.email);
                setPassword(response.data.password);
                setConfPassword(response.data.ConfPassword);
                setRole(response.data.role);
            } else {
                setMsg('Data pengguna tidak ditemukan');
            }
        } catch (error) {
            console.error(error);
            setMsg('Terjadi kesalahan saat memuat data');
        }
    };
    

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Update User</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={updateUser}>
                        <div className='field'>
                                <label className='label'>name</label>
                                <div className='control'>
                                    <input type="text" className='input' placeholder='name' value={name} onChange={(e)=> setName(e.target.value)}/>
                                </div>
                            </div>
                        <div className='field'>
                                <label className='label'>email</label>
                                <div className='control'>
                                    <input type="email" className='input' placeholder='email'value={email} onChange={(e)=> setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>password</label>
                                <div className='control'>
                                    <input type="password" className='input' placeholder='********'value={password} onChange={(e)=> setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>confirm Password</label>
                                <div className='control'>
                                    <input type="password" className='input' placeholder='********'value={confPassword} onChange={(e)=> setConfPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Role</label>
                                <div className='control'>
                                   <div className='select is-fullwidth'>
                                        <select value={role} onChange={(e)=> setRole(e.target.value)}>
                                            <option value="admin">adminn</option>
                                            <option value="user">user</option>
                                        </select>
                                   </div>
                                </div>
                            </div>
                            <div className='field '>
                                <div className='control'>
                                    <button type="submit"className='button is-success'>Save</button>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default FormEditUser

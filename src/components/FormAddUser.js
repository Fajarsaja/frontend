import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FormAddUser = () => {
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [confPassword, setConfPassword] = useState("")
        const [role, setRole] = useState("")
        const [msg, setMsg] = useState("")
        const navigate = useNavigate()

    const saveUser = async (e) =>{
        e.preventDefault();
        if (!name || !email || !password || !confPassword|| !role) {
            alert('pastikan semua kolom sudah di isi...');
            return;
        }       
        try{
            const token = localStorage.getItem('accessToken'); 
            await axios.post("http://localhost:5000/users",
            {
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
        }  catch(error){
                setMsg(error.response.data.msg);
                
            }
        }

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>add New User</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveUser}>
                        <div className='field'>
                                <label className='label'>name</label>
                                <div className='control'>
                                    <input type="text" className='input' placeholder='name' value={name} onChange={(e)=> setName(e.target.value)}/>
                                </div>
                            </div>
                        <div className='field'>
                                <label className='label'>email</label>
                                <div className='control'>
                                    <input type="text" className='input' placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>password</label>
                                <div className='control'>
                                    <input type="password" className='input' placeholder='********' value={password} onChange={(e)=> setPassword(e.target.value)}/>
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
                                            <option value="admin">admin</option>
                                            <option value="user">user</option>
                                        </select>
                                   </div>
                                </div>
                            </div>
                            <div className='field '>
                                <div className='control'>
                                    <button type='submit' className='button is-success'>Save</button>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default FormAddUser

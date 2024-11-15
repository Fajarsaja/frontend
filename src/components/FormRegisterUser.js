import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

const FormRegisterUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [role, setRole] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confPassword || !role) {
            alert('Pastikan semua kolom sudah diisi.');
            return;
        }
        try {
             const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                name,
                email,
                password,
                confPassword,
                role
            });
            setMsg(response.data.msg);
            setName("");
            setEmail("");
            setPassword("");
            setConfPassword("");
            setRole("");
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

    return (
        <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
            <div className='hero-body'>
                <div className='container'>
                    <div className='columns is-centered'>
                        <div className='column is-6'>
                            <form className='box' onSubmit={registerUser}>
                                <h1 className='title has-text-centered'>Register</h1>
                                {msg && (
                                    <p className='has-text-centered' style={{ color: msg.includes("berhasil") ? "green" : "red" }}>
                                        {msg}
                                    </p>
                                )}
                                <div className='field'>
                                    <label className='label'>Name</label>
                                    <div className='control'>
                                        <input type="text" className='input' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Email</label>
                                    <div className='control'>
                                        <input type="text" className='input' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Password</label>
                                    <div className='control'>
                                        <input type="password" className='input' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Confirm Password</label>
                                    <div className='control'>
                                        <input type="password" className='input' placeholder='********' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label className='label'>Role</label>
                                    <div className='control'>
                                        <div className='select is-fullwidth'>
                                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                                <option value="admin">admin</option>
                                                <option value="user">user</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='field mt-5'>
                                    <button className='button is-success is-fullwidth' type='submit'>
                                        Register
                                    </button>
                                </div>
                                <div className='has-text-centered mt-3'>
                                    <NavLink to="/" className="is-link">
                                        Sudah punya akun? Login di sini
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FormRegisterUser

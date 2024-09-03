import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Userlist = () => {
  const [users, setUsers] = useState([])

  useEffect(() =>{
    getUsers()
  },[])

  const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users')
        setUsers(response.data)
    }


  const deleteUser = async (uuid) => {
        await axios.delete(`http://localhost:5000/users/${uuid}`)  
        getUsers();
}

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'> List off user</h2>
      <Link to={`add`} className='button is-success mb-3 '>Tambah User</Link>
        <table className='table is-striped is-fullwidth'>
        <thead>
            <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                 <Link
                  to={`/users/edit/${user.uuid}`} className='button is-small is-info'>edit
                 </Link>
                 <button 
                 onClick={() => deleteUser(user.uuid)} className='button is-small is-danger'>delete
                 </button>
              </td>
              <td>
                
              </td>
            </tr>
          ))}
           
        </tbody>
        </table>
    </div>
  )
}

export default Userlist

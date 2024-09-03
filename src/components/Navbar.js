import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logOut, reset } from '../features/authSlice.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}= useSelector((state)=> state.auth)

  const logout =() => {
    dispatch(logOut())
    dispatch(reset())
    navigate("/")
  }
  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item" >
            <div className='ml-5'>
               <img
             src={logo}
             width="60" 
             height="60"
             alt='logo'
             />
            </div>
          </NavLink>
      
          <a href='!#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" className="navbar-menu">      
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-light">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

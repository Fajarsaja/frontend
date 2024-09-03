import Layout from './Layout'
import InventoryList from '../components/InventoryList'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const Inventory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError} = useSelector((state => state.auth))
  
    useEffect(()=> {
      dispatch(getMe())
    },[dispatch])
  
    useEffect(()=> {
      if(isError){
        navigate("/")
      }
    },[isError, navigate])
  return (
    <Layout>
        <InventoryList/>
    </Layout>
  )
}

export default Inventory

import React from 'react'
import { useSelector } from 'react-redux'

const Wellcome = () => {
  const {user} = useSelector((state) => state.auth)

  return (
    <div> 
      <h1 className='title'>Dashborard</h1>
      <h2 className='subtitle'>welcome back <strong>{ user && user.name}</strong></h2>
    </div>
   

  )
}

export default Wellcome

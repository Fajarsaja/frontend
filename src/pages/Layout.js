import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({children}) => {
  return (
    <div>
      <React.Fragment>
        <Navbar/>
        <div className='columns mt-6'>
            <div className='column is-2'><Sidebar/></div>
            <div className='column hero has-background-light is-fullheight is-fullwitdh'>
                <main>{children}</main>
            </div>
        </div>
      </React.Fragment>
    </div>
  )
}

export default Layout

import React from 'react'
import { useUserStore } from '../../context/user-store'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayout = ({children, activeMenu}) => {
    console.log(activeMenu)
    const user = useUserStore((state)=>state.user)
  return (
    <div className=''>
        <Navbar activeMenu={activeMenu}></Navbar>
        {
            user && (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu}></SideMenu>
                    </div>

                    <div className='grow mx-5'>
                        {children}
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default DashboardLayout

import React from 'react'
import { Outlet } from 'react-router'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Layout() {
  return (
    <>
        <Header />

        <main className='min-vh-100 position-relative z-0' style={{marginTop: '81px'}}>
            <Outlet />
        </main>

        <Footer />
    </>
  )
}

export default Layout
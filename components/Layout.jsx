import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Header className="fixed"></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Layout

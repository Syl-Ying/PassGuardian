import React from 'react'
import Footer from "./Footer.jsx";
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col w-screen h-screen'>
        <Navbar />
        <div className='flex-grow'>
            {children}
        </div>
        <Footer />
    </div>
  )
}

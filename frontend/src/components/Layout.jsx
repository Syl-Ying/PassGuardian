import React from 'react'
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col w-screen h-screen' >
        <Navbar />
        <div className='absolute flex-grow w-screen top-21'>
            {children}
        </div>
    </div>
  )
}

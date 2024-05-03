import RecordList from '../components/password/RecordList.jsx'
import React from 'react'
import { NavLink } from 'react-router-dom'

function PasswordPage() {
  return (
    <div className='w-screen p-4'>
      <h3 className="text-lg font-semibold">My Password</h3>
      <NavLink className="inline-flex items-center justify-center px-3 my-6 font-medium transition-colors border rounded-md whitespace-nowrap text-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-slate-100 h-9" to="/create">
          Create Record
      </NavLink>
      
      <RecordList />
      
      <h3 className="py-4 text-lg font-semibold">Shared Password</h3>
    </div>
  )
}

export default PasswordPage
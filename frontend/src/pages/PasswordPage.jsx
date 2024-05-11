import RecordList from '../components/password/RecordList.jsx'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function PasswordPage() {
  return (
    <div className='flex flex-col w-1/3 h-screen px-8 bg-gray-100 border-r border-gray-300'>
      <h1 className="flex items-center pt-4 pb-2 pr-8 mt-0 text-base font-medium border-t border-gray-300">My Password</h1>

      <div className='flex items-center gap-2 pt-4 pb-4 border-b border-gray-300'>
        <form className='relative' id="search-form" role="search">
          <input className='relative w-full p-2 pl-10 bg-white bg-left bg-no-repeat bg-contain border border-gray-300 rounded-md shadow-sm'
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
          />
          <div
              className="sr-only"
              aria-live="polite"
          ></div>
        </form>
        
        <NavLink className="p-2 font-medium text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm whitespace-nowrap text-md bg-background hover:bg-slate-100 h-9" to="/create">
          New
        </NavLink>
      </div>
      
      <nav>
        <ul>
          <RecordList className='flex-1 pt-4 overflow-auto' />
        </ul>
      </nav>
      
      <div id='detail'>
        <Outlet />
      </div>
    </div>
  )
}

export default PasswordPage
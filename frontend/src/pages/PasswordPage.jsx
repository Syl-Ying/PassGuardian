import RecordList from '../components/password/RecordList.jsx'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../components/password/password.css';

function PasswordPage() {
  return (
    <div id='passwordpage'>
      <div id="sidebar">
        <h1>Personal Password</h1>

        <div>
          <form id="search-form" role="search">
            <input id="q" aria-label="Search contacts" placeholder="Search"
              type="search" name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div id="sr-only" aria-live="polite"></div>
          </form>
          
          <form method="post">
            <button type="submit">New</button>
            <NavLink className="p-2 font-medium text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm whitespace-nowrap text-md bg-background hover:bg-slate-100 h-9" to="/create">
              New1
            </NavLink>
          </form>
        </div>
          
        <nav>
          <ul>
            <RecordList />
          </ul>
        </nav>
      </div>
      
      <div id='detail'>
        <Outlet />
      </div>
    </div>
  )
}

export default PasswordPage
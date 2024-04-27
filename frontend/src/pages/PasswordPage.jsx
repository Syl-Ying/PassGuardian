import RecordList from '../components/password/RecordList.jsx'
import React from 'react'

function PasswordPage() {
  return (
    <div className='w-screen p-4'>
      <h3 className="text-lg font-semibold">My Password</h3>
      <RecordList />
      <h3 className="py-4 text-lg font-semibold">Shared Password</h3>
    </div>
  )
}

export default PasswordPage
import React from 'react'
import { isAuth } from './helpers'
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  if (!isAuth()) {
    return <Navigate to="/login" />
  }

  return children;
}

export default RequireAuth
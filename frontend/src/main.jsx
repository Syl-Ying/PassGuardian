import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/SignupPage.jsx';
import Signin from './pages/SigninPage.jsx';
import Activate from './auth/Activate.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PasswordPage from './pages/PasswordPage.jsx';
import RequireAuth from './auth/RequireAuth.jsx';
import Record from './components/password/Record.jsx';
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element:<HomePage />,
      },
      {
        path: "/login",
        element:<Signin />,
      },
      {
        path: "/signup",
        element:<Signup />,
      },
      {
        path: "/auth/activate/:token",
        element:<Activate />,
      },
      {
        path: "/passwords",
        element: <RequireAuth><PasswordPage /></RequireAuth>,
        children: [
          {
            path: "/passwords/:recordId",
            element: <RequireAuth><Record /></RequireAuth>
          },
        ]
      },
      
      {
        path: "/edit/:recordId",
        element: <RequireAuth><Record /></RequireAuth>
      },
      {
        path: "/create/",
        element: <RequireAuth><Record /></RequireAuth>
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

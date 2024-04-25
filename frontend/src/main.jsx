import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import HomePage from './components/HomePage.jsx';
import Signup from './auth/Signup.jsx';
import Signin from './auth/Signin.jsx';
import Activate from './auth/Activate.jsx';
import ErrorPage from './components/ErrorPage.jsx';
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
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

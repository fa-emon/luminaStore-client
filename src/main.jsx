import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Routes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <div className='bg-[#FCE4FF] max-w-screen-2xl'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
  </React.StrictMode>,
)

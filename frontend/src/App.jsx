import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header';
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <>
        <Header />
        <Outlet />
      </>, 
    children: [

      {
       
      },

    ]
  }])


function App() {
  return <RouterProvider router={router} />
}

export default App
import React from 'react' 
import './style.css';
import { RouterProvider } from 'react-router-dom';
import MyRoutes from '../router/routes';
const App = () => {
  return (
   <>
   <RouterProvider router={MyRoutes}></RouterProvider></>
  )
}

export default App

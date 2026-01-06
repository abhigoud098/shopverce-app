// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Layout from './Layout'
import './App.css'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

function App() {
  // const router = createBrowserRouter(
  //   [
  //     {
  //       path:"/",
  //       element: <Layout/>,
  //       children: [
  //         {
  //           path:"/",
  //           element:<Home/>
  //         },
  //         {
  //           path:"/product",
  //           element:<Product/>
  //         },
  //         {
  //           path:"/cart",
  //           element:<Cart/>
  //         }

  //       ]
  //     }
  //   ]
  // )
  
  return (
    <>
    {/* <RouterProvider router={router}/> */}
    <Navbar/>
    <Home/>
    </>
  )
}

export default App

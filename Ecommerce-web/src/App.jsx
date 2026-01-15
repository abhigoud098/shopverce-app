import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/login/Login";
import "./App.css";
import SignUp from "./components/signUp/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/app/login",
      element: <Login />,
    },
    {
      path: "/app/Sign-up",
      element: <SignUp />,
    },
    {
      path: "/app",
      element: <Layout />,
      children: [
        { path: "/app", element: <Home /> },
        { path: "/app/product", element: <Product /> },
        { path: "/app/cart", element: <Cart /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

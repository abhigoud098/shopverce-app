import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/login/Login";
import "./App.css";
import SignUp from "./components/signUp/SignUp";
import Checkout from "./components/checkout/Checkout";
import DeliveryAddress from "./components/deliveryAddress/DeliveryAddress";

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
        { path: "/app/checkout", element: <Checkout /> },
        { path: "/app/DeliveryAddress", element: <DeliveryAddress/>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

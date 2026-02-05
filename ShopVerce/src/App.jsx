import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import "./App.css";
import SignUp from "./pages/signUp/SignUp";
import Checkout from "./pages/checkout/Checkout";
import DeliveryAddress from "./pages/deliveryAddress/DeliveryAddress";
import WishList from "./pages/wishList/WishList";
import { useContext } from "react";
import ApiContext from "./context/ApiContext";

function App() {
  const { theam } = useContext(ApiContext);

  if (theam) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

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
        { path: "/app/DeliveryAddress", element: <DeliveryAddress /> },
        { path: "/app/wishList", element: <WishList/> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

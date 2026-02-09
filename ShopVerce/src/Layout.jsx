import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sideBar/Sidebar";


function Layout() {
  return (
    <>
      <Navbar />
      <Sidebar/>
      <Outlet />
    </>
  );
}

export default Layout;

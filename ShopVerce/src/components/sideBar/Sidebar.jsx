import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart, Heart } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import ApiContext from "../../context/ApiContext";
import gsap from "gsap";

const Sidebar = () => {
  const sidebarRef = useRef(null);

  const items = [
    { id: "home", icon: Home, path: "/app" },
    { id: "products", icon: ShoppingBag, path: "/app/product" },
    { id: "cart", icon: ShoppingCart, path: "/app/cart" },
    { id: "wishlist", icon: Heart, path: "/app/wishlist" },
  ];

  const { activeHambar } = useContext(ApiContext);

  useEffect(() => {
    if (!sidebarRef.current) return;

    if (activeHambar) {
      gsap.to(sidebarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(sidebarRef.current, {
        y: -120,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  }, [activeHambar]);

  return (
    <aside ref={sidebarRef} className="sidebar">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/app"}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <Icon size={22} />
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Sidebar;

import ApiContext from "./ApiContext";
import { useEffect, useState } from "react";

function ApiContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const [theam, setTheam] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const result = await res.json();

      setData(result);
    };

    fetchProducts();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        data,
        setData,
        searchItem,
        setSearchItem,
        user,
        setUser,
        userInfo,
        setUserInfo,
        theam,
        setTheam,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiContextProvider;

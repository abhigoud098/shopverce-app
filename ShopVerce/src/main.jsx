import ReactDOM from "react-dom/client";
import App from "./App";
import ApiContextProvider from "./context/ApiContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApiContextProvider>
    <App />
  </ApiContextProvider>,
);

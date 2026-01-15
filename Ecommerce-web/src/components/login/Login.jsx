import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <>
      <div className="login">
        <div className="hader">
          <span>Welcome Back..!</span>
        </div>
        <form action="#">
          <input type="text" placeholder="Enter Name" required />
          <input type="password" placeholder="Enter A Password" required />
          <input type="button" defaultValue="Login" />
          <span>
            {" "}
            Not a member place {<Link to="/app/Sign-up">Sign-Up</Link>}
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;

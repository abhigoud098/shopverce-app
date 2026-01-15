import { Link } from "react-router-dom";
import "./SignUp.css";
import Login from "../login/Login";

function SignUp() {
  return (
    <>
      <div className="login">
        <div className="hader">
          <span>Shop verse</span>
          <p>Sing up now for batter experience</p>
        </div>
        <form action="#">
          <input type="text" placeholder="Enter Name" required />
          <input type="email" placeholder="Enter Emaill" required />
          <input type="password" placeholder="Choose A Password" required />
          <input type="password" placeholder="Re-Enter Password" required />
          <input type="button" defaultValue="Signup" />
          <span>
            {" "}
            Already a member? <Link to="/app/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp;

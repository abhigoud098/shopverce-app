import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(ApiContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );

    if (existingUser) {
      console.log(existingUser);
      setUser(existingUser);
      toast.success("Login successful");
      navigate("/app");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <div className="login">
        <div className="hader">
          <span>Welcome Back..!</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <input type="submit" value="Login" />

          <span>
            Not a member? <Link to="/app/Sign-up">Sign-Up</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;

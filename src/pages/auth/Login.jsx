import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/authStyles.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (data) => {
    dispatch(loginUser(data))
      .then((res) => {
         if (!res.error) {
         navigate("/");
      }
    });
  };

  return (
    
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              placeholder="Enter Your Email"
              className="form-control"
              {...register("email")}
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>

           <div className="mb-3" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" Enter your Password"
              {...register("password")}
              className="form-control"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "45%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            <p className="text-danger">{errors.password?.message}</p>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Logging in.." : "LOGIN"}
          </button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    
  );
};

export default Login;

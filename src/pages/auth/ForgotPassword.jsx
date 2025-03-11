import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/authStyles.css";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const passwordStrength = (newPassword) => {
    if (newPassword.length < 6) return "Very Weak";
    if (
      newPassword.match(/[A-Z]/) &&
      newPassword.match(/[0-9]/) &&
      newPassword.match(/[!@#$%^&*]/)
    )
      return "Strong";
    if (newPassword.match(/[A-Z]/) && newPassword.match(/[0-9]/)) return "Moderate";
    return "Weak";
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const passwordValue = watch("newPassword") || "";
  const strength = passwordStrength(passwordValue);

  const handleForgotPassword = async (data) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        const users = response.data;

        const user = users.find((user) => (user.email === data.email));
        
        if(!user) {
            setError("User not found. Please check your email.");
            return;
        }

        await axios.put(`${API_BASE_URL}/users/${user.id}`,{
            password:data.newPassword,
        });

        setMessage("Password reset successful! Redirecting to Login...");
        setError(null);

        setTimeout(() => {
            navigate("/login");
        },2000);
    }catch (err) {
        setError("an error occurred.");
    }
};

  return (
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit(handleForgotPassword)}>
          <h4 className="title">FORGOT PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your Email"
              className="form-control"
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>

          <div className="mb-3" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" Enter your new Password"
              {...register("newPassword")}
              className="form-control"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "29%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            <p className="text-danger">{errors.newPassword?.message}</p>
            <strong>{strength}</strong>
          </div>              

          <div className="mb-3">
            <input
              type="password"
              {...register("confirmPassword")}
              className="form-control"
              placeholder="Confirm Your Password"
            />
            <p className="text-danger">{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          {message && (
            <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
          )}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          <br />
          <p>Remember your password? </p>
          <button onClick={() => navigate("/login")} className="btn btn-primary">Login</button>
        </form>
      </div>
  );
};
export default ForgotPassword;
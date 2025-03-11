import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/authStyles.css";
import { registerUser } from "../../store/slice/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const passwordStrength = (password) => {
  if (password.length < 6) return "Very Weak";
  if (password.match(/[A-Z]/) &&
    password.match(/[0-9]/) &&
    password.match(/[!@#$%^&*]/))
    return "Strong";
  if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Moderate";
  return "Weak";
};

const validationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const passwordValue = watch("password") || "";
  const strength = passwordStrength(passwordValue);

  const handleRegister = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 100
      )}.jpg`,
    };

    const res = dispatch(registerUser(userData));
    console.log(res);
    if (!res.error) {
      navigate("/login");
    }
  };

  return (
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit(handleRegister)}>
          <h4 className="title">REGISTER FORM</h4>

          <div className="mb-3">
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your Name"
              className="form-control"
              autoFocus
            />
            <p className="text-danger">{errors.name?.message}</p>
          </div>

          <div className="mb-3">
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your Email"
              className="form-control"
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>

          <div className="mb-3">
            <input
              type="password"
              {...register("password")}
              className="form-control"
              placeholder="Enter Your Password"
            />
            <p className="text-danger">{errors.password?.message}</p>
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

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Registering..." : "REGISTER"}
          </button>
          {error && <p className="text-danger">{error}</p>}
        </form>
        <p>
          Aready have an account? <Link to="/login">Login</Link>
        </p>
      </div>
  );
};

export default Register;
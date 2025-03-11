import { useRoutes,Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import CategoryList from "../pages/CategoryList";
import CategoryProduct from "../pages/CategoryProduct";
import { useSelector } from "react-redux";
// import ProductDetails from "../pages/ProductDetails";

const AppRoutes = () => {
  const token = useSelector((state) => state.auth.token);

  const routes = useRoutes([
    !token ? 
    { path: "/login", element:<Login/>}
    : { path: "/login", element:  <Navigate to="/" />},

    !token ? 
    { path: "/register", element:<Register/>}
    : { path: "/register", element:<Navigate to="/" />},
    
    !token ? 
    { path: "/forgot-password", element:<ForgotPassword/>}
    : {path: "/forgot-password", element:<Navigate to="/" />},
    
    { path: "/" , element: token ? <HomePage/> : <Navigate to="/login" /> },

    //protected user routes
    {
      path:"/user",
      element:<ProtectedRoute />,
      children: [
        { path: "categories", element: <CategoryList/> },
        { path: "categories/:id", element: <CategoryProduct/> },
        // { path: "products/:id", element: <ProductDetails/> },
      ],
    },
    { path:"*", element: <NotFound/>} ,
  ]);
  return routes;
};

export default AppRoutes;
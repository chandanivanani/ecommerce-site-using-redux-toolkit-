import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/header.css";
import { fetchCategories } from "../../store/slice/categoriesSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state?.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    document
      .querySelectorAll(".dropdown-submenu .dropdown-toggle")
      .forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          let submenu = this.nextElementSibling;
          if (submenu) {
            submenu.classList.toggle("show");
          }
        });
      });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  // console.log("categories", categories);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  cursor="pointer"
                >
                  Categories
                </Link>

                <ul className="dropdown-menu">
                  <li className="dropdown-submenu">
                    <Link
                      className="dropdown-item dropdown-toggle"
                      to="user/categories"
                      cursor="pointer"
                    >
                      All categories
                    </Link>

                    <ul className="dropdown-menu">
                      {categories?.map((c) => (
                        <li key={c.id}>
                          <Link
                            className="dropdown-item"
                            to={`user/categories/${c.id}`}
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

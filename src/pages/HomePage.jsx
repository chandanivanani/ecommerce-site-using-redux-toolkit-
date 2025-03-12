import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "../store/slice/FilterProducts";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import Layout from "../components/Layout/Layout";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.filterProducts);

  // Local state for filters
  const [filters, setFilters] = useState({
    price_min: "",
    price_max: "",
    categoryId: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // 10 products per page

  // Function to handle input change in filters
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Function to apply filters
  const applyFilter = () => {
    setCurrentPage(1); // Reset to first page on filter apply
    fetchProducts(1);
  };

  // Function to fetch products with pagination
  const fetchProducts = (page) => {
    const offset = (page - 1) * limit;
    dispatch(fetchFilteredProducts({ ...filters, limit, offset })).then((res) => {
      if (res.payload) {
        setTotalPages(Math.ceil(res.payload.total / limit)); // Calculate total pages
      }
    });
  };

  // Fetch products when page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Function to handle pagination change
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchProducts(pageNumber);
  };

  return (
    <Layout>
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar Filter */}
        <div className="col-md-3">
          <h5>Filter Products</h5>

          <label className="form-label">Price Range</label>
          <input type="number" name="price_min" placeholder="Min Price" className="form-control mb-2" onChange={handleFilterChange} />
          <input type="number" name="price_max" placeholder="Max Price" className="form-control mb-3" onChange={handleFilterChange} />

          <label className="form-label">Category</label>
          <select name="categoryId" className="form-select mb-3" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="1">Clothes</option>
            <option value="2">Electronics</option>
            <option value="3">Furniture</option>
            <option value="4">Shoes</option>
            <option value="5">Others</option>
          </select>

          <button className="btn btn-primary w-100" onClick={applyFilter}>
            Apply Filters
          </button>
           </div>

        {/* Product List */}
        <div className="col-md-9">
          <h3 className="text-center">Products</h3>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : products?.length > 0 ? (
            <div className="row">
              {products.map((p) => (
                <div key={p.id} className="col-md-4 mb-3">
                  <div className="card">
                    <img src={p.images?.[0] || "https://via.placeholder.com/150"} className="card-img-top" alt={p.title} />
                    <div className="card-body">
                      <h5 className="card-title">{p.title}</h5>
                      <p className="card-text">{p.description.substring(0, 60)}...</p>
                      <h6 className="text-success">₹{p.price}</h6>
                      <button className="btn btn-info" onClick={() => navigate(`/user/products/${p.id}`)}>More Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-danger">No products found</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-btn ${index + 1 === currentPage ? "active" : ""}`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default HomePage;
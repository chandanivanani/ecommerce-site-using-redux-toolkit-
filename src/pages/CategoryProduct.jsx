import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchProductsByCategory } from "../store/slice/productSlice";
import "../styles/Categoryproduct.css";

const CategoryProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, category,loading } = useSelector((state) => state.products);

  useEffect(() => {
    if(id) dispatch(fetchProductsByCategory(id));
  },[id, dispatch]);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <Layout>
      <div className="container mt-3 category">
      <h4 className="text-center">Category - {category?.name || "Unknown"}</h4>
      <h6 className="text-center">{products?.length} result found</h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p.id}>
                  <img 
                    src={p.images?.[0] || "https://via.placeholder.com/150"} 
                    alt={p.title} 
                    className="card-img-top" 
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.title}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={ () => navigate(`/user/products/${p.id}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CategoryProduct;
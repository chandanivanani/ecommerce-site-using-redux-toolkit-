import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slice/categoriesSlice";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories:{error}</p>;

  return (
    <Layout>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c.id}>
              <img src={c.image} alt={c.name} className="card-img-top" />
              <div className="card" style={{cursor:"pointer"}}>
                <Link to={`/user/categories/${c.id}`}>{c.name}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryList;
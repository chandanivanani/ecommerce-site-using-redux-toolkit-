import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsById } from "../store/slice/productSlice";
import Layout from "../components/Layout/Layout";

const ProductDetails = () => {
    const {id} = useParams();
    const dispatch =  useDispatch();
    const {product,loading,error} = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductsById(id));
    },[dispatch,id]);

    if(loading) return <h2>Loading product details...</h2>;
    if(error) return <h2>Error: {error}</h2>;
    if(!product) return <h2>Product not found</h2>;
    console.log("products",product);
    
    return (
      <Layout>
        <div className="container mt-4">
          <h1>{product.title}</h1>
          <h3>Price: ${product.price}</h3> 
          <p>{product.description}</p> 
          <h4>Category: {product.category?.name}</h4>
          <img src={product.category?.image} alt={product.category?.name} width={200} />

          <h3>Product Images:</h3>
          <div className="image-gallery">
            {product.images.map((img, index) => (
                <img key={index} src={img} alt={product.title} width={150} />
            ))}
          </div>
        </div>
        </Layout>
    );
};

export default ProductDetails;
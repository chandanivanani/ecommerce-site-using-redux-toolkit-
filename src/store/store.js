import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import categoriesReducer from "./slice/categoriesSlice";
import productsReducer from "./slice/productSlice";
import FilterProductReducer from "./slice/FilterProducts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories:categoriesReducer,
    products:productsReducer,
    filterProducts:FilterProductReducer,
  },
});

export default store;
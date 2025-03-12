import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/categories/${categoryId}/products`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
    name:"products",
    initialState: {
        products:[],
        category: {},
        product: null,
        loading: false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
           .addCase(fetchProductsByCategory.pending, (state) => {
            state.loading = true;
            state.error= null;
           })
           .addCase(fetchProductsByCategory.fulfilled, (state,action) => {
            state.loading = false;
            state.products = action.payload;
            state.category = action.payload.length > 0 ? action.payload[0].category : {};
           })
           .addCase(fetchProductsByCategory.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
           })

           .addCase(fetchProductById.pending, (state) => {
            state.loading= true;
            state.error = null;
           })
           .addCase(fetchProductById.fulfilled, (state,action) => {
            state.loading = false;
            state.product = action.payload;
           })
           .addCase(fetchProductById.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
           });
    },
});

export default productSlice.reducer;

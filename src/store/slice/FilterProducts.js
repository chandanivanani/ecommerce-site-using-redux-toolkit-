import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchFilteredProducts = createAsyncThunk(
    "products/fetchFiltered",
    async({ title, price, price_min, price_max, categoryId, limit = 10, offset = 0}, {rejectWithValue}) => {
        try {
            let query = `${API_BASE_URL}/products?`;
            if (title) query += `title=${title}&`;
            if(price) query += `price=${price}&`;
            if(price_min && price_max) query += `price_min=${price_min}&price_max=${price_max}&`;
            if(categoryId) query += `categoryId=${categoryId}&`;
            query += `limit=${limit}&offset=${offset}`;

            const { data } = await axios.get(query);
            return data;
        } catch (error) {
         return rejectWithValue(error.response?.data || "Failed to fetch products");
        }
    }
);

const FilterProducts = createSlice({
    name: "filterProducts",
    initialState:{
      products: [],
      loading: false,
      error : null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchFilteredProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
           })
        .addCase (fetchFilteredProducts.fulfilled, (state,action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchFilteredProducts.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export default FilterProducts.reducer;
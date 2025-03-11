import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CATE_FETCH = `${API_BASE_URL}/categories`;

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
   const response = await axios.get(CATE_FETCH);
   console.log(response.data);
   return response.data;
});

// export const createCategory = createAsyncThunk("categories/create", async (categoryData) => {
//    const response = await axios.post(CATE_CREATE, categoryData);
//    return response.data;
// });

// export const updateCategory = createAsyncThunk("categories/update", async({id,categoryData}) => {
//     const response = await axios.put(`${API_BASE_URL}/categories/${id}`, categoryData);
//     return response.data;
// });

// export const deleteCategory = createAsyncThunk("categories/delete", async(id) => {
//     await axios.delete(`${API_BASE_URL}/categories/${id}`);
//     return id;
// });

const categoriesSlice = createSlice({
    name:"categories",
    initialState:{
        categories:[],
        loading: false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
           .addCase(fetchCategories.pending,(state) => {
               state.loading = true;
           })
           .addCase(fetchCategories.fulfilled, (state,action) => {
               state.loading = false;
               state.categories = action?.payload;
               console.log("cat",state.categories);
           })
           .addCase(fetchCategories.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.error.message;
           })
        //    .addCase(createCategory.fulfilled, (state,action) => {
        //         state.categories.push(action.payload);
        //    })
        //    .addCase(updateCategory.fulfilled, (state,action) => {
        //         const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        //         if(index !== -1) state.categories[index] = action.payload;
        //    })
        //    .addCase(deleteCategory.fulfilled, (state,action) => {
        //         state.categories = state.categories.filter((cat) => cat.id !== action.payload.id);
        //    });
    },
});

export default categoriesSlice.reducer;
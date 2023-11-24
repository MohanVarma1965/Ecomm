import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "productsList/fetchProducts",
  async ({ productsPerPage }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=${productsPerPage}`);
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    resetProductList(state) {
      state.products = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productListSlice.reducer;

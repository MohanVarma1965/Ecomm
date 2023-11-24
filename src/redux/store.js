// Importing required functions and utilities from redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart/cartSlice";
import productListReducer from "./slices/productList/productListSlice";

// Configure's the Redux store and combine all reducers
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productList: productListReducer,
  },
});

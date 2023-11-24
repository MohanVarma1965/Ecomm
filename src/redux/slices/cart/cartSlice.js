import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addItemToCart(state, action) {
      const itemToAdd = action.payload;

      // Validate that the item is not null or undefined
      if (!itemToAdd || itemToAdd.id == null) {
        console.error("Invalid item cannot be added to cart:", itemToAdd);
        return;
      }

      // Find if the item already exists in the cart
      const existingItem = state.items.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it with quantity of 1
        state.items.push({ ...itemToAdd, quantity: 1 });
      }

      // Update the total quantity and price
      state.totalQuantity += 1;
      state.totalPrice += itemToAdd.price;
    },
    // Action to remove an item from the cart
    removeItemFromCart(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);

      if (index !== -1) {
        // Directly subtract the item's total price (price * quantity) from the cart total
        state.totalPrice -= state.items[index].price * state.items[index].quantity;
        // Subtract the quantity from the total quantity
        state.totalQuantity -= state.items[index].quantity;
        // Remove the item from the cart
        state.items.splice(index, 1);
      }
    },
    // Action to clear the cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    adjustQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const item = state.items[index];
        const previousQuantity = item.quantity;
        const newQuantity = quantity < 1 ? 1 : quantity;

        // Update the individual item's quantity
        state.items[index].quantity = newQuantity;

        // Update the total quantity and total price
        state.totalQuantity = state.totalQuantity - previousQuantity + newQuantity;
        state.totalPrice = state.totalPrice - item.price * previousQuantity + item.price * newQuantity;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, adjustQuantity } = cartSlice.actions;

export default cartSlice.reducer;

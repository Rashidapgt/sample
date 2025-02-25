import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
  },
  reducers: {
    addToCart(state, action) {
      state.item.push(action.payload);
    },
    clearCart(state) {
      state.item = [];
    },
  },
});
export const { addToCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;

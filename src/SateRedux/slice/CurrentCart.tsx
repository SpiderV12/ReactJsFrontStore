import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  idProduct: number;
  nameProduct: string;
  price: number;
}

const cartItems: Product[] = [];

const userCartSlice = createSlice({
  name: "userCartItem",
  initialState: cartItems,
  reducers: {
    injectionCartItem(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    Delateallaftrbuy(state) {
      state.length = 0;
    },
    Delateallaftrbuybeforebu(state, action: PayloadAction<Product>) {
      return (state = state.filter(
        (i) => i.idProduct !== action.payload.idProduct
      ));
    },
  },
});

export const { injectionCartItem, Delateallaftrbuy, Delateallaftrbuybeforebu } =
  userCartSlice.actions;
export default userCartSlice.reducer;

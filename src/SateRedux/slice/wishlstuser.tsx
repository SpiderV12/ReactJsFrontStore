import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { id } from "zod/v4/locales";
export interface CategoryAttribute {
  key: string;
}

export interface AttributeValue {
  value: string;
  categoryAttribute: CategoryAttribute;
}

export interface ProductDetails {
  brand: string;
}

export interface ProductThing {
  imageURL: string;
}

export interface Product {
  attributeValues: AttributeValue[];
  description: string;
  nameProduct: string;
  price: number;
  productDetails: ProductDetails;
  productThing: ProductThing;
}

export interface WishlistItem {
  id: number;
  productid: number;
  userId: string;
  product: Product;
}

const initialStateWishlst: WishlistItem[] = [];
const userWishlst = createSlice({
  name: "userWishlst",
  initialState: initialStateWishlst,
  reducers: {
    injectonWishlst(state, action: PayloadAction<WishlistItem>) {
      state.push(action.payload);
      state.sort((a, b) => a.productid - b.productid);
    },
    delateitem(state, action: PayloadAction<WishlistItem>) {
      return state.filter(
        (item) => item.productid !== action.payload.productid
      );
    },
  },
});

export const { injectonWishlst, delateitem } = userWishlst.actions;
export default userWishlst.reducer;

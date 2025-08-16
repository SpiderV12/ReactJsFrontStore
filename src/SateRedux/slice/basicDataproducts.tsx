import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type Datahomeproduct = {
  id: string;
  nameProduct: string;
  description: string;
  price: number;
  productThing: {
    imageURL: string;
  };
};

const initialStateproducr: Datahomeproduct[] = [];
const userDatapoduct = createSlice({
  name: "userDataproducthome",
  initialState: initialStateproducr,
  reducers: {
    injectoDataProductHome(state, action: PayloadAction<Datahomeproduct[]>) {
      return action.payload;
    },
  },
});

export const { injectoDataProductHome } = userDatapoduct.actions;
export default userDatapoduct.reducer;

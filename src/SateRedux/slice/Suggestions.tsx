import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type Suggestions = {
  nameuser: string;
  typeSuggestions: "Improve" | "add_product" | "delete_product" | "";
  massge: string;
};
const StateSuggestions: Suggestions = {
  nameuser: "",
  typeSuggestions: "",
  massge: "",
};

const userSuggestions = createSlice({
  name: "userSuggestions",
  initialState: StateSuggestions,
  reducers: {
    MakeoneSuggestions(state, action: PayloadAction<Suggestions>) {
      return action.payload;
    },
  },
});
export const { MakeoneSuggestions } = userSuggestions.actions;
export default userSuggestions.reducer;

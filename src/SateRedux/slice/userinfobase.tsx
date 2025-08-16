import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const Userbasiinfo = createSlice({
  name: "user",
  initialState: {
    id: 0,
    username: "",
    email: "",
    phone: "",
  },
  reducers: {
    Injctionuserdata(
      state,
      action: PayloadAction<{ usrname: string; emal: string; phone: string }>
    ) {
      const { usrname, emal, phone } = action.payload;
      state.username = usrname;
      state.email = emal;
      state.phone = phone;
    },
  },
});
export const { Injctionuserdata } = Userbasiinfo.actions;
export default Userbasiinfo.reducer;

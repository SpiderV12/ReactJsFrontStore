import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserinfoRducer from "./slice/userinfobase";
import userWishlstRudecer from "./slice/wishlstuser";
import { combineReducers } from "@reduxjs/toolkit";
import UserSuggRuder from "./slice/Suggestions";
import userDataproductReducer from "./slice/basicDataproducts";
import userCartSliceReducer from "./slice/CurrentCart";
const persistConfig = {
  key: "stats",
  storage,
};
const rootReducer = combineReducers({
  userinfo: UserinfoRducer,
  userWishL: userWishlstRudecer,
  userSugg: UserSuggRuder,
  basicproudct: userDataproductReducer,
  userCart: userCartSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // إيقاف الفحص
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

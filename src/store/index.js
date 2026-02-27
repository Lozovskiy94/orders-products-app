import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import ordersReducer from "./ordersSlice";
import uiReducer from "./uiSlice";
import groupsReducer from "./groupsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    ui: uiReducer,
    groups: groupsReducer,
  },
});
import { createSlice } from "@reduxjs/toolkit";
import { orders as mockOrders } from "../mock/data";

const initialState = {
  items: mockOrders.map((o) => ({
    id: o.id,
    title: o.title,
    date: o.date,
    description: o.description || "",
    count: o.count ?? 0,
    total: o.total ?? 0,
    currency: o.currency ?? "UAH",
  })),
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ title, count, total, date }) {
        const id = Date.now();
        return {
          payload: {
            id,
            title: (title || "").trim(),
            count: Number(count) || 0,
            total: Number(total) || 0,
            currency: "UAH",
            date, 
            description: "",
          },
        };
      },
    },

    deleteOrder(state, action) {
      state.items = state.items.filter((o) => o.id !== action.payload);
    },
  },
});

export const { addOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { products as mockProducts } from "../mock/data";

const initialState = { items: mockProducts };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearOrderFromProducts(state, action) {
  const orderId = action.payload;
  state.items = state.items.map((p) =>
    p.order === orderId ? { ...p, order: null } : p
  );
},
    deleteProductsByType(state, action) {
  const type = action.payload;
  state.items = state.items.filter((p) => p.type !== type);
},
    deleteProduct(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    addProduct: {
  reducer(state, action) {
    state.items.push(action.payload);
  },
  prepare({ type, title, serialNumber, isNew, specification, priceUAH, priceUSD }) {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const uah = Number(priceUAH);
    const usd = priceUSD == null || priceUSD === "" ? null : Number(priceUSD);

    return {
      payload: {
        id: crypto.randomUUID(),   
        serialNumber: Number(serialNumber) || Math.floor(Math.random() * 900000) + 100000,
        isNew: isNew ? 1 : 0,
        photo: "pathToFile.jpg",
        title: title?.trim() || "New Product",
        type,                           
        specification: specification?.trim() || "",
        guarantee: { start: now, end: now },
        price: [
          ...(usd != null ? [{ value: usd, symbol: "USD", isDefault: 0 }] : []),
          { value: uah || 0, symbol: "UAH", isDefault: 1 },
        ],
        order: null,
        date: now,
      },
    };
  },
},
  },
});

export const { deleteProduct, addProduct, deleteProductsByType, clearOrderFromProducts } = productsSlice.actions;
export default productsSlice.reducer;
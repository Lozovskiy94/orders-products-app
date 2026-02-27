import { createSlice, nanoid } from "@reduxjs/toolkit";
import { products as mockProducts } from "../mock/data";

const uniqueTypes = Array.from(
  new Set((mockProducts ?? []).map((p) => p.type).filter(Boolean))
);

const initialState = {
  items: uniqueTypes.map((t) => ({
    id: t,         
    title: t,
    createdAt: "2017-10-06", 
  })),
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    deleteGroup(state, action) {
  const id = action.payload;
  state.items = state.items.filter((g) => g.id !== id);
},
    addGroup: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(title) {
        const safeTitle = (title ?? "").trim() || `Group ${Date.now()}`;
        return {
          payload: {
            id: safeTitle,    
            title: safeTitle,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const addGroupIfUnique = (title) => (dispatch, getState) => {
  const name = (title || "").trim();
  if (!name) return false;

  const normalized = name.toLowerCase();

  const existing = getState().groups.items.some(
    (g) => (g.title || "").trim().toLowerCase() === normalized
  );

  if (existing) {
    alert("Группа с таким названием уже существует. Введите другое название.");
    return false;
  }

  dispatch(addGroup({ title: name }));
  return true;
};

export const { addGroup, deleteGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
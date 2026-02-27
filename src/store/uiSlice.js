import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOrderId: null,
  selectedGroupId: null,
  activeTabsCount: 1,

  searchQuery: "",

  filters: {
    type: "ALL",       
    condition: "ALL", 
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectOrder(state, action) {
      state.selectedOrderId = action.payload;
    },

    selectGroup(state, action) {
      state.selectedGroupId = action.payload;
    },

    clearSelectedGroup(state) {
      state.selectedGroupId = null;
    },

    setActiveTabsCount(state, action) {
      state.activeTabsCount = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    setTypeFilter(state, action) {
      state.filters.type = action.payload;
    },

    setConditionFilter(state, action) {
      state.filters.condition = action.payload;
    },

    clearProductFilters(state) {
      state.searchQuery = "";
      state.filters.type = "ALL";
      state.filters.condition = "ALL";
    },
  },
});

export const {
  selectOrder,
  selectGroup,
  clearSelectedGroup,
  setActiveTabsCount,
  setSearchQuery,

  setTypeFilter,
  setConditionFilter,
  clearProductFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
import { createSelector } from "@reduxjs/toolkit";


export const selectProducts = (state) => state.products.items;
export const selectOrders = (state) => state.orders.items;
export const selectGroupsBase = (state) => state.groups.items;

export const selectSelectedGroupId = (state) => state.ui.selectedGroupId;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectTypeFilter = (state) => state.ui.filters.type;
export const selectConditionFilter = (state) => state.ui.filters.condition;


export const selectProductTypes = createSelector([selectProducts], (products) =>
  Array.from(new Set(products.map((p) => p.type).filter(Boolean))).sort()
);


export const selectGroups = createSelector(
  [selectGroupsBase, selectProducts],
  (groups, products) => {
    const countMap = new Map();
    for (const p of products) {
      const key = p.type || "Без типа";
      countMap.set(key, (countMap.get(key) ?? 0) + 1);
    }

    return groups.map((g) => ({
      ...g,
      products: products.filter((p) => (p.type || "Без типа") === g.id),
      count: countMap.get(g.id) ?? 0,
    }));
  }
);


export const selectSelectedGroup = createSelector(
  [selectSelectedGroupId, selectGroups],
  (id, groups) => {
    if (!id) return null;
    return groups.find((g) => g.id === id) ?? null;
  }
);

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchQuery, selectTypeFilter, selectConditionFilter],
  (products, searchQuery, typeFilter, conditionFilter) => {
    let items = products;

    if (typeFilter !== "ALL") {
      items = items.filter((p) => p.type === typeFilter);
    }

    if (conditionFilter !== "ALL") {
      items = items.filter((p) => {
        const isNew = p.isNew === 1 || p.isNew === true;
        return conditionFilter === "NEW" ? isNew : !isNew;
      });
    }

    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
      items = items.filter((p) => {
        const haystack = [
          p.title,
          p.type,
          p.specification,
          String(p.serialNumber),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });
    }

    return items;
  }

  
);

export const selectGroupsFromProducts = createSelector(
  [
    selectGroupsBase,
    selectProducts,
    selectFilteredProducts,
    selectSearchQuery,
    selectTypeFilter,
    selectConditionFilter,
  ],
  (groups, allProducts, filteredProducts, q, typeFilter, conditionFilter) => {
    const hasAnyFilter =
      (q || "").trim() !== "" || typeFilter !== "ALL" || conditionFilter !== "ALL";


    const source = hasAnyFilter ? filteredProducts : allProducts;

    const countMap = new Map();
    for (const p of source) {
      const key = p.type || "Без типа";
      countMap.set(key, (countMap.get(key) ?? 0) + 1);
    }

    const result = groups.map((g) => ({
      ...g,
      products: source.filter((p) => (p.type || "Без типа") === g.id),
      count: countMap.get(g.id) ?? 0,
    }));


    return hasAnyFilter ? result.filter((g) => g.count > 0) : result;
  }
);


export const selectSelectedGroupFromFiltered = createSelector(
  [selectSelectedGroupId, selectGroupsFromProducts],
  (id, groups) => {
    if (!id) return null;
    return groups.find((g) => g.id === id) ?? null;
  }
);

export const selectOrderProducts = (orderId) =>
  createSelector([selectProducts], (products) =>
    products.filter((p) => p.order === orderId)
  );

  export const selectFilteredOrders = createSelector(
  [selectOrders, selectSearchQuery],
  (orders, searchQuery) => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return orders;

    return orders.filter((o) => {
      const haystack = [
        o.title,
        o.description,
        o.date,
        String(o.count ?? ""),
        String(o.total ?? ""),
        o.currency,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }
);
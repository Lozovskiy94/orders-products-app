export const buildGroupsFromProducts = (products) => {
  const map = new Map();

  for (const p of products) {
    const key = p.type || "Без типа";    
    if (!map.has(key)) {
      map.set(key, { id: key, title: key, products: [] });
    }
    map.get(key).products.push(p);
  }

  return Array.from(map.values());
};
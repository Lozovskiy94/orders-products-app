export const isTruthy01 = (v) => v === 1 || v === true;

export const getDefaultPrice = (product) => {
  const list = product?.price ?? [];
  return list.find((x) => isTruthy01(x.isDefault)) ?? list[0] ?? null;
};

export const sumOrderDefaultPrices = (products) => {
  return (products ?? []).reduce((sum, p) => {
    const dp = getDefaultPrice(p);
    return sum + (dp?.value ?? 0);
  }, 0);
};


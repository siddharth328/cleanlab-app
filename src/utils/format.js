export function inr(paise) {
  return "₹" + (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
export function effectivePrice(product) {
  return product.sale ?? product.price;
}

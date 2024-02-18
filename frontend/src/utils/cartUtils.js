export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // calculate shipping price (if order is over $100 then free, else $10 shipping)
  const shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // calculate tax price (15% tax)
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  state.taxPrice = addDecimals(taxPrice);

  // calculate total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

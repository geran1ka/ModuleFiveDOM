export const totalPriceAllProduct = (arr) =>
  arr.reduce((acc, item) => (acc + (item.count * item.price -
    item.count * item.price * (item.discount ? item.discount : 0) / 100)), 0);

export const getTotalPricePage = (arr) => {
  const totalPricePage = document.querySelector('.text-price__all');
  return totalPricePage.textContent = '$' + Math.round(totalPriceAllProduct(arr));
};


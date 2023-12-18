export const formatNumber = {
  toEuroCurrency,
};

function toEuroCurrency(number: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);
}

import { StockEntry, StockOut } from "../entities/stock";


export const resumeFunctions = {
  SumStockEntriesQuantity,
  SumStockOutsQuantity,
  SumTotalCost,
  SumTotalStockEntriesCost,
  SumTotalPrice,
  SumTotalStockOutsPrice,
};

function SumStockEntriesQuantity(array: StockEntry[] | undefined) {
  if (array === undefined) return 0;
  return array.reduce((acc, cur) => acc + cur.quantity, 0);
}

function SumStockOutsQuantity(array: StockOut[] | undefined) {
  if (array === undefined) return 0;
  return array.reduce((acc, cur) => acc + cur.quantity, 0);
}

function SumTotalCost(stockEntry: StockEntry) {
  return stockEntry.quantity * stockEntry.unitCost;
}

function SumTotalStockEntriesCost(array: StockEntry[] | undefined) {
  if (array === undefined) return 0;

  const total = array.reduce(
    (acc, cur) => acc + cur.quantity * cur.unitCost,
    0
  );
  return total;
}

function SumTotalPrice(stockOut: StockOut) {
  const totalCur = stockOut.quantity * stockOut.unitPrice;
  if (stockOut.discount === undefined) return totalCur;
  if (stockOut.discount === 0) return totalCur;
  return totalCur - (totalCur / 100) * stockOut.discount;
}

function SumTotalStockOutsPrice(array: StockOut[] | undefined) {
  if (array === undefined) return 0;

  const total = array.reduce((acc, cur) => {
    const totalCur = cur.quantity * cur.unitPrice;
    if (cur.discount === undefined) return totalCur;
    if (cur.discount === 0) return totalCur;
    return acc + (totalCur - (totalCur / 100) * cur.discount);
  }, 0);

  return total;
}

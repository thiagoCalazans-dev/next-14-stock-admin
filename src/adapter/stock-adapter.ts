import { Stock } from "@/domain/stock";
import { StockDatabaseType } from "@/db/stock";
import { FormStockEntry } from "@/components/forms/stock-entry-form";
import { StockEntry } from "@/domain/stock-entry";
import { StockEntryDTO } from "@/actions/stock-entry";
import { FormStockOut } from "@/components/forms/stock-out-form";
import { StockOutDTO } from "@/actions/stock-out";

export const adapterStock = {
  dbToDomain,
  formStockEntryToAction,
  formStockOutToAction,
};

function dbToDomain(dbStock: StockDatabaseType): Stock {
  const stock: Stock = {
    id: dbStock.id,
    product: {
      name: dbStock.product.name,
      brand: dbStock.product.brand.name,
      color: dbStock.product.color.name,
      size: dbStock.product.size.name,
      category: dbStock.product.category.name,
      code: dbStock.product.code,
      price: Number(dbStock.product.price),
      id: dbStock.product.id,
    },
    quantity: dbStock.quantity,
  };
  return Stock.parse(stock);
}

function formStockEntryToAction(formValues: FormStockEntry) {
  const stockEntry: StockEntryDTO = {
    date: new Date(formValues.date),
    productCode: formValues.productCode.trim(),
    quantity: Number(formValues.quantity),
    unitCost: Number(formValues.unitCost),
  };

  return stockEntry;
}

function formStockOutToAction(formValues: FormStockOut) {
  const stockEntry: StockOutDTO = {
    date: new Date(formValues.date),
    productCode: formValues.productCode.trim(),
    quantity: Number(formValues.quantity),
    unitPrice: Number(formValues.unitPrice),
    discount: Number(formValues.discount),
  };

  return stockEntry;
}

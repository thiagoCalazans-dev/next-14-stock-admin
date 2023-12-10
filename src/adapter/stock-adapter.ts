import { Stock, StockEntry, StockOut } from "@/domain/entities/stock";
import { StockDatabaseType, StockProductDatabaseType } from "@/db/stock";
import { FormStockEntry } from "@/components/forms/stock-entry-form";
import { StockEntryDTO } from "@/actions/stock-entry";
import { FormStockOut } from "@/components/forms/stock-out-form";
import { StockOutDTO } from "@/actions/stock-out";

export const adapterStock = {
  dbStockToDomain,
  formStockEntryToAction,
  formStockOutToAction,
  dbStockProductToDomain,
};

function dbStockToDomain(dbStock: StockDatabaseType): Stock {
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

function dbStockProductToDomain(dbStock: StockProductDatabaseType) {
  console.log(dbStock);
  const stockEntries = dbStock.StockEntry.map((entry) => {
    const StockEntry: StockEntry = {
      id: entry.id,
      date: entry.date,
      quantity: entry.quantity,
      unitCost: Number(entry.unit_cost),
    };

    return StockEntry;
  });

  const stockOuts = dbStock.StockOut.map((out) => {
    const StockOut: StockOut = {
      id: out.id,
      date: out.date,
      quantity: out.quantity,
      unitPrice: Number(out.unit_price),
      discount: Number(out.discount),
    };

    return StockOut;
  });

  const stock: Stock = {
    id: dbStock.id,
    product: {
      name: dbStock.name,
      brand: dbStock.brand.name,
      color: dbStock.color.name,
      size: dbStock.size.name,
      category: dbStock.category.name,
      code: dbStock.code,
      price: Number(dbStock.price),
      id: dbStock.id,
    },
    quantity: dbStock.Stock[0].quantity,
    stockEntries: stockEntries,
    stockOuts: stockOuts,
  };
  return Stock.parse(stock);
}

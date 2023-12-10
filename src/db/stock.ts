import { Stock } from "@/domain/stock";
import { db, dbType } from "./config";
import { SendToBackIcon } from "lucide-react";
import { truncate } from "fs";
import { adapterStock } from "@/adapter/stock-adapter";
import internal from "stream";

const dbStockValidator = dbType.validator<dbType.StockDefaultArgs>()({
  include: {
    product: {
      include: { brand: true, category: true, color: true, size: true },
    },
  },
});

export type StockDatabaseType = dbType.StockGetPayload<typeof dbStockValidator>;

async function getAll(): Promise<Stock[]> {
  const dbStocks = await db.stock.findMany({
    include: {
      product: {
        include: {
          brand: true,
          category: true,
          color: true,
          size: true,
        },
      },
    },
  });
  const stock = dbStocks.map((dbStock) => adapterStock.dbToDomain(dbStock));
  return stock;
}

interface StockEntry {
  date: Date;
  quantity: number;
  unitCost: number;
  productCode: string;
}

async function findStockProductByCodeWithEntriesAndOuts(code: string) {
  await db.product.findUnique({
    where: {
      code: code,
    },
    include: {},
  });
}

async function stockEntry(data: StockEntry): Promise<void> {
  await db.$transaction(async (trx) => {
    await trx.stockEntry.create({
      data: {
        date: data.date,
        quantity: data.quantity,
        product_code: data.productCode,
        unit_cost: data.unitCost,
      },
    });
    await trx.stock.upsert({
      where: {
        product_code: data.productCode,
      },
      update: {
        quantity: {
          increment: data.quantity,
        },
      },
      create: {
        product_code: data.productCode,
        quantity: data.quantity,
      },
    });
  });
}

interface StockOut {
  date: Date;
  quantity: number;
  unitPrice: number;
  discount: number;
  productCode: string;
}

async function stockOut(data: StockOut): Promise<void> {
  await db.$transaction(async (trx) => {
    await trx.stockOut.create({
      data: {
        date: data.date,
        quantity: data.quantity,
        product_code: data.productCode,
        unit_price: data.unitPrice,
        discount: data.discount,
      },
    });

    await trx.stock.upsert({
      where: {
        product_code: data.productCode,
      },
      update: {
        quantity: {
          decrement: data.quantity,
        },
      },
      create: {
        product_code: data.productCode,
        quantity: data.quantity,
      },
    });
  });
}

export const dbStock = {
  getAll,
  stockEntry,
  stockOut,
};

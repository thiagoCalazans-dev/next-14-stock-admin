import { schema } from "@/infra/schema";
import { Product } from "./product";

const stockEntrySkeleton = {
  date: schema.date(),
  quantity: schema.number().positive(),
  unitCost: schema.number(),
};

const stockOutSkeleton = {
  date: schema.date(),
  quantity: schema.number().positive(),
  unitPrice: schema.number(),
  discount: schema.number().min(0).max(100).default(0).optional(),
};

const StockEntry = schema.object(stockEntrySkeleton);
export type StockEntry = schema.infer<typeof StockEntry>;
const StockOut = schema.object(stockOutSkeleton);
export type StockOut = schema.infer<typeof StockOut>;

const stockSkeleton = {
  id: schema.string(),
  product: Product,
  quantity: schema.number().positive(),
  stockEntries: schema.object(stockEntrySkeleton).array().optional(),
  stockOuts: schema.object(stockOutSkeleton).array().optional(),
};

export const Stock = schema.object(stockSkeleton);
export type Stock = schema.infer<typeof Stock>;

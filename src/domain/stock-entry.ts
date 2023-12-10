import { schema } from "@/infra/schema";
import { Product } from "./product";

const stockEntrySkeleton = {
  id: schema.string(),
  product: Product,
  quantity: schema.coerce.number().positive(),
  unitCost: schema.coerce.number(),
  date: schema.date(),
};

export const StockEntry = schema.object(stockEntrySkeleton).required();
export type StockEntry = schema.infer<typeof StockEntry>;

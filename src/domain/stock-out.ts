import { schema } from "@/infra/schema";
import { Product } from "./product";

const stockOutSkeleton = {
  id: schema.string(),
  product: Product,
  quantity: schema.number().positive(),
  date: schema.string().datetime(),
  price: schema.coerce.number(),
  discount: schema.coerce.number().min(0).max(100),
};

export const StockOut = schema.object(stockOutSkeleton).required();
export type StockOut = schema.infer<typeof StockOut>;

import { schema } from "@/infra/schema";

const productSkeleton = {
  id: schema.string(),
  name: schema.string(),
  code: schema.string(),
  brand: schema.string(),
  category: schema.string(),
  size: schema.string(),
  color: schema.string(),
  price: schema.number(),
};

export const Product = schema.object(productSkeleton).required();
export type Product = schema.infer<typeof Product>;

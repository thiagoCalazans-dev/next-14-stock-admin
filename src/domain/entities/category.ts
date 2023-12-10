import { schema } from "@/infra/schema";

const categorySkeleton = {
  id: schema.string(),
  name: schema.string(),
};

export const Category = schema.object(categorySkeleton).required();
export type Category = schema.infer<typeof Category>;

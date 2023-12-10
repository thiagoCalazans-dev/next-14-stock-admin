import { schema } from "@/infra/schema";

const brandSkeleton = {
  id: schema.string(),
  name: schema.string(),
};

export const Brand = schema.object(brandSkeleton).required();
export type Brand = schema.infer<typeof Brand>;

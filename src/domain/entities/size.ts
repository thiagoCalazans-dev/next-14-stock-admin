import { schema } from "@/infra/schema";

const sizeSkeleton = {
  id: schema.string(),
  name: schema.string(),
  value: schema.string(),
};

export const Size = schema.object(sizeSkeleton).required();
export type Size = schema.infer<typeof Size>;

import { schema } from "@/infra/schema";

const colorSkeleton = {
  id: schema.string(),
  name: schema.string(),
  hexadecimal: schema.string().length(7),
};

export const Color = schema.object(colorSkeleton).required();
export type Color = schema.infer<typeof Color>;

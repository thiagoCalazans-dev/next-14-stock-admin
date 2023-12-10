import { Category } from "@/domain/entities/category";
import { Category as prismaCategory } from "@prisma/client";

export const adapterCategory = {
  dbToDomain,
};

type dbCategory = prismaCategory;

function dbToDomain(category: dbCategory): Category {
  return Category.parse(category);
}

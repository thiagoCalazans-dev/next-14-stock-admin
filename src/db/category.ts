import { Category } from "@/domain/category";
import { db } from "./config";
import { adapterCategory } from "@/adapter/category-adapter";

async function getAll(): Promise<Category[]> {
  const dbCategories = await db.category.findMany();

  const categories = dbCategories.map((dbCategory) =>
    adapterCategory.dbToDomain(dbCategory)
  );
  return categories;
}

interface saveCategory {
  name: string;
}

async function save(data: saveCategory): Promise<void> {
  await db.category.create({
    data: {
      name: data.name,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.category.delete({
    where: {
      id,
    },
  });
}
export const dbCategory = {
  getAll,
  save,
  remove,
};

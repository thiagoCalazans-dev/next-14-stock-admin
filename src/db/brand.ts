import { Brand } from "@/domain/entities/brand";
import { db } from "./config";
import { adapterBrand } from "@/adapter/brand-adapter";

async function getAll(): Promise<Brand[]> {
  const dbCategories = await db.brand.findMany();

  const categories = dbCategories.map((dbBrand) =>
    adapterBrand.dbToDomain(dbBrand)
  );
  return categories;
}

interface saveBrand {
  name: string;
}

async function save(data: saveBrand): Promise<void> {
  await db.brand.create({
    data: {
      name: data.name,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.brand.delete({
    where: {
      id,
    },
  });
}
export const dbBrand = {
  getAll,
  save,
  remove,
};

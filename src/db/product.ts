import { db, dbType } from "./config";
import { adapterProduct } from "@/adapter/product-adapter";
import { Product } from "@/domain/entities/product";

const dbProductValidator = dbType.validator<dbType.ProductDefaultArgs>()({
  include: { brand: true, category: true, color: true, size: true },
});

export type dbProduct = dbType.ProductGetPayload<typeof dbProductValidator>;

async function getAll(): Promise<Product[]> {
  const dbProducts = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      color: true,
      size: true,
    },
  });

  const products = dbProducts.map((dbProduct) =>
    adapterProduct.dbToDomain(dbProduct)
  );
  return products;
}

interface saveProduct {
  name: string;
  code: string;
  price: number;
  brandId: string;
  categoryId: string;
  colorId: string;
  sizeId: string;
}

async function save(data: saveProduct): Promise<void> {
  await db.product.create({
    data: {
      name: data.name,
      code: data.code,
      price: data.price,
      brand_id: data.brandId,
      category_id: data.categoryId,
      color_id: data.colorId,
      size_id: data.sizeId,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.product.delete({
    where: {
      id,
    },
  });
}
export const dbProduct = {
  getAll,
  save,
  remove,
};

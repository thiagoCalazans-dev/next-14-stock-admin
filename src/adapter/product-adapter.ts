import { Product } from "@/domain/entities/product";
import { dbProduct } from "@/db/product";

export const adapterProduct = {
  dbToDomain,
};

function dbToDomain(dbProduct: dbProduct): Product {
  const product: Product = {
    name: dbProduct.name,
    brand: dbProduct.brand.name,
    category: dbProduct.category.name,
    color: dbProduct.color.name,
    code: dbProduct.code,
    price: Number(dbProduct.price),
    size: dbProduct.size.name,
    id: dbProduct.id,
  };

  return Product.parse(product);
}

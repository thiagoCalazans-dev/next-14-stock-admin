import { dbBrand } from "@/db/brand";
import { dbCategory } from "@/db/category";
import { dbColor } from "@/db/color";
import { dbSize } from "@/db/size";
import { ClientProductModal } from "./client-product-modal";

export async function ProductModal() {
  const brands = await dbBrand.getAll();
  const colors = await dbColor.getAll();
  const categories = await dbCategory.getAll();
  const sizes = await dbSize.getAll();

  return (
    <ClientProductModal
      brands={brands}
      colors={colors}
      categories={categories}
      sizes={sizes}
    />
  );
}

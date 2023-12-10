import { ColorModal } from "@/components/modals/color-modal";
import { ColorTable } from "@/components/tables/color-table";
import { ProductTable } from "@/components/tables/product-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ProductModal } from "@/components/modals/product-modal";
import { dbProduct } from "@/db/product";

export default async function Page() {
  const products = await dbProduct.getAll();

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Produtos" />
        <ProductModal />
      </div>
      <Separator />
      <ProductTable data={products} />
    </div>
  );
}

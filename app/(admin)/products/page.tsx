import { ColorModal } from "@/components/modals/color-modal";
import { ColorTable } from "@/components/tables/color-table";
import { ProductTable } from "@/components/tables/product-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ProductModal } from "@/components/modals/product-modal";

export default async function Page() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Produtos" />
          <ProductModal />
        </div>
        <Separator />
        <Suspense
          fallback={
            <div className="h-96 p-11">
              <Skeleton />
            </div>
          }
        >
          <ProductTable />
        </Suspense>
      </div>
    </div>
  );
}

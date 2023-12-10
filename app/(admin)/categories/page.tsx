import { CategoryModal } from "@/components/modals/category-modal";
import { CategoryTable } from "@/components/tables/category-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Categorias" />
        <CategoryModal />
      </div>
      <Separator />
      <Suspense
        fallback={
          <div className="h-96 p-11 bg-red-500">
            <Skeleton />
          </div>
        }
      >
        <CategoryTable />
      </Suspense>
    </div>
  );
}

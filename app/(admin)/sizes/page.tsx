import { SizeModal } from "@/components/modals/size-modal";
import { SizeTable } from "@/components/tables/size-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Tamanhos" />
        <SizeModal />
      </div>
      <Separator />
      <Suspense
        fallback={
          <div className="h-96 p-11">
            <Skeleton />
          </div>
        }
      >
        <SizeTable />
      </Suspense>
    </div>
  );
}

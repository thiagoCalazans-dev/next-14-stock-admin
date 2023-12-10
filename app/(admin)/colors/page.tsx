import { ColorModal } from "@/components/modals/color-modal";
import { ColorTable } from "@/components/tables/color-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Cores" />
        <ColorModal />
      </div>
      <Separator />
      <Suspense
        fallback={
          <div className="h-96 p-11">
            <Skeleton />
          </div>
        }
      >
        <ColorTable />
      </Suspense>
    </div>
  );
}

import { StockEntryModal } from "@/components/modals/stock-entry-modal";
import { StockTable } from "@/components/tables/stock-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Estoque" />
        <StockEntryModal />
      </div>
      <Separator />
      <StockTable />
    </div>
  );
}

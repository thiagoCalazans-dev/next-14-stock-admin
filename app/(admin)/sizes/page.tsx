import { SizeModal } from "@/components/modals/size-modal";
import { SizeTable } from "@/components/tables/size-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { dbSize } from "@/db/size";

export default async function Page() {
  const sizes = await dbSize.getAll();

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Tamanhos" />
        <SizeModal />
      </div>
      <Separator />
      <SizeTable data={sizes} />
    </div>
  );
}

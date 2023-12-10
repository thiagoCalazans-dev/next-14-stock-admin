import { BrandModal } from "@/components/modals/brand-modal";
import { BrandTable } from "@/components/tables/brand-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { dbBrand } from "@/db/brand";

export default async function Page() {
  const brands = await dbBrand.getAll();

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Marcas" />
        <BrandModal />
      </div>
      <Separator />
      <BrandTable data={brands} />
    </div>
  );
}

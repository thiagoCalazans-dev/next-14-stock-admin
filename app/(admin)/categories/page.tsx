import { CategoryModal } from "@/components/modals/category-modal";
import { CategoryTable } from "@/components/tables/category-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { dbCategory } from "@/db/category";

export default async function Page() {
  const categories = await dbCategory.getAll();

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Categorias" />
        <CategoryModal />
      </div>
      <Separator />
      <CategoryTable data={categories} />
    </div>
  );
}

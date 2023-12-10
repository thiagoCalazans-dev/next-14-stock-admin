import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { dbBrand } from "@/db/brand";
import { RemoveBrandButton } from "../buttons/remove-brand-button";

export async function BrandTable() {
  const brands = await dbBrand.getAll();

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand) => {
            return (
              <TableRow key={brand.id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <RemoveBrandButton id={brand.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

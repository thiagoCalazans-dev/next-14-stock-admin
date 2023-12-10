import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";

import { RemoveBrandButton } from "../buttons/remove-brand-button";
import { Brand } from "@/domain/entities/brand";

interface BrandTableProps {
  data: Brand[];
}

export async function BrandTable({ data }: BrandTableProps) {
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
          {data.map((brand) => {
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

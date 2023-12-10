import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { RemoveCategoryButton } from "../buttons/remove-category-button";
import { Category } from "@/domain/entities/category";

interface CategoryTableProps {
  data: Category[];
}

export async function CategoryTable({ data }: CategoryTableProps) {
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
          {data.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <RemoveCategoryButton id={category.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

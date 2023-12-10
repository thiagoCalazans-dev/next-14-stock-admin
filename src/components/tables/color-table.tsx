import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { dbColor } from "@/db/color";
import { RemoveCategoryButton } from "../buttons/remove-color-button";

export async function ColorTable() {
  const categories = await dbColor.getAll();

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Hexadecimal</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((color) => {
            return (
              <TableRow key={color.id}>
                <TableCell>{color.name}</TableCell>
                <TableCell>{color.hexadecimal}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <RemoveCategoryButton id={color.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

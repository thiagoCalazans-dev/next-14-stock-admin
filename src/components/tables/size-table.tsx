import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { RemoveCategoryButton } from "../buttons/remove-size-button";
import { Size } from "@/domain/entities/size";

interface SizeTableProps {
  data: Size[];
}

export async function SizeTable({ data }: SizeTableProps) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Sigla</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((size) => {
            return (
              <TableRow key={size.id}>
                <TableCell>{size.name}</TableCell>
                <TableCell>{size.value}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <RemoveCategoryButton id={size.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

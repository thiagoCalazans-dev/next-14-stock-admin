import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { RemoveProductButton } from "../buttons/remove-product-button";
import { Product } from "@/domain/entities/product";

interface ProductTableProps {
  data: Product[];
}

export async function ProductTable({ data }: ProductTableProps) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Cor</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead className="flex justify-end items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <RemoveProductButton id={product.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

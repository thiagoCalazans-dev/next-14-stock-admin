import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../../ui/table";
import { dbStock } from "@/db/stock";
import { StockTableBody } from "./table-body";

export async function StockTable() {
  const stocks = await dbStock.getAll();

  return (
    <>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <StockTableBody stocks={stocks} />
        </Table>
      </div>
    </>
  );
}

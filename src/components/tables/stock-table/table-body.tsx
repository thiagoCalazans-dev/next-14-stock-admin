"use client";

import { useStockOutModal } from "@/hooks/use-stock-out-modal";
import { TableRow, TableBody, TableCell } from "../../ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "@/infra/icons";
import { useStockEntryModal } from "@/hooks/use-stock-entry-modal";

export function StockTableBody({ stocks }: any) {
  const { StockOutModal, StockOutModalTrigger } = useStockOutModal();
  const { StockEntryModal, StockEntryModalTrigger } = useStockEntryModal();

  return (
    <>
      <TableBody>
        {stocks.map((stock: any) => {
          return (
            <TableRow key={stock.id}>
              <TableCell>{stock.product.name}</TableCell>
              <TableCell>{stock.product.code}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>{stock.product.price}</TableCell>
              <TableCell>{stock.product.brand}</TableCell>
              <TableCell>{stock.product.color}</TableCell>
              <TableCell>{stock.product.category}</TableCell>
              <TableCell>{stock.product.size}</TableCell>

              <TableCell className="flex gap-4 items-center justify-center ">
                <StockOutModalTrigger
                  initialData={{
                    productCode: stock.product.code,
                    unitPrice: stock.product.price,
                  }}
                />
                <Button variant="outline" className="" asChild>
                  <Link href={`/stock/${stock.product.code}`}>
                    <Search />
                  </Link>
                </Button>
                <StockEntryModalTrigger productCode={stock.product.code} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <StockOutModal />
      <StockEntryModal />
    </>
  );
}

"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";

import { StockEntryForm } from "../forms/stock-entry-form";

export function StockEntryModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Entrada de Produtos</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entrada</DialogTitle>
          <DialogDescription>
            Atualize seu estoque com uma nova compra
          </DialogDescription>
        </DialogHeader>
        <StockEntryForm />
      </DialogContent>
    </Dialog>
  );
}

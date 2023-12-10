"use client";

import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { StockEntryForm } from "@/components/forms/stock-entry-form";

type initalData = {
  productCode: string;
};

export function useStockEntryModal() {
  const [modalState, setModalState] = useState(false);
  const [initialData, setInitialData] = useState<initalData>({} as initalData);
  function onChange(open: boolean) {
    if (!open) {
      setModalState(false);
    }
  }

  function openModal(initialData: initalData) {
    setInitialData(initialData);
    setModalState(true);
  }

  function StockEntryModalTrigger(initialData: initalData) {
    return (
      <Button className="flex gap-2" onClick={() => openModal(initialData)}>
        <PlusIcon />
      </Button>
    );
  }

  function StockEntryModal() {
    return (
      <Dialog open={modalState} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Entrada</DialogTitle>
            <DialogDescription>
              Atualize seu estoque com uma nova compra
            </DialogDescription>
          </DialogHeader>
          <StockEntryForm initialData={initialData} />
        </DialogContent>
      </Dialog>
    );
  }

  return {
    StockEntryModal,
    StockEntryModalTrigger,
  };
}

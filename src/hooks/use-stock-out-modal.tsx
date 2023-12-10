"use client";

import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

import {
  StockOutForm,
  StockOutFormProps,
} from "../components/forms/stock-out-form";
import { useState } from "react";
import { MinusIcon } from "@/infra/icons";

type initalData = {
  productCode: string;
  unitPrice: number;
};

export function useStockOutModal() {
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

  function StockOutModalTrigger({ initialData }: StockOutFormProps) {
    return (
      <Button className="flex gap-2" onClick={() => openModal(initialData)}>
        <MinusIcon />
      </Button>
    );
  }

  function StockOutModal() {
    return (
      <Dialog open={modalState} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Saídas</DialogTitle>
            <DialogDescription>
              Atualize seu estoque com uma nova saída
            </DialogDescription>
          </DialogHeader>
          <StockOutForm initialData={initialData} />
        </DialogContent>
      </Dialog>
    );
  }

  return {
    StockOutModal,
    StockOutModalTrigger,
  };
}

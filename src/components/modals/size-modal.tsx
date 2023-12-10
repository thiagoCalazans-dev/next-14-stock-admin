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
import { SizeForm } from "../forms/size-form";

export function SizeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Cadastrar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro</DialogTitle>
          <DialogDescription>Crie um tamanho</DialogDescription>
        </DialogHeader>
        <SizeForm initialData={null} />
      </DialogContent>
    </Dialog>
  );
}

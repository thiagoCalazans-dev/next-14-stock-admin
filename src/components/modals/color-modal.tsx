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
import { ColorForm } from "../forms/color-form";

export function ColorModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Cadastrar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro</DialogTitle>
          <DialogDescription>Crie uma nova cor</DialogDescription>
        </DialogHeader>
        <ColorForm initialData={null} />
      </DialogContent>
    </Dialog>
  );
}

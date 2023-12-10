"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { BrandForm } from "../forms/brand-form";

export function BrandModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Cadastrar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro</DialogTitle>
          <DialogDescription>Crie uma nova categoria</DialogDescription>
        </DialogHeader>
        <BrandForm initialData={null} />
      </DialogContent>
    </Dialog>
  );
}

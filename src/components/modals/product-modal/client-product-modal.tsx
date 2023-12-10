"use client";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../../ui/dialog";
import { ProductForm } from "../../forms/product-form";
import { Brand } from "@/domain/entities/brand";
import { Color } from "@/domain/color";
import { Size } from "@/domain/size";
import { Category } from "@/domain/category";

interface ProductModalProps {
  brands: Brand[];
  colors: Color[];
  sizes: Size[];
  categories: Category[];
}

export function ClientProductModal({
  brands,
  categories,
  colors,
  sizes,
}: ProductModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Cadastrar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro</DialogTitle>
          <DialogDescription>Crie um Produto</DialogDescription>
        </DialogHeader>
        <ProductForm
          brands={brands}
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={null}
        />
      </DialogContent>
    </Dialog>
  );
}

"use server";

import { dbProduct } from "@/db/product";
import { revalidatePath } from "next/cache";

interface createProduct {
  name: string;
  value: string;
}

export async function createProductAction(data: any) {
  await dbProduct.save(data);
  revalidatePath("/products");
}

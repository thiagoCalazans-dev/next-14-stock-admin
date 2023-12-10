"use server";

import { dbProduct } from "@/db/product";
import { revalidatePath } from "next/cache";

interface removeProduct {
  id: string;
}

export async function removeProductAction(data: removeProduct) {
  await dbProduct.remove(data.id);
  revalidatePath("/categories");
}

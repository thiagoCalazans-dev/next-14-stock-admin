"use server";

import { dbStock } from "@/db/stock";
import { revalidatePath } from "next/cache";

export interface StockOutDTO {
  date: Date;
  quantity: number;
  unitPrice: number;
  productCode: string;
  discount: number;
}

export async function stockOutAction(data: StockOutDTO) {
  await dbStock.stockOut(data);
  revalidatePath("/stock");
}

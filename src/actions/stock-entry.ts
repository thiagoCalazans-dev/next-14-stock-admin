"use server";

import { dbStock } from "@/db/stock";
import { revalidatePath } from "next/cache";

export interface StockEntryDTO {
  date: Date;
  quantity: number;
  unitCost: number;
  productCode: string;
}

export async function stockEntryAction(data: StockEntryDTO) {
  console.log(data);
  await dbStock.stockEntry(data);
  revalidatePath("/stock");
}

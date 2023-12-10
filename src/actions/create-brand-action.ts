"use server";

import { dbBrand } from "@/db/brand";
import { revalidatePath } from "next/cache";

interface createBrand {
  name: string;
}

export async function createBrandAction(data: createBrand) {
  await dbBrand.save(data);
  revalidatePath("/brands");
}

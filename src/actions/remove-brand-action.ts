"use server";

import { dbBrand } from "@/db/brand";
import { revalidatePath } from "next/cache";

interface removeBrand {
  id: string;
}

export async function removeBrandAction(data: removeBrand) {
  await dbBrand.remove(data.id);
  revalidatePath("/brands");
}

"use server";

import { dbSize } from "@/db/size";
import { revalidatePath } from "next/cache";

interface removeSize {
  id: string;
}

export async function removeSizeAction(data: removeSize) {
  await dbSize.remove(data.id);
  revalidatePath("/sizes");
}

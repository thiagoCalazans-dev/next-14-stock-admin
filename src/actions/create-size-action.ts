"use server";

import { dbSize } from "@/db/size";
import { revalidatePath } from "next/cache";

interface createSize {
  name: string;
  value: string;
}

export async function createSizeAction(data: createSize) {
  await dbSize.save(data);
  revalidatePath("/sizes");
}

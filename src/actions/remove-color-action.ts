"use server";

import { dbColor } from "@/db/color";
import { revalidatePath } from "next/cache";

interface removeColor {
  id: string;
}

export async function removeColorAction(data: removeColor) {
  await dbColor.remove(data.id);
  revalidatePath("/categories");
}

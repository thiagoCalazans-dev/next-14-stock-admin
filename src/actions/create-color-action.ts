"use server";

import { dbColor } from "@/db/color";
import { revalidatePath } from "next/cache";

interface createColor {
  name: string;
  hexadecimal: string;
}

export async function createColorAction(data: createColor) {
  await dbColor.save(data);
  revalidatePath("/colors");
}

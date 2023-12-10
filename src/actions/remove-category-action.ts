"use server";

import { dbCategory } from "@/db/category";
import { revalidatePath } from "next/cache";

interface removeCategory {
  id: string;
}

export async function removeCategoryAction(data: removeCategory) {
  await dbCategory.remove(data.id);
  revalidatePath("/categories");
}

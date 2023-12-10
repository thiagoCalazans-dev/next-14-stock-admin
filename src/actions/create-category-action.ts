"use server";

import { dbCategory } from "@/db/category";
import { revalidatePath } from "next/cache";

interface createCategory {
  name: string;
}

export async function createCategoryAction(data: createCategory) {
  await dbCategory.save(data);
  revalidatePath("/categories");
}

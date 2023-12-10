import { db } from "./config";
import { adapterColor } from "@/adapter/color-adapter";
import { Color } from "@/domain/color";

async function getAll(): Promise<Color[]> {
  const dbColors = await db.color.findMany();
  const color = dbColors.map((dbColor) => adapterColor.dbToDomain(dbColor));
  return color;
}

interface saveColor {
  name: string;
  hexadecimal: string;
}

async function save(data: saveColor): Promise<void> {
  await db.color.create({
    data: {
      name: data.name,
      hexadecimal: data.hexadecimal,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.color.delete({
    where: {
      id,
    },
  });
}
export const dbColor = {
  getAll,
  save,
  remove,
};

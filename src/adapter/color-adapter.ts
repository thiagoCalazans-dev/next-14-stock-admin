import { Color } from "@/domain/entities/color";
import { Color as prismaColor } from "@prisma/client";

export const adapterColor = {
  dbToDomain,
};

type dbColor = prismaColor;

function dbToDomain(color: dbColor): Color {
  return Color.parse(color);
}

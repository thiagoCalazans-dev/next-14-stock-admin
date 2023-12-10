import { Size } from "@/domain/entities/size";
import { Size as prismaSize } from "@prisma/client";

export const adapterSize = {
  dbToDomain,
};

type dbSize = prismaSize;

function dbToDomain(size: dbSize): Size {
  return Size.parse(size);
}

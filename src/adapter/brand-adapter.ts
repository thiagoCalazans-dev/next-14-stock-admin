import { Brand } from "@/domain/entities/brand";
import { Brand as prismaBrand } from "@prisma/client";

export const adapterBrand = {
  dbToDomain,
};

type dbBrand = prismaBrand;

function dbToDomain(brand: dbBrand): Brand {
  return Brand.parse(brand);
}

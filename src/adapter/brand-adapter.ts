import { Brand } from "@/domain/brand";
import { Brand as prismaBrand } from "@prisma/client";

export const adapterBrand = {
  dbToDomain,
};

type dbBrand = prismaBrand;

function dbToDomain(brand: dbBrand): Brand {
  return Brand.parse(brand);
}

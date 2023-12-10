import { Size } from "@/domain/size";
import { db } from "./config";
import { adapterSize } from "@/adapter/size-adapter";


async function getAll(): Promise<Size[]> {
  const dbSizes = await db.size.findMany();
  const size = dbSizes.map((dbSize) => adapterSize.dbToDomain(dbSize));
  return size;
}

interface saveSize {
  name: string;
  value: string;
}

async function save(data: saveSize): Promise<void> {
  await db.size.create({
    data: {
      name: data.name,
      value: data.value,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.size.delete({
    where: {
      id,
    },
  });
}
export const dbSize = {
  getAll,
  save,
  remove,
};

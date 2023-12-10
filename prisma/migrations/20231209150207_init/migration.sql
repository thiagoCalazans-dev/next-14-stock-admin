/*
  Warnings:

  - You are about to drop the column `productId` on the `stock_entry` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stock_entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "unit_cost" DECIMAL NOT NULL,
    "stockId" TEXT,
    "product_code" TEXT NOT NULL,
    CONSTRAINT "stock_entry_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "product" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stock_entry_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_stock_entry" ("date", "id", "product_code", "quantity", "unit_cost") SELECT "date", "id", "product_code", "quantity", "unit_cost" FROM "stock_entry";
DROP TABLE "stock_entry";
ALTER TABLE "new_stock_entry" RENAME TO "stock_entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

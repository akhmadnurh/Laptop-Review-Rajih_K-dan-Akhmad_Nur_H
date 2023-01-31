/*
  Warnings:

  - You are about to drop the `Sku` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sku" DROP CONSTRAINT "Sku_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "detail" TEXT;

-- DropTable
DROP TABLE "Sku";

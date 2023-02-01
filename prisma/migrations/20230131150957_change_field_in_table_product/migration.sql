/*
  Warnings:

  - You are about to drop the column `detail` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "detail",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "sku" TEXT;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "bornDate" SET DATA TYPE TIMESTAMP(3);

/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_role_key" ON "User"("role");

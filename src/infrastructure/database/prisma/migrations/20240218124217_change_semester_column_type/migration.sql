/*
  Warnings:

  - You are about to alter the column `semester` on the `semesters` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "semesters" ALTER COLUMN "semester" SET DATA TYPE VARCHAR(10);

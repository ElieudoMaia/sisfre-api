/*
  Warnings:

  - You are about to drop the column `dateBegin` on the `days_off_school` table. All the data in the column will be lost.
  - You are about to drop the column `dateEnd` on the `days_off_school` table. All the data in the column will be lost.
  - Added the required column `date_begin` to the `days_off_school` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "days_off_school" DROP COLUMN "dateBegin",
DROP COLUMN "dateEnd",
ADD COLUMN     "date_begin" DATE NOT NULL,
ADD COLUMN     "date_end" DATE;

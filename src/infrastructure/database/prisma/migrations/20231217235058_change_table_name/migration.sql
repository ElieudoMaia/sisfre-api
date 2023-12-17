/*
  Warnings:

  - You are about to drop the `SchoolSaturday` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SchoolSaturday";

-- CreateTable
CREATE TABLE "school_saturdays" (
    "id" UUID NOT NULL,
    "day_of_week" VARCHAR(10) NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_saturdays_pkey" PRIMARY KEY ("id")
);

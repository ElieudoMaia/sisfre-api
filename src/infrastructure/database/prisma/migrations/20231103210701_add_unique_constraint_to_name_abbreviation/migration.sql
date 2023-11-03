/*
  Warnings:

  - A unique constraint covering the columns `[name_abbreviation]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_name_abbreviation_key" ON "users"("name_abbreviation");

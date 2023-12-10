-- CreateTable
CREATE TABLE "courses" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "acronym" VARCHAR(10) NOT NULL,
    "duration" INTEGER NOT NULL,
    "coordinator_id" UUID NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "courses_name_key" ON "courses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "courses_acronym_key" ON "courses"("acronym");

-- CreateIndex
CREATE UNIQUE INDEX "courses_coordinator_id_key" ON "courses"("coordinator_id");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

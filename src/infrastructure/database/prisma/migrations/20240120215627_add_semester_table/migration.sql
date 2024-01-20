-- CreateTable
CREATE TABLE "semesters" (
    "id" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "start_first_stage" DATE NOT NULL,
    "end_first_stage" DATE NOT NULL,
    "start_second_stage" DATE NOT NULL,
    "end_second_stage" DATE NOT NULL,
    "type" VARCHAR(12) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semesters_pkey" PRIMARY KEY ("id")
);

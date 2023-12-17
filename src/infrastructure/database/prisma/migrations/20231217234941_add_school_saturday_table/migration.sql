-- CreateTable
CREATE TABLE "SchoolSaturday" (
    "id" UUID NOT NULL,
    "day_of_week" VARCHAR(10) NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolSaturday_pkey" PRIMARY KEY ("id")
);

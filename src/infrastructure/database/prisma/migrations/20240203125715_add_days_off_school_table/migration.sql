-- CreateTable
CREATE TABLE "days_off_school" (
    "id" UUID NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "dateBegin" DATE NOT NULL,
    "dateEnd" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "days_off_school_pkey" PRIMARY KEY ("id")
);

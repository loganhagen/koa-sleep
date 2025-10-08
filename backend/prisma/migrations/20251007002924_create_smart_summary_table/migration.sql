/*
  Warnings:

  - You are about to drop the column `smart_summary` on the `sleep_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."sleep_logs" DROP COLUMN "smart_summary";

-- CreateTable
CREATE TABLE "public"."smart_summary" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "smart_summary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."smart_summary" ADD CONSTRAINT "smart_summary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

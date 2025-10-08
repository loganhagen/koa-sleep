/*
  Warnings:

  - A unique constraint covering the columns `[user_id,date]` on the table `smart_summary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `summary` to the `smart_summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."smart_summary" ADD COLUMN     "summary" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "smart_summary_user_id_date_key" ON "public"."smart_summary"("user_id", "date");

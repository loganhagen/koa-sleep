/*
  Warnings:

  - Changed the type of `dateOfSleep` on the `SleepLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."SleepLog" DROP COLUMN "dateOfSleep",
ADD COLUMN     "dateOfSleep" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "SleepLog_userId_dateOfSleep_idx" ON "public"."SleepLog"("userId", "dateOfSleep");

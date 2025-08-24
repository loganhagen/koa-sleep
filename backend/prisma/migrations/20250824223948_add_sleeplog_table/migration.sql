/*
  Warnings:

  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Connection" DROP CONSTRAINT "Connection_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "lastName" TEXT NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL;

-- DropTable
DROP TABLE "public"."Connection";

-- CreateTable
CREATE TABLE "public"."SleepLog" (
    "id" TEXT NOT NULL,
    "fitbitLogId" BIGINT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateOfSleep" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "efficiency" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "timeInBed" INTEGER NOT NULL,
    "minutesAsleep" INTEGER NOT NULL,
    "minutesAwake" INTEGER NOT NULL,
    "minutesToFallAsleep" INTEGER NOT NULL,
    "minutesAfterWakeup" INTEGER NOT NULL,
    "isMainSleep" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "logType" TEXT NOT NULL,
    "infoCode" INTEGER NOT NULL,

    CONSTRAINT "SleepLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SleepLog_fitbitLogId_key" ON "public"."SleepLog"("fitbitLogId");

-- CreateIndex
CREATE INDEX "SleepLog_userId_dateOfSleep_idx" ON "public"."SleepLog"("userId", "dateOfSleep");

-- AddForeignKey
ALTER TABLE "public"."SleepLog" ADD CONSTRAINT "SleepLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

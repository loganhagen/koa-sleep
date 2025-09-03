/*
  Warnings:

  - You are about to drop the `_SleepLogToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_SleepLogToUser" DROP CONSTRAINT "_SleepLogToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_SleepLogToUser" DROP CONSTRAINT "_SleepLogToUser_B_fkey";

-- DropTable
DROP TABLE "public"."_SleepLogToUser";

-- AddForeignKey
ALTER TABLE "public"."SleepLog" ADD CONSTRAINT "SleepLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

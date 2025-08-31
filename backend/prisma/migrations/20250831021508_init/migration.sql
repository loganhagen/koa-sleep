-- CreateEnum
CREATE TYPE "public"."ConnectionProvider" AS ENUM ('GOOGLE', 'FITBIT');

-- CreateEnum
CREATE TYPE "public"."TemperatureLogType" AS ENUM ('DEDICATED_TRACKER', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Connection" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "provider" "public"."ConnectionProvider" NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SleepLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fitbitLogId" BIGINT NOT NULL,
    "userId" UUID NOT NULL,
    "dateOfSleep" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "efficiency" INTEGER NOT NULL,
    "minutesToFallAsleep" INTEGER NOT NULL,
    "minutesAsleep" INTEGER NOT NULL,
    "minutesAwake" INTEGER NOT NULL,
    "timeInBed" INTEGER NOT NULL,
    "isMainSleep" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "infoCode" INTEGER NOT NULL,
    "levels" JSONB,

    CONSTRAINT "SleepLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SkinTemperature" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateTime" TIMESTAMP(3) NOT NULL,
    "nightlyRelative" DOUBLE PRECISION NOT NULL,
    "logType" "public"."TemperatureLogType" NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "SkinTemperature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Connection_provider_providerAccountId_key" ON "public"."Connection"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "SleepLog_userId_dateOfSleep_idx" ON "public"."SleepLog"("userId", "dateOfSleep");

-- CreateIndex
CREATE UNIQUE INDEX "SkinTemperature_userId_dateTime_key" ON "public"."SkinTemperature"("userId", "dateTime");

-- AddForeignKey
ALTER TABLE "public"."Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SleepLog" ADD CONSTRAINT "SleepLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SkinTemperature" ADD CONSTRAINT "SkinTemperature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

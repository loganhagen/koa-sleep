-- CreateEnum
CREATE TYPE "public"."TemperatureLogType" AS ENUM ('DEDICATED_TRACKER', 'OTHER');

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
    "userId" UUID NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "bedTime" TIMESTAMP(3) NOT NULL,
    "wakeTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "efficiency" INTEGER NOT NULL,
    "awakeMins" INTEGER NOT NULL,
    "lightMins" INTEGER NOT NULL,
    "deepMins" INTEGER NOT NULL,
    "remMins" INTEGER NOT NULL,

    CONSTRAINT "SleepLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SkinTemperature" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateTime" TIMESTAMP(3) NOT NULL,
    "average" DOUBLE PRECISION NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "SkinTemperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BreathingRate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateTime" DATE NOT NULL,
    "breathingRate" DOUBLE PRECISION NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "BreathingRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HeartRateVariability" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateTime" DATE NOT NULL,
    "dailyRmssd" DOUBLE PRECISION NOT NULL,
    "deepRmssd" DOUBLE PRECISION NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "HeartRateVariability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SpO2" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateTime" DATE NOT NULL,
    "avg" DOUBLE PRECISION NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "SpO2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_SleepLogToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_SleepLogToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SkinTemperature_userId_dateTime_key" ON "public"."SkinTemperature"("userId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "BreathingRate_userId_dateTime_key" ON "public"."BreathingRate"("userId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "HeartRateVariability_userId_dateTime_key" ON "public"."HeartRateVariability"("userId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "SpO2_userId_dateTime_key" ON "public"."SpO2"("userId", "dateTime");

-- CreateIndex
CREATE INDEX "_SleepLogToUser_B_index" ON "public"."_SleepLogToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."SkinTemperature" ADD CONSTRAINT "SkinTemperature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BreathingRate" ADD CONSTRAINT "BreathingRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeartRateVariability" ADD CONSTRAINT "HeartRateVariability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpO2" ADD CONSTRAINT "SpO2_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SleepLogToUser" ADD CONSTRAINT "_SleepLogToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."SleepLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SleepLogToUser" ADD CONSTRAINT "_SleepLogToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

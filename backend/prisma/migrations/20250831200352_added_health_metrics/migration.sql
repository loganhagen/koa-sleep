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

-- CreateIndex
CREATE UNIQUE INDEX "BreathingRate_userId_dateTime_key" ON "public"."BreathingRate"("userId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "HeartRateVariability_userId_dateTime_key" ON "public"."HeartRateVariability"("userId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "SpO2_userId_dateTime_key" ON "public"."SpO2"("userId", "dateTime");

-- AddForeignKey
ALTER TABLE "public"."BreathingRate" ADD CONSTRAINT "BreathingRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeartRateVariability" ADD CONSTRAINT "HeartRateVariability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpO2" ADD CONSTRAINT "SpO2_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

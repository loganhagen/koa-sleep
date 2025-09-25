-- CreateTable
CREATE TABLE "public"."breathing_rates" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "breathing_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "breathing_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."heart_rate_variabilities" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "daily_rmssd" DOUBLE PRECISION NOT NULL,
    "deep_rmssd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "heart_rate_variabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."skin_temperatures" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "average" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "skin_temperatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sleep_logs" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "bed_time" TIMESTAMPTZ(6) NOT NULL,
    "wake_time" TIMESTAMPTZ(6) NOT NULL,
    "duration_ms" BIGINT NOT NULL,
    "efficiency" INTEGER NOT NULL,
    "awake_mins" INTEGER NOT NULL,
    "light_mins" INTEGER NOT NULL,
    "deep_mins" INTEGER NOT NULL,
    "rem_mins" INTEGER NOT NULL,

    CONSTRAINT "sleep_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."spo2_readings" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "avg" INTEGER NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,

    CONSTRAINT "spo2_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "breathing_rates_user_id_date_idx" ON "public"."breathing_rates"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "breathing_rates_user_id_date_key" ON "public"."breathing_rates"("user_id", "date");

-- CreateIndex
CREATE INDEX "heart_rate_variabilities_user_id_date_idx" ON "public"."heart_rate_variabilities"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "heart_rate_variabilities_user_id_date_key" ON "public"."heart_rate_variabilities"("user_id", "date");

-- CreateIndex
CREATE INDEX "skin_temperatures_user_id_date_idx" ON "public"."skin_temperatures"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "skin_temperatures_user_id_date_key" ON "public"."skin_temperatures"("user_id", "date");

-- CreateIndex
CREATE INDEX "sleep_logs_user_id_date_idx" ON "public"."sleep_logs"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "sleep_logs_user_id_date_key" ON "public"."sleep_logs"("user_id", "date");

-- CreateIndex
CREATE INDEX "spo2_readings_user_id_date_idx" ON "public"."spo2_readings"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "spo2_readings_user_id_date_key" ON "public"."spo2_readings"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."breathing_rates" ADD CONSTRAINT "breathing_rates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."heart_rate_variabilities" ADD CONSTRAINT "heart_rate_variabilities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."skin_temperatures" ADD CONSTRAINT "skin_temperatures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sleep_logs" ADD CONSTRAINT "sleep_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."spo2_readings" ADD CONSTRAINT "spo2_readings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

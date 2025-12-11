-- CreateTable
CREATE TABLE "fitbit_tokens" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "fitbit_user_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "fitbit_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fitbit_tokens_user_id_key" ON "fitbit_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "fitbit_tokens_fitbit_user_id_key" ON "fitbit_tokens"("fitbit_user_id");

-- AddForeignKey
ALTER TABLE "fitbit_tokens" ADD CONSTRAINT "fitbit_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

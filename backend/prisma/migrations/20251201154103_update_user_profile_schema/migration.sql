/*
  Warnings:

  - Added the required column `full_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "display_name" TEXT,
ADD COLUMN     "full_name" TEXT NOT NULL;

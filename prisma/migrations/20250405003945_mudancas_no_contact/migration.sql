/*
  Warnings:

  - Added the required column `phone` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "phone" VARCHAR(16) NOT NULL;

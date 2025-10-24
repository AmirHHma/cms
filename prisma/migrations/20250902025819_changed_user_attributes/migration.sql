/*
  Warnings:

  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "Email",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';

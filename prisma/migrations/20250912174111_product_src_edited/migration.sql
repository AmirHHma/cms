/*
  Warnings:

  - Made the column `src` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "src" SET NOT NULL;

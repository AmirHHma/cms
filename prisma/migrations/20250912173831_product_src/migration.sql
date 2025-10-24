-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "src" TEXT DEFAULT '/no-image.webp';

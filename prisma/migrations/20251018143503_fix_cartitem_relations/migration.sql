-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_productID_fkey";

-- DropIndex
DROP INDEX "public"."CartItem_cartID_key";

-- AlterTable
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `landlordId` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "landlordId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "Landlords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

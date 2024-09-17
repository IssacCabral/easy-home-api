/*
  Warnings:

  - You are about to drop the `AmenitiesOnProperties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AmenitiesOnProperties" DROP CONSTRAINT "AmenitiesOnProperties_amenityId_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesOnProperties" DROP CONSTRAINT "AmenitiesOnProperties_propertyId_fkey";

-- DropTable
DROP TABLE "AmenitiesOnProperties";

-- CreateTable
CREATE TABLE "_AmenitiesToProperties" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AmenitiesToProperties_AB_unique" ON "_AmenitiesToProperties"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenitiesToProperties_B_index" ON "_AmenitiesToProperties"("B");

-- AddForeignKey
ALTER TABLE "_AmenitiesToProperties" ADD CONSTRAINT "_AmenitiesToProperties_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenitiesToProperties" ADD CONSTRAINT "_AmenitiesToProperties_B_fkey" FOREIGN KEY ("B") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

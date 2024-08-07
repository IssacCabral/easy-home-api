/*
  Warnings:

  - A unique constraint covering the columns `[addressId]` on the table `Properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Addresses" (
    "id" TEXT NOT NULL,
    "number" SMALLINT NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Properties_addressId_key" ON "Properties"("addressId");

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

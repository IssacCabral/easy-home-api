/*
  Warnings:

  - You are about to alter the column `lat` on the `Addresses` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(17,15)`.
  - You are about to alter the column `lon` on the `Addresses` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(17,15)`.

*/
-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "lat" SET DATA TYPE DECIMAL(17,15),
ALTER COLUMN "lon" SET DATA TYPE DECIMAL(17,15);

/*
  Warnings:

  - You are about to alter the column `lat` on the `Addresses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(17,15)` to `DoublePrecision`.
  - You are about to alter the column `lon` on the `Addresses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(17,15)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lon" SET DATA TYPE DOUBLE PRECISION;

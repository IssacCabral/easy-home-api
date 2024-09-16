/*
  Warnings:

  - Added the required column `location` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- AlterTable
ALTER TABLE "Addresses" ADD COLUMN     "location" geography(Point, 4326) NOT NULL;

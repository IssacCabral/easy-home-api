/*
  Warnings:

  - You are about to drop the column `number` on the `Landlords` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Tenants` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Landlords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Tenants` table without a default value. This is not possible if the table is not empty.

*/
ALTER TABLE "Landlords" RENAME COLUMN "number" TO "phone";

ALTER TABLE "Tenants" RENAME COLUMN "number" TO "phone";


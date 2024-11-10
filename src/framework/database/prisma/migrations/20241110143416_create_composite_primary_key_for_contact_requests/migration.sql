/*
  Warnings:

  - The primary key for the `ContactRequests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ContactRequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactRequests" DROP CONSTRAINT "ContactRequests_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ContactRequests_pkey" PRIMARY KEY ("tenantId", "propertyId");

/*
  Warnings:

  - The primary key for the `ContactRequests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `ContactRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactRequests" DROP CONSTRAINT "ContactRequests_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ContactRequests_pkey" PRIMARY KEY ("id");

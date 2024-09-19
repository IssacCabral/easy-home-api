/*
  Warnings:

  - You are about to drop the column `height` on the `Properties` table. All the data in the column will be lost.
  - Added the required column `depth` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "height",
ADD COLUMN     "depth" DOUBLE PRECISION NOT NULL;

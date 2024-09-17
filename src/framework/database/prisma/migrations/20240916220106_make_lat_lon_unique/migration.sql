/*
  Warnings:

  - A unique constraint covering the columns `[lat]` on the table `Addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lon]` on the table `Addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Addresses_lat_key" ON "Addresses"("lat");

-- CreateIndex
CREATE UNIQUE INDEX "Addresses_lon_key" ON "Addresses"("lon");

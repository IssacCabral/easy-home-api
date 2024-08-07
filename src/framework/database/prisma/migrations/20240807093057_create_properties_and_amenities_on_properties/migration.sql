-- CreateEnum
CREATE TYPE "PropertyTypes" AS ENUM ('HOUSE', 'APARTAMENT', 'DUPLEX');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('FREE', 'BUSY', 'SPLIT');

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "type" "PropertyTypes" NOT NULL,
    "status" "PropertyStatus" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "bedrooms" SMALLINT NOT NULL,
    "bathrooms" SMALLINT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "photosUrl" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesOnProperties" (
    "propertyId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,

    CONSTRAINT "AmenitiesOnProperties_pkey" PRIMARY KEY ("propertyId","amenityId")
);

-- AddForeignKey
ALTER TABLE "AmenitiesOnProperties" ADD CONSTRAINT "AmenitiesOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesOnProperties" ADD CONSTRAINT "AmenitiesOnProperties_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

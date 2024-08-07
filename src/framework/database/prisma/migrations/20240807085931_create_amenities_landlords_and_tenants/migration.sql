-- CreateTable
CREATE TABLE "Amenities" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(40) NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Landlords" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "number" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "urlProfilePic" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Landlords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenants" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "number" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "urlProfilePic" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_label_key" ON "Amenities"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Landlords_email_key" ON "Landlords"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_email_key" ON "Tenants"("email");

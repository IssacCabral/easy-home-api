-- CreateEnum
CREATE TYPE "ShareRequestStatus" AS ENUM ('IN_CONTACT', 'SELECTED', 'FINISHED');

-- CreateTable
CREATE TABLE "ShareRequests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "status" "ShareRequestStatus" NOT NULL,
    "finalizationReason" TEXT,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShareRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShareRequests" ADD CONSTRAINT "ShareRequests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareRequests" ADD CONSTRAINT "ShareRequests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

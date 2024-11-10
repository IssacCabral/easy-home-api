-- CreateEnum
CREATE TYPE "ContactRequestStatus" AS ENUM ('IN_CONTACT', 'RENTED', 'FINISHED');

-- CreateTable
CREATE TABLE "ContactRequests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "status" "ContactRequestStatus" NOT NULL,
    "finalizationReason" TEXT,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactRequests" ADD CONSTRAINT "ContactRequests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactRequests" ADD CONSTRAINT "ContactRequests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

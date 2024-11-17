-- CreateTable
CREATE TABLE "PropertyReviews" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "PropertyReviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyReviews" ADD CONSTRAINT "PropertyReviews_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyReviews" ADD CONSTRAINT "PropertyReviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

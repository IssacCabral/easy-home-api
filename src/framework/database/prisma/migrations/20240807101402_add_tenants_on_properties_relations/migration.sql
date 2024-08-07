-- CreateTable
CREATE TABLE "TenantsOnProperties" (
    "propertyId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "isMainTenant" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TenantsOnProperties_pkey" PRIMARY KEY ("propertyId","tenantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantsOnProperties_tenantId_key" ON "TenantsOnProperties"("tenantId");

-- AddForeignKey
ALTER TABLE "TenantsOnProperties" ADD CONSTRAINT "TenantsOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantsOnProperties" ADD CONSTRAINT "TenantsOnProperties_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
